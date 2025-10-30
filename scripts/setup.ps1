# Script de configuración inicial del proyecto
# Instala dependencias y configura el entorno

Write-Host "🚀 Configurando proyecto Portfolio de Tomás Nadal..." -ForegroundColor Cyan

# Verificar Node.js
Write-Host "`n📦 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  ✗ Node.js no encontrado. Por favor, instala Node.js 18+ o 20.x" -ForegroundColor Red
    exit 1
}

# Verificar pnpm
Write-Host "`n📦 Verificando pnpm..." -ForegroundColor Yellow
$pnpmVersion = pnpm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ pnpm instalado: v$pnpmVersion" -ForegroundColor Green
} else {
    Write-Host "  ⚠ pnpm no encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g pnpm
    Write-Host "  ✓ pnpm instalado" -ForegroundColor Green
}

# Instalar dependencias del Frontend
Write-Host "`n📦 Instalando dependencias del Frontend..." -ForegroundColor Yellow
pnpm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencias del frontend instaladas" -ForegroundColor Green
} else {
    Write-Host "  ✗ Error al instalar dependencias del frontend" -ForegroundColor Red
    exit 1
}

# Instalar dependencias del Backend
Write-Host "`n📦 Instalando dependencias del Backend (Strapi)..." -ForegroundColor Yellow
Set-Location strapi-backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencias del backend instaladas" -ForegroundColor Green
} else {
    Write-Host "  ✗ Error al instalar dependencias del backend" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Verificar archivo .env.local
Write-Host "`n🔐 Verificando variables de entorno..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "  ✓ .env.local existe" -ForegroundColor Green
} else {
    Write-Host "  ⚠ .env.local no encontrado. Creando..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "  ✓ .env.local creado (configura tu API token)" -ForegroundColor Green
}

# Verificar archivo .env del backend
if (Test-Path "strapi-backend\.env") {
    Write-Host "  ✓ strapi-backend\.env existe" -ForegroundColor Green
} else {
    Write-Host "  ⚠ strapi-backend\.env no encontrado" -ForegroundColor Yellow
    if (Test-Path "strapi-backend\.env.example") {
        Copy-Item "strapi-backend\.env.example" "strapi-backend\.env"
        Write-Host "  ✓ strapi-backend\.env creado desde .env.example" -ForegroundColor Green
    }
}

Write-Host "`n✨ Configuración completada!" -ForegroundColor Green
Write-Host "`n📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Inicia Strapi:     cd strapi-backend && npm run develop" -ForegroundColor White
Write-Host "  2. Crea un admin en:  http://localhost:1337/admin" -ForegroundColor White
Write-Host "  3. Genera API Token:  Settings → API Tokens" -ForegroundColor White
Write-Host "  4. Actualiza .env.local con el token" -ForegroundColor White
Write-Host "  5. Inicia Frontend:   pnpm dev" -ForegroundColor White
Write-Host "  6. Visita:            http://localhost:3000" -ForegroundColor White
Write-Host "`n📖 Para más información, consulta README.md" -ForegroundColor Cyan
