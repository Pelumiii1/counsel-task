import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { useMyTasks, type TaskItem } from '#/hooks/useTasks'

export const Route = createFileRoute('/(engaging-laywers)/engaging-dashboard/ratings')({
  component: RatingsPage,
})

interface RatedTask extends TaskItem {
  rating: number
  feedback?: string
}

function RatingsPage() {
  const { data: serverTasks, isLoading } = useMyTasks()
  const [localTasks, setLocalTasks] = useState<any[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('counsel_tasks')
      if (stored) {
        setLocalTasks(JSON.parse(stored))
      }
    } catch (_) {}
  }, [])

  // Merge server tasks with local storage tasks
  const mergedMap = new Map<string, any>()
  ;(serverTasks || []).forEach((st) => {
    mergedMap.set(String(st.id), { ...st })
  })
  localTasks.forEach((lt) => {
    const existing = mergedMap.get(String(lt.id))
    if (existing) {
      mergedMap.set(String(lt.id), { ...existing, ...lt })
    } else {
      mergedMap.set(String(lt.id), lt)
    }
  })

  const allTasks = Array.from(mergedMap.values())

  // Only include tasks where a real rating was actually submitted
  const ratedTasks = allTasks
    .filter(
      (t): t is RatedTask =>
        typeof t.rating === 'number' && t.rating > 0,
    )
    .map((t) => ({
      ...t,
      rating: t.rating,
      feedback: t.feedback || '',
      workers: t.workers || 'Assigned Counsel',
    }))

  // Compute average rating
  const totalRatings = ratedTasks.length
  const avgRating =
    totalRatings > 0
      ? ratedTasks.reduce((sum, t) => sum + t.rating, 0) / totalRatings
      : 0

  // Count per star level
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  ratedTasks.forEach((t) => {
    const star = Math.min(5, Math.max(1, Math.round(t.rating)))
    counts[star] = (counts[star] || 0) + 1
  })
  const maxCount = Math.max(...Object.values(counts), 1)

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-1 select-none mb-2">
        <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
          Ratings you've given
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Ratings you've left for lawyers after completing a task.
        </p>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#00726D]/30 border-t-[#00726D] rounded-full animate-spin" />
            <p className="text-xs text-gray-500">Loading ratings...</p>
          </div>
        </div>
      ) : totalRatings === 0 ? (
        /* Empty state */
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 text-center max-w-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5F3] flex items-center justify-center select-none">
              <Star className="w-7 h-7 text-[#00726D] stroke-[1.8]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-base font-semibold text-gray-900">
                No ratings yet
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Once you approve and rate a completed task, your reviews will appear here.
              </p>
            </div>
            <Link
              to="/engaging-dashboard"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#00726d] px-5 text-xs font-semibold text-white transition hover:bg-[#005c58] cursor-pointer"
            >
              View Tasks
            </Link>
          </div>
        </div>
      ) : (
        /* Main card with data */
        <div className="w-full mx-auto max-w-6xl bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-8">
          {/* Top Summary Block */}
          <div className="flex items-center gap-4 select-none">
            <span className="text-[40px] sm:text-[48px] font-bold text-gray-900 leading-none">
              {avgRating.toFixed(1)}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-0.5 text-xl text-[#00726d]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= Math.round(avgRating) ? 'opacity-100' : 'opacity-20'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400 font-normal">
                Based on {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
              </span>
            </div>
          </div>

          {/* Rating Bars distribution */}
          <div className="flex flex-col gap-3 w-full select-none">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = counts[star] || 0
              const pct = totalRatings > 0 ? Math.round((count / maxCount) * 100) : 0
              return (
                <div key={star} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-500">
                  <span className="w-3">{star}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00726d] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-5 text-right font-medium text-gray-400">{count}</span>
                </div>
              )
            })}
          </div>

          {/* Separator line */}
          <div className="w-full h-px bg-gray-100" />

          {/* Reviews List */}
          <div className="flex flex-col gap-4 w-full">
            {ratedTasks.map((task, index) => (
              <div
                key={task.id || index}
                className="w-full border border-gray-150 rounded-xl p-5 flex flex-col gap-2.5 text-left"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between w-full select-none">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                      {task.workers || 'Lawyer'}
                    </span>
                    <span className="text-[11px] text-gray-400 font-normal">
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-sm text-[#00726d]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= task.rating ? 'opacity-100' : 'opacity-20'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feedback text */}
                {(task as any).feedback && (
                  <p className="text-[11px] sm:text-xs text-gray-500 font-normal leading-relaxed">
                    {(task as any).feedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
