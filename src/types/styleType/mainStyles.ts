export const mainStyles = [
  '캐주얼',
  '스트릿',
  '러블리',
  '클래식',
  '엣지',
  '빈티지',
  '스포티',
  '내추럴',
] as const;

export type MainStyle = (typeof mainStyles)[number];

export const mainStyleToApi: Record<MainStyle, string> = {
  '캐주얼': 'CASUAL',
  '스트릿': 'STREET',
  '러블리': 'LOVELY',
  '클래식': 'CLASSIC',
  '엣지': 'EDGY',
  '빈티지': 'VINTAGE',
  '스포티': 'SPORTY',
  '내추럴': 'NATURAL',
};

export const apiToMainStyle: Record<string, MainStyle> = {
  CASUAL: '캐주얼',
  STREET: '스트릿',
  LOVELY: '러블리',
  CLASSIC: '클래식',
  EDGY: '엣지',
  VINTAGE: '빈티지',
  SPORTY: '스포티',
  NATURAL: '내추럴',
};
