export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div>
          <div className="h-5 w-48 bg-stone-300 mb-4" />
          <div className="h-12 w-96 max-w-full bg-stone-300 mb-3" />
          <div className="h-5 w-2/3 max-w-full bg-stone-200" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="h-16 w-full border-2 border-stone-300 bg-stone-200" />

        {/* Filter Underline Tabs Skeleton */}
        <div className="flex gap-4 border-b-2 border-stone-300 pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-stone-200 shrink-0" />
          ))}
        </div>

        {/* Civic Ledger Rows Skeleton */}
        <div className="border-y-2 border-stone-300 divide-y-2 divide-stone-200 bg-white">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-6 w-1/3 bg-stone-300" />
                <div className="h-4 w-1/4 bg-stone-200" />
              </div>
              <div className="h-8 w-32 bg-stone-200 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
