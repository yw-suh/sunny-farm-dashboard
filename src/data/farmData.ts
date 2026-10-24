export interface SaleRecord {
  id: number;
  date: string;
  channel: '공판장' | '농협' | '직거래' | '온라인 쇼핑몰';
  spec: string;
  boxes: number;
  unitPrice: number;
  revenue: number;
}

export interface PestControlRecord {
  id: number;
  date: string;
  pest: string;
  medicine: string;
  zone: string;
  worker: string;
  harvestSafetyDate: string;
}

export interface ReviewRecord {
  id: number;
  date: string;
  channel: string;
  rating: number;
  category: '장점' | '불만' | '개선 요청' | '기타';
  content: string;
}

export interface WorkRecord {
  id: number;
  date: string;
  task: string;
  zone: string;
  workers: number;
  workHours: number;
}

// 1. 판매기록 (50건)
export const SALES_DATA: SaleRecord[] = [
  { id: 1, date: '2026-06-05', channel: '농협', spec: '천도 5kg', boxes: 180, unitPrice: 25500, revenue: 4590000 },
  { id: 2, date: '2026-06-06', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 30, unitPrice: 37500, revenue: 1125000 },
  { id: 3, date: '2026-06-07', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 19, unitPrice: 36500, revenue: 693500 },
  { id: 4, date: '2026-06-07', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 20, unitPrice: 36500, revenue: 730000 },
  { id: 5, date: '2026-06-07', channel: '농협', spec: '천도 5kg', boxes: 70, unitPrice: 23000, revenue: 1610000 },
  { id: 6, date: '2026-06-08', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 16, unitPrice: 33000, revenue: 528000 },
  { id: 7, date: '2026-06-08', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 23, unitPrice: 36500, revenue: 839500 },
  { id: 8, date: '2026-06-09', channel: '농협', spec: '천도 5kg', boxes: 110, unitPrice: 24000, revenue: 2640000 },
  { id: 9, date: '2026-06-09', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 13, unitPrice: 36000, revenue: 468000 },
  { id: 10, date: '2026-06-10', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 4, unitPrice: 37000, revenue: 148000 },
  { id: 11, date: '2026-06-11', channel: '농협', spec: '천도 5kg', boxes: 90, unitPrice: 25500, revenue: 2295000 },
  { id: 12, date: '2026-06-11', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 20, unitPrice: 35000, revenue: 700000 },
  { id: 13, date: '2026-06-12', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 13, unitPrice: 35500, revenue: 461500 },
  { id: 14, date: '2026-06-13', channel: '직거래', spec: '천도 5kg', boxes: 15, unitPrice: 34000, revenue: 510000 },
  { id: 15, date: '2026-06-13', channel: '직거래', spec: '천도 5kg', boxes: 6, unitPrice: 33000, revenue: 198000 },
  { id: 16, date: '2026-06-13', channel: '직거래', spec: '천도 5kg', boxes: 18, unitPrice: 33000, revenue: 594000 },
  { id: 17, date: '2026-06-14', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 20, unitPrice: 36500, revenue: 730000 },
  { id: 18, date: '2026-06-14', channel: '직거래', spec: '천도 5kg', boxes: 3, unitPrice: 31500, revenue: 94500 },
  { id: 19, date: '2026-06-15', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 24, unitPrice: 37000, revenue: 888000 },
  { id: 20, date: '2026-06-15', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 5, unitPrice: 37500, revenue: 187500 },
  { id: 21, date: '2026-06-16', channel: '직거래', spec: '천도 5kg', boxes: 18, unitPrice: 31500, revenue: 567000 },
  { id: 22, date: '2026-06-16', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 5, unitPrice: 38000, revenue: 190000 },
  { id: 23, date: '2026-06-16', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 23, unitPrice: 36500, revenue: 839500 },
  { id: 24, date: '2026-06-17', channel: '직거래', spec: '천도 5kg', boxes: 12, unitPrice: 34000, revenue: 408000 },
  { id: 25, date: '2026-06-17', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 18, unitPrice: 36500, revenue: 657000 },
  { id: 26, date: '2026-06-18', channel: '직거래', spec: '천도 5kg', boxes: 12, unitPrice: 32000, revenue: 384000 },
  { id: 27, date: '2026-06-18', channel: '공판장', spec: '천도 5kg', boxes: 180, unitPrice: 23500, revenue: 4230000 },
  { id: 28, date: '2026-06-18', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 16, unitPrice: 37000, revenue: 592000 },
  { id: 29, date: '2026-06-19', channel: '농협', spec: '천도 5kg', boxes: 100, unitPrice: 24000, revenue: 2400000 },
  { id: 30, date: '2026-06-19', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 16, unitPrice: 37000, revenue: 592000 },
  { id: 31, date: '2026-06-19', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 17, unitPrice: 36000, revenue: 612000 },
  { id: 32, date: '2026-06-20', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 12, unitPrice: 36500, revenue: 438000 },
  { id: 33, date: '2026-06-21', channel: '직거래', spec: '천도 5kg', boxes: 19, unitPrice: 32000, revenue: 608000 },
  { id: 34, date: '2026-06-22', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 7, unitPrice: 34000, revenue: 238000 },
  { id: 35, date: '2026-06-22', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 17, unitPrice: 31500, revenue: 535500 },
  { id: 36, date: '2026-06-22', channel: '직거래', spec: '천도 5kg', boxes: 18, unitPrice: 30500, revenue: 549000 },
  { id: 37, date: '2026-06-23', channel: '공판장', spec: '천도 5kg', boxes: 310, unitPrice: 20000, revenue: 6200000 },
  { id: 38, date: '2026-06-24', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 4, unitPrice: 31000, revenue: 124000 },
  { id: 39, date: '2026-06-24', channel: '직거래', spec: '천도 5kg', boxes: 20, unitPrice: 28500, revenue: 570000 },
  { id: 40, date: '2026-06-24', channel: '직거래', spec: '천도 5kg', boxes: 9, unitPrice: 29500, revenue: 265500 },
  { id: 41, date: '2026-06-25', channel: '직거래', spec: '천도 5kg', boxes: 20, unitPrice: 30000, revenue: 600000 },
  { id: 42, date: '2026-06-26', channel: '공판장', spec: '천도 5kg', boxes: 260, unitPrice: 22000, revenue: 5720000 },
  { id: 43, date: '2026-06-26', channel: '직거래', spec: '천도 5kg', boxes: 18, unitPrice: 29000, revenue: 522000 },
  { id: 44, date: '2026-06-27', channel: '직거래', spec: '천도 5kg', boxes: 7, unitPrice: 32000, revenue: 224000 },
  { id: 45, date: '2026-06-27', channel: '농협', spec: '천도 5kg', boxes: 160, unitPrice: 24000, revenue: 3840000 },
  { id: 46, date: '2026-06-28', channel: '온라인 쇼핑몰', spec: '천도 5kg', boxes: 27, unitPrice: 35500, revenue: 958500 },
  { id: 47, date: '2026-06-28', channel: '농협', spec: '천도 5kg', boxes: 160, unitPrice: 23000, revenue: 3680000 },
  { id: 48, date: '2026-06-29', channel: '직거래', spec: '천도 5kg', boxes: 9, unitPrice: 31000, revenue: 279000 },
  { id: 49, date: '2026-06-29', channel: '공판장', spec: '천도 5kg', boxes: 150, unitPrice: 21000, revenue: 3150000 },
  { id: 50, date: '2026-06-30', channel: '공판장', spec: '천도 5kg', boxes: 280, unitPrice: 22000, revenue: 6160000 },
];

// 2. 방제일지 (15건)
export const PEST_CONTROL_DATA: PestControlRecord[] = [
  { id: 1, date: '2026-03-12', pest: '세균성구멍병', medicine: '(가상) 약제A', zone: '1구역', worker: '작업자A', harvestSafetyDate: '2026-05-30' },
  { id: 2, date: '2026-03-13', pest: '세균성구멍병', medicine: '(가상) 약제A', zone: '2구역', worker: '작업자A', harvestSafetyDate: '2026-05-30' },
  { id: 3, date: '2026-03-14', pest: '세균성구멍병', medicine: '(가상) 약제A', zone: '3구역', worker: '작업자B', harvestSafetyDate: '2026-05-30' },
  { id: 4, date: '2026-04-08', pest: '진딧물', medicine: '(가상) 약제B', zone: '1구역', worker: '작업자B', harvestSafetyDate: '2026-05-28' },
  { id: 5, date: '2026-04-09', pest: '진딧물', medicine: '(가상) 약제B', zone: '2구역', worker: '작업자B', harvestSafetyDate: '2026-05-28' },
  { id: 6, date: '2026-04-22', pest: '세균성구멍병', medicine: '(가상) 약제C', zone: '3구역', worker: '작업자C', harvestSafetyDate: '2026-05-25' },
  { id: 7, date: '2026-05-06', pest: '잿빛무늬병', medicine: '(가상) 약제D', zone: '1구역', worker: '작업자A', harvestSafetyDate: '2026-06-01' },
  { id: 8, date: '2026-05-07', pest: '잿빛무늬병', medicine: '(가상) 약제D', zone: '2구역', worker: '작업자A', harvestSafetyDate: '2026-06-01' },
  { id: 9, date: '2026-05-13', pest: '복숭아순나방', medicine: '(가상) 약제E', zone: '1구역', worker: '작업자C', harvestSafetyDate: '2026-06-03' },
  { id: 10, date: '2026-05-14', pest: '복숭아순나방', medicine: '(가상) 약제E', zone: '2구역', worker: '작업자C', harvestSafetyDate: '2026-06-03' },
  { id: 11, date: '2026-05-15', pest: '복숭아순나방', medicine: '(가상) 약제E', zone: '3구역', worker: '작업자D', harvestSafetyDate: '2026-06-03' },
  { id: 12, date: '2026-05-27', pest: '잿빛무늬병', medicine: '(가상) 약제F', zone: '2구역', worker: '작업자B', harvestSafetyDate: '2026-06-05' },
  { id: 13, date: '2026-05-28', pest: '진딧물', medicine: '(가상) 약제B', zone: '3구역', worker: '작업자D', harvestSafetyDate: '2026-06-05' },
  { id: 14, date: '2026-06-02', pest: '복숭아순나방', medicine: '(가상) 약제G', zone: '1구역', worker: '작업자A', harvestSafetyDate: '2026-06-08' },
  { id: 15, date: '2026-06-03', pest: '복숭아순나방', medicine: '(가상) 약제G', zone: '2구역', worker: '작업자A', harvestSafetyDate: '2026-06-08' },
];

// 3. 후기 (20건)
export const REVIEW_DATA: ReviewRecord[] = [
  { id: 1, date: '2026-06-08', channel: '온라인 쇼핑몰', rating: 5, category: '장점', content: '(가상) 달고 아삭해서 가족이 좋아했어요.' },
  { id: 2, date: '2026-06-10', channel: '온라인 쇼핑몰', rating: 5, category: '장점', content: '(가상) 크기가 알맞고 맛이 좋아요.' },
  { id: 3, date: '2026-06-11', channel: '직거래', rating: 5, category: '장점', content: '(가상) 직접 받아 보니 신선해요.' },
  { id: 4, date: '2026-06-13', channel: '온라인 쇼핑몰', rating: 3, category: '불만', content: '(가상) 박스 안에서 몇 개가 눌려 있었어요.' },
  { id: 5, date: '2026-06-14', channel: '온라인 쇼핑몰', rating: 4, category: '장점', content: '(가상) 포장이 깔끔하고 향이 좋아요.' },
  { id: 6, date: '2026-06-16', channel: '온라인 쇼핑몰', rating: 3, category: '불만', content: '(가상) 크기가 고르지 않았어요.' },
  { id: 7, date: '2026-06-17', channel: '직거래', rating: 5, category: '장점', content: '(가상) 선물용으로 보냈는데 반응이 좋았어요.' },
  { id: 8, date: '2026-06-18', channel: '온라인 쇼핑몰', rating: 4, category: '개선 요청', content: '(가상) 소포장 옵션이 있으면 좋겠어요.' },
  { id: 9, date: '2026-06-19', channel: '온라인 쇼핑몰', rating: 2, category: '불만', content: '(가상) 도착이 예정보다 늦었어요.' },
  { id: 10, date: '2026-06-22', channel: '직거래', rating: 4, category: '장점', content: '(가상) 단단해서 며칠 두고 먹기 좋아요.' },
  { id: 11, date: '2026-06-23', channel: '온라인 쇼핑몰', rating: 5, category: '장점', content: '(가상) 재구매할게요.' },
  { id: 12, date: '2026-06-24', channel: '온라인 쇼핑몰', rating: 4, category: '장점', content: '(가상) 껍질이 얇고 먹기 편해요.' },
  { id: 13, date: '2026-06-26', channel: '온라인 쇼핑몰', rating: 3, category: '개선 요청', content: '(가상) 안내문에 보관 방법이 있으면 좋겠어요.' },
  { id: 14, date: '2026-06-28', channel: '직거래', rating: 5, category: '장점', content: '(가상) 매년 이곳에서 사요.' },
  { id: 15, date: '2026-06-29', channel: '온라인 쇼핑몰', rating: 3, category: '불만', content: '(가상) 몇 개는 덜 익은 느낌이었어요.' },
  { id: 16, date: '2026-06-30', channel: '온라인 쇼핑몰', rating: 5, category: '장점', content: '(가상) 아이들이 잘 먹었어요.' },
  { id: 17, date: '2026-07-01', channel: '직거래', rating: 4, category: '기타', content: '(가상) 포장 상자 디자인이 마음에 들어요.' },
  { id: 18, date: '2026-07-02', channel: '온라인 쇼핑몰', rating: 4, category: '장점', content: '(가상) 가격 대비 만족해요.' },
  { id: 19, date: '2026-07-05', channel: '온라인 쇼핑몰', rating: 2, category: '불만', content: '(가상) 박스가 찌그러져서 왔어요.' },
  { id: 20, date: '2026-07-06', channel: '온라인 쇼핑몰', rating: 5, category: '장점', content: '(가상) 당도가 높아서 좋았어요.' },
];

// 4. 작업기록 (43건)
export const WORK_DATA: WorkRecord[] = [
  { id: 1, date: '2026-01-20', task: '전정', zone: '1구역', workers: 3, workHours: 7 },
  { id: 2, date: '2026-01-21', task: '전정', zone: '1구역', workers: 3, workHours: 7 },
  { id: 3, date: '2026-01-27', task: '전정', zone: '2구역', workers: 3, workHours: 7 },
  { id: 4, date: '2026-01-28', task: '전정', zone: '2구역', workers: 3, workHours: 7 },
  { id: 5, date: '2026-02-03', task: '전정', zone: '3구역', workers: 3, workHours: 7 },
  { id: 6, date: '2026-02-04', task: '전정', zone: '3구역', workers: 3, workHours: 7 },
  { id: 7, date: '2026-03-12', task: '방제', zone: '1구역', workers: 2, workHours: 3 },
  { id: 8, date: '2026-03-13', task: '방제', zone: '2구역', workers: 2, workHours: 3 },
  { id: 9, date: '2026-03-14', task: '방제', zone: '3구역', workers: 2, workHours: 3 },
  { id: 10, date: '2026-04-08', task: '방제', zone: '1구역', workers: 2, workHours: 3 },
  { id: 11, date: '2026-04-09', task: '방제', zone: '2구역', workers: 2, workHours: 3 },
  { id: 12, date: '2026-04-22', task: '방제', zone: '3구역', workers: 2, workHours: 3 },
  { id: 13, date: '2026-04-27', task: '적과', zone: '1구역', workers: 4, workHours: 7 },
  { id: 14, date: '2026-04-28', task: '적과', zone: '1구역', workers: 4, workHours: 7 },
  { id: 15, date: '2026-04-29', task: '적과', zone: '2구역', workers: 4, workHours: 7 },
  { id: 16, date: '2026-04-30', task: '적과', zone: '2구역', workers: 4, workHours: 7 },
  { id: 17, date: '2026-05-04', task: '적과', zone: '3구역', workers: 4, workHours: 7 },
  { id: 18, date: '2026-05-05', task: '적과', zone: '3구역', workers: 4, workHours: 7 },
  { id: 19, date: '2026-05-06', task: '방제', zone: '1구역', workers: 2, workHours: 3 },
  { id: 20, date: '2026-05-07', task: '방제', zone: '2구역', workers: 2, workHours: 3 },
  { id: 21, date: '2026-05-13', task: '방제', zone: '1구역', workers: 2, workHours: 3 },
  { id: 22, date: '2026-05-14', task: '방제', zone: '2구역', workers: 2, workHours: 3 },
  { id: 23, date: '2026-05-15', task: '방제', zone: '3구역', workers: 2, workHours: 3 },
  { id: 24, date: '2026-05-18', task: '봉지씌우기', zone: '1구역', workers: 4, workHours: 8 },
  { id: 25, date: '2026-05-19', task: '봉지씌우기', zone: '1구역', workers: 4, workHours: 8 },
  { id: 26, date: '2026-05-20', task: '봉지씌우기', zone: '2구역', workers: 4, workHours: 8 },
  { id: 27, date: '2026-05-21', task: '봉지씌우기', zone: '2구역', workers: 4, workHours: 8 },
  { id: 28, date: '2026-05-22', task: '봉지씌우기', zone: '3구역', workers: 4, workHours: 8 },
  { id: 29, date: '2026-05-25', task: '봉지씌우기', zone: '3구역', workers: 4, workHours: 8 },
  { id: 30, date: '2026-05-27', task: '방제', zone: '2구역', workers: 2, workHours: 3 },
  { id: 31, date: '2026-05-28', task: '방제', zone: '3구역', workers: 2, workHours: 3 },
  { id: 32, date: '2026-06-02', task: '방제', zone: '1구역', workers: 2, workHours: 3 },
  { id: 33, date: '2026-06-03', task: '방제', zone: '2구역', workers: 2, workHours: 3 },
  { id: 34, date: '2026-06-05', task: '수확', zone: '1구역', workers: 4, workHours: 8 },
  { id: 35, date: '2026-06-08', task: '수확', zone: '1구역', workers: 4, workHours: 8 },
  { id: 36, date: '2026-06-10', task: '수확', zone: '1구역', workers: 4, workHours: 8 },
  { id: 37, date: '2026-06-12', task: '수확', zone: '2구역', workers: 4, workHours: 8 },
  { id: 38, date: '2026-06-15', task: '수확', zone: '2구역', workers: 4, workHours: 8 },
  { id: 39, date: '2026-06-17', task: '수확', zone: '2구역', workers: 4, workHours: 8 },
  { id: 40, date: '2026-06-19', task: '수확', zone: '3구역', workers: 4, workHours: 8 },
  { id: 41, date: '2026-06-22', task: '수확', zone: '3구역', workers: 4, workHours: 8 },
  { id: 42, date: '2026-06-24', task: '수확', zone: '3구역', workers: 4, workHours: 8 },
  { id: 43, date: '2026-06-26', task: '수확', zone: '3구역', workers: 4, workHours: 8 },
];

// 채널 목록
export const CHANNELS = ['전체', '공판장', '농협', '직거래', '온라인 쇼핑몰'] as const;
export type ChannelType = (typeof CHANNELS)[number];

// 보조 계산 함수들
export function formatNumber(val: number): string {
  return Math.round(val).toLocaleString('ko-KR');
}

export function formatCurrency(val: number): string {
  return `${formatNumber(val)}원`;
}
