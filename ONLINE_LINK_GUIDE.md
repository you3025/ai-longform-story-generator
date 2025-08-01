# 🌐 온라인 테스트 링크 생성 가이드

## 🚀 1단계: GitHub 저장소 생성

### 📋 저장소 정보
- **저장소명**: `ai-longform-story-generator`
- **설명**: `🤖 AI-powered longform YouTube story generator with dual modes`
- **타입**: Public (다른 사람도 테스트 가능)

### 🔗 생성 단계
1. **GitHub 접속**: https://github.com
2. **New repository** 클릭
3. **설정**:
   ```
   Repository name: ai-longform-story-generator
   Description: 🤖 AI-powered longform YouTube story generator with dual modes
   🔘 Public (중요!)
   ❌ Initialize with README (체크 해제)
   ```
4. **Create repository** 클릭

## 🚀 2단계: 로컬에서 GitHub로 업로드

### 방법 1: 자동 업로드 (권장)
```cmd
github-upload.bat
```
더블클릭 후 GitHub 사용자명 입력

### 방법 2: 수동 업로드
```cmd
cd C:\Users\user\Desktop\longform-story-generator
git remote add origin https://github.com/YOUR_USERNAME/ai-longform-story-generator.git
git branch -M main
git push -u origin main
```

## 🌐 3단계: GitHub Pages 활성화

### 자동 배포 설정
1. **GitHub 저장소** → **Settings** 탭
2. **Pages** 메뉴 클릭
3. **Source**: `GitHub Actions` 선택
4. **자동 배포 대기** (5-10분)

### ✅ 배포 완료 확인
- Actions 탭에서 배포 상태 확인
- 초록색 체크마크 = 배포 완료

## 🔗 4단계: 테스트 링크 완성!

### 📍 예상 링크들
```
📦 저장소: https://github.com/YOUR_USERNAME/ai-longform-story-generator
🌐 라이브 데모: https://YOUR_USERNAME.github.io/ai-longform-story-generator/
📱 모바일 테스트: 동일 링크 (반응형 지원)
```

## 🎯 사용자 테스트 시나리오

### 🚀 간단 모드 테스트
1. 라이브 데모 링크 접속
2. **간단 모드** 선택
3. 기본 설정 (60분, 4캐릭터, 5반전)
4. **랜덤 생성** 클릭
5. AI가 자동 조합하여 스토리 생성
6. 결과 다운로드 및 확인

### 🎛️ 고급 모드 테스트  
1. **고급 모드** 선택
2. 세부 설정:
   - 장르: 미스터리
   - 배경: 방송국
   - 시간구조: 회상 구조
   - 서술방식: 다중 시점
3. **커스텀 생성** 클릭
4. 정교한 스토리 구조 확인

## 📱 모바일/태블릿 테스트

- **반응형 디자인** 지원
- **터치 인터페이스** 최적화
- **모든 기능** 동일하게 작동

## 🔍 디버깅 도구

### 개발자 도구에서 확인 가능
- **Console**: API 호출 로그
- **Network**: Claude API 요청/응답
- **Application**: 로컬 스토리지 상태

## 🌟 공유용 링크 포맷

### SNS 공유용
```
🤖 AI 스토리 생성기 테스트해보세요!
- 간단 모드: 25,200가지 랜덤 조합
- 고급 모드: 무한 변주 커스터마이징
- 1시간 분량 롱폼 스토리 자동 생성

🔗 https://YOUR_USERNAME.github.io/ai-longform-story-generator/
```

### 기술 문서용
```
## AI Longform Story Generator
- **Technology**: React + Vite + Claude API
- **Features**: Dual mode system (Simple/Advanced)
- **Demo**: https://YOUR_USERNAME.github.io/ai-longform-story-generator/
- **Source**: https://github.com/YOUR_USERNAME/ai-longform-story-generator
```

---

## 🚀 바로 시작하기

1. **지금 바로**: `github-upload.bat` 실행
2. **5분 후**: GitHub Pages 자동 배포 완료  
3. **완성**: 전 세계 누구나 테스트 가능한 링크!

**YOUR_USERNAME**을 실제 GitHub 사용자명으로 바꿔서 사용하세요! 🎬✨
