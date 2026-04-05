"use client";

import { useState } from "react";
import Link from "next/link";

export type QuizQuestion = {
  text: string;
  options: { label: string; scores: Record<string, number> }[];
};

export type QuizResult = {
  key: string;
  label: string;
  description: string;
};

export type QuizDef = {
  id: string;
  title: string;
  questions: QuizQuestion[];
  results: (scores: Record<string, number>) => QuizResult;
};

export function MiniQuiz({ quiz }: { quiz: QuizDef }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const q = quiz.questions[step];
  const progress = ((step + (finished ? 1 : 0)) / quiz.questions.length) * 100;

  function pick(option: QuizQuestion["options"][number]) {
    const next = { ...scores };
    for (const [k, v] of Object.entries(option.scores)) {
      next[k] = (next[k] ?? 0) + v;
    }
    setScores(next);
    if (step + 1 >= quiz.questions.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  }

  function reset() {
    setStep(0);
    setScores({});
    setFinished(false);
  }

  if (finished) {
    const result = quiz.results(scores);
    return (
      <div className="rounded-2xl border border-border bg-surface px-6 py-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-xl text-foreground">{result.label}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{result.description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/60 hover:text-foreground"
          >
            Tekrar dene
          </button>
          <Link
            href="/ruyalar"
            className="rounded-full border border-accent/60 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Rüya tabirlerine göz at
          </Link>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-6">
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span>{quiz.title}</span>
        <span>{step + 1} / {quiz.questions.length}</span>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface2">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-base font-medium text-foreground">{q.text}</p>
      <div className="mt-5 space-y-2.5">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => pick(opt)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-left text-sm text-muted transition-all hover:border-accent/50 hover:bg-surface2 hover:text-foreground active:scale-[0.98]"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
