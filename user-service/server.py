import time
import uuid
from concurrent import futures

import grpc

# Import generated classes
import user_pb2
import user_pb2_grpc

# In-memory database
users_db = []


class UserService(user_pb2_grpc.UserServiceServicer):
    def ListUsers(self, request, context):
        return user_pb2.UserList(users=users_db)

    def CreateUser(self, request, context):
        new_user = user_pb2.User(
            id=str(uuid.uuid4()), name=request.name, email=request.email
        )
        users_db.append(new_user)
        return new_user

    def GetUser(self, request, context):
        for user in users_db:
            if user.id == request.id:
                return user
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details("User not found")
        return user_pb2.User()

    def UpdateUser(self, request, context):
        for user in users_db:
            if user.id == request.id:
                user.name = request.name
                user.email = request.email
                return user
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details("User not found")
        return user_pb2.User()

    def DeleteUser(self, request, context):
        for i, user in enumerate(users_db):
            if user.id == request.id:
                del users_db[i]
                return user_pb2.DeleteUserResponse(success=True)
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details("User not found")
        return user_pb2.DeleteUserResponse(success=False)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port("[::]:50051")
    print("User Service running on port 50051")
    server.start()
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == "__main__":
    serve()
