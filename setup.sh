#!/bin/bash

# Script de Setup Inicial - gRPC Microservices
# Execute este script após clonar o repositório

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Setup Inicial - gRPC Microservices${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar se Docker está instalado
echo -e "${YELLOW}🔍 Verificando pré-requisitos...${NC}"
echo ""

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não está instalado!${NC}"
    echo -e "${YELLOW}   Por favor, instale o Docker:${NC}"
    echo -e "${GRAY}   https://docs.docker.com/get-docker/${NC}"
    exit 1
fi

DOCKER_VERSION=$(docker --version)
echo -e "${GREEN}✅ Docker encontrado: $DOCKER_VERSION${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose não está instalado!${NC}"
    echo -e "${YELLOW}   Por favor, instale o Docker Compose:${NC}"
    echo -e "${GRAY}   https://docs.docker.com/compose/install/${NC}"
    exit 1
fi

COMPOSE_VERSION=$(docker-compose --version)
echo -e "${GREEN}✅ Docker Compose encontrado: $COMPOSE_VERSION${NC}"

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Perguntar se quer construir as imagens agora
read -p "Deseja construir as imagens Docker agora? (s/N): " build

if [[ $build == "s" || $build == "S" ]]; then
    echo ""
    echo -e "${YELLOW}📦 Construindo imagens Docker...${NC}"
    echo -e "${GRAY}   Isso pode levar alguns minutos na primeira vez...${NC}"
    echo ""
    
    if docker-compose build; then
        echo ""
        echo -e "${GREEN}✅ Imagens construídas com sucesso!${NC}"
        echo ""
        
        # Perguntar se quer iniciar os serviços
        read -p "Deseja iniciar os serviços agora? (s/N): " start
        
        if [[ $start == "s" || $start == "S" ]]; then
            echo ""
            echo -e "${YELLOW}🚀 Iniciando serviços...${NC}"
            echo ""
            
            if docker-compose up -d; then
                echo ""
                echo -e "${GREEN}✅ Serviços iniciados com sucesso!${NC}"
                echo ""
                
                # Aguardar alguns segundos
                echo -e "${YELLOW}⏳ Aguardando serviços ficarem prontos...${NC}"
                sleep 5
                
                # Verificar status
                echo ""
                echo -e "${CYAN}📊 Status dos serviços:${NC}"
                docker-compose ps
                
                echo ""
                echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo -e "${GREEN}🎉 SETUP CONCLUÍDO!${NC}"
                echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo ""
                echo -e "${YELLOW}🌐 Acesse o frontend em:${NC}"
                echo -e "${WHITE}   http://localhost:3000${NC}"
                echo ""
                echo -e "${YELLOW}📚 Leia a documentação:${NC}"
                echo -e "${GRAY}   - README.md - Visão geral${NC}"
                echo -e "${GRAY}   - QUICK_START.md - Guia rápido${NC}"
                echo -e "${GRAY}   - DOCUMENTATION.md - Docs técnicas${NC}"
                echo ""
                echo -e "${YELLOW}🧪 Para testar os serviços:${NC}"
                echo -e "${WHITE}   ./test-services.sh${NC}"
                echo ""
                echo -e "${YELLOW}🛑 Para parar os serviços:${NC}"
                echo -e "${WHITE}   docker-compose down${NC}"
                echo ""
                echo -e "${YELLOW}🔍 Para ver os logs:${NC}"
                echo -e "${WHITE}   docker-compose logs -f${NC}"
                echo ""
            else
                echo ""
                echo -e "${RED}❌ Erro ao iniciar serviços${NC}"
                echo -e "${YELLOW}   Verifique os logs: docker-compose logs${NC}"
            fi
        else
            echo ""
            echo -e "${CYAN}ℹ️  Para iniciar os serviços manualmente:${NC}"
            echo -e "${WHITE}   docker-compose up -d${NC}"
            echo ""
        fi
    else
        echo ""
        echo -e "${RED}❌ Erro ao construir imagens${NC}"
        echo -e "${YELLOW}   Verifique se o Docker está rodando corretamente${NC}"
    fi
else
    echo ""
    echo -e "${CYAN}ℹ️  Para construir as imagens manualmente:${NC}"
    echo -e "${WHITE}   docker-compose build${NC}"
    echo ""
    echo -e "${CYAN}ℹ️  Para iniciar os serviços:${NC}"
    echo -e "${WHITE}   docker-compose up -d${NC}"
    echo ""
fi

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}📝 Comandos úteis:${NC}"
echo ""
echo -e "${GRAY}   docker-compose up -d          # Iniciar serviços${NC}"
echo -e "${GRAY}   docker-compose down           # Parar serviços${NC}"
echo -e "${GRAY}   docker-compose logs -f        # Ver logs${NC}"
echo -e "${GRAY}   docker-compose ps             # Ver status${NC}"
echo -e "${GRAY}   docker-compose restart        # Reiniciar serviços${NC}"
echo ""
echo -e "${YELLOW}Para mais informações, consulte: README.md${NC}"
echo ""

# Tornar o script executável
chmod +x test-services.sh 2>/dev/null
