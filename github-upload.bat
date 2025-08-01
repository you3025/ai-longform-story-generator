@echo off
cd /d "%~dp0"
echo ===============================================
echo   GitHub Repository Upload
echo ===============================================
echo.

echo [INFO] Current repository status:
git status --short
echo.

echo [1/4] Adding all changes...
git add .

echo [2/4] Creating commit...
git commit -m "Complete dual-mode AI longform story generator"

echo [3/4] Setting up remote repository...
echo Please enter your GitHub username:
set /p USERNAME="GitHub Username: "
git remote add origin https://github.com/%USERNAME%/ai-longform-story-generator.git
git branch -M main

echo [4/4] Uploading to GitHub...
git push -u origin main

echo.
echo ===============================================
echo   Upload Complete!
echo ===============================================
echo.
echo Your repository is now available at:
echo https://github.com/%USERNAME%/ai-longform-story-generator
echo.
echo GitHub Pages will be available at:
echo https://%USERNAME%.github.io/ai-longform-story-generator/
echo.
pause
