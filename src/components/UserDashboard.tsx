import mainImg from '../assets/landingpage/main.png'

export function UserDashboard() {
  return (
    <section className="w-full bg-white py-20 md:py-28 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col space-y-5 mb-12">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#00726D]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
              User Dashboard
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.2] text-[#041626] tracking-tight">
            Everything you need, in one place.
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-[#242424]/80 leading-relaxed font-secondary font-light max-w-xl">
            Every account — engaging or assisting — gets a dashboard covering
            tasks, messages, documents, payments, notifications, ratings, and
            account settings.
          </p>
        </div>

        {/* Dashboard Mockup Image Container */}
        <div className="w-full rounded-xl overflow-hidden border border-gray-200/50 shadow-2xl shadow-[#041626]/5 hover:shadow-3xl transition-all duration-300">
          <img
            src={mainImg}
            alt="Counsel Task User Dashboard Preview"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  )
}
