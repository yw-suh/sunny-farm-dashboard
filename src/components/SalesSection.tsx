import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Filter,
  Info,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  SALES_DATA,
  CHANNELS,
  ChannelType,
  SaleRecord,
  formatNumber,
  formatCurrency,
} from '../data/farmData';

interface SalesSectionProps {
  selectedChannel: ChannelType;
  onSelectChannel: (channel: ChannelType) => void;
}

// 채널별 색상 팔레트 (따뜻한 복숭아 & 신선한 초록 테마)
const CHANNEL_COLORS: Record<string, { bg: string; border: string; hex: string; text: string }> = {
  '공판장': { bg: 'bg-emerald-600', border: 'border-emerald-700', hex: '#059669', text: 'text-emerald-700' },
  '농협': { bg: 'bg-teal-600', border: 'border-teal-700', hex: '#0d9488', text: 'text-teal-700' },
  '직거래': { bg: 'bg-amber-500', border: 'border-amber-600', hex: '#f59e0b', text: 'text-amber-800' },
  '온라인 쇼핑몰': { bg: 'bg-rose-500', border: 'border-rose-600', hex: '#f43f5e', text: 'text-rose-700' },
};

export const SalesSection: React.FC<SalesSectionProps> = ({
  selectedChannel,
  onSelectChannel,
}) => {
  const [hoveredDatePoint, setHoveredDatePoint] = useState<{
    date: string;
    revenue: number;
    boxes: number;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // 1. 전체 채널별 집계 (항상 비교 가능하도록)
  const channelStatsAll = useMemo(() => {
    const map: Record<string, { revenue: number; boxes: number; count: number }> = {
      '공판장': { revenue: 0, boxes: 0, count: 0 },
      '농협': { revenue: 0, boxes: 0, count: 0 },
      '직거래': { revenue: 0, boxes: 0, count: 0 },
      '온라인 쇼핑몰': { revenue: 0, boxes: 0, count: 0 },
    };

    SALES_DATA.forEach((s) => {
      if (map[s.channel]) {
        map[s.channel].revenue += s.revenue;
        map[s.channel].boxes += s.boxes;
        map[s.channel].count += 1;
      }
    });

    const totalRev = Object.values(map).reduce((acc, c) => acc + c.revenue, 0);

    return Object.entries(map).map(([ch, val]) => ({
      channel: ch,
      revenue: val.revenue,
      boxes: val.boxes,
      count: val.count,
      percent: totalRev > 0 ? (val.revenue / totalRev) * 100 : 0,
      avgPrice: val.boxes > 0 ? Math.round(val.revenue / val.boxes) : 0,
    }));
  }, []);

  // 2. 현재 선택된 필터가 적용된 판매 데이터
  const filteredSales = useMemo(() => {
    if (selectedChannel === '전체') return SALES_DATA;
    return SALES_DATA.filter((s) => s.channel === selectedChannel);
  }, [selectedChannel]);

  // 3. 날짜별 매출 추이 데이터 (일자별 집계)
  const dailyTrends = useMemo(() => {
    const dateMap: Record<string, { revenue: number; boxes: number; count: number }> = {};

    filteredSales.forEach((s) => {
      if (!dateMap[s.date]) {
        dateMap[s.date] = { revenue: 0, boxes: 0, count: 0 };
      }
      dateMap[s.date].revenue += s.revenue;
      dateMap[s.date].boxes += s.boxes;
      dateMap[s.date].count += 1;
    });

    const sortedDates = Object.keys(dateMap).sort();
    return sortedDates.map((date) => ({
      date,
      displayDate: `${date.slice(5, 7)}/${date.slice(8, 10)}`,
      revenue: dateMap[date].revenue,
      boxes: dateMap[date].boxes,
      count: dateMap[date].count,
    }));
  }, [filteredSales]);

  // 막대 차트 최대 매출값 기준
  const maxChannelRev = useMemo(() => {
    return Math.max(...channelStatsAll.map((c) => c.revenue), 1);
  }, [channelStatsAll]);

  // 선 차트 최대 매출값 기준
  const maxDailyRev = useMemo(() => {
    if (dailyTrends.length === 0) return 100000;
    return Math.max(...dailyTrends.map((d) => d.revenue));
  }, [dailyTrends]);

  // 최고 매출일 찾기
  const peakDay = useMemo(() => {
    if (dailyTrends.length === 0) return null;
    return [...dailyTrends].sort((a, b) => b.revenue - a.revenue)[0];
  }, [dailyTrends]);

  // 도넛 차트 SVG 계산 (전체 매출 기준 비중)
  const donutSegments = useMemo(() => {
    let accumulatedAngle = 0;
    return channelStatsAll.map((item) => {
      const angle = (item.percent / 100) * 360;
      const startAngle = accumulatedAngle;
      accumulatedAngle += angle;

      // SVG path 계산 (반지름 80, 중심 100,100, 두께 30 -> 안쪽 50)
      const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
      const rOuter = 82;
      const rInner = 52;
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
        color: CHANNEL_COLORS[item.channel]?.hex || '#888',
      };
    });
  }, [channelStatsAll]);

  return (
    <section id="sales" className="w-full scroll-mt-6">
      {/* 영역 헤더 */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-200/90 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-orange-100 text-orange-700">
                <TrendingUp className="w-6 h-6" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                판매 현황 및 분석
              </h2>
            </div>
            <p className="text-stone-600 text-base sm:text-lg">
              공판장, 농협, 직거래, 온라인 쇼핑몰의 판매 실적과 날짜별 매출 추이입니다.
            </p>
          </div>

          {/* 채널 필터 버튼 (어르신도 누르기 편한 큼직한 버튼) */}
          <div className="bg-stone-100 p-1.5 sm:p-2 rounded-2xl border border-stone-300">
            <div className="flex items-center gap-1 mb-1.5 px-2 text-stone-600 text-xs sm:text-sm font-bold">
              <Filter className="w-3.5 h-3.5 text-stone-500" />
              <span>판매처 선택 (필터 변경 시 요약 카드와 판매 차트가 함께 바뀝니다)</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {CHANNELS.map((ch) => {
                const isSelected = selectedChannel === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => onSelectChannel(ch)}
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-200 ring-2 ring-rose-400'
                        : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-300'
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 1. 채널별 매출 비교 막대 차트 + 채널별 매출 비중 도넛 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* 채널별 매출 비교 막대 차트 (7칸) */}
          <div className="lg:col-span-7 bg-stone-50/70 rounded-2xl p-4 sm:p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  채널별 매출 비교 막대 차트
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">단위: 원 (천도 5kg 기준)</p>
              </div>
              <span className="text-xs sm:text-sm font-semibold px-2.5 py-1 bg-white rounded-lg border border-stone-200 text-stone-700">
                전체 채널 비교
              </span>
            </div>

            <div className="space-y-4">
              {channelStatsAll.map((stat) => {
                const isHighlighted = selectedChannel === '전체' || selectedChannel === stat.channel;
                const barWidthPercent = (stat.revenue / maxChannelRev) * 100;
                const colorInfo = CHANNEL_COLORS[stat.channel] || {
                  bg: 'bg-stone-500',
                  border: 'border-stone-600',
                  hex: '#71717a',
                  text: 'text-stone-700',
                };

                return (
                  <div
                    key={stat.channel}
                    onClick={() => onSelectChannel(stat.channel as ChannelType)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-white border-stone-300 shadow-sm'
                        : 'bg-stone-100/60 border-stone-200 opacity-50'
                    } ${selectedChannel === stat.channel ? 'ring-2 ring-rose-400' : ''}`}
                  >
                    <div className="flex items-center justify-between text-base sm:text-lg mb-1.5">
                      <div className="flex items-center gap-2 font-bold text-stone-900">
                        <span
                          className="w-3.5 h-3.5 rounded-md shrink-0"
                          style={{ backgroundColor: colorInfo.hex }}
                        />
                        <span>{stat.channel}</span>
                        {selectedChannel === stat.channel && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                            선택됨
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-stone-900 text-base sm:text-lg">
                          {formatNumber(stat.revenue)}
                          <span className="text-sm font-bold text-stone-600 ml-0.5">원</span>
                        </span>
                        <span className="text-stone-500 text-xs sm:text-sm ml-2">
                          ({stat.percent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>

                    {/* 막대 바 */}
                    <div className="w-full bg-stone-200 h-6 sm:h-7 rounded-lg overflow-hidden flex relative">
                      <div
                        className={`h-full transition-all duration-500 rounded-lg flex items-center justify-end pr-2 text-white text-xs sm:text-sm font-bold`}
                        style={{
                          width: `${Math.max(barWidthPercent, 8)}%`,
                          backgroundColor: colorInfo.hex,
                        }}
                      >
                        {barWidthPercent > 20 && `${formatNumber(stat.boxes)}박스`}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 mt-1.5 font-medium">
                      <span>판매 수량: <strong>{formatNumber(stat.boxes)}</strong>박스 ({stat.count}건)</span>
                      <span>상자당 평균: <strong>{formatNumber(stat.avgPrice)}</strong>원</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-stone-500 text-xs sm:text-sm mt-4 text-center">
              💡 채널 항목을 누르면 해당 채널의 상세 데이터로 바로 필터링됩니다.
            </p>
          </div>

          {/* 채널별 매출 비중 도넛 차트 (5칸) */}
          <div className="lg:col-span-5 bg-stone-50/70 rounded-2xl p-4 sm:p-6 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-rose-500" />
                  채널별 매출 비중 도넛 차트
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mb-4">단위: 비중(%) 및 매출액(원)</p>

              {/* 도넛 SVG 차트 */}
              <div className="relative flex items-center justify-center my-3">
                <svg
                  viewBox="0 0 200 200"
                  className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90 drop-shadow-sm"
                >
                  {donutSegments.map((seg) => {
                    const isSelected = selectedChannel === seg.channel;
                    return (
                      <path
                        key={seg.channel}
                        d={seg.pathData}
                        fill={seg.color}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                        opacity={selectedChannel === '전체' || isSelected ? 1 : 0.4}
                        onClick={() => onSelectChannel(seg.channel as ChannelType)}
                      />
                    );
                  })}
                </svg>

                {/* 중앙 텍스트 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs sm:text-sm font-semibold text-stone-500">
                    {selectedChannel === '전체' ? '총 매출 비중' : selectedChannel}
                  </span>
                  <span className="text-base sm:text-lg font-black text-stone-900">
                    {selectedChannel === '전체'
                      ? '100%'
                      : `${channelStatsAll.find((c) => c.channel === selectedChannel)?.percent.toFixed(1)}%`}
                  </span>
                  <span className="text-xs text-stone-500">4개 채널</span>
                </div>
              </div>
            </div>

            {/* 도넛 차트 범례 및 값 라벨 */}
            <div className="space-y-2 mt-4 pt-3 border-t border-stone-200">
              {channelStatsAll.map((item) => {
                const colorInfo = CHANNEL_COLORS[item.channel];
                const isSelected = selectedChannel === item.channel;
                return (
                  <button
                    key={item.channel}
                    onClick={() => onSelectChannel(item.channel as ChannelType)}
                    className={`w-full text-left flex items-center justify-between p-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-100/70 font-bold border border-rose-300'
                        : 'hover:bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: colorInfo.hex }}
                      />
                      <span className="font-semibold text-stone-900">{item.channel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-800">{item.percent.toFixed(1)}%</span>
                      <span className="text-stone-500 hidden sm:inline">
                        ({(item.revenue / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 0 })}만)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. 날짜별 매출 추이 선 차트 */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                날짜별 매출 추이 선 차트
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                단위: 일별 매출 합계(원) · 2026년 6월 5일 ~ 6월 30일 ({selectedChannel} 기준)
              </p>
            </div>

            {peakDay && (
              <div className="bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>
                  최고 매출일: <strong>{peakDay.date}</strong> ({formatCurrency(peakDay.revenue)}, {peakDay.boxes}박스)
                </span>
              </div>
            )}
          </div>

          {/* 선 차트 캔버스 / SVG 컨테이너 */}
          <div className="bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200 relative overflow-x-auto">
            {dailyTrends.length === 0 ? (
              <div className="py-12 text-center text-stone-500 font-medium">
                해당 채널의 판매 데이터가 없습니다.
              </div>
            ) : (
              <div className="min-w-[620px] h-64 sm:h-72 relative">
                {/* SVG 선 차트 */}
                <svg viewBox="0 0 700 240" className="w-full h-full overflow-visible">
                  {/* 가로 가이드선 4개 */}
                  {[0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = 200 - ratio * 160;
                    const val = maxDailyRev * ratio;
                    return (
                      <g key={ratio}>
                        <line
                          x1="40"
                          y1={y}
                          x2="680"
                          y2={y}
                          stroke="#e5e7eb"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        <text
                          x="35"
                          y={y + 4}
                          textAnchor="end"
                          fontSize="10"
                          fill="#9ca3af"
                          fontWeight="600"
                        >
                          {(val / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 0 })}만
                        </text>
                      </g>
                    );
                  })}

                  {/* 바닥 기준선 */}
                  <line x1="40" y1="200" x2="680" y2="200" stroke="#d1d5db" strokeWidth="1.5" />

                  {/* 선 차트 점 좌표 생성 */}
                  {(() => {
                    const paddingX = 50;
                    const chartWidth = 620;
                    const stepX = chartWidth / (dailyTrends.length - 1 || 1);

                    const points = dailyTrends.map((d, idx) => {
                      const x = paddingX + idx * stepX;
                      const y = 200 - (d.revenue / (maxDailyRev || 1)) * 160;
                      return { ...d, x, y };
                    });

                    const pathString = points.reduce(
                      (acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
                      ''
                    );

                    const areaString = `${pathString} L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`;

                    return (
                      <>
                        {/* 그라데이션 영역 */}
                        <defs>
                          <linearGradient id="peachGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={areaString} fill="url(#peachGradient)" />

                        {/* 메인 선 */}
                        <path
                          d={pathString}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* 데이터 포인트들 */}
                        {points.map((p, idx) => {
                          const isPeak = peakDay?.date === p.date;
                          return (
                            <g key={p.date} className="cursor-pointer">
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r={isPeak ? 6 : 4.5}
                                fill={isPeak ? '#e11d48' : '#ffffff'}
                                stroke="#f43f5e"
                                strokeWidth={isPeak ? 3 : 2}
                                onMouseEnter={() => setHoveredDatePoint(p)}
                                onMouseLeave={() => setHoveredDatePoint(null)}
                              />
                              {/* 날짜 레이블 (격일로 간결하게 표시) */}
                              {(idx % 2 === 0 || idx === points.length - 1) && (
                                <text
                                  x={p.x}
                                  y="218"
                                  textAnchor="middle"
                                  fontSize="11"
                                  fontWeight="600"
                                  fill="#4b5563"
                                >
                                  {p.displayDate}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>

                {/* 마우스 호버 툴팁 */}
                {hoveredDatePoint && (
                  <div
                    className="absolute bg-stone-900 text-white text-xs sm:text-sm rounded-xl px-3 py-2 shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full z-20 whitespace-nowrap border border-stone-700"
                    style={{
                      left: `${(hoveredDatePoint.x / 700) * 100}%`,
                      top: `${(hoveredDatePoint.y / 240) * 100}%`,
                      marginTop: '-10px',
                    }}
                  >
                    <p className="font-bold text-orange-300">{hoveredDatePoint.date}</p>
                    <p className="font-extrabold text-base">{formatCurrency(hoveredDatePoint.revenue)}</p>
                    <p className="text-stone-300 text-xs">
                      판매 수량: {formatNumber(hoveredDatePoint.boxes)}박스 ({hoveredDatePoint.count}건)
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-stone-600 font-semibold mt-3 pt-2 border-t border-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                매출 선 그래프 (점을 마우스로 대면 상세 금액과 박스 수를 볼 수 있습니다)
              </span>
              <span>
                표시 중인 데이터: <strong className="text-rose-600">{dailyTrends.length}일간</strong> 합계
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
