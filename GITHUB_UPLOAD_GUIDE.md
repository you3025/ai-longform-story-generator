# 🚀 깃허브 새 저장소 생성 및 업로드 가이드

## 1단계: 깃허브에서 새 저장소 생성

1. **GitHub 접속**: https://github.com
2. **로그인** 후 오른쪽 상단 **"+" 버튼** → **"New repository"** 클릭
3. **저장소 설정**:
   - Repository name: `ai-longform-story-generator`
   - Description: `🤖 AI-powered longform YouTube story generator with dual modes`
   - 🔘 **Public** 선택 (또는 Private)
   - ❌ **Initialize this repository with README 체크 해제** (이미 로컬에 있음)
   - ❌ **Add .gitignore 체크 해제**
   - ❌ **Choose a license 체크 해제**
4. **"Create repository"** 클릭

## 2단계: 로컬에서 원격 저장소 연결

저장소가 생성되면 깃허브가 제공하는 명령어를 사용하거나, 아래 명령어를 실행하세요:

```bash
# 원격 저장소 추가 (YOUR_USERNAME을 실제 깃허브 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/ai-longform-story-generator.git

# 메인 브랜치로 설정
git branch -M main

# 깃허브에 업로드
git push -u origin main
```

## 3단계: 자동 실행 (Windows용)

아래 배치 파일을 실행하면 자동으로 업로드됩니다:

**github-upload.bat**를 더블클릭하거나 아래 명령어 실행:

## 예상 결과

업로드가 완료되면:
- 저장소 URL: `https://github.com/YOUR_USERNAME/ai-longform-story-generator`
- GitHub Pages 자동 배포: `https://YOUR_USERNAME.github.io/ai-longform-story-generator/`

## 문제 해결

### 인증 오류 시:
1. **Personal Access Token** 사용
2. **SSH 키** 설정
3. **GitHub CLI** 사용: `gh auth login`

### 원격 저장소 변경 시:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/ai-longform-story-generator.git
```

---

**⚠️ 중요**: `YOUR_USERNAME`을 실제 깃허브 사용자명으로 반드시 변경하세요!
