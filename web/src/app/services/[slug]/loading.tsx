export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-32 font-sans">
      {/* Header Skeleton */}
      <div className="bg-white border-b-2 border-stone-300 pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-4 w-36 bg-stone-300" />
          <div className="space-y-3">
            <div className="h-5 w-40 bg-stone-200" />
            <div className="h-10 sm:h-12 w-2/3 bg-stone-300" />
            <div className="h-5 w-1/3 bg-stone-200" />
          </div>

          {/* Quick facts strip skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-stone-300 bg-stone-100 divide-y sm:divide-y-0 sm:divide-x-2 divide-stone-300 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 p-4 space-y-2">
                <div className="h-3 w-16 bg-stone-300" />
                <div className="h-6 w-24 bg-stone-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body Skeleton */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-12 animate-pulse">
        {/* Section 1 Skeleton */}
        <div className="space-y-4">
          <div className="h-7 w-64 bg-stone-300" />
          <div className="border-y-2 border-stone-300 divide-y-2 divide-stone-200 bg-white">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 p-4 bg-white" />
            ))}
          </div>
        </div>

        {/* Section 2 Skeleton */}
        <div className="space-y-4">
          <div className="h-7 w-56 bg-stone-300" />
          <div className="border-l-4 border-stone-300 pl-6 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 border-2 border-stone-300 bg-white p-4" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
