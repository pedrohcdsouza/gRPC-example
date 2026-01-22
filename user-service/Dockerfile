FROM python:3.11-slim

WORKDIR /app

# Copiar dependências
COPY requirements.txt .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar arquivos proto
COPY proto/ ./proto/

# Gerar código Python a partir do proto
RUN python -m grpc_tools.protoc \
    -I./proto \
    --python_out=. \
    --grpc_python_out=. \
    ./proto/user.proto

# Copiar código do servidor
COPY server.py .

# Expor porta
EXPOSE 50051

# Comando para iniciar o servidor
CMD ["python", "server.py"]
