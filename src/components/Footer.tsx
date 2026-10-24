import React from 'react';
import { ArrowUp, Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone-900 text-stone-300 py-10 px-4 sm:px-8 mt-12 border-t-4 border-orange-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-orange-500 text-white">
              <Sprout className="w-5 h-5" />
            </span>
            <span className="text-xl font-black text-white tracking-tight">
              햇살가득 농장 대시보드
            </span>
          </div>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            경북 영천 · 천도복숭아 5kg 노지 재배 영농 관리 시스템
          </p>
          <p className="text-amber-400 text-xs sm:text-sm mt-1 font-semibold">
            ※ 화면에 표시된 모든 수치와 내용은 수업 연습용 가상 데이터입니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm sm:text-base border border-stone-700 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-orange-400" />
            맨 위로 올라가기
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-xs sm:text-sm text-stone-400">
        햇살가득 농장 대시보드 · 누구나 쉽게 쓰는 스마트 영농 대시보드
      </div>
    </footer>
  );
};
