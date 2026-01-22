#!/bin/bash

# Script de Testes - gRPC Microservices
# Execute este script após iniciar os serviços com docker-compose up

echo "🧪 Iniciando testes dos microserviços gRPC..."
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

# Verificar se os serviços estão rodando
echo -e "${YELLOW}📋 Verificando status dos containers...${NC}"
docker-compose ps
echo ""

sleep 2

# Testar Frontend
echo -e "${GREEN}🌐 Testando Frontend...${NC}"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo -e "${GREEN}✅ Frontend está respondendo corretamente!${NC}"
else
    echo -e "${RED}❌ Erro ao acessar Frontend${NC}"
fi
echo ""

sleep 1

# Criar Usuário
echo -e "${GREEN}👤 Testando criação de usuário...${NC}"
USER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Teste Usuario", "email": "teste@example.com"}')

if echo "$USER_RESPONSE" | grep -q "success.*true"; then
    echo -e "${GREEN}✅ Usuário criado com sucesso!${NC}"
    echo -e "${GRAY}   Resposta: $USER_RESPONSE${NC}"
else
    echo -e "${RED}❌ Erro ao criar usuário${NC}"
    echo -e "${GRAY}   Resposta: $USER_RESPONSE${NC}"
fi
echo ""

sleep 1

# Listar Usuários
echo -e "${GREEN}📋 Listando usuários...${NC}"
if curl -s http://localhost:3000/users | grep -q "user"; then
    echo -e "${GREEN}✅ Lista de usuários obtida com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao listar usuários${NC}"
fi
echo ""

sleep 1

# Criar Produto
echo -e "${GREEN}📦 Testando criação de produto...${NC}"
PRODUCT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/products \
    -H "Content-Type: application/json" \
    -d '{"name": "Produto Teste", "description": "Descrição do produto teste", "price": 99.99, "stock": 50}')

if echo "$PRODUCT_RESPONSE" | grep -q "success.*true"; then
    echo -e "${GREEN}✅ Produto criado com sucesso!${NC}"
    echo -e "${GRAY}   Resposta: $PRODUCT_RESPONSE${NC}"
else
    echo -e "${RED}❌ Erro ao criar produto${NC}"
    echo -e "${GRAY}   Resposta: $PRODUCT_RESPONSE${NC}"
fi
echo ""

sleep 1

# Listar Produtos
echo -e "${GREEN}📋 Listando produtos...${NC}"
if curl -s http://localhost:3000/products | grep -q "product"; then
    echo -e "${GREEN}✅ Lista de produtos obtida com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao listar produtos${NC}"
fi
echo ""

# Resumo
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📊 RESUMO DOS TESTES${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✅ Testes concluídos!${NC}"
echo ""
echo -e "${YELLOW}🌐 Acesse o frontend em: http://localhost:3000${NC}"
echo -e "${YELLOW}👥 Página de usuários: http://localhost:3000/users${NC}"
echo -e "${YELLOW}📦 Página de produtos: http://localhost:3000/products${NC}"
echo ""
echo -e "${CYAN}🔍 Para ver os logs dos serviços:${NC}"
echo -e "${GRAY}   docker-compose logs -f${NC}"
echo ""
echo -e "${CYAN}🛑 Para parar os serviços:${NC}"
echo -e "${GRAY}   docker-compose down${NC}"
echo ""
