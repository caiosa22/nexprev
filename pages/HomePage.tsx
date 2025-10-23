import React from 'react';
import SearchBar from '../components/SearchBar';
import BannerCarousel from '../components/BannerCarousel';
import CategoryGrid from '../components/CategoryGrid';
import NearbyPartners from '../components/NearbyPartners';
import DailyOffers from '../components/DailyOffers';
import ReferralSection from '../components/ReferralSection';
import { useScrollToTop } from '../hooks/useScrollToTop';

const LOGO_DATA_URL = "https://i.postimg.cc/LsHbp5GG/NEXPREV-LETRA-PRETA-1.png";

export default function HomePage(): React.ReactElement {
  useScrollToTop();

  return (
    <main className="px-4 space-y-6">
      
      <SearchBar />
      <BannerCarousel />
      <CategoryGrid />
      <NearbyPartners />
      <DailyOffers />
      <ReferralSection />
    </main>
  );
}
