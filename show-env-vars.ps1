Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VARIABLES DE ENTORNO PARA RENDER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "VARIABLES BASICAS:" -ForegroundColor Yellow
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "HOST=0.0.0.0" -ForegroundColor White
Write-Host "PORT=10000" -ForegroundColor White
Write-Host "DATABASE_CLIENT=postgres" -ForegroundColor White
Write-Host "DATABASE_SSL=false" -ForegroundColor White
Write-Host ""

Write-Host "SECRETS DE STRAPI:" -ForegroundColor Yellow
Write-Host "APP_KEYS=xQO9Yl2TuvcYcRMgWjSlo+JRrLQfd14VyrGGLGuNpzc=,/Z+79WXHyyd7N1qag8MkuG0p/H4JoFcn6x9NMZc2PRY=,vTLxU2HUlqpGr46LoWY5XyGPRjUtO2YzU7M0TdzZRP8=,TeMyERP8M9EP4wmp/qolxrcaUDW6zTTSXPookE5LSAM=" -ForegroundColor White
Write-Host ""
Write-Host "API_TOKEN_SALT=s4eaVLOGvJzeoSsbIO9FJCTDjsAKMeweE9373PwL6KI=" -ForegroundColor White
Write-Host ""
Write-Host "ADMIN_JWT_SECRET=yJ0DIEd6z/RzEJEhN4u+fVYNpTn6EQLOf+ua5cnPf88=" -ForegroundColor White
Write-Host ""
Write-Host "TRANSFER_TOKEN_SALT=s1ofO3Je3YXui7FWgLQ6ECA2QE56uDpUA7xauQ9KLGQ=" -ForegroundColor White
Write-Host ""
Write-Host "JWT_SECRET=lY1T0U67QvY4xhCHjmI9iexAffxFUaolW3qMSfFJKvI=" -ForegroundColor White
Write-Host ""

Write-Host "BASE DE DATOS:" -ForegroundColor Yellow
Write-Host "OPCION 1 (RECOMENDADO): En Render Dashboard > Environment > 'Add from Database' > Selecciona 'strapi-db'" -ForegroundColor Green
Write-Host ""
Write-Host "OPCION 2 (Manual):" -ForegroundColor Yellow
Write-Host "DATABASE_URL=postgresql://strapi_user:3RSdTCVBq62RjRLbHBwMIl2tmCSdZgtw@dpg-d41g15vgi27c739gqosg-a/strapi_production_rabq" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TOTAL: 11 variables" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tambien guardado en: RENDER-ENV-VARS.txt" -ForegroundColor Gray
Write-Host ""
