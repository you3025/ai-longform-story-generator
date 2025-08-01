@echo off
cd /d "%~dp0"
echo ===============================================
echo   GitHub Quick Deploy
echo ===============================================
echo.

echo Enter your GitHub username (or press Enter for demo account):
set /p USERNAME="GitHub Username: "

if "%USERNAME%"=="" set USERNAME=ai-story-demo

echo.
echo [1/3] Adding files...
git add .
git commit -m "Ready for GitHub deployment"

echo [2/3] Connecting to GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/ai-longform-story-generator.git
git branch -M main

echo [3/3] Uploading...
git push -u origin main

echo.
echo ===============================================
echo   SUCCESS! Your links are ready:
echo ===============================================
echo.
echo Repository: https://github.com/%USERNAME%/ai-longform-story-generator
echo Live Demo:  https://%USERNAME%.github.io/ai-longform-story-generator/
echo.
echo Note: Live demo will be available in 5-10 minutes
echo      after GitHub Pages builds automatically
echo.
pause
