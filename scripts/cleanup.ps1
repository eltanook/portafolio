# Script de limpieza para el proyecto
# Elimina node_modules, cachés y archivos temporales

Write-Host "🧹 Iniciando limpieza del proyecto..." -ForegroundColor Cyan

# Frontend
Write-Host "`n📦 Limpiando Frontend..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "  ✓ .next eliminado" -ForegroundColor Green
}

if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
    Write-Host "  ✓ node_modules eliminado" -ForegroundColor Green
}

if (Test-Path ".env.local") {
    Write-Host "  ℹ .env.local preservado" -ForegroundColor Blue
}

# Backend (Strapi)
Write-Host "`n📦 Limpiando Backend (Strapi)..." -ForegroundColor Yellow
if (Test-Path "strapi-backend\.tmp") {
    Remove-Item -Recurse -Force strapi-backend\.tmp
    Write-Host "  ✓ strapi-backend\.tmp eliminado" -ForegroundColor Green
}

if (Test-Path "strapi-backend\build") {
    Remove-Item -Recurse -Force strapi-backend\build
    Write-Host "  ✓ strapi-backend\build eliminado" -ForegroundColor Green
}

if (Test-Path "strapi-backend\dist") {
    Remove-Item -Recurse -Force strapi-backend\dist
    Write-Host "  ✓ strapi-backend\dist eliminado" -ForegroundColor Green
}

if (Test-Path "strapi-backend\node_modules") {
    Remove-Item -Recurse -Force strapi-backend\node_modules
    Write-Host "  ✓ strapi-backend\node_modules eliminado" -ForegroundColor Green
}

if (Test-Path "strapi-backend\.strapi") {
    Write-Host "  ℹ strapi-backend\.strapi preservado" -ForegroundColor Blue
}

# Logs
Write-Host "`n📝 Limpiando logs..." -ForegroundColor Yellow
Get-ChildItem -Path . -Filter "*.log" -Recurse | Remove-Item -Force
Write-Host "  ✓ Archivos .log eliminados" -ForegroundColor Green

# Archivos temporales
Write-Host "`n🗑️ Limpiando archivos temporales..." -ForegroundColor Yellow
if (Test-Path ".DS_Store") {
    Remove-Item -Force .DS_Store
    Write-Host "  ✓ .DS_Store eliminado" -ForegroundColor Green
}

Get-ChildItem -Path . -Filter ".DS_Store" -Recurse | Remove-Item -Force
Get-ChildItem -Path . -Filter "Thumbs.db" -Recurse | Remove-Item -Force

Write-Host "`n✨ Limpieza completada!" -ForegroundColor Green
Write-Host "`nPara reinstalar dependencias:" -ForegroundColor Cyan
Write-Host "  Frontend: pnpm install" -ForegroundColor White
Write-Host "  Backend:  cd strapi-backend && npm install" -ForegroundColor White
