'use client';

export function SkeletonStat() {
  return (
    <div className="rounded-[2rem] border border-orange-500/10 bg-zinc-950 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="mb-3 h-10 w-24 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-800" />
        </div>
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-zinc-800" />
      </div>
    </div>
  );
}

export function SkeletonAction() {
  return (
    <div className="flex items-center justify-between rounded-[2rem] border border-orange-500/10 bg-zinc-950 p-6">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-zinc-800" />
        <div className="flex-1">
          <div className="mb-2 h-5 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-48 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
      <div className="h-5 w-5 animate-pulse rounded bg-zinc-800" />
    </div>
  );
}

export function SkeletonBooking() {
  return (
    <div className="flex flex-col gap-5 border-b border-zinc-800 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="h-24 w-28 animate-pulse rounded-2xl bg-zinc-800" />
        <div className="flex-1">
          <div className="mb-2 h-5 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="mt-3 flex flex-wrap gap-4">
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </div>
      <div className="h-8 w-20 animate-pulse rounded bg-zinc-800" />
    </div>
  );
}

export function SkeletonAccountDetail() {
  return (
    <div className="flex items-start gap-4 border-b border-zinc-800 p-6">
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-zinc-800" />
      <div className="flex-1">
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-zinc-800" />
        <div className="h-5 w-40 animate-pulse rounded bg-zinc-800" />
      </div>
    </div>
  );
}
