# Script de Testes - gRPC Microservices
# Execute este script após iniciar os serviços com docker-compose up

Write-Host "🧪 Iniciando testes dos microserviços gRPC..." -ForegroundColor Cyan
Write-Host ""

# Verificar se os serviços estão rodando
Write-Host "📋 Verificando status dos containers..." -ForegroundColor Yellow
docker-compose ps
Write-Host ""

Start-Sleep -Seconds 2

# Testar Frontend
Write-Host "🌐 Testando Frontend..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend está respondendo corretamente!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erro ao acessar Frontend: $_" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 1

# Criar Usuário
Write-Host "👤 Testando criação de usuário..." -ForegroundColor Green
try {
    $userBody = @{
        name = "Teste Usuario"
        email = "teste@example.com"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/users" `
        -Method POST `
        -Body $userBody `
        -ContentType "application/json" `
        -TimeoutSec 5

    if ($response.success) {
        Write-Host "✅ Usuário criado com sucesso!" -ForegroundColor Green
        Write-Host "   ID: $($response.user.id)" -ForegroundColor Gray
        Write-Host "   Nome: $($response.user.name)" -ForegroundColor Gray
        Write-Host "   Email: $($response.user.email)" -ForegroundColor Gray
        $userId = $response.user.id
    }
} catch {
    Write-Host "❌ Erro ao criar usuário: $_" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 1

# Listar Usuários
Write-Host "📋 Listando usuários..." -ForegroundColor Green
try {
    # Acessar a página de usuários para listar
    $response = Invoke-WebRequest -Uri "http://localhost:3000/users" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Lista de usuários obtida com sucesso!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erro ao listar usuários: $_" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 1

# Criar Produto
Write-Host "📦 Testando criação de produto..." -ForegroundColor Green
try {
    $productBody = @{
        name = "Produto Teste"
        description = "Descrição do produto teste"
        price = 99.99
        stock = 50
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/products" `
        -Method POST `
        -Body $productBody `
        -ContentType "application/json" `
        -TimeoutSec 5

    if ($response.success) {
        Write-Host "✅ Produto criado com sucesso!" -ForegroundColor Green
        Write-Host "   ID: $($response.product.id)" -ForegroundColor Gray
        Write-Host "   Nome: $($response.product.name)" -ForegroundColor Gray
        Write-Host "   Preço: R$ $($response.product.price)" -ForegroundColor Gray
        Write-Host "   Estoque: $($response.product.stock)" -ForegroundColor Gray
        $productId = $response.product.id
    }
} catch {
    Write-Host "❌ Erro ao criar produto: $_" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 1

# Listar Produtos
Write-Host "📋 Listando produtos..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/products" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Lista de produtos obtida com sucesso!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erro ao listar produtos: $_" -ForegroundColor Red
}
Write-Host ""

# Resumo
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 RESUMO DOS TESTES" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Testes concluídos!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Acesse o frontend em: http://localhost:3000" -ForegroundColor Yellow
Write-Host "👥 Página de usuários: http://localhost:3000/users" -ForegroundColor Yellow
Write-Host "📦 Página de produtos: http://localhost:3000/products" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔍 Para ver os logs dos serviços:" -ForegroundColor Cyan
Write-Host "   docker-compose logs -f" -ForegroundColor Gray
Write-Host ""
Write-Host "🛑 Para parar os serviços:" -ForegroundColor Cyan
Write-Host "   docker-compose down" -ForegroundColor Gray
Write-Host ""
