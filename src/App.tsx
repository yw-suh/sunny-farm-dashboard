/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { SalesSection } from './components/SalesSection';
import { PestControlSection } from './components/PestControlSection';
import { WorkSection } from './components/WorkSection';
import { ReviewSection } from './components/ReviewSection';
import { Footer } from './components/Footer';
import {
  SALES_DATA,
  REVIEW_DATA,
  ChannelType,
} from './data/farmData';

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('전체');
  const [activeSection, setActiveSection] = useState<string>('summary');

  // 선택된 채널에 따라 판매 데이터 필터링
  const filteredSales = useMemo(() => {
    if (selectedChannel === '전체') return SALES_DATA;
    return SALES_DATA.filter((s) => s.channel === selectedChannel);
  }, [selectedChannel]);

  // 요약 카드 1: 총 매출(원)
  const totalRevenue = useMemo(() => {
    return filteredSales.reduce((acc, curr) => acc + curr.revenue, 0);
  }, [filteredSales]);

  // 요약 카드 2: 총 판매 박스 수
  const totalBoxes = useMemo(() => {
    return filteredSales.reduce((acc, curr) => acc + curr.boxes, 0);
  }, [filteredSales]);

  // 요약 카드 3: 박스당 평균 단가 (매출 ÷ 박스)
  const avgUnitPrice = useMemo(() => {
    if (totalBoxes === 0) return 0;
    return Math.round(totalRevenue / totalBoxes);
  }, [totalRevenue, totalBoxes]);

  // 요약 카드 4: 평균 후기 평점 (5점 만점, 소수 첫째 자리)
  const avgRating = useMemo(() => {
    if (REVIEW_DATA.length === 0) return 0;
    const sum = REVIEW_DATA.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / REVIEW_DATA.length;
  }, []);

  // 부드러운 스크롤 이동 함수
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-stone-900 flex flex-col font-sans antialiased selection:bg-rose-200">
      {/* 1. 상단 안내 띠 및 헤더 */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 메인 컨테이너 (위에서 아래 순서) */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1">
        {/* 2. 요약 카드 4개 */}
        <SummaryCards
          totalRevenue={totalRevenue}
          totalBoxes={totalBoxes}
          avgUnitPrice={avgUnitPrice}
          avgRating={avgRating}
          selectedChannel={selectedChannel}
          reviewCount={REVIEW_DATA.length}
        />

        {/* 3. 판매 영역 (채널 필터, 막대 차트, 도넛 차트, 선 차트) */}
        <SalesSection
          selectedChannel={selectedChannel}
          onSelectChannel={setSelectedChannel}
        />

        {/* 4. 방제 영역 (주의 문구, 병해충별 횟수 차트, 방제일지 표) */}
        <PestControlSection />

        {/* 5. 작업 영역 (총 투입 시간 차트, 월별 작업 일수 요약) */}
        <WorkSection />

        {/* 6. 후기 영역 (안내 문구, 평점 차트, 구분 도넛 차트, 최신순 카드) */}
        <ReviewSection />
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
}
