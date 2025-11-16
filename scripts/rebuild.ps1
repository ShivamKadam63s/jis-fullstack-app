# Rebuild script for jis-fullstack-app (PowerShell)
# Usage: Run from repository root in PowerShell: .\scripts\rebuild.ps1

Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Output "Repository root: $repoRoot"

# Build backend jar (skip tests to speed up)
Push-Location "$repoRoot\backend"
Write-Output "Running Maven package (skip tests)..."
if (Test-Path .\mvnw.cmd) {
    & .\mvnw.cmd -DskipTests package
} else {
    & mvn -DskipTests package
}
Pop-Location

# Rebuild docker images with no cache and start compose in detached mode
Push-Location $repoRoot
Write-Output "Building docker images with --no-cache..."
docker compose build --no-cache
Write-Output "Starting docker compose (detached)..."
docker compose up -d
Pop-Location

Write-Output "Done. Use 'docker compose logs -f' to follow logs."