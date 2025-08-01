import React, { useState } from 'react';
import { Play, Download, FileText, Settings, Zap, BookOpen, Users, Clock, AlertCircle } from 'lucide-react';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [storyData, setStoryData] = useState({
    concept: '',
    plot: '',
    chapters: [],
    settings: {
      genre: '',
      duration: 60,
      characters: 4,
      reversals: 5
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

  // Claude API 호출 함수 (실제 구현)
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

  // 1단계: 스토리 컨셉 생성
  const generateConcept = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
      const randomIssue = issues[Math.floor(Math.random() * issues.length)];

      const prompt = `창의적이고 독창적인 롱폼 유튜브 스토리 컨셉을 만들어줘.

**조건**:
- 분량: ${storyData.settings.duration}분 분량
- 장르: ${randomGenre}
- 배경: ${randomBackground}
- 주인공 직업: ${randomJob}
- 사회적 이슈: ${randomIssue}
- 반전 요소: ${storyData.settings.reversals}개 이상의 충격적 반전 포인트
- 캐릭터 수: ${storyData.settings.characters}명

**혁신적 아이디어 요소**:
- 주인공의 숨겨진 정체성
- 독특한 배경 활용
- 현실적 사회 문제 반영
- 심리적 깊이

**스토리 구조**:
현재 상황 → 과거 1단계 공개 → 갈등 심화 → 과거 2단계 공개 → 진실 폭로 → 카타르시스

위 조건으로 완전히 새로운 스토리 컨셉을 간단명료하게 제시해줘.`;

      const result = await callClaudeAPI(prompt);
      setStoryData(prev => ({ 
        ...prev, 
        concept: result, 
        settings: { ...prev.settings, genre: randomGenre } 
      }));
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
- 총 10-12개 챕터로 구성
- 각 챕터는 5-7분 분량
- 매 2-3챕터마다 반전 포인트 배치

**챕터별 요구사항**:
1. 오프닝: 강력한 훅 + 인물 소개 + 사건 발단
2. 전개: 갈등 심화 + 과거 이야기 삽입
3. 반전: 충격적 사실 공개 + 관계 재정립
4. 클라이맥스: 모든 진실 공개 + 최대 갈등
5. 결말: 해결과 카타르시스 + 여운

각 챕터의 제목과 주요 내용을 간단히 정리해서 제시해줘.`;

      const result = await callClaudeAPI(prompt);
      setStoryData(prev => ({ ...prev, plot: result }));
      setCurrentStep(3);
    } catch (error) {
      console.error('플롯 생성 오류:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 3단계: 챕터 생성 (샘플)
  const generateSampleChapter = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const prompt = `다음 플롯을 바탕으로 첫 번째 챕터를 작성해줘:

${storyData.plot}

**작성 조건**:
- 분량: 3000-4000자
- 강력한 오프닝으로 시작
- 영화적 장면 묘사
- 인물별 차별화된 대화체
- 다음 챕터에 대한 호기심 유발

**서술 스타일**:
- 3인칭 관찰자 시점
- 시각적이고 구체적인 묘사
- 감정과 심리 상태 표현
- 자연스러운 대화

첫 번째 챕터를 작성해줘.`;

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
    const content = `# 롱폼 스토리 대본

## 설정
- 장르: ${storyData.settings.genre}
- 분량: ${storyData.settings.duration}분
- 캐릭터 수: ${storyData.settings.characters}명
- 반전 포인트: ${storyData.settings.reversals}개

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
다음 플롯을 바탕으로 [N]번째 챕터를 작성해줘:

${storyData.plot}

**현재 작성 요청**: [N]번째 챕터
**이전 챕터 요약**: [이전 내용 간단 요약]

**작성 조건**:
- 분량: 4000-6000자
- 이전 챕터와 자연스러운 연결
- 영화적 서술과 생생한 대화
- 해당 챕터의 반전/중요 정보 공개
- 다음 챕터로의 매끄러운 전환

위 조건으로 [N]번째 챕터를 작성해줘.
\`\`\`
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `longform_story_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 새 스토리 시작
  const resetStory = () => {
    setCurrentStep(1);
    setError('');
    setStoryData({
      concept: '',
      plot: '',
      chapters: [],
      settings: {
        genre: '',
        duration: 60,
        characters: 4,
        reversals: 5
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
            매번 다른 스토리 • API 분할 생성 • 원클릭 다운로드
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
        {/* 설정 패널 (1단계에서만 표시) */}
        {currentStep === 1 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 fade-in">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="text-yellow-400" />
              스토리 설정
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  placeholder="60"
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
                  placeholder="4"
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
                  placeholder="5"
                />
                <p className="text-xs text-gray-400 mt-1">3-10개 권장</p>
              </div>
              <div className="flex items-end">
                <button
                  onClick={generateConcept}
                  disabled={isGenerating}
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
                      컨셉 생성
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* 조합 미리보기 */}
            <div className="mt-4 p-4 bg-black/20 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="text-yellow-400 font-semibold">예상 조합:</span> 
                {` ${genres.length} 장르 × ${backgrounds.length} 배경 × ${jobs.length} 직업 × ${issues.length} 이슈 = `}
                <span className="text-green-400 font-bold">
                  {genres.length * backgrounds.length * jobs.length * issues.length:toLocaleString()}
                </span>
                가지 가능
              </p>
            </div>
          </div>
        )}
        {/* 결과 표시 */}
        <div className="space-y-6">
          {/* 스토리 컨셉 */}
          {storyData.concept && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-green-400" />
                  스토리 컨셉
                  {storyData.settings.genre && (
                    <span className="text-sm bg-green-400/20 text-green-300 px-2 py-1 rounded-full">
                      {storyData.settings.genre}
                    </span>
                  )}
                </h2>
                {currentStep === 2 && (
                  <button
                    onClick={generatePlot}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 transform hover:scale-105"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Play />
                        플롯 생성
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-gray-200 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {storyData.concept}
              </div>
            </div>
          )}

          {/* 플롯 구성 */}
          {storyData.plot && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="text-blue-400" />
                  플롯 구성
                  <span className="text-sm bg-blue-400/20 text-blue-300 px-2 py-1 rounded-full">
                    {storyData.settings.duration}분 분량
                  </span>
                </h2>
                {currentStep === 3 && (
                  <button
                    onClick={generateSampleChapter}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 transform hover:scale-105"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Play />
                        샘플 챕터 생성
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-gray-200 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {storyData.plot}
              </div>
            </div>
          )}
              새 스토리 생성
            </button>
            
            {/* 통계 정보 */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-yellow-400 font-bold text-lg">{storyData.settings.duration}분</div>
                  <div className="text-gray-400">예상 분량</div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-lg">{storyData.settings.characters}명</div>
                  <div className="text-gray-400">주요 캐릭터</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold text-lg">{storyData.settings.reversals}개</div>
                  <div className="text-gray-400">반전 포인트</div>
                </div>
                <div>
                  <div className="text-purple-400 font-bold text-lg">
                    {storyData.concept ? (storyData.concept.length + (storyData.plot?.length || 0) + (storyData.chapters[0]?.content?.length || 0)).toLocaleString() : 0}
                  </div>
                  <div className="text-gray-400">총 글자 수</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 푸터 */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <div className="border-t border-gray-700 pt-6">
            <p>🤖 AI 기반 롱폼 스토리 생성기 | Claude API 연동</p>
            <p className="mt-2">매번 새로운 스토리로 무한한 창작 가능성을 경험하세요</p>
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