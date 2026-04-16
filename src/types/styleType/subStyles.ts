import type { MainStyle } from './mainStyles';

// UI 표시용 한글 → API enum 값
export const subStyleToApi: Record<string, string> = {
  // 캐주얼
  '미니멀': 'MINIMAL',
  '놈코어': 'NORMCORE',
  '베이직': 'BASIC',
  '데일리룩': 'DAILY_LOOK',
  '심플': 'SIMPLE',
  '클린걸': 'CLEAN_GIRL',
  '오버핏': 'OVERSIZED',
  // 스트릿
  '스트릿웨어': 'STREETWEAR',
  '힙합': 'HIP_HOP',
  '스케이터': 'SKATER',
  'Y2K': 'Y2K',
  '블록코어': 'BLOKECORE',
  '고프코어': 'GORPCORE',
  '테크웨어': 'TECHWEAR',
  // 러블리
  '걸리시': 'GIRLY',
  '로맨틱': 'ROMANTIC',
  '페미닌': 'FEMININE',
  '하이틴': 'HIGH_TEEN',
  '코티지코어': 'COTTAGECORE',
  '발레코어': 'BALLETCORE',
  // 클래식
  '포멀': 'FORMAL',
  '비즈니스 캐주얼': 'BUSINESS_CASUAL',
  '올드머니': 'OLD_MONEY',
  '프레피': 'PREPPY',
  '파워드레싱': 'POWER_DRESSING',
  '블랙타이': 'BLACK_TIE',
  '가르송': 'GARCONNE',
  '캠퍼스룩': 'CAMPUS_LOOK',
  // 엣지
  '아방가르드': 'AVANT_GARDE',
  '아티스틱': 'ARTSY',
  '에클레틱': 'ECLECTIC',
  '맥시멀': 'MAXIMAL',
  '키치': 'KITSCH',
  '다크웨어': 'DARKWEAR',
  '고스': 'GOTH',
  '비주얼계': 'VISUAL_KEI',
  '그런지': 'GRUNGE',
  '펑크': 'PUNK',
  // 빈티지
  '레트로': 'RETRO',
  '90s 스타일': 'NINETIES',
  '2000s 스타일': 'TWOTHOUSANDS',
  '빈티지 스포츠': 'VINTAGE_SPORTS',
  '플래퍼': 'FLAPPER',
  '프레리': 'PRAIRIE',
  '히피': 'HIPPIE',
  '뉴트로': 'NEWTRO',
  // 스포티
  '애슬레저': 'ATHLEISURE',
  '트레이닝룩': 'TRAINING_LOOK',
  '테니스룩': 'TENNIS_LOOK',
  '축구코어': 'FOOTBALL_CORE',
  '서퍼룩': 'SURF_LOOK',
  '아웃도어': 'OUTDOOR',
  // 내추럴
  '보헤미안': 'BOHEMIAN',
  '보헤미안 시크': 'BOHEMIAN_CHIC',
  '리조트': 'RESORT',
  '바캉스룩': 'VACATION_LOOK',
  '컨트리': 'COUNTRY',
  '웨스턴': 'WESTERN',
};

// API enum 값 → UI 표시용 한글
export const apiToSubStyle: Record<string, string> = Object.fromEntries(
  Object.entries(subStyleToApi).map(([k, v]) => [v, k]),
);

// 메인 스타일별 서브스타일 목록 (한글)
export const subStyles: Record<MainStyle, readonly string[]> = {
  '캐주얼': ['미니멀', '놈코어', '베이직', '데일리룩', '심플', '클린걸', '오버핏'],
  '스트릿': ['스트릿웨어', '힙합', '스케이터', 'Y2K', '블록코어', '고프코어', '테크웨어'],
  '러블리': ['걸리시', '로맨틱', '페미닌', '하이틴', '코티지코어', '발레코어'],
  '클래식': ['포멀', '비즈니스 캐주얼', '올드머니', '프레피', '파워드레싱', '블랙타이', '가르송', '캠퍼스룩'],
  '엣지': ['아방가르드', '아티스틱', '에클레틱', '맥시멀', '키치', '다크웨어', '고스', '비주얼계', '그런지', '펑크'],
  '빈티지': ['레트로', '90s 스타일', '2000s 스타일', '빈티지 스포츠', '플래퍼', '프레리', '히피', '뉴트로'],
  '스포티': ['애슬레저', '트레이닝룩', '테니스룩', '축구코어', '서퍼룩', '아웃도어'],
  '내추럴': ['보헤미안', '보헤미안 시크', '리조트', '바캉스룩', '컨트리', '웨스턴'],
};
