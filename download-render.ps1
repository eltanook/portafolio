# Download Render CLI
$url = "https://github.com/render-oss/cli/releases/download/v2.4.2/render-windows-amd64.exe"
$output = "render.exe"

Write-Host "Downloading Render CLI from $url..."
& wget.exe --no-check-certificate $url -O $output

if (Test-Path $output) {
    $fileSize = (Get-Item $output).Length
    Write-Host "Download complete! File size: $fileSize bytes"
    if ($fileSize -lt 1000) {
        Write-Host "Warning: File seems too small, download may have failed"
    }
} else {
    Write-Host "Error: Download failed"
}
