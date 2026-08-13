import logoImg from '../../assets/logo-white.png'

export function Footer() {
  const columns = [
    {
      title: 'Platform',
      links: [
        'How It Works',
        'For Engaging Lawyers',
        'For Assisting Lawyers',
        'Pricing',
      ],
    },
    {
      title: 'Support',
      links: ['Help Centre', 'Submit a Ticket', 'Dispute Guidance'],
    },
    {
      title: 'Policies',
      links: ['Terms of Use', 'Privacy Policy', 'Complaints Policy'],
    },
    {
      title: 'Social',
      links: ['Twitter', 'LinkedIn', 'Facebook'],
    },
  ]

  return (
    <footer className="w-full bg-[#041626] text-white pt-16 pb-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pb-12">
          {/* Logo & Description */}
          <div className="md:col-span-4 flex flex-col space-y-5">
            <div className="flex">
              <img
                src={logoImg}
                alt="Counsel Task Logo"
                className="h-30 w-auto brightness-0 invert object-cover"
              />
            </div>
            <p className="text-xs sm:text-sm text-white leading-relaxed font-secondary font-normal max-w-xs">
              A verified marketplace for Nigerian legal practitioners.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((column, idx) => (
              <div key={idx} className="flex flex-col space-y-4">
                <h4 className="font-primary text-sm font-medium text-white tracking-wide">
                  {column.title}
                </h4>
                <ul className="space-y-3 font-secondary text-xs sm:text-sm font-light text-[#E9D7FE]">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="hover:text-[#CF6A52] transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright Notice */}
          <p className="text-sm text-white! font-secondary font-medium">
            &copy; 2026 Casebox Technology Nigeria Ltd.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-6 text-white">
            {/* Twitter/X */}
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
