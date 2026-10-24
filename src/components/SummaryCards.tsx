import React from 'react';
import { DollarSign, Package, Tag, Star, ArrowRight } from 'lucide-react';
import { formatNumber, formatCurrency, ChannelType } from '../data/farmData';

interface SummaryCardsProps {
  totalRevenue: number;
  totalBoxes: number;
  avgUnitPrice: number;
  avgRating: number;
  selectedChannel: ChannelType;
  reviewCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalRevenue,
  totalBoxes,
  avgUnitPrice,
  avgRating,
  selectedChannel,
  reviewCount,
}) => {
  return (
    <section id="summary" className="w-full scroll-mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-rose-500 inline-block"></span>
            농장 핵심 요약 카드
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-0.5">
            {selectedChannel === '전체' ? (
              '모든 판매처의 실적과 고객 평점 합계입니다.'
            ) : (
              <span className="text-rose-700 font-semibold">
                선택된 <span className="underline decoration-2 font-bold">[{selectedChannel}]</span> 채널 기준 실적입니다.
              </span>
            )}
          </p>
        </div>

        {selectedChannel !== '전체' && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-800 rounded-lg text-sm font-bold border border-rose-300 self-start sm:self-auto">
            <span>필터 적용 중: {selectedChannel}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. 총 매출 */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-orange-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/40 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-base sm:text-lg font-bold text-stone-700 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-orange-100 text-orange-700">
                <DollarSign className="w-5 h-5" />
              </span>
              총 매출
            </span>
            <span className="text-xs sm:text-sm font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">
              {selectedChannel}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-stone-900 tracking-tight leading-none">
              {formatNumber(totalRevenue)}
              <span className="text-lg sm:text-xl font-bold ml-1 text-orange-600">원</span>
            </div>
            <p className="text-stone-500 text-sm sm:text-base mt-2 font-medium">
              {totalBoxes > 0 ? (
                <>
                  약 <span className="font-bold text-stone-700">{(totalRevenue / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}만 원</span>
                </>
              ) : (
                '판매 실적 없음'
              )}
            </p>
          </div>
        </div>

        {/* 2. 총 판매 박스 수 */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/40 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-base sm:text-lg font-bold text-stone-700 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Package className="w-5 h-5" />
              </span>
              총 판매 박스 수
            </span>
            <span className="text-xs sm:text-sm font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              5kg 상자
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-stone-900 tracking-tight leading-none">
              {formatNumber(totalBoxes)}
              <span className="text-lg sm:text-xl font-bold ml-1 text-emerald-600">박스</span>
            </div>
            <p className="text-stone-500 text-sm sm:text-base mt-2 font-medium">
              총 중량 약 <span className="font-bold text-stone-700">{formatNumber(totalBoxes * 5)}kg</span> 출하
            </p>
          </div>
        </div>

        {/* 3. 박스당 평균 단가 */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-amber-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/40 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-base sm:text-lg font-bold text-stone-700 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Tag className="w-5 h-5" />
              </span>
              박스당 평균 단가
            </span>
            <span className="text-xs sm:text-sm font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
              매출 ÷ 박스
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-stone-900 tracking-tight leading-none">
              {formatNumber(avgUnitPrice)}
              <span className="text-lg sm:text-xl font-bold ml-1 text-amber-700">원</span>
            </div>
            <p className="text-stone-500 text-sm sm:text-base mt-2 font-medium">
              1kg당 환산 약 <span className="font-bold text-stone-700">{formatNumber(avgUnitPrice / 5)}원</span>
            </p>
          </div>
        </div>

        {/* 4. 평균 후기 평점 */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-rose-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100/40 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-base sm:text-lg font-bold text-stone-700 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <Star className="w-5 h-5 fill-rose-500" />
              </span>
              평균 후기 평점
            </span>
            <span className="text-xs sm:text-sm font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              5점 만점
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-stone-900 tracking-tight leading-none">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-lg sm:text-xl font-bold text-rose-600">점</span>
              <span className="text-stone-400 text-base font-semibold">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(avgRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-stone-500 text-xs sm:text-sm font-medium">
                총 {reviewCount}개 평가 기준
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
