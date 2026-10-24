import React, { useMemo } from 'react';
import { Shovel, Clock, CalendarDays, Users, Award, Hammer } from 'lucide-react';
import { WORK_DATA, formatNumber } from '../data/farmData';

export const WorkSection: React.FC = () => {
  // 1. 작업별 총 투입 시간 집계 (시간 = 인원 × 작업 시간)
  const taskStats = useMemo(() => {
    const map: Record<
      string,
      { totalHours: number; sessions: number; totalWorkers: number }
    > = {};

    WORK_DATA.forEach((item) => {
      const inputHours = item.workers * item.workHours;
      if (!map[item.task]) {
        map[item.task] = { totalHours: 0, sessions: 0, totalWorkers: 0 };
      }
      map[item.task].totalHours += inputHours;
      map[item.task].sessions += 1;
      map[item.task].totalWorkers += item.workers;
    });

    const grandTotalHours = Object.values(map).reduce((acc, v) => acc + v.totalHours, 0);

    // 농업 작업 순서(전정 -> 방제 -> 적과 -> 봉지씌우기 -> 수확) 또는 투입시간 순서
    return Object.entries(map)
      .map(([task, val]) => ({
        task,
        totalHours: val.totalHours,
        sessions: val.sessions,
        avgWorkers: (val.totalWorkers / val.sessions).toFixed(1),
        percent: grandTotalHours > 0 ? (val.totalHours / grandTotalHours) * 100 : 0,
      }))
      .sort((a, b) => b.totalHours - a.totalHours);
  }, []);

  const maxTaskHours = useMemo(() => {
    return Math.max(...taskStats.map((t) => t.totalHours), 1);
  }, [taskStats]);

  const totalInputHours = useMemo(() => {
    return taskStats.reduce((acc, t) => acc + t.totalHours, 0);
  }, [taskStats]);

  // 2. 월별 작업 일수 및 작업시간 요약
  const monthlyStats = useMemo(() => {
    const monthMap: Record<
      string,
      { dates: Set<string>; totalHours: number; tasks: Set<string> }
    > = {
      '01': { dates: new Set(), totalHours: 0, tasks: new Set() },
      '02': { dates: new Set(), totalHours: 0, tasks: new Set() },
      '03': { dates: new Set(), totalHours: 0, tasks: new Set() },
      '04': { dates: new Set(), totalHours: 0, tasks: new Set() },
      '05': { dates: new Set(), totalHours: 0, tasks: new Set() },
      '06': { dates: new Set(), totalHours: 0, tasks: new Set() },
    };

    WORK_DATA.forEach((item) => {
      const month = item.date.slice(5, 7);
      if (monthMap[month]) {
        monthMap[month].dates.add(item.date);
        monthMap[month].totalHours += item.workers * item.workHours;
        monthMap[month].tasks.add(item.task);
      }
    });

    const monthNames: Record<string, string> = {
      '01': '1월',
      '02': '2월',
      '03': '3월',
      '04': '4월',
      '05': '5월',
      '06': '6월',
    };

    return Object.entries(monthMap).map(([mKey, data]) => ({
      monthKey: mKey,
      monthName: monthNames[mKey] || `${mKey}월`,
      workDays: data.dates.size,
      totalHours: data.totalHours,
      tasks: Array.from(data.tasks),
    }));
  }, []);

  const totalWorkDays = useMemo(() => {
    const allDates = new Set(WORK_DATA.map((d) => d.date));
    return allDates.size;
  }, []);

  // 작업별 아이콘 및 색상 팔레트
  const taskColors: Record<string, { bar: string; text: string; bg: string; badge: string }> = {
    '수확': { bar: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50', badge: 'border-rose-300' },
    '봉지씌우기': { bar: 'bg-amber-500', text: 'text-amber-800', bg: 'bg-amber-50', badge: 'border-amber-300' },
    '적과': { bar: 'bg-emerald-500', text: 'text-emerald-800', bg: 'bg-emerald-50', badge: 'border-emerald-300' },
    '전정': { bar: 'bg-blue-500', text: 'text-blue-800', bg: 'bg-blue-50', badge: 'border-blue-300' },
    '방제': { bar: 'bg-purple-500', text: 'text-purple-800', bg: 'bg-purple-50', badge: 'border-purple-300' },
  };

  return (
    <section id="work" className="w-full scroll-mt-6">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-200/90 shadow-sm mb-6">
        {/* 영역 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Hammer className="w-6 h-6" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                작업 영역 (농작업 투입 시간 및 일수)
              </h2>
            </div>
            <p className="text-stone-600 text-base sm:text-lg">
              전정, 방제, 적과, 봉지씌우기, 수확 등 영농 작업별 투입 시간과 월별 작업 일수입니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200 text-amber-900 text-sm sm:text-base font-bold">
              총 투입 시간: {formatNumber(totalInputHours)}시간
            </span>
            <span className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-emerald-900 text-sm sm:text-base font-bold">
              총 작업 일수: {totalWorkDays}일
            </span>
          </div>
        </div>

        {/* 1. 작업별 총 투입 시간 막대 차트 */}
        <div className="my-6 bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                작업별 총 투입 시간 막대 차트
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                계산 기준: 작업 투입 시간 = 인원 × 작업 시간 (단위: 시간)
              </p>
            </div>
            <div className="text-xs sm:text-sm text-stone-600 bg-white px-3 py-1 rounded-lg border border-stone-200 self-start sm:self-auto">
              가장 많은 시간 투입: <strong>수확 ({taskStats[0]?.totalHours}시간)</strong>
            </div>
          </div>

          <div className="space-y-4">
            {taskStats.map((item) => {
              const widthPct = (item.totalHours / maxTaskHours) * 100;
              const style = taskColors[item.task] || {
                bar: 'bg-stone-500',
                text: 'text-stone-800',
                bg: 'bg-stone-100',
                badge: 'border-stone-300',
              };

              return (
                <div
                  key={item.task}
                  className="bg-white rounded-xl p-3.5 sm:p-4 border border-stone-200 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm sm:text-base font-extrabold px-3 py-0.5 rounded-lg border ${style.bg} ${style.text} ${style.badge}`}
                      >
                        {item.task}
                      </span>
                      <span className="text-stone-500 text-xs sm:text-sm font-medium">
                        총 {item.sessions}회 작업 · 회당 평균 {item.avgWorkers}명 투입
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xl sm:text-2xl font-black text-stone-900">
                        {formatNumber(item.totalHours)}
                      </span>
                      <span className="text-base font-bold text-amber-700 ml-1">시간</span>
                      <span className="text-stone-500 text-xs sm:text-sm ml-2">
                        (전체의 {item.percent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  {/* 막대 바 */}
                  <div className="w-full bg-stone-100 h-6 sm:h-7 rounded-lg overflow-hidden flex relative">
                    <div
                      className={`h-full ${style.bar} transition-all duration-500 rounded-lg flex items-center justify-end pr-3 text-white text-xs sm:text-sm font-bold`}
                      style={{ width: `${Math.max(widthPct, 8)}%` }}
                    >
                      {widthPct > 18 && `${item.totalHours}시간`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-stone-500 text-xs sm:text-sm mt-4 text-center">
            💡 인원수와 일한 시간을 곱한 순수 투입 공수(시간) 기준 통계입니다.
          </p>
        </div>

        {/* 2. 월별 작업 일수 요약 */}
        <div className="mt-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
                월별 작업 일수 요약
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                월별 과원 작업 일수 및 주요 농작업 내역 (총 43일)
              </p>
            </div>
            <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
              성수기(5~6월): 총 27일 집중 작업
            </span>
          </div>

          {/* 월별 카드 그리드 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {monthlyStats.map((m) => {
              const isPeakMonth = m.workDays >= 12;
              return (
                <div
                  key={m.monthKey}
                  className={`rounded-2xl p-4 border text-center transition-all ${
                    isPeakMonth
                      ? 'bg-orange-50/70 border-orange-300 ring-1 ring-orange-200 shadow-sm'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <span className="text-sm sm:text-base font-bold text-stone-500 block mb-1">
                    {m.monthName}
                  </span>
                  <div className="my-1">
                    <span className="text-3xl sm:text-4xl font-black text-stone-900">
                      {m.workDays}
                    </span>
                    <span className="text-lg font-bold text-stone-700 ml-1">일</span>
                  </div>

                  <div className="text-xs font-semibold text-stone-600 mt-1">
                    {formatNumber(m.totalHours)}시간 투입
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex flex-wrap gap-1 justify-center">
                    {m.tasks.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
