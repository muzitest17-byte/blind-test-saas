@echo off
echo Installation du Blind Test Musical...
echo.

cd /d "%~dp0"

echo [1/3] Installation des dependances root...
call npm install

echo [2/3] Installation des dependances serveur...
cd server
call npm install
cd ..

echo [3/3] Installation des dependances client...
cd client
call npm install
cd ..

echo.
echo ✅ Installation terminee !
echo Lancez "start.bat" pour demarrer l'application.
pause
