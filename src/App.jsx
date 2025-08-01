import React, { useState } from 'react';
import { Play, Download, FileText, Settings, Zap, BookOpen, Users, Clock, AlertCircle, Shuffle, Sliders } from 'lucide-react';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: 모드 선택, 1: 설정, 2: 컨셉, 3: 플롯, 4: 완성
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState(''); // 'simple' or 'advanced'
  const [storyData, setStoryData] = useState({
    concept: '',
    plot: '',
    chapters: [],
    settings: {
      genre: '',
      duration: 60,
      characters: 4,
      reversals: 5,
      // 고급 설정
      background: '',
      job: '',
      issue: '',
      timeStructure: 'linear',
      narrativeStyle: 'third-person',
      theme: ''
    }
  });

  const genres = [
    '스릴러', '드라마', '미스터리', '복수', '성장', '사회고발', '액션', '멜로', '코미디', '판타지'
  ];

  const backgrounds = [
    '병원 응급실', '법정', '방송국', '온라인 게임', '펜션', '유치원', '아파트 단지', 
    '대학교', '회사', '카페', '헬스장', '미용실', '택시', '지하철', '공항'
  ];

  const jobs = [
    '전직 특수부대', '해커', '프로파일러', '의료진', '변호사', '기자', '교사', 
    '요리사', '운전기사', '청소부', '경비원', '간병인', '트레이너', '상담사'
  ];

  const issues = [
    '학교폭력', '직장갑질', '노인학대', '부동산 사기', '의료사고', '가족 갈등',
    '온라인 사기', '왕따', '불법 촬영', '스토킹', '데이트 폭력', '보이스피싱'
  ];

  const timeStructures = [
    { value: 'linear', label: '순차적 (시간 순서대로)' },
    { value: 'flashback', label: '회상 구조 (현재→과거→현재)' },
    { value: 'parallel', label: '평행 구조 (여러 시점 동시 진행)' },
    { value: 'circular', label: '순환 구조 (끝이 시작으로 연결)' },
    { value: 'puzzle', label: '퍼즐 구조 (조각조각 맞춰가는)' }
  ];

  const narrativeStyles = [
    { value: 'third-person', label: '3인칭 관찰자 (영화적 서술)' },
    { value: 'first-person', label: '1인칭 주인공 시점' },
    { value: 'multiple-pov', label: '다중 시점 (여러 인물 관점)' },
    { value: 'documentary', label: '다큐멘터리 스타일' }
  ];

  const themes = [
    '복수와 용서', '정체성과 자아찾기', '가족의 비밀', '사회적 불의', '트라우마 극복',
    '진실과 거짓', '권력과 부패', '사랑과 배신', '꿈과 현실', '과거와 현재'
  ];
  // Claude API 호출 함수
  const callClaudeAPI = async (prompt) => {
    try {
      setError('');
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }
      
      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error("Claude API 호출 오류:", error);
      setError(`API 호출 중 오류가 발생했습니다: ${error.message}`);
      throw error;
    }
  };

  // 모드 선택 함수
  const selectMode = (selectedMode) => {
    setMode(selectedMode);
    setCurrentStep(1);
    setStoryData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        genre: '',
        background: '',
        job: '',
        issue: '',
        timeStructure: 'linear',
        narrativeStyle: 'third-person',
        theme: ''
      }
    }));
  };

  // 간단 모드 - 1단계: 스토리 컨셉 생성 (랜덤)
  const generateSimpleConcept = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
      const randomIssue = issues[Math.floor(Math.random() * issues.length)];

      const prompt = `창의적이고 독창적인 롱폼 유튜브 스토리 컨셉을 만들어줘.

**조건**:
- 분량: ${storyData.settings.duration}분 분량 (${Math.floor(storyData.settings.duration * 150)}-${Math.floor(storyData.settings.duration * 200)}자)
- 장르: ${randomGenre}
- 배경: ${randomBackground}
- 주인공 직업: ${randomJob}
- 사회적 이슈: ${randomIssue}
- 반전 요소: ${storyData.settings.reversals}개 이상의 충격적 반전 포인트
- 캐릭터 수: ${storyData.settings.characters}명

**혁신적 아이디어 요소**:
- 주인공의 숨겨진 정체성과 특별한 능력
- 독특한 배경을 활용한 상황 설정
- 현실적 사회 문제를 자연스럽게 녹인 스토리
- 심리적 깊이가 있는 캐릭터 관계

**캐릭터 설정**:
- 주인공: 평범해 보이지만 숨겨진 특별한 능력/과거
- 조연 ${storyData.settings.characters - 1}명: 각자 주인공과 복잡한 인연
- 악역: 단순한 악이 아닌 나름의 사연이 있는 인물
- 모든 인물이 현재 모습과 다른 과거의 정체성 보유

**스토리 구조**:
현재 상황 → 과거 1단계 공개 → 갈등 심화 → 과거 2단계 공개 → 진실 폭로 → 카타르시스

위 조건으로 완전히 새로운 스토리 컨셉을 간단명료하게 제시해줘.`;

      const result = await callClaudeAPI(prompt);
      setStoryData(prev => ({ 
        ...prev, 
        concept: result, 
        settings: { 
          ...prev.settings, 
          genre: randomGenre,
          background: randomBackground,
          job: randomJob,
          issue: randomIssue
        } 
      }));
      setCurrentStep(2);
    } catch (error) {
      console.error('스토리 생성 오류:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  // 고급 모드 - 1단계: 커스텀 스토리 컨셉 생성
  const generateAdvancedConcept = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const prompt = `창의적이고 독창적인 롱폼 유튜브 스토리 컨셉을 만들어줘.

**조건**:
- 분량: ${storyData.settings.duration}분 분량 (${Math.floor(storyData.settings.duration * 150)}-${Math.floor(storyData.settings.duration * 200)}자)
- 장르: ${storyData.settings.genre}
- 배경: ${storyData.settings.background}
- 주인공 직업: ${storyData.settings.job}
- 사회적 이슈: ${storyData.settings.issue}
- 시간 구조: ${timeStructures.find(t => t.value === storyData.settings.timeStructure)?.label}
- 서술 방식: ${narrativeStyles.find(n => n.value === storyData.settings.narrativeStyle)?.label}
- 핵심 테마: ${storyData.settings.theme}
- 반전 요소: ${storyData.settings.reversals}개 이상의 충격적 반전 포인트
- 캐릭터 수: ${storyData.settings.characters}명

**혁신적 아이디어 요소**:
- 선택된 시간 구조를 활용한 독창적 스토리텔링
- 서술 방식의 특성을 살린 몰입감 극대화
- 핵심 테마를 자연스럽게 녹인 깊이 있는 메시지
- 특수 직업군과 배경의 전문성을 활용한 리얼리티

**캐릭터 설정**:
- 주인공: ${storyData.settings.job} 출신으로 ${storyData.settings.theme}와 관련된 내적 갈등
- 조연들: 각자 다른 시각에서 ${storyData.settings.issue} 문제에 연관
- 악역: ${storyData.settings.theme}의 반대편에 서있지만 나름의 철학이 있는 인물
- 모든 인물이 ${storyData.settings.timeStructure} 구조 안에서 자연스럽게 연결

**스토리 구조** (${storyData.settings.timeStructure} 방식):
${storyData.settings.timeStructure === 'linear' ? '현재 상황 → 점진적 갈등 심화 → 반전들의 연속 → 클라이맥스 → 해결' :
  storyData.settings.timeStructure === 'flashback' ? '현재 위기 → 과거 회상 시작 → 진실 조각들 → 현재로 복귀 → 최종 대결' :
  storyData.settings.timeStructure === 'parallel' ? '여러 시점 동시 진행 → 점차 수렴 → 모든 관점이 만나는 순간 → 통합된 진실' :
  storyData.settings.timeStructure === 'circular' ? '미스터리한 엔딩 → 스토리 전개 → 처음 장면의 진실 → 새로운 의미로 재해석' :
  '혼란스러운 조각들 → 서서히 맞춰지는 퍼즐 → 전체 그림 완성 → 마지막 조각의 충격'}

위 조건으로 정교하고 복합적인 스토리 컨셉을 제시해줘.`;

      const result = await callClaudeAPI(prompt);
      setStoryData(prev => ({ ...prev, concept: result }));
      setCurrentStep(2);
    } catch (error) {
      console.error('스토리 생성 오류:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2단계: 플롯 구성
  const generatePlot = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const prompt = `앞서 제시된 스토리 컨셉을 바탕으로 세부 플롯을 구성해줘:

${storyData.concept}

**구조**:
- 총 ${Math.ceil(storyData.settings.duration / 5)}-${Math.ceil(storyData.settings.duration / 4)}개 챕터로 구성
- 각 챕터는 4-6분 분량 (4000-6000자)
- 매 2-3챕터마다 반전 포인트 배치
- ${mode === 'advanced' ? `${timeStructures.find(t => t.value === storyData.settings.timeStructure)?.label} 방식 적용` : '시간축이 복합적으로 얽힌 구조'}

**챕터별 요구사항**:
1. **오프닝 챕터**: 강력한 훅 + 인물 소개 + 사건 발단
2. **전개 챕터**: 갈등 심화 + 과거 이야기 삽입
3. **반전 챕터**: 충격적 사실 공개 + 관계 재정립
4. **클라이맥스 챕터**: 모든 진실 공개 + 최대 갈등
5. **결말 챕터**: 해결과 카타르시스 + 여운

**각 챕터마다 포함할 요소**:
- 시작: 이전 챕터와의 자연스러운 연결
- 중간: 새로운 정보나 반전 제시
- 끝: 다음 챕터에 대한 궁금증 유발

**타임라인 설정**:
- 현재 시점: [구체적 날짜와 시간]
- 과거 시점들: 여러 시기로 나누어 배치
- 시간 이동 시 명확한 구분점 표시

각 챕터의 제목, 주요 내용, 반전 포인트를 상세히 정리해서 제시해줘.`;

      const result = await callClaudeAPI(prompt);
      setStoryData(prev => ({ ...prev, plot: result }));
      setCurrentStep(3);
    } catch (error) {
      console.error('플롯 생성 오류:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  // 3단계: 샘플 챕터 생성
  const generateSampleChapter = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const prompt = `다음 플롯을 바탕으로 첫 번째 챕터를 작성해줘:

${storyData.plot}

**작성 조건**:
- 분량: 4000-6000자 정확히 맞춤
- 강력한 오프닝으로 시작 (첫 30초에 시청자 사로잡기)
- ${mode === 'advanced' ? `${narrativeStyles.find(n => n.value === storyData.settings.narrativeStyle)?.label} 방식으로 서술` : '영화적 장면 묘사'}
- 인물별 차별화된 대화체
- 다음 챕터에 대한 강력한 호기심 유발

**서술 스타일**:
${mode === 'advanced' ? 
  storyData.settings.narrativeStyle === 'first-person' ? '- 1인칭 주인공 시점으로 생생한 내적 독백\n- 주인공의 감정과 생각을 직접적으로 표현\n- 독자와의 친밀감을 형성하는 개인적인 톤' :
  storyData.settings.narrativeStyle === 'multiple-pov' ? '- 여러 인물의 관점을 교차하며 서술\n- 각 인물별로 구분되는 독특한 시각과 목소리\n- 상황을 다각도로 보여주는 입체적 구성' :
  storyData.settings.narrativeStyle === 'documentary' ? '- 다큐멘터리 스타일의 객관적 서술\n- 인터뷰, 자료, 증언 형태의 구성\n- 사실적이고 현실감 있는 접근' :
  '- 3인칭 관찰자 시점으로 영화적 묘사\n- 시각적이고 구체적인 장면 연출\n- 카메라 워크처럼 동적인 시점 변화'
: '- 3인칭 관찰자 시점으로 영화적 묘사\n- 시각적이고 구체적인 장면 연출\n- 카메라 워크처럼 동적인 시점 변화'}
- 감정과 심리 상태의 섬세한 표현
- 시간/장소 변경 시 명확한 구분
- ${mode === 'advanced' ? storyData.settings.theme : '자연스러운 갈등'} 요소가 은근히 드러나도록

**필수 포함 요소**:
- 첫 번째 챕터의 핵심 사건
- 주요 캐릭터들의 매력적인 첫 등장
- 앞으로의 갈등을 암시하는 복선
- 시청자가 절대 끌 수 없는 클리프행어

**주의사항**:
- 설정과 일관성 유지
- 각 인물의 성격이 대화와 행동으로 자연스럽게 드러나도록
- 지나친 설명보다는 보여주기 방식 사용

첫 번째 챕터를 완성도 높게 작성해줘.`;

      const result = await callClaudeAPI(prompt);
      setStoryData(prev => ({ 
        ...prev, 
        chapters: [{ id: 1, title: '1. 시작', content: result }] 
      }));
      setCurrentStep(4);
    } catch (error) {
      console.error('챕터 생성 오류:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 결과 다운로드
  const downloadResult = () => {
    const modeInfo = mode === 'advanced' ? 
      `- 시간 구조: ${timeStructures.find(t => t.value === storyData.settings.timeStructure)?.label}
- 서술 방식: ${narrativeStyles.find(n => n.value === storyData.settings.narrativeStyle)?.label}
- 핵심 테마: ${storyData.settings.theme}
- 배경: ${storyData.settings.background}
- 주인공 직업: ${storyData.settings.job}
- 사회적 이슈: ${storyData.settings.issue}` :
      `- 배경: ${storyData.settings.background}
- 주인공 직업: ${storyData.settings.job}
- 사회적 이슈: ${storyData.settings.issue}`;

    const content = `# 롱폼 스토리 대본

## 생성 모드: ${mode === 'simple' ? '간단 모드 (랜덤 조합)' : '고급 모드 (커스텀 설정)'}

## 설정
- 장르: ${storyData.settings.genre}
- 분량: ${storyData.settings.duration}분
- 캐릭터 수: ${storyData.settings.characters}명
- 반전 포인트: ${storyData.settings.reversals}개
${modeInfo}

## 스토리 컨셉
${storyData.concept}

## 플롯 구성
${storyData.plot}

## 샘플 챕터
${storyData.chapters.map(chapter => 
  `### ${chapter.title}\n${chapter.content}`
).join('\n\n')}

---

## 다음 단계 프롬프트

### 추가 챕터 생성용 프롬프트:
\`\`\`
[이전에 구성한 플롯을 바탕으로]

**현재 작성 요청**: [N]번째 챕터 (전체 [총 챕터 수] 중)
**이전 챕터 요약**: [간단한 이전 내용 요약]
**현재 챕터 목표**: [이번 챕터에서 달성해야 할 스토리 목표]

**작성 조건**:
- 분량: 4000-6000자 정확히 맞춤
- 시작: 이전 챕터의 자연스러운 연결
- 끝: 다음 챕터로의 매끄러운 전환 또는 클리프행어

**서술 스타일**:
${mode === 'advanced' ? `- ${narrativeStyles.find(n => n.value === storyData.settings.narrativeStyle)?.label} 방식` : '- 영화적 장면 묘사 (카메라 워크처럼 시각적 서술)'}
- 인물별 차별화된 대화체
- 감정과 심리 상태의 섬세한 표현
- 시간/장소 변경 시 명확한 구분

**필수 포함 요소**:
- 이번 챕터의 반전/중요 정보 공개
- 캐릭터 간 긴장감 있는 상호작용
- 시청자 몰입도를 높이는 디테일
- 다음 내용에 대한 호기심 유발

**주의사항**:
- 이전 챕터와 모순되지 않게 일관성 유지
- 각 인물의 성격과 말투 일관성 유지
- 시간축 혼동 방지를 위한 명확한 시점 표시

위 조건으로 [N]번째 챕터를 작성해줘.
\`\`\`

### 일관성 체크 프롬프트:
\`\`\`
작성된 여러 챕터들의 연결성과 일관성을 확인하고 필요시 수정해줘.

**확인 항목**:
1. **시간축 일관성**: 과거-현재 시점 이동이 자연스러운가?
2. **캐릭터 일관성**: 인물의 성격, 말투, 행동 패턴이 일관된가?
3. **플롯 연결성**: 각 챕터가 자연스럽게 연결되는가?
4. **정보 공개 타이밍**: 반전과 정보 공개가 적절한 순서인가?
5. **감정의 흐름**: 긴장감과 이완, 감동의 리듬이 적절한가?

불일치하거나 개선이 필요한 부분을 찾아 수정안을 제시해줘.
\`\`\`
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `longform_story_${mode}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 새 스토리 시작
  const resetStory = () => {
    setCurrentStep(0);
    setError('');
    setMode('');
    setStoryData({
      concept: '',
      plot: '',
      chapters: [],
      settings: {
        genre: '',
        duration: 60,
        characters: 4,
        reversals: 5,
        background: '',
        job: '',
        issue: '',
        timeStructure: 'linear',
        narrativeStyle: 'third-person',
        theme: ''
      }
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <BookOpen className="text-yellow-400" />
            롱폼 스토리 생성기
          </h1>
          <p className="text-gray-300 text-lg">AI가 만드는 1시간 분량 몰입형 유튜브 스토리</p>
          <div className="mt-4 text-sm text-gray-400">
            {currentStep === 0 ? '모드 선택 • 간단 vs 고급' : 
             mode === 'simple' ? '간단 모드 • 랜덤 조합 • 빠른 생성' : 
             '고급 모드 • 커스텀 설정 • 정교한 구조'}
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* 진행 단계 */}
        {currentStep > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[
                { step: 1, label: '설정' },
                { step: 2, label: '컨셉' },
                { step: 3, label: '플롯' },
                { step: 4, label: '완성' }
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-yellow-400 text-black shadow-lg transform scale-110' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    <span>{step}</span>
                    <span className="text-[10px] mt-0.5">{label}</span>
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                      currentStep > step ? 'bg-yellow-400' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 모드 선택 화면 */}
        {currentStep === 0 && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 간단 모드 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-transparent hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                 onClick={() => selectMode('simple')}>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shuffle className="text-green-400" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">간단 모드</h2>
                <p className="text-gray-300 mb-6">
                  AI가 랜덤으로 조합하여<br />
                  빠르게 스토리 생성
                </p>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    ✨ <span>25,200가지 자동 조합</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    ⚡ <span>3단계로 빠른 생성</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    🎯 <span>초보자 친화적</span>
                  </div>
                </div>

                <button className="mt-6 bg-green-400 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                  <Shuffle size={20} />
                  간단 모드 선택
                </button>
              </div>
            </div>

            {/* 고급 모드 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-transparent hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                 onClick={() => selectMode('advanced')}>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sliders className="text-purple-400" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">고급 모드</h2>
                <p className="text-gray-300 mb-6">
                  모든 요소를 직접 설정하여<br />
                  정교한 스토리 구조 설계
                </p>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    🎛️ <span>세부 설정 커스터마이징</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    🏗️ <span>복잡한 시간 구조</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    🎨 <span>다양한 서술 방식</span>
                  </div>
                </div>

                <button className="mt-6 bg-purple-400 hover:bg-purple-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                  <Sliders size={20} />
                  고급 모드 선택
                </button>
              </div>
            </div>
          </div>
        )}
        {/* 설정 패널 (1단계) */}
        {currentStep === 1 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="text-yellow-400" />
                {mode === 'simple' ? '간단 설정' : '고급 설정'}
              </h2>
              <button
                onClick={resetStory}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                모드 변경
              </button>
            </div>

            {/* 기본 설정 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-white text-sm mb-2">분량 (분)</label>
                <input
                  type="number"
                  min="30"
                  max="120"
                  value={storyData.settings.duration}
                  onChange={(e) => setStoryData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, duration: parseInt(e.target.value) || 60 }
                  }))}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">30-120분 권장</p>
              </div>
              <div>
                <label className="block text-white text-sm mb-2">캐릭터 수</label>
                <input
                  type="number"
                  min="3"
                  max="6"
                  value={storyData.settings.characters}
                  onChange={(e) => setStoryData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, characters: parseInt(e.target.value) || 4 }
                  }))}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">3-6명 권장</p>
              </div>
              <div>
                <label className="block text-white text-sm mb-2">반전 포인트</label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={storyData.settings.reversals}
                  onChange={(e) => setStoryData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, reversals: parseInt(e.target.value) || 5 }
                  }))}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">3-10개 권장</p>
              </div>
              <div className="flex items-end">
                <button
                  onClick={mode === 'simple' ? generateSimpleConcept : generateAdvancedConcept}
                  disabled={isGenerating || (mode === 'advanced' && (!storyData.settings.genre || !storyData.settings.background || !storyData.settings.job || !storyData.settings.issue || !storyData.settings.theme))}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <Zap />
                      {mode === 'simple' ? '랜덤 생성' : '커스텀 생성'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 고급 모드 추가 설정 */}
            {mode === 'advanced' && (
              <>
                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">세부 설정</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white text-sm mb-2">장르</label>
                        <select
                          value={storyData.settings.genre}
                          onChange={(e) => setStoryData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, genre: e.target.value }
                          }))}
                          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        >
                          <option value="">장르 선택</option>
                          {genres.map(genre => (
                            <option key={genre} value={genre} className="bg-gray-800">{genre}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white text-sm mb-2">배경</label>
                        <select
                          value={storyData.settings.background}
                          onChange={(e) => setStoryData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, background: e.target.value }
                          }))}
                          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        >
                          <option value="">배경 선택</option>
                          {backgrounds.map(bg => (
                            <option key={bg} value={bg} className="bg-gray-800">{bg}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white text-sm mb-2">주인공 직업</label>
                        <select
                          value={storyData.settings.job}
                          onChange={(e) => setStoryData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, job: e.target.value }
                          }))}
                          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        >
                          <option value="">직업 선택</option>
                          {jobs.map(job => (
                            <option key={job} value={job} className="bg-gray-800">{job}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white text-sm mb-2">사회적 이슈</label>
                        <select
                          value={storyData.settings.issue}
                          onChange={(e) => setStoryData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, issue: e.target.value }
                          }))}
                          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        >
                          <option value="">이슈 선택</option>
                          {issues.map(issue => (
                            <option key={issue} value={issue} className="bg-gray-800">{issue}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white text-sm mb-2">시간 구조</label>
                        <select
                          value={storyData.settings.timeStructure}
                          onChange={(e) => setStoryData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, timeStructure: e.target.value }
                          }))}
                          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        >
                          {timeStructures.map(ts => (
                            <option key={ts.value} value={ts.value} className="bg-gray-800">{ts.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white text-sm mb-2">서술 방식</label>
                        <select
                          value={storyData.settings.narrativeStyle}
                          onChange={(e) => setStoryData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, narrativeStyle: e.target.value }
                          }))}
                          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        >
                          {narrativeStyles.map(ns => (
                            <option key={ns.value} value={ns.value} className="bg-gray-800">{ns.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-white text-sm mb-2">핵심 테마</label>
                    <select
                      value={storyData.settings.theme}
                      onChange={(e) => setStoryData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, theme: e.target.value }
                      }))}
                      className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">테마 선택</option>
                      {themes.map(theme => (
                        <option key={theme} value={theme} className="bg-gray-800">{theme}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            
            {/* 조합 미리보기 */}
            <div className="mt-6 p-4 bg-black/20 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="text-yellow-400 font-semibold">
                  {mode === 'simple' ? '랜덤 조합:' : '커스텀 설정:'}
                </span> 
                {mode === 'simple' ? 
                  ` ${genres.length} 장르 × ${backgrounds.length} 배경 × ${jobs.length} 직업 × ${issues.length} 이슈 = ${(genres.length * backgrounds.length * jobs.length * issues.length).toLocaleString()}가지 가능` :
                  ` ${timeStructures.length} 시간구조 × ${narrativeStyles.length} 서술방식 × ${themes.length} 테마 = 무한 변주 가능`
                }
              </p>
            </div>
          </div>
        )}
                <div>
                  <div className="text-pink-400 font-bold text-lg">
                    {mode === 'simple' ? '랜덤' : '커스텀'}
                  </div>
                  <div className="text-gray-400">생성 모드</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 푸터 */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <div className="border-t border-gray-700 pt-6">
            <p>🤖 AI 기반 롱폼 스토리 생성기 | Claude API 연동</p>
            <p className="mt-2">
              {currentStep === 0 ? '모드를 선택하여 창작을 시작하세요' :
               mode === 'simple' ? '간단 모드: 25,200가지 랜덤 조합으로 빠른 생성' :
               '고급 모드: 복잡한 구조와 정교한 설정으로 전문적인 스토리'}
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                실시간 생성
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                API 분할 처리
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                {mode === 'simple' ? '랜덤 조합' : '커스텀 설정'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                원클릭 다운로드
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;