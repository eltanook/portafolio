$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri "https://github.com/render-oss/cli/releases/latest/download/render-windows-amd64.exe" -OutFile "render.exe"
Write-Host "Render CLI downloaded successfully!"
