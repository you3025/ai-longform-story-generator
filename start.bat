@echo off
cd /d "%~dp0"
echo Installing dependencies...
npm install
echo.
echo Starting server...
npm run dev
pause
