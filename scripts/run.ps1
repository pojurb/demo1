#!/usr/bin/env pwsh
# Convenience wrapper for Windows PowerShell users
# Resolve Node.exe path: use global 'node' if available, otherwise fallback to local path
if (Get-Command "node" -ErrorAction SilentlyContinue) {
    $NODE = "node"
} else {
    $NODE = "C:\Users\napst\AppData\Local\ms-playwright-go\1.57.0\node.exe"
    if (-not (Test-Path $NODE)) {
        Write-Error "Node.js was not found globally in your PATH, nor at the fallback path:"
        Write-Error "  $NODE"
        Write-Error "Please install Node.js (https://nodejs.org)"
        exit 1
    }
}
$SCRIPTS_DIR = $PSScriptRoot
& $NODE (Join-Path $SCRIPTS_DIR "run.js") @args
exit $LASTEXITCODE
