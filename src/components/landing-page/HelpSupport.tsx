import React, { useState } from 'react'

export function HelpSupport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How is my identity verified?',
      answer:
        'We verify your credentials against the Supreme Court of Nigeria enrolment list and confirm your identity using government-issued identification.',
    },
    {
      question: 'When does payment get released?',
      answer:
        'Payments are held securely in escrow and released to the assisting lawyer immediately after the engaging lawyer confirms successful completion of the task.',
    },
    {
      question: "What if there's a dispute?",
      answer:
        'If a dispute arises, our support team reviews evidence submitted by both parties (such as proof of court appearance or completed drafts) and resolves it fairly according to our dispute resolution guidelines.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="help"
      className="w-full bg-white py-20 md:py-28 border-t border-gray-150"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col space-y-5 mb-16">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#00726D]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
              Help and Support
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.2] text-[#041626] tracking-tight max-w-2xl">
            Questions, disputes, and everything in between.
          </h2>
        </div>

        {/* Two-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="md:col-span-7 border-t border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left font-primary text-base md:text-lg font-medium text-[#041626] hover:text-[#00726D] transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <span className="text-xl text-gray-400 font-light ml-4 transition-transform duration-300">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Expandable Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-40 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-sm text-[#242424]/80 leading-relaxed font-secondary font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Support Card */}
          <div className="md:col-span-5 w-full bg-[#041626] text-white p-8 md:p-10 rounded-lg flex flex-col space-y-6.5 shadow-sm">
            <div className="space-y-3">
              <h3 className="font-primary text-xl md:text-2xl font-medium tracking-wide">
                Still need help?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-secondary font-light leading-relaxed">
                Submit a support ticket and our team will respond, or read our
                full dispute resolution guidance.
              </p>
            </div>

            <div>
              <button className="border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-secondary font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded transition-all duration-200 cursor-pointer">
                Submit a support ticket
              </button>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] sm:text-xs text-white/50 font-secondary font-light tracking-wide">
                Contact: kazeemlawal695@yahoo.com &middot; 07065510304
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
