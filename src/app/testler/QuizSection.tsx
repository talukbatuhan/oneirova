"use client";

import { useState } from "react";
import { MiniQuiz } from "@/components/MiniQuiz";
import { ALL_QUIZZES } from "@/lib/quizData";

const TAB_META: Record<string, { label: string; desc: string; icon: string }> = {
  "big-five": {
    label: "Big Five",
    desc: "5 boyutta hizli profil",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  enneagram: {
    label: "Enneagram",
    desc: "Motivasyon odagi",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  "ask-dili": {
    label: "Ask Dili",
    desc: "Iletisim tercihleri",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
};

export function QuizSection() {
  const [active, setActive] = useState(ALL_QUIZZES[0]!.id);
  const quiz = ALL_QUIZZES.find((q) => q.id === active) ?? ALL_QUIZZES[0]!;

  return (
    <section className="mt-10" aria-labelledby="quiz-heading">
      <h2 id="quiz-heading" className="section-heading">Hemen basla</h2>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {ALL_QUIZZES.map((q) => {
          const meta = TAB_META[q.id];
          const isActive = q.id === active;
          return (
            <button
              key={q.id}
              id={q.id}
              onClick={() => setActive(q.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "border-accent/60 bg-accent/10 text-accent shadow-sm"
                  : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {meta && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={meta.icon} />
                </svg>
              )}
              {meta?.label ?? q.title}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <MiniQuiz key={quiz.id} quiz={quiz} />
      </div>
    </section>
  );
}
