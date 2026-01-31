"use client";

import { useEffect } from "react";
import { SurveyTrack } from "@/data/types";
import SurveyController from "./SurveyController";

export default function SurveyModal({
  track,
  onClose,
}: {
  track: SurveyTrack;
  onClose: () => void;
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-gray-100 hover:text-text"
          aria-label="Close survey"
        >
          &#10005;
        </button>
        <SurveyController track={track} onClose={onClose} />
      </div>
    </div>
  );
}
