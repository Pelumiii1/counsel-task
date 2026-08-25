import { Skeleton } from '#/components/ui/skeleton'

export function FundTaskSkeleton() {
  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Navigation & Header Skeleton */}
      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-48 h-8 rounded-lg" />
        <Skeleton className="w-96 max-w-full h-4 rounded-md" />
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Column: Breakdown Receipt Skeleton (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-40 h-6 rounded-md" />
            <Skeleton className="w-72 max-w-full h-4 rounded-md" />
          </div>

          <div className="flex flex-col divide-y divide-gray-100">
            <div className="py-3.5 flex justify-between items-center">
              <Skeleton className="w-32 h-4 rounded-md" />
              <Skeleton className="w-20 h-4 rounded-md" />
            </div>
            <div className="py-3.5 flex justify-between items-center">
              <Skeleton className="w-48 h-4 rounded-md" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
            <div className="py-3.5 flex justify-between items-center">
              <Skeleton className="w-24 h-4 rounded-md" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>
            <div className="py-3.5 flex justify-between items-center">
              <Skeleton className="w-40 h-4 rounded-md" />
              <Skeleton className="w-20 h-4 rounded-md" />
            </div>
            <div className="py-4 flex justify-between items-center">
              <Skeleton className="w-36 h-5 rounded-md" />
              <Skeleton className="w-24 h-5 rounded-md" />
            </div>
          </div>

          {/* Secure Escrow Box Skeleton */}
          <Skeleton className="w-full h-16 rounded-xl" />
        </div>

        {/* Right Column: Payment Method Selection Skeleton (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-150 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-36 h-6 rounded-md" />
            <Skeleton className="w-60 max-w-full h-4 rounded-md" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-14 rounded-xl" />
            <Skeleton className="w-full h-14 rounded-xl" />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100 mt-2">
            <Skeleton className="w-36 h-11 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
