@echo off
chcp 65001 >nul
setlocal
title Choque Econômico
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado.
  echo Instale o Node.js LTS e tente novamente.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

if not exist "%~dp0dist\index.html" (
  echo A pasta dist nao parece estar completa.
  echo O arquivo dist\index.html nao foi encontrado.
  echo.
  pause
  exit /b 1
)

node "%~dp0server.js"
if errorlevel 1 (
  echo.
  echo Nao foi possivel iniciar o Choque Economico.
  echo Verifique as mensagens acima.
  echo.
  pause
  exit /b 1
)

endlocal
