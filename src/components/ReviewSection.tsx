import React, { useState, useMemo } from 'react';
import { MessageSquareHeart, Star, AlertCircle, ThumbsUp, HelpCircle, Filter } from 'lucide-react';
import { REVIEW_DATA, ReviewRecord } from '../data/farmData';

// 구분별 스타일 및 색상
const CATEGORY_STYLES: Record<string, { bg: string; text: string; hex: string; border: string }> = {
  '장점': { bg: 'bg-emerald-100', text: 'text-emerald-800', hex: '#10b981', border: 'border-emerald-300' },
  '불만': { bg: 'bg-rose-100', text: 'text-rose-800', hex: '#f43f5e', border: 'border-rose-300' },
  '개선 요청': { bg: 'bg-amber-100', text: 'text-amber-800', hex: '#f59e0b', border: 'border-amber-300' },
  '기타': { bg: 'bg-stone-200', text: 'text-stone-800', hex: '#78716c', border: 'border-stone-400' },
};

export const ReviewSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('전체');
  const [filterRating, setFilterRating] = useState<number | '전체'>('전체');

  // 1. 평점별 개수 집계 (5점 ~ 1점)
  const ratingStats = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    REVIEW_DATA.forEach((r) => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating] += 1;
      }
    });

    const total = REVIEW_DATA.length;
    return [5, 4, 3, 2, 1].map((score) => ({
      score,
      count: counts[score],
      percent: total > 0 ? (counts[score] / total) * 100 : 0,
    }));
  }, []);

  const maxRatingCount = useMemo(() => {
    return Math.max(...ratingStats.map((r) => r.count), 1);
  }, [ratingStats]);

  // 2. 구분별 비율 집계 (장점, 불만, 개선 요청, 기타)
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {
      '장점': 0,
      '불만': 0,
      '개선 요청': 0,
      '기타': 0,
    };

    REVIEW_DATA.forEach((r) => {
      if (counts[r.category] !== undefined) {
        counts[r.category] += 1;
      } else {
        counts[r.category] = 1;
      }
    });

    const total = REVIEW_DATA.length;
    return Object.entries(counts).map(([cat, count]) => ({
      category: cat,
      count,
      percent: total > 0 ? (count / total) * 100 : 0,
      color: CATEGORY_STYLES[cat]?.hex || '#888',
    }));
  }, []);

  // 도넛 차트 SVG 계산
  const donutSegments = useMemo(() => {
    let accumulatedAngle = 0;
    return categoryStats.map((item) => {
      const angle = (item.percent / 100) * 360;
      const startAngle = accumulatedAngle;
      accumulatedAngle += angle;

      const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
      const rOuter = 80;
      const rInner = 50;
      const x1Outer = 100 + rOuter * Math.cos(toRad(startAngle));
      const y1Outer = 100 + rOuter * Math.sin(toRad(startAngle));
      const x2Outer = 100 + rOuter * Math.cos(toRad(startAngle + angle));
      const y2Outer = 100 + rOuter * Math.sin(toRad(startAngle + angle));

      const x1Inner = 100 + rInner * Math.cos(toRad(startAngle + angle));
      const y1Inner = 100 + rInner * Math.sin(toRad(startAngle + angle));
      const x2Inner = 100 + rInner * Math.cos(toRad(startAngle));
      const y2Inner = 100 + rInner * Math.sin(toRad(startAngle));

      const largeArc = angle > 180 ? 1 : 0;

      const pathData = `
        M ${x1Outer} ${y1Outer}
        A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
        L ${x1Inner} ${y1Inner}
        A ${rInner} ${rInner} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}
        Z
      `;

      return {
        ...item,
        pathData,
      };
    });
  }, [categoryStats]);

  // 3. 최신순 정렬된 후기 목록 (날짜 내림차순: 2026-07-06 -> 2026-06-08)
  const sortedReviews = useMemo(() => {
    const list = [...REVIEW_DATA].sort((a, b) => b.date.localeCompare(a.date));
    return list.filter((r) => {
      const matchCat = filterCategory === '전체' || r.category === filterCategory;
      const matchRating = filterRating === '전체' || r.rating === filterRating;
      return matchCat && matchRating;
    });
  }, [filterCategory, filterRating]);

  return (
    <section id="review" className="w-full scroll-mt-6">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-200/90 shadow-sm mb-6">
        {/* 영역 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <MessageSquareHeart className="w-6 h-6" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                고객 후기 영역
              </h2>
            </div>
            <p className="text-stone-600 text-base sm:text-lg">
              구매 고객들의 솔직한 상품 평점과 의견 분석입니다.
            </p>
          </div>

          <div className="bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-900 text-sm sm:text-base font-bold self-start sm:self-auto">
            총 후기: {REVIEW_DATA.length}건 (만족도 4.0점)
          </div>
        </div>

        {/* 요구사항 필수 작게 표시할 문구: 후기 영역에 이 문구를 작게 보여 줘 */}
        <div className="mt-4 bg-stone-100 border border-stone-300 rounded-xl px-3.5 py-2 flex items-center gap-2 text-stone-600">
          <AlertCircle className="w-4 h-4 text-stone-500 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">
            후기는 고객의 의견이며 농장 자료로 확인된 사실이 아닙니다.
          </p>
        </div>

        {/* 1. 평점별 개수 막대 차트 + 2. 구분 비율 도넛 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
          {/* 평점별 개수 막대 차트 (7칸) */}
          <div className="lg:col-span-7 bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  평점별 개수 막대 차트
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">단위: 후기 건수(건) · 5점 만점 기준</p>
              </div>
              <span className="text-xs sm:text-sm font-semibold bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-stone-700">
                5점 후기 비율: 40%
              </span>
            </div>

            <div className="space-y-3.5">
              {ratingStats.map((item) => {
                const fillPct = (item.count / maxRatingCount) * 100;
                const isSelected = filterRating === item.score;
                return (
                  <div
                    key={item.score}
                    onClick={() => setFilterRating(filterRating === item.score ? '전체' : item.score)}
                    className={`bg-white rounded-xl p-3 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-300 shadow-xs'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm sm:text-base mb-1.5 font-bold">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span>{item.score}점</span>
                        </div>
                        <span className="text-stone-400 font-normal text-xs sm:text-sm">
                          ({item.percent.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="text-stone-900 font-extrabold">
                        {item.count}
                        <span className="text-xs font-normal text-stone-600 ml-0.5">건</span>
                      </div>
                    </div>

                    {/* 막대 바 */}
                    <div className="w-full bg-stone-100 h-5 rounded-lg overflow-hidden flex">
                      <div
                        className="h-full bg-amber-400 transition-all duration-500 rounded-lg flex items-center justify-end pr-2 text-stone-900 text-xs font-bold"
                        style={{ width: `${Math.max(fillPct, item.count > 0 ? 12 : 0)}%` }}
                      >
                        {item.count > 0 && `${item.count}건`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-3 text-center">
              💡 평점 행을 누르면 해당 평점 후기만 아래 목록에서 필터링됩니다.
            </p>
          </div>

          {/* 구분 비율 도넛 차트 (5칸) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 mb-1">
                <ThumbsUp className="w-5 h-5 text-emerald-600" />
                구분 비율 도넛 차트
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-2">단위: 후기 구분별 비중(%)</p>

              {/* 도넛 SVG 차트 */}
              <div className="relative flex items-center justify-center my-2">
                <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 transform -rotate-90">
                  {donutSegments.map((seg) => {
                    const isSelected = filterCategory === seg.category;
                    return (
                      <path
                        key={seg.category}
                        d={seg.pathData}
                        fill={seg.color}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        opacity={filterCategory === '전체' || isSelected ? 1 : 0.4}
                        onClick={() =>
                          setFilterCategory(filterCategory === seg.category ? '전체' : seg.category)
                        }
                      />
                    );
                  })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs font-semibold text-stone-500">후기 피드백</span>
                  <span className="text-xl font-black text-emerald-700">
                    장점 65%
                  </span>
                  <span className="text-xs text-stone-500">총 20건 분석</span>
                </div>
              </div>
            </div>

            {/* 범례 및 값 */}
            <div className="space-y-1.5 mt-2 pt-2 border-t border-stone-200">
              {categoryStats.map((cat) => {
                const style = CATEGORY_STYLES[cat.category];
                const isSelected = filterCategory === cat.category;
                return (
                  <button
                    key={cat.category}
                    onClick={() =>
                      setFilterCategory(filterCategory === cat.category ? '전체' : cat.category)
                    }
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-200 font-bold border border-stone-300'
                        : 'hover:bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: style.hex }}
                      />
                      <span className="font-semibold text-stone-900">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <span>{cat.count}건</span>
                      <span className="text-stone-500 font-normal">({cat.percent.toFixed(0)}%)</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. 후기 목록 카드 (최신순, 날짜·채널·평점·구분·내용) */}
        <div className="mt-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-rose-500" />
                후기 목록 카드 (최신순)
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                날짜, 판매채널, 평점, 구분, 후기 내용 전체 목록입니다.
              </p>
            </div>

            {/* 필터 태그 초기화 버튼 */}
            {(filterCategory !== '전체' || filterRating !== '전체') && (
              <button
                onClick={() => {
                  setFilterCategory('전체');
                  setFilterRating('전체');
                }}
                className="text-xs sm:text-sm bg-rose-100 hover:bg-rose-200 text-rose-800 px-3 py-1.5 rounded-xl font-bold border border-rose-300 self-start sm:self-auto cursor-pointer"
              >
                필터 초기화 (전체 {REVIEW_DATA.length}건 보기)
              </button>
            )}
          </div>

          {/* 후기 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {sortedReviews.length === 0 ? (
              <div className="col-span-full py-12 text-center text-stone-500 font-medium bg-stone-50 rounded-2xl">
                선택한 조건의 고객 후기가 없습니다.
              </div>
            ) : (
              sortedReviews.map((review) => {
                const catStyle = CATEGORY_STYLES[review.category] || {
                  bg: 'bg-stone-100',
                  text: 'text-stone-800',
                  border: 'border-stone-300',
                };

                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-stone-200/80 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* 상단: 날짜, 채널, 구분 뱃지 */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-stone-500">
                            {review.date}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                            {review.channel}
                          </span>
                        </div>

                        {/* 구분 뱃지 (장점, 불만, 개선 요청, 기타) */}
                        <span
                          className={`text-xs sm:text-sm font-extrabold px-2.5 py-0.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                        >
                          {review.category}
                        </span>
                      </div>

                      {/* 평점 별점 표시 */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-extrabold text-stone-800">
                          {review.rating}점
                        </span>
                      </div>

                      {/* 후기 내용 (가상) 문구 포함 그대로 표시 */}
                      <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-medium">
                        "{review.content}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                      <span>고객 피드백 #{review.id}</span>
                      <span>5kg 규격 구매 건</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
