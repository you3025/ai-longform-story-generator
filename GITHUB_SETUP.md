# 🚀 깃허브 저장소 생성 및 업로드 가이드

## 1. 깃허브에서 새 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 오른쪽 상단 `+` 버튼 클릭 → `New repository`
3. Repository name: `longform-story-generator`
4. Description: `AI-powered longform story generator for YouTube content`
5. Public 선택
6. **Initialize this repository with README 체크 해제** (이미 로컬에 있음)
7. `Create repository` 클릭

## 2. 로컬 저장소를 깃허브에 연결

```bash
# 현재 프로젝트 폴더에서 실행
git remote add origin https://github.com/[YOUR_USERNAME]/longform-story-generator.git
git branch -M main
git push -u origin main
```

**YOUR_USERNAME을 실제 깃허브 사용자명으로 변경하세요**

## 3. GitHub Pages 설정 (자동 배포)

1. 깃허브 저장소 페이지로 이동
2. `Settings` 탭 클릭
3. 왼쪽 메뉴에서 `Pages` 클릭
4. Source: `GitHub Actions` 선택
5. 자동으로 배포 워크플로우가 실행됩니다

## 4. 접속 URL

배포 완료 후 다음 URL로 접속 가능:
```
https://[YOUR_USERNAME].github.io/longform-story-generator/
```

## 5. 로컬 테스트

Windows:
```bash
# start.bat 더블클릭 또는
npm install
npm run dev
```

Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

## 주의사항

⚠️ **Claude API 키 필요**: 실제 스토리 생성을 위해서는 Anthropic Claude API 키가 필요합니다.
- 현재는 브라우저에서 직접 API를 호출하는 구조입니다.
- 프로덕션에서는 백엔드 서버를 통해 API 키를 보호해야 합니다.

## 문제해결

### Git 설정이 안 되어 있는 경우:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 권한 오류가 발생하는 경우:
```bash
# SSH 키 설정 또는 Personal Access Token 사용
# https://docs.github.com/en/authentication
```
