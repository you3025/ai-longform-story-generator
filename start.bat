@echo off
echo ===============================================
echo   롱폼 스토리 생성기 로컬 실행
echo ===============================================
echo.

echo [1/3] 의존성 설치 중...
call npm install

echo.
echo [2/3] 개발 서버 시작 중...
echo 브라우저에서 http://localhost:3000 으로 접속하세요
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요
echo.

echo [3/3] 서버 실행...
call npm run dev

pause
