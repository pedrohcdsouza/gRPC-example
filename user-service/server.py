import time
import uuid
from concurrent import futures

import grpc
import user_pb2
import user_pb2_grpc

# Armazenamento em memória (simulando um banco de dados)
users_db = {}


class UserService(user_pb2_grpc.UserServiceServicer):
    """Implementação do serviço de usuários"""

    def CreateUser(self, request, context):
        """Cria um novo usuário"""
        try:
            user_id = str(uuid.uuid4())
            user = {
                "id": user_id,
                "name": request.name,
                "email": request.email,
                "created_at": int(time.time()),
            }

            # Verifica se o email já existe
            for existing_user in users_db.values():
                if existing_user["email"] == request.email:
                    return user_pb2.UserResponse(
                        success=False, message="Email já cadastrado"
                    )

            users_db[user_id] = user

            return user_pb2.UserResponse(
                user=user_pb2.User(**user),
                success=True,
                message="Usuário criado com sucesso",
            )
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Erro ao criar usuário: {str(e)}")
            return user_pb2.UserResponse(success=False, message=str(e))

    def GetUser(self, request, context):
        """Busca um usuário por ID"""
        user = users_db.get(request.id)

        if not user:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("Usuário não encontrado")
            return user_pb2.UserResponse(
                success=False, message="Usuário não encontrado"
            )

        return user_pb2.UserResponse(
            user=user_pb2.User(**user), success=True, message="Usuário encontrado"
        )

    def ListUsers(self, request, context):
        """Lista todos os usuários"""
        users = [user_pb2.User(**user) for user in users_db.values()]

        return user_pb2.ListUsersResponse(users=users, total=len(users))

    def UpdateUser(self, request, context):
        """Atualiza um usuário existente"""
        if request.id not in users_db:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("Usuário não encontrado")
            return user_pb2.UserResponse(
                success=False, message="Usuário não encontrado"
            )

        # Verifica se o email já está sendo usado por outro usuário
        for user_id, existing_user in users_db.items():
            if user_id != request.id and existing_user["email"] == request.email:
                return user_pb2.UserResponse(
                    success=False, message="Email já está sendo usado por outro usuário"
                )

        users_db[request.id]["name"] = request.name
        users_db[request.id]["email"] = request.email

        return user_pb2.UserResponse(
            user=user_pb2.User(**users_db[request.id]),
            success=True,
            message="Usuário atualizado com sucesso",
        )

    def DeleteUser(self, request, context):
        """Deleta um usuário"""
        if request.id not in users_db:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("Usuário não encontrado")
            return user_pb2.DeleteUserResponse(
                success=False, message="Usuário não encontrado"
            )

        del users_db[request.id]

        return user_pb2.DeleteUserResponse(
            success=True, message="Usuário deletado com sucesso"
        )


def serve():
    """Inicia o servidor gRPC"""
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port("[::]:50051")
    server.start()

    print("🚀 User Service (Python) iniciado na porta 50051")
    print("📊 Aguardando requisições gRPC...")

    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        print("\n🛑 Encerrando servidor...")
        server.stop(0)


if __name__ == "__main__":
    serve()
