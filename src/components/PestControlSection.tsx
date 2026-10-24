import React, { useState, useMemo } from 'react';
import { ShieldAlert, AlertTriangle, Bug, Calendar, User, MapPin, FlaskConical, Search } from 'lucide-react';
import { PEST_CONTROL_DATA, PestControlRecord } from '../data/farmData';

export const PestControlSection: React.FC = () => {
  const [filterPest, setFilterPest] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 병해충별 방제 횟수 집계
  const pestStats = useMemo(() => {
    const counts: Record<string, number> = {};
    PEST_CONTROL_DATA.forEach((item) => {
      counts[item.pest] = (counts[item.pest] || 0) + 1;
    });

    const total = PEST_CONTROL_DATA.length;
    // 정렬 (횟수 많은 순)
    return Object.entries(counts)
      .map(([pest, count]) => ({
        pest,
        count,
        percent: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const maxPestCount = useMemo(() => {
    return Math.max(...pestStats.map((p) => p.count), 1);
  }, [pestStats]);

  // 병해충별 뱃지 스타일 맵
  const pestBadgeColors: Record<string, { bg: string; text: string; bar: string }> = {
    '복숭아순나방': { bg: 'bg-rose-100', text: 'text-rose-800 border-rose-300', bar: 'bg-rose-500' },
    '세균성구멍병': { bg: 'bg-amber-100', text: 'text-amber-800 border-amber-300', bar: 'bg-amber-500' },
    '잿빛무늬병': { bg: 'bg-purple-100', text: 'text-purple-800 border-purple-300', bar: 'bg-purple-600' },
    '진딧물': { bg: 'bg-emerald-100', text: 'text-emerald-800 border-emerald-300', bar: 'bg-emerald-600' },
  };

  // 필터링된 방제일지
  const filteredLogs = useMemo(() => {
    return PEST_CONTROL_DATA.filter((log) => {
      const matchPest = filterPest === '전체' || log.pest === filterPest;
      const matchSearch =
        searchQuery === '' ||
        log.medicine.includes(searchQuery) ||
        log.worker.includes(searchQuery) ||
        log.zone.includes(searchQuery) ||
        log.date.includes(searchQuery);
      return matchPest && matchSearch;
    });
  }, [filterPest, searchQuery]);

  return (
    <section id="pest" className="w-full scroll-mt-6">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-200/90 shadow-sm mb-6">
        {/* 영역 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldAlert className="w-6 h-6" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                방제 영역 (병해충 및 약제 관리)
              </h2>
            </div>
            <p className="text-stone-600 text-base sm:text-lg">
              2026 시즌 천도복숭아 과원 병해충 방제 횟수와 일자별 살포 기록입니다.
            </p>
          </div>
          <div className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto text-emerald-800 text-sm sm:text-base font-bold">
            총 방제 횟수: {PEST_CONTROL_DATA.length}회 살포 완료
          </div>
        </div>

        {/* 1. 병해충별 방제 횟수 막대 차트 */}
        <div className="my-6 bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <Bug className="w-5 h-5 text-emerald-600" />
                병해충별 방제 횟수 막대 차트
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                단위: 횟수(회) · 대상 병해충 4종 대상 누적 살포 횟수
              </p>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-stone-600 bg-white px-3 py-1 rounded-lg border border-stone-200 self-start sm:self-auto">
              가장 빈번한 병해충: <strong>복숭아순나방 (5회)</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pestStats.map((item) => {
              const colors = pestBadgeColors[item.pest] || {
                bg: 'bg-stone-100',
                text: 'text-stone-800',
                bar: 'bg-stone-500',
              };
              const isSelected = filterPest === item.pest;
              const fillPct = (item.count / maxPestCount) * 100;

              return (
                <div
                  key={item.pest}
                  onClick={() => setFilterPest(filterPest === item.pest ? '전체' : item.pest)}
                  className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-400 shadow-md'
                      : 'border-stone-200 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full border ${colors.bg} ${colors.text}`}
                    >
                      {item.pest}
                    </span>
                    <span className="text-stone-400 text-xs font-semibold">
                      비중 {item.percent.toFixed(0)}%
                    </span>
                  </div>

                  <div className="my-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-stone-900">{item.count}</span>
                      <span className="text-lg font-bold text-emerald-700">회</span>
                    </div>
                  </div>

                  {/* 진행 바 */}
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden mt-3">
                    <div
                      className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>

                  <div className="text-xs text-stone-500 mt-2 text-right font-medium">
                    {filterPest === item.pest ? '✓ 선택됨 (표 필터링)' : '클릭하여 표 모아보기'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. 방제일지 표 */}
        <div className="mt-8 pt-4">
          {/* 요구사항 필수 작게 표시할 문구: 표 위에 이 문구를 작게 보여 줘 */}
          <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 sm:p-3.5 mb-4 flex items-start gap-2.5 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-semibold leading-relaxed">
              약제 사용량과 희석 배수는 반드시 농약 포장지와 농약 안전사용 기준, 농업기술센터에서 확인하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-600" />
              방제일지 표
              <span className="text-sm font-normal text-stone-500">
                (총 {filteredLogs.length}건 기록)
              </span>
            </h3>

            {/* 표 검색 및 필터 초기화 */}
            <div className="flex items-center gap-2">
              {filterPest !== '전체' && (
                <button
                  onClick={() => setFilterPest('전체')}
                  className="text-xs sm:text-sm bg-stone-200 hover:bg-stone-300 text-stone-800 px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                >
                  필터 해제 (전체 보기)
                </button>
              )}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="약제명, 작업자, 구역 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-56"
                />
              </div>
            </div>
          </div>

          {/* 반응형 테이블 컨테이너 */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-stone-100/90 text-stone-800 text-sm sm:text-base border-b border-stone-200">
                  <th className="py-3 px-4 font-bold">날짜</th>
                  <th className="py-3 px-4 font-bold">대상병해충</th>
                  <th className="py-3 px-4 font-bold">약제명</th>
                  <th className="py-3 px-4 font-bold">작업구역</th>
                  <th className="py-3 px-4 font-bold">작업자</th>
                  <th className="py-3 px-4 font-bold text-rose-800">
                    수확 전 마지막 사용 가능일
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700 text-base">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-500 font-medium">
                      조건에 일치하는 방제 기록이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const badge = pestBadgeColors[log.pest] || {
                      bg: 'bg-stone-100',
                      text: 'text-stone-800',
                    };
                    return (
                      <tr
                        key={log.id}
                        className="hover:bg-amber-50/40 transition-colors"
                      >
                        {/* 날짜 */}
                        <td className="py-3.5 px-4 font-bold text-stone-900 whitespace-nowrap">
                          {log.date}
                        </td>
                        {/* 병해충 */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-sm font-bold border ${badge.bg} ${badge.text}`}
                          >
                            {log.pest}
                          </span>
                        </td>
                        {/* 약제명 */}
                        <td className="py-3.5 px-4 font-semibold text-stone-900 whitespace-nowrap">
                          {log.medicine}
                        </td>
                        {/* 작업구역 */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-stone-700 font-medium bg-stone-100 px-2 py-0.5 rounded-md text-sm border border-stone-200">
                            <MapPin className="w-3.5 h-3.5 text-stone-500" />
                            {log.zone}
                          </span>
                        </td>
                        {/* 작업자 */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-stone-700 font-medium">
                            <User className="w-3.5 h-3.5 text-stone-400" />
                            {log.worker}
                          </span>
                        </td>
                        {/* 수확 전 마지막 사용 가능일 */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold text-sm border border-rose-200">
                            <Calendar className="w-3.5 h-3.5 text-rose-500" />
                            {log.harvestSafetyDate}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm mt-3">
            ※ 표 가로 스크롤 가능: 스마트폰 화면에서는 좌우로 밀어서 전체 열을 편하게 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};
