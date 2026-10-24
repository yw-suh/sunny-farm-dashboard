import React from 'react';
import { Sun, Sprout, MapPin, Calendar, Compass, Download, Check, Loader2 } from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadZip';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'summary', label: '한눈에 보기' },
    { id: 'sales', label: '판매 현황' },
    { id: 'pest', label: '방제 일지' },
    { id: 'work', label: '작업 현황' },
    { id: 'review', label: '고객 후기' },
  ];

  const [isZipping, setIsZipping] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleDownload = async () => {
    try {
      setIsZipping(true);
      await downloadProjectZip();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('ZIP 생성 오류:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <header className="w-full">
      {/* 1. 최상단 연습용 안내 띠 */}
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2.5 text-center font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xs">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
        <span>연습용 가상 데이터입니다</span>
        <span className="text-amber-700 font-normal text-sm sm:text-base hidden sm:inline">
          (실제 농가 데이터가 아닌 교육 및 실습 목적의 예시 화면입니다)
        </span>
      </div>

      {/* 2. 메인 헤더 */}
      <div className="bg-linear-to-r from-orange-50 via-rose-50 to-emerald-50 border-b border-orange-200/70 px-4 sm:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
                <Sun className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-100 text-emerald-800 mb-1 border border-emerald-300">
                  <Sprout className="w-3.5 h-3.5" /> 2026년도 영농 기록
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
                  햇살가득 농장 대시보드
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-stone-700 text-base sm:text-lg font-medium mt-1">
              <span className="inline-flex items-center gap-1 bg-white/80 px-3 py-1 rounded-lg border border-stone-200 text-stone-800">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>경북 영천 · 천도복숭아 · 노지 재배</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-3 py-1 rounded-lg border border-stone-200 text-stone-600 text-sm sm:text-base">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2026 시즌 관리</span>
              </span>
            </div>
          </div>

          {/* 농장 기본 안내 배너 */}
          <div className="bg-white/90 p-4 rounded-2xl border border-orange-200 shadow-sm max-w-sm">
            <div className="text-stone-800 text-sm sm:text-base">
              <p className="font-semibold text-stone-900 mb-1">🍑 천도복숭아 영농 요약</p>
              <p className="text-stone-600 leading-snug text-sm">
                5kg 규격 수확 및 출하 완료 · 농협, 직거래, 공판장, 온라인 쇼핑몰 통합 관리
              </p>
            </div>
          </div>
        </div>

        {/* 빠른 메뉴 바로가기 & 소스코드 다운로드 버튼 */}
        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-orange-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-stone-500 text-sm font-semibold shrink-0 hidden sm:inline flex items-center gap-1">
              <Compass className="w-4 h-4" /> 바로가기:
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-xl text-base font-bold transition-all shrink-0 cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white hover:bg-orange-100 text-stone-700 border border-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ZIP 다운로드 버튼 (브라우저 직접 생성 방식) */}
          <div className="shrink-0">
            <button
              onClick={handleDownload}
              disabled={isZipping}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all border cursor-pointer w-full sm:w-auto ${
                downloadSuccess
                  ? 'bg-blue-600 border-blue-700'
                  : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700'
              }`}
              title="대시보드 전체 소스코드를 즉시 ZIP 파일로 생성하여 다운로드합니다"
            >
              {isZipping ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>ZIP 압축 파일 생성 중...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>다운로드 완료!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-emerald-100" />
                  <span>대시보드 ZIP 다운로드</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
