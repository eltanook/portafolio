$token = "f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301"
$headers = @{
    "Authorization" = "Bearer $token"
}

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         MONITOREANDO DEPLOY EN RENDER                     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Push completado a GitHub" -ForegroundColor Green
Write-Host "⏳ Esperando que Render detecte el cambio y redepliegue..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Esto puede tomar 5-10 minutos." -ForegroundColor Gray
Write-Host "Verificando cada 30 segundos..." -ForegroundColor Gray
Write-Host ""

$maxAttempts = 20 # 20 intentos * 30 seg = 10 minutos
$attempt = 0
$success = $false

while ($attempt -lt $maxAttempts -and -not $success) {
    $attempt++
    $elapsed = $attempt * 30
    
    Write-Host "[$attempt/$maxAttempts] Verificando... (${elapsed}s transcurridos)" -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/projects" -Headers $headers -ErrorAction Stop
        
        if ($response.data) {
            Write-Host ""
            Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
            Write-Host "║              ✅ DEPLOY COMPLETADO EXITOSAMENTE!           ║" -ForegroundColor Green
            Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
            Write-Host ""
            Write-Host "Proyectos encontrados: $($response.data.Count)" -ForegroundColor White
            
            if ($response.data.Count -gt 0) {
                Write-Host ""
                Write-Host "Proyectos disponibles:" -ForegroundColor Cyan
                foreach ($project in $response.data) {
                    Write-Host "  • $($project.attributes.title)" -ForegroundColor White
                }
            }
            
            Write-Host ""
            Write-Host "🚀 El frontend ahora funcionará correctamente:" -ForegroundColor Green
            Write-Host "   • Home: Proyectos featured visibles" -ForegroundColor Gray
            Write-Host "   • /projects: Lista completa de proyectos" -ForegroundColor Gray
            Write-Host "   • /blog: Lista de artículos" -ForegroundColor Gray
            Write-Host ""
            Write-Host "💡 Reinicia el dev server si aún está corriendo:" -ForegroundColor Yellow
            Write-Host "   npm run dev" -ForegroundColor Gray
            Write-Host ""
            
            $success = $true
        }
    } catch {
        $status = if ($_.Exception.Response) { $_.Exception.Response.StatusCode.value__ } else { "N/A" }
        Write-Host "   ⏳ Status: $status - Aún no está listo..." -ForegroundColor Gray
    }
    
    if (-not $success -and $attempt -lt $maxAttempts) {
        Start-Sleep -Seconds 30
    }
}

if (-not $success) {
    Write-Host ""
    Write-Host "⚠️  El deploy está tardando más de lo esperado." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Verifica manualmente en:" -ForegroundColor Gray
    Write-Host "https://dashboard.render.com" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Cuando el deploy diga 'Live', ejecuta:" -ForegroundColor Gray
    Write-Host 'Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/projects" -Headers @{"Authorization"="Bearer $token"}' -ForegroundColor Gray
}

Remove-Item monitor-deploy.ps1 -Force
