# Makefile para gRPC Microservices

.PHONY: help build up down logs clean test restart status ps

# Cores para output
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

help: ## Mostra esta ajuda
	@echo "$(GREEN)gRPC Microservices - Comandos Disponíveis$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

build: ## Constrói todas as imagens Docker
	@echo "$(GREEN)📦 Construindo imagens Docker...$(NC)"
	docker-compose build

up: ## Inicia todos os serviços
	@echo "$(GREEN)🚀 Iniciando serviços...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✅ Serviços iniciados!$(NC)"
	@echo "$(YELLOW)🌐 Frontend: http://localhost:3000$(NC)"

up-build: ## Reconstrói e inicia todos os serviços
	@echo "$(GREEN)🔨 Reconstruindo e iniciando serviços...$(NC)"
	docker-compose up -d --build
	@echo "$(GREEN)✅ Serviços iniciados!$(NC)"
	@echo "$(YELLOW)🌐 Frontend: http://localhost:3000$(NC)"

down: ## Para todos os serviços
	@echo "$(YELLOW)🛑 Parando serviços...$(NC)"
	docker-compose down

down-v: ## Para todos os serviços e remove volumes
	@echo "$(YELLOW)🗑️  Parando serviços e removendo volumes...$(NC)"
	docker-compose down -v

logs: ## Mostra logs de todos os serviços
	docker-compose logs -f

logs-user: ## Mostra logs do User Service
	docker-compose logs -f user-service

logs-product: ## Mostra logs do Product Service
	docker-compose logs -f product-service

logs-frontend: ## Mostra logs do Frontend
	docker-compose logs -f frontend

restart: ## Reinicia todos os serviços
	@echo "$(YELLOW)🔄 Reiniciando serviços...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✅ Serviços reiniciados!$(NC)"

restart-user: ## Reinicia User Service
	@echo "$(YELLOW)🔄 Reiniciando User Service...$(NC)"
	docker-compose restart user-service

restart-product: ## Reinicia Product Service
	@echo "$(YELLOW)🔄 Reiniciando Product Service...$(NC)"
	docker-compose restart product-service

restart-frontend: ## Reinicia Frontend
	@echo "$(YELLOW)🔄 Reiniciando Frontend...$(NC)"
	docker-compose restart frontend

status: ## Mostra status dos serviços
	@echo "$(GREEN)📊 Status dos serviços:$(NC)"
	@docker-compose ps

ps: status ## Alias para status

clean: ## Remove containers, imagens e volumes
	@echo "$(YELLOW)🧹 Limpando tudo...$(NC)"
	docker-compose down -v
	docker system prune -f
	@echo "$(GREEN)✅ Limpeza concluída!$(NC)"

test: ## Executa testes dos serviços
	@echo "$(GREEN)🧪 Executando testes...$(NC)"
	@if [ -f "test-services.sh" ]; then \
		chmod +x test-services.sh; \
		./test-services.sh; \
	else \
		echo "$(YELLOW)⚠️  Script de teste não encontrado$(NC)"; \
	fi

shell-user: ## Abre shell no container User Service
	docker-compose exec user-service sh

shell-product: ## Abre shell no container Product Service
	docker-compose exec product-service sh

shell-frontend: ## Abre shell no container Frontend
	docker-compose exec frontend sh

dev: ## Inicia em modo desenvolvimento com logs
	@echo "$(GREEN)🔧 Iniciando em modo desenvolvimento...$(NC)"
	docker-compose up --build

inspect: ## Inspeciona a rede Docker
	@echo "$(GREEN)🔍 Informações da rede Docker:$(NC)"
	docker network inspect grpc-example_grpc-network

health: ## Verifica health dos containers
	@echo "$(GREEN)💚 Verificando saúde dos containers:$(NC)"
	@docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

open: ## Abre o frontend no navegador
	@echo "$(GREEN)🌐 Abrindo frontend...$(NC)"
	@if command -v xdg-open > /dev/null; then \
		xdg-open http://localhost:3000; \
	elif command -v open > /dev/null; then \
		open http://localhost:3000; \
	elif command -v start > /dev/null; then \
		start http://localhost:3000; \
	else \
		echo "$(YELLOW)Abra manualmente: http://localhost:3000$(NC)"; \
	fi

install-grpcurl: ## Instruções para instalar grpcurl
	@echo "$(GREEN)📥 Instalar grpcurl:$(NC)"
	@echo ""
	@echo "$(YELLOW)macOS (Homebrew):$(NC)"
	@echo "  brew install grpcurl"
	@echo ""
	@echo "$(YELLOW)Linux:$(NC)"
	@echo "  wget https://github.com/fullstorydev/grpcurl/releases/download/v1.8.9/grpcurl_1.8.9_linux_x86_64.tar.gz"
	@echo "  tar -xvf grpcurl_1.8.9_linux_x86_64.tar.gz"
	@echo "  sudo mv grpcurl /usr/local/bin/"
	@echo ""
	@echo "$(YELLOW)Windows (Chocolatey):$(NC)"
	@echo "  choco install grpcurl"
	@echo ""

docs: ## Abre documentação
	@echo "$(GREEN)📚 Documentação disponível:$(NC)"
	@echo "  - README.md - Visão geral do projeto"
	@echo "  - QUICK_START.md - Guia de início rápido"
	@echo "  - DOCUMENTATION.md - Documentação técnica completa"
	@echo "  - API_EXAMPLES.md - Exemplos de uso da API"
	@echo "  - DIAGRAMS.md - Diagramas do sistema"
	@echo "  - CONTRIBUTING.md - Guia de contribuição"

info: ## Informações sobre o projeto
	@echo "$(GREEN)ℹ️  Informações do Projeto$(NC)"
	@echo ""
	@echo "$(YELLOW)Serviços:$(NC)"
	@echo "  - User Service (Python): localhost:50051"
	@echo "  - Product Service (Node.js): localhost:50052"
	@echo "  - Frontend (Express): http://localhost:3000"
	@echo ""
	@echo "$(YELLOW)Comandos úteis:$(NC)"
	@echo "  make up          - Inicia os serviços"
	@echo "  make logs        - Mostra logs"
	@echo "  make down        - Para os serviços"
	@echo "  make test        - Executa testes"
	@echo "  make help        - Mostra todos os comandos"
	@echo ""
