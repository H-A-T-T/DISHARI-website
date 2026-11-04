export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div>
          <div className="h-6 w-48 bg-stone-200 rounded-full mb-4" />
          <div className="h-10 w-80 bg-stone-200 rounded-2xl mb-3" />
          <div className="h-4 w-96 max-w-full bg-stone-200 rounded-lg" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="h-16 w-full max-w-3xl bg-stone-200 rounded-2xl" />

        {/* Filter Pills Skeleton */}
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-28 bg-stone-200 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-stone-200 rounded-xl" />
                <div className="h-6 w-24 bg-stone-200 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-stone-200 rounded-lg" />
                <div className="h-4 w-1/2 bg-stone-100 rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-12 bg-stone-100 rounded-xl" />
                <div className="h-12 bg-stone-100 rounded-xl" />
                <div className="h-12 bg-stone-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
