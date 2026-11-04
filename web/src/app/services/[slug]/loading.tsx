export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-32">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-stone-200/90 pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-4 w-36 bg-stone-200 rounded-lg" />
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-200 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-24 bg-stone-200 rounded-full" />
                <div className="h-5 w-32 bg-stone-200 rounded-full" />
              </div>
              <div className="h-8 sm:h-10 w-2/3 bg-stone-200 rounded-xl" />
              <div className="h-4 w-1/3 bg-stone-100 rounded-lg" />
            </div>
          </div>

          {/* Quick facts strip skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-stone-100 rounded-2xl border border-stone-200/60" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Body Skeleton */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10 animate-pulse">
        {/* Section 1 Skeleton */}
        <div className="space-y-4">
          <div className="h-7 w-64 bg-stone-200 rounded-lg" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-2xl border border-stone-200/80" />
            ))}
          </div>
        </div>

        {/* Section 2 Skeleton */}
        <div className="space-y-4">
          <div className="h-7 w-56 bg-stone-200 rounded-lg" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-white rounded-2xl border border-stone-200/80" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
