Write-Host "=== Generador de Secrets para Strapi ===" -ForegroundColor Cyan
Write-Host ""

function New-Secret {
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    [Convert]::ToBase64String($bytes)
}

Write-Host "Generando secrets..." -ForegroundColor Yellow
Write-Host ""

$key1 = New-Secret
$key2 = New-Secret
$key3 = New-Secret
$key4 = New-Secret

Write-Host "APP_KEYS (copia todo esto como una sola variable):" -ForegroundColor Green
Write-Host "$key1,$key2,$key3,$key4" -ForegroundColor White
Write-Host ""

Write-Host "API_TOKEN_SALT:" -ForegroundColor Green
Write-Host (New-Secret) -ForegroundColor White
Write-Host ""

Write-Host "ADMIN_JWT_SECRET:" -ForegroundColor Green
Write-Host (New-Secret) -ForegroundColor White
Write-Host ""

Write-Host "TRANSFER_TOKEN_SALT:" -ForegroundColor Green
Write-Host (New-Secret) -ForegroundColor White
Write-Host ""

Write-Host "JWT_SECRET:" -ForegroundColor Green
Write-Host (New-Secret) -ForegroundColor White
Write-Host ""

Write-Host "=== Secrets generados exitosamente ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Copia cada valor en las variables de entorno de Render" -ForegroundColor Yellow
