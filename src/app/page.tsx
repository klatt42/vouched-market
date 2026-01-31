"use client";

import { useState } from "react";
import { SurveyTrack } from "@/data/types";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPointsSection from "@/components/PainPointsSection";
import VisionSection from "@/components/VisionSection";
import QualificationGate from "@/components/QualificationGate";
import Footer from "@/components/Footer";
import SurveyModal from "@/components/survey/SurveyModal";

export default function Home() {
  const [surveyTrack, setSurveyTrack] = useState<SurveyTrack | null>(null);

  const scrollToQualify = () => {
    document.getElementById("qualify")?.scrollIntoView({ behavior: "smooth" });
  };

  const openSurvey = (track: SurveyTrack) => {
    setSurveyTrack(track);
  };

  const closeSurvey = () => {
    setSurveyTrack(null);
  };

  return (
    <>
      <Header onCtaClick={scrollToQualify} />
      <main>
        <Hero onCtaClick={scrollToQualify} />
        <PainPointsSection />
        <VisionSection />
        <QualificationGate onTrackSelect={openSurvey} />
      </main>
      <Footer />
      {surveyTrack && (
        <SurveyModal track={surveyTrack} onClose={closeSurvey} />
      )}
    </>
  );
}
