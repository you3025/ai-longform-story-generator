# 🚀 실행 가이드 (한글 인코딩 문제 해결)

## 방법 1: 수동 실행 (권장)

1. **터미널 열기**
   - Windows키 + R → `cmd` 입력 → 엔터

2. **프로젝트 폴더로 이동**
   ```cmd
   cd C:\Users\user\Desktop\longform-story-generator
   ```

3. **의존성 설치**
   ```cmd
   npm install
   ```

4. **개발 서버 실행**
   ```cmd
   npm run dev
   ```

5. **브라우저에서 접속**
   - http://localhost:5173 또는
   - http://localhost:3000

## 방법 2: 수정된 배치 파일

`start.bat` 파일을 더블클릭하여 실행

## 방법 3: PowerShell 사용

1. **PowerShell 열기** (관리자 권한)
2. **실행**
   ```powershell
   Set-Location "C:\Users\user\Desktop\longform-story-generator"
   npm install
   npm run dev
   ```

## 🔧 문제 해결

### npm 명령어가 인식되지 않는 경우:
1. Node.js 설치: https://nodejs.org
2. 재부팅 후 다시 시도

### 포트 충돌 시:
- 다른 포트 사용: `npm run dev -- --port 8080`

### 의존성 설치 실패 시:
```cmd
npm cache clean --force
npm install
```

## ✅ 성공하면 보이는 메시지:
```
  Local:   http://localhost:5173/
  Network: use --host to expose
```

브라우저에서 표시된 주소로 접속하면 됩니다!
