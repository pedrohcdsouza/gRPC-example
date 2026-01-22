# Script de Setup Inicial - gRPC Microservices
# Execute este script após clonar o repositório

Write-Host "🚀 Setup Inicial - gRPC Microservices" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Verificar se Docker está instalado
Write-Host "🔍 Verificando pré-requisitos..." -ForegroundColor Yellow
Write-Host ""

try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker encontrado: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está instalado!" -ForegroundColor Red
    Write-Host "   Por favor, instale o Docker Desktop:" -ForegroundColor Yellow
    Write-Host "   https://www.docker.com/products/docker-desktop" -ForegroundColor Gray
    exit 1
}

try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose encontrado: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose não está instalado!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Perguntar se quer construir as imagens agora
$build = Read-Host "Deseja construir as imagens Docker agora? (s/N)"

if ($build -eq "s" -or $build -eq "S") {
    Write-Host ""
    Write-Host "📦 Construindo imagens Docker..." -ForegroundColor Yellow
    Write-Host "   Isso pode levar alguns minutos na primeira vez..." -ForegroundColor Gray
    Write-Host ""
    
    docker-compose build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Imagens construídas com sucesso!" -ForegroundColor Green
        Write-Host ""
        
        # Perguntar se quer iniciar os serviços
        $start = Read-Host "Deseja iniciar os serviços agora? (s/N)"
        
        if ($start -eq "s" -or $start -eq "S") {
            Write-Host ""
            Write-Host "🚀 Iniciando serviços..." -ForegroundColor Yellow
            Write-Host ""
            
            docker-compose up -d
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "✅ Serviços iniciados com sucesso!" -ForegroundColor Green
                Write-Host ""
                
                # Aguardar alguns segundos
                Write-Host "⏳ Aguardando serviços ficarem prontos..." -ForegroundColor Yellow
                Start-Sleep -Seconds 5
                
                # Verificar status
                Write-Host ""
                Write-Host "📊 Status dos serviços:" -ForegroundColor Cyan
                docker-compose ps
                
                Write-Host ""
                Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
                Write-Host "🎉 SETUP CONCLUÍDO!" -ForegroundColor Green
                Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
                Write-Host ""
                Write-Host "🌐 Acesse o frontend em:" -ForegroundColor Yellow
                Write-Host "   http://localhost:3000" -ForegroundColor White
                Write-Host ""
                Write-Host "📚 Leia a documentação:" -ForegroundColor Yellow
                Write-Host "   - README.md - Visão geral" -ForegroundColor Gray
                Write-Host "   - QUICK_START.md - Guia rápido" -ForegroundColor Gray
                Write-Host "   - DOCUMENTATION.md - Docs técnicas" -ForegroundColor Gray
                Write-Host ""
                Write-Host "🧪 Para testar os serviços:" -ForegroundColor Yellow
                Write-Host "   .\test-services.ps1" -ForegroundColor White
                Write-Host ""
                Write-Host "🛑 Para parar os serviços:" -ForegroundColor Yellow
                Write-Host "   docker-compose down" -ForegroundColor White
                Write-Host ""
                Write-Host "🔍 Para ver os logs:" -ForegroundColor Yellow
                Write-Host "   docker-compose logs -f" -ForegroundColor White
                Write-Host ""
            } else {
                Write-Host ""
                Write-Host "❌ Erro ao iniciar serviços" -ForegroundColor Red
                Write-Host "   Verifique os logs: docker-compose logs" -ForegroundColor Yellow
            }
        } else {
            Write-Host ""
            Write-Host "ℹ️  Para iniciar os serviços manualmente:" -ForegroundColor Cyan
            Write-Host "   docker-compose up -d" -ForegroundColor White
            Write-Host ""
        }
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao construir imagens" -ForegroundColor Red
        Write-Host "   Verifique se o Docker está rodando corretamente" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "ℹ️  Para construir as imagens manualmente:" -ForegroundColor Cyan
    Write-Host "   docker-compose build" -ForegroundColor White
    Write-Host ""
    Write-Host "ℹ️  Para iniciar os serviços:" -ForegroundColor Cyan
    Write-Host "   docker-compose up -d" -ForegroundColor White
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Comandos úteis:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   docker-compose up -d          # Iniciar serviços" -ForegroundColor Gray
Write-Host "   docker-compose down           # Parar serviços" -ForegroundColor Gray
Write-Host "   docker-compose logs -f        # Ver logs" -ForegroundColor Gray
Write-Host "   docker-compose ps             # Ver status" -ForegroundColor Gray
Write-Host "   docker-compose restart        # Reiniciar serviços" -ForegroundColor Gray
Write-Host ""
Write-Host "Para mais informações, consulte: README.md" -ForegroundColor Yellow
Write-Host ""
