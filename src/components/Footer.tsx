import React, { useState } from 'react';
import { ArrowUp, Heart, Sprout, Download, Check, Loader2 } from 'lucide-react';
import { downloadProjectZip } from '../utils/downloadZip';

export const Footer: React.FC = () => {
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            onClick={handleDownload}
            disabled={isZipping}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm sm:text-base border transition-all cursor-pointer shadow-md ${
              downloadSuccess
                ? 'bg-blue-600 border-blue-500'
                : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500'
            }`}
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>압축 중...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>다운로드 완료!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-emerald-200" />
                <span>소스코드 다운로드 (ZIP)</span>
              </>
            )}
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm sm:text-base border border-stone-700 transition-all cursor-pointer shadow-md"
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
