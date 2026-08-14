import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(engaging-laywers)/dashboard/ratings')({
  component: RatingsPage,
})

interface Task {
  id: string
  title: string
  category: string
  court: string
  deadline: string
  budget: string
  workers: string
  status: 'Open' | 'In Progress' | 'Awaiting review' | 'Completed'
  rating?: number
  feedback?: string
}

interface Review {
  lawyer: string
  rating: number
  feedback: string
}

function RatingsPage() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Dynamic reviews from completed tasks
    const stored = localStorage.getItem('counsel_tasks')
    const dynamicReviews: Review[] = []

    if (stored) {
      const tasks: Task[] = JSON.parse(stored)
      tasks.forEach((t) => {
        if (t.status === 'Completed' && t.rating !== undefined) {
          dynamicReviews.push({
            lawyer: t.workers,
            rating: t.rating,
            feedback: t.feedback || 'Excellent work completed.',
          })
        }
      })
    }

    // Default mock reviews from screenshot
    const defaultReviews: Review[] = [
      {
        lawyer: 'Funke Adeyemi',
        rating: 5,
        feedback:
          'Excellent — arrived early and sent a clear hearing note straight after.',
      },
      {
        lawyer: 'Chiamaka Bello',
        rating: 5,
        feedback: 'Very thorough, handled the bail application professionally.',
      },
    ]

    setReviews([...dynamicReviews, ...defaultReviews])
  }, [])

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-1 select-none mb-2">
        <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
          Ratings you've given
        </h1>
      </div>

      {/* Main card */}
      <div className="w-full mx-auto max-w-6xl bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-8">
        {/* Top Summary Block */}
        <div className="flex items-center gap-3 select-none">
          <span className="text-[32px] sm:text-[40px] font-bold text-gray-900 leading-none">
            4.0
          </span>
          <div className="flex items-center gap-1 text-lg text-[#00726d]">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span className="text-gray-200">★</span>
          </div>
        </div>

        {/* Rating Bars distribution */}
        <div className="flex flex-col gap-3 w-full select-none">
          {/* Row 5 */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-505">
            <span className="w-3">5</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00726d] rounded-full"
                style={{ width: '83%' }}
              />
            </div>
            <span className="w-5 text-right font-medium text-gray-400">40</span>
          </div>

          {/* Row 4 */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-505">
            <span className="w-3">4</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00726d] rounded-full"
                style={{ width: '42%' }}
              />
            </div>
            <span className="w-5 text-right font-medium text-gray-400">20</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-505">
            <span className="w-3">3</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00726d] rounded-full"
                style={{ width: '38%' }}
              />
            </div>
            <span className="w-5 text-right font-medium text-gray-400">18</span>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-505">
            <span className="w-3">2</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00726d] rounded-full"
                style={{ width: '10%' }}
              />
            </div>
            <span className="w-5 text-right font-medium text-gray-400">3</span>
          </div>

          {/* Row 1 */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-505">
            <span className="w-3">1</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00726d] rounded-full"
                style={{ width: '6%' }}
              />
            </div>
            <span className="w-5 text-right font-medium text-gray-400">2</span>
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-px bg-gray-100" />

        {/* Reviews List */}
        <div className="flex flex-col gap-4 w-full">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="w-full border border-gray-150 rounded-xl p-5 flex flex-col gap-2.5 text-left"
            >
              {/* Review Header info */}
              <div className="flex items-center justify-between w-full select-none">
                <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                  {rev.lawyer}
                </span>
                <div className="flex items-center gap-0.5 text-sm text-[#00726d]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= rev.rating ? 'opacity-100' : 'opacity-20'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Review feedback text */}
              <p className="text-[11px] sm:text-xs text-gray-650 font-normal leading-relaxed">
                {rev.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
