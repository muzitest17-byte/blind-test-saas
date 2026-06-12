@echo off
echo Demarrage du Blind Test Musical...
echo.
echo Le serveur demarre sur http://localhost:3002
echo Le client demarre sur http://localhost:5174
echo.
echo Ouvrez http://localhost:5174 dans votre navigateur
echo.

cd /d "%~dp0"
call npm run dev
