@echo off
cd /d "%~dp0"
echo ===============================================
echo   AI Story Generator - Auto Deploy
echo ===============================================
echo.

echo [1/3] Building project...
call npm install
call npm run build

echo.
echo [2/3] Opening deployment options...
echo.
echo Choose your deployment method:
echo 1. Netlify (Drag & Drop)
echo 2. Vercel (Drag & Drop) 
echo 3. GitHub Pages (Manual)
echo.

set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo Opening Netlify...
    start https://app.netlify.com/drop
    echo.
    echo Instructions:
    echo 1. Drag the 'dist' folder to the website
    echo 2. Your app will be live instantly!
    echo 3. Copy the generated link
)

if "%choice%"=="2" (
    echo Opening Vercel...
    start https://vercel.com/new
    echo.
    echo Instructions:
    echo 1. Click "Browse" and select the 'dist' folder
    echo 2. Click "Deploy"  
    echo 3. Your app will be live in seconds!
    echo 4. Copy the generated link
)

if "%choice%"=="3" (
    echo Opening GitHub...
    start https://github.com/new
    echo.
    echo Instructions:
    echo 1. Create repository: ai-longform-story-generator
    echo 2. Run: github-upload.bat
    echo 3. Enable GitHub Pages in Settings
)

echo.
echo ===============================================
echo   Build completed! Check the 'dist' folder
echo ===============================================
echo.
echo Your app is ready for deployment!
echo The 'dist' folder contains all files needed.
echo.
pause
