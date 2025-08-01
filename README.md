# 롱폼 스토리 생성기

AI 기반 유튜브 롱폼 콘텐츠 스토리 자동 생성 도구

## 🚀 주요 기능

- **자동 스토리 컨셉 생성**: 매번 다른 독창적인 스토리 아이디어
- **다단계 플롯 구성**: 체계적인 스토리 구조 설계
- **실시간 챕터 생성**: API 기반 분할 대본 작성
- **커스터마이징**: 분량, 장르, 캐릭터 수 조절 가능
- **원클릭 다운로드**: 완성된 대본 마크다운 파일로 저장

## 🎯 특징

### 무한 변주 시스템
- 10개 장르 × 15개 배경 × 14개 직업 × 12개 사회이슈 = 25,200가지 조합
- 매번 완전히 다른 스토리 생성 보장

### API 최적화
- 단계별 분할 처리로 효율적인 대본 생성
- Claude API 연동으로 고품질 스토리텔링

### 롱폼 특화
- 30분~2시간 분량 대응
- 5-10개 반전 포인트 자동 배치
- 시청자 이탈 방지 구조

## 🛠️ 기술 스택

- **Frontend**: React 18, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **AI**: Claude API
- **Deploy**: GitHub Pages 호환

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/longform-story-generator.git
cd longform-story-generator
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## 📝 사용법

### 1단계: 스토리 설정
- 분량 (30-120분)
- 캐릭터 수 (3-6명)
- 반전 포인트 수 (3-10개)

### 2단계: 컨셉 생성
- AI가 장르, 배경, 직업, 사회이슈를 랜덤 조합
- 독창적인 스토리 컨셉 자동 생성

### 3단계: 플롯 구성
- 10-12개 챕터로 구성된 세부 플롯
- 각 챕터별 주요 사건과 반전 포인트

### 4단계: 샘플 챕터
- 첫 번째 챕터 전체 대본 생성
- 영화적 서술과 자연스러운 대화

### 5단계: 다운로드
- 전체 내용을 마크다운 파일로 저장
- 추가 챕터 생성을 위한 프롬프트 포함

## 🎮 사용 예시

```
설정: 60분 분량, 4명 캐릭터, 5개 반전
결과: 전직 해커 + 요양병원 + 노인학대 → 12챕터 스릴러 스토리
```

## 🔧 커스터마이징

### 장르 추가
`genres` 배열에 새로운 장르 추가:
```javascript
const genres = [
  '스릴러', '드라마', '미스터리', '새로운장르'
];
```

### 배경 확장
`backgrounds` 배열에 새로운 배경 추가:
```javascript
const backgrounds = [
  '병원 응급실', '법정', '새로운배경'
];
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🌟 로드맵

- [ ] 다국어 지원 (영어, 일본어)
- [ ] 캐릭터 비주얼 생성 (AI 이미지)
- [ ] 음성 나레이션 생성 (TTS)
- [ ] 유튜브 업로드 자동화
- [ ] 썸네일 자동 생성
- [ ] 댓글 유도 문구 자동 삽입

## 💡 아이디어 제안

새로운 기능이나 개선사항이 있으시면 Issues에 남겨주세요!

## 🙏 감사의 말

이 프로젝트는 AI 기술을 활용한 창작 도구의 가능성을 탐구합니다.
모든 사용자의 피드백과 기여를 환영합니다.
