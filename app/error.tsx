"use client";

import ErrorState from "@/components/ErrorState/ErrorState";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return <ErrorState onRetry={reset} />;
}