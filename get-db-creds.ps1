$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"
$dbId = "dpg-d41g15vgi27c739gqosg-a"

Write-Host "Intentando obtener credenciales..." -ForegroundColor Yellow
Write-Host ""

# Intentar endpoint de connection info
try {
    Write-Host "Probando /postgres/$dbId/connection-info..." -ForegroundColor Gray
    $connInfo = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId/connection-info" -Headers $headers
    Write-Host "Exito!" -ForegroundColor Green
    $connInfo | ConvertTo-Json -Depth 10
} catch {
    Write-Host "No funciono (404 o similar)" -ForegroundColor Yellow
}

Write-Host ""

# Intentar endpoint de credentials
try {
    Write-Host "Probando /postgres/$dbId/credentials..." -ForegroundColor Gray
    $creds = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId/credentials" -Headers $headers
    Write-Host "Exito!" -ForegroundColor Green
    $creds | ConvertTo-Json -Depth 10
} catch {
    Write-Host "No funciono" -ForegroundColor Yellow
}

Write-Host ""

# Ver si la DB tiene algún sub-recurso
try {
    Write-Host "Probando GET detallado con query params..." -ForegroundColor Gray
    $detailed = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId?includeConnectionInfo=true" -Headers $headers
    Write-Host "Exito!" -ForegroundColor Green
    $detailed | ConvertTo-Json -Depth 10
} catch {
    Write-Host "No funciono" -ForegroundColor Yellow
}
