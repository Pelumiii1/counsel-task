import { i as e, n as t, t as n } from './jsx-runtime-Cltr0gcK.js'
import { r, t as i } from './index-BAHNh0gS.js'
var a = i(`arrow-right`, [
    [`path`, { d: `M5 12h14`, key: `1ays0h` }],
    [`path`, { d: `m12 5 7 7-7 7`, key: `xquz4c` }],
  ]),
  o = i(`list-filter`, [
    [`path`, { d: `M2 5h20`, key: `1fs1ex` }],
    [`path`, { d: `M6 12h12`, key: `8npq4p` }],
    [`path`, { d: `M9 19h6`, key: `456am0` }],
  ]),
  s = i(`search`, [
    [`path`, { d: `m21 21-4.34-4.34`, key: `14j7rj` }],
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
  ]),
  c = e(t()),
  l = `/assets/post-job-Cy5kd776.png`,
  u = `/assets/apply-job-BcTzjGW9.png`,
  d = n(),
  f = [
    {
      id: `1`,
      title: `Hold Brief — Land Dispute`,
      category: `Property Law`,
      court: `Ikeja High Court`,
      deadline: `Tomorrow, 9:00am`,
      budget: `₦35,000`,
      workers: `3 Proposals`,
      status: `Open`,
    },
    {
      id: `2`,
      title: `Draft Statement of Defence`,
      category: `Commercial Litigation`,
      court: `Remote`,
      deadline: `3 days`,
      budget: `₦120,000`,
      workers: `Tunde Okafor`,
      status: `In Progress`,
    },
    {
      id: `3`,
      title: `Court Appearance — Bail Application`,
      category: `Criminal Law`,
      court: `Yaba Magistrate Court`,
      deadline: `Friday, 8:30am`,
      budget: `₦45,000`,
      workers: `Chiamaka Bello`,
      status: `Awaiting review`,
    },
    {
      id: `4`,
      title: `Tenancy Notice — Review`,
      category: `Criminal Law`,
      court: `Yaba Magistrate Court`,
      deadline: `Friday, 8:30am`,
      budget: `₦45,000`,
      workers: `Funke Adeyemi`,
      status: `Completed`,
    },
  ]
function p() {
  let [e, t] = (0, c.useState)([]),
    [n, i] = (0, c.useState)(``)
  ;(0, c.useEffect)(() => {
    let e = localStorage.getItem(`counsel_tasks`)
    e
      ? t(JSON.parse(e))
      : (localStorage.setItem(`counsel_tasks`, JSON.stringify(f)), t(f))
  }, [])
  let p = () => {
      ;(localStorage.setItem(`counsel_tasks`, JSON.stringify([])), t([]))
    },
    m = () => {
      ;(localStorage.setItem(`counsel_tasks`, JSON.stringify(f)), t(f))
    },
    h = e.filter((e) => e.title.toLowerCase().includes(n.toLowerCase())),
    g = (e) => {
      switch (e) {
        case `Open`:
          return `bg-blue-50 text-blue-600 border-blue-100`
        case `In Progress`:
          return `bg-green-50 text-green-600 border-green-100`
        case `Awaiting review`:
          return `bg-red-50 text-red-600 border-red-100`
        case `Completed`:
          return `bg-gray-100 text-gray-500 border-gray-200`
        default:
          return `bg-gray-50 text-gray-600`
      }
    }
  return (0, d.jsxs)(`div`, {
    className: `flex flex-col w-full min-h-full`,
    children: [
      (0, d.jsxs)(`section`, {
        className: `w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex items-center justify-between gap-4 select-none`,
        children: [
          (0, d.jsxs)(`div`, {
            className: `flex flex-col gap-1`,
            children: [
              (0, d.jsx)(`h1`, {
                className: `font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight`,
                children: `Welcome Oluwarotimi!!`,
              }),
              (0, d.jsx)(`p`, {
                className: `font-secondary text-[13px] text-gray-500 font-normal`,
                children: `What action are you taking today`,
              }),
              (0, d.jsxs)(`div`, {
                className: `mt-2 flex items-center gap-3 text-[11px]`,
                children: [
                  (0, d.jsx)(`button`, {
                    onClick: p,
                    className: `text-red-600 hover:text-red-800 transition cursor-pointer font-medium`,
                    children: `Clear Tasks (Test Empty State)`,
                  }),
                  (0, d.jsx)(`span`, {
                    className: `text-gray-300`,
                    children: `|`,
                  }),
                  (0, d.jsx)(`button`, {
                    onClick: m,
                    className: `text-[#00726d] hover:text-[#005c58] transition cursor-pointer font-medium`,
                    children: `Reset Tasks (Test List State)`,
                  }),
                ],
              }),
            ],
          }),
          e.length > 0 &&
            (0, d.jsx)(r, {
              to: `/dashboard/post-job`,
              className: `inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] px-4 font-secondary text-xs sm:text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shrink-0`,
              children: `New Task`,
            }),
        ],
      }),
      e.length === 0
        ? (0, d.jsx)(`section`, {
            className: `flex-1 w-full px-6 py-12 sm:px-12 flex items-center justify-center`,
            children: (0, d.jsxs)(`div`, {
              className: `grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-190 justify-center`,
              children: [
                (0, d.jsxs)(r, {
                  to: `/dashboard/post-job`,
                  className: `group flex flex-col bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-pointer text-left`,
                  children: [
                    (0, d.jsx)(`div`, {
                      className: `flex items-center justify-center overflow-hidden relative h-40 sm:h-44 bg-[#F7F7F7] rounded-lg`,
                      children: (0, d.jsx)(`img`, {
                        src: l,
                        alt: `Post a job`,
                        className: `w-36 h-36 object-contain absolute -bottom-6 group-hover:scale-105 transition-transform duration-300`,
                      }),
                    }),
                    (0, d.jsxs)(`div`, {
                      className: `pt-5 px-1 flex flex-col gap-1.5`,
                      children: [
                        (0, d.jsxs)(`div`, {
                          className: `flex items-center justify-between`,
                          children: [
                            (0, d.jsx)(`h3`, {
                              className: `font-secondary text-[15px] font-bold text-[#00726D]`,
                              children: `Post a Job`,
                            }),
                            (0, d.jsx)(a, {
                              className: `w-4.5 h-4.5 text-[#00726D] transition-transform duration-300 group-hover:translate-x-1`,
                            }),
                          ],
                        }),
                        (0, d.jsx)(`p`, {
                          className: `font-secondary text-xs sm:text-[13px] text-gray-500 leading-[1.6]`,
                          children: `Post a job and approve or decline job request`,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, d.jsxs)(`div`, {
                  className: `group flex flex-col bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-pointer`,
                  children: [
                    (0, d.jsx)(`div`, {
                      className: `flex items-center justify-center overflow-hidden relative h-40 sm:h-44 bg-[#F7F7F7] rounded-lg`,
                      children: (0, d.jsx)(`img`, {
                        src: u,
                        alt: `Apply for job`,
                        className: `w-36 h-36 object-contain absolute -bottom-6 group-hover:scale-105 transition-transform duration-300`,
                      }),
                    }),
                    (0, d.jsxs)(`div`, {
                      className: `pt-5 px-1 flex flex-col gap-1.5`,
                      children: [
                        (0, d.jsxs)(`div`, {
                          className: `flex items-center justify-between`,
                          children: [
                            (0, d.jsx)(`h3`, {
                              className: `font-secondary text-[15px] font-bold text-[#00726D]`,
                              children: `Apply for Job`,
                            }),
                            (0, d.jsx)(a, {
                              className: `w-4.5 h-4.5 text-[#00726D] transition-transform duration-300 group-hover:translate-x-1`,
                            }),
                          ],
                        }),
                        (0, d.jsx)(`p`, {
                          className: `font-secondary text-xs sm:text-[13px] text-gray-500 leading-[1.6]`,
                          children: `Sign up, Apply for job, deliver your best and get paid`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        : (0, d.jsxs)(`section`, {
            className: `flex-1 w-full px-6 py-10 sm:px-12 flex flex-col gap-6`,
            children: [
              (0, d.jsxs)(`div`, {
                className: `flex flex-col gap-1 select-none`,
                children: [
                  (0, d.jsx)(`h2`, {
                    className: `text-xl sm:text-2xl font-semibold text-black`,
                    children: `All tasks`,
                  }),
                  (0, d.jsx)(`p`, {
                    className: `text-xs sm:text-sm text-gray-500 font-normal`,
                    children: `Every task you've posted, with its current status. Click one to pick up where you left off.`,
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `flex flex-col sm:flex-row gap-3 items-stretch sm:items-center`,
                children: [
                  (0, d.jsxs)(`div`, {
                    className: `relative flex-1 max-w-sm`,
                    children: [
                      (0, d.jsx)(`span`, {
                        className: `absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none`,
                        children: (0, d.jsx)(s, { className: `w-4.5 h-4.5` }),
                      }),
                      (0, d.jsx)(`input`, {
                        type: `text`,
                        value: n,
                        onChange: (e) => i(e.target.value),
                        placeholder: `Search task`,
                        className: `w-full h-[38px] pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none`,
                      }),
                    ],
                  }),
                  (0, d.jsxs)(`div`, {
                    className: `flex flex-wrap gap-2`,
                    children: [
                      (0, d.jsxs)(`button`, {
                        className: `inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer`,
                        children: [
                          (0, d.jsx)(o, { className: `w-3.5 h-3.5` }),
                          (0, d.jsx)(`span`, { children: `Court Location` }),
                        ],
                      }),
                      (0, d.jsxs)(`button`, {
                        className: `inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer`,
                        children: [
                          (0, d.jsx)(o, { className: `w-3.5 h-3.5` }),
                          (0, d.jsx)(`span`, { children: `Budget` }),
                        ],
                      }),
                      (0, d.jsxs)(`button`, {
                        className: `inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer`,
                        children: [
                          (0, d.jsx)(o, { className: `w-3.5 h-3.5` }),
                          (0, d.jsx)(`span`, { children: `Status` }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `w-full bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)]`,
                children: [
                  (0, d.jsx)(`div`, {
                    className: `overflow-x-auto w-full`,
                    children: (0, d.jsxs)(`table`, {
                      className: `w-full border-collapse`,
                      children: [
                        (0, d.jsx)(`thead`, {
                          children: (0, d.jsxs)(`tr`, {
                            className: `border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none`,
                            children: [
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left w-12`,
                              }),
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left`,
                                children: `Task`,
                              }),
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left`,
                                children: `Court`,
                              }),
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left`,
                                children: `Deadline`,
                              }),
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left`,
                                children: `Budget`,
                              }),
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left`,
                                children: `Workers`,
                              }),
                              (0, d.jsx)(`th`, {
                                className: `px-6 py-4 text-left`,
                                children: `Status`,
                              }),
                            ],
                          }),
                        }),
                        (0, d.jsx)(`tbody`, {
                          className: `divide-y divide-gray-100`,
                          children:
                            h.length > 0
                              ? h.map((e) =>
                                  (0, d.jsxs)(
                                    `tr`,
                                    {
                                      className: `hover:bg-gray-50/50 transition text-sm font-normal text-[#242424] cursor-pointer`,
                                      children: [
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left`,
                                          onClick: (e) => e.stopPropagation(),
                                          children: (0, d.jsx)(`input`, {
                                            type: `checkbox`,
                                            className: `rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer`,
                                          }),
                                        }),
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left`,
                                          children: (0, d.jsxs)(`div`, {
                                            className: `flex flex-col gap-0.5`,
                                            children: [
                                              (0, d.jsx)(`span`, {
                                                className: `font-semibold text-gray-900 leading-tight`,
                                                children: e.title,
                                              }),
                                              (0, d.jsx)(`span`, {
                                                className: `text-[11px] text-gray-400 font-normal`,
                                                children: e.category,
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left text-gray-600`,
                                          children: e.court,
                                        }),
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left text-gray-600`,
                                          children: e.deadline,
                                        }),
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left text-gray-900 font-medium`,
                                          children: e.budget,
                                        }),
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left text-gray-600`,
                                          children: e.workers,
                                        }),
                                        (0, d.jsx)(`td`, {
                                          className: `px-6 py-4 text-left`,
                                          children: (0, d.jsx)(`span`, {
                                            className: `inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full border ${g(e.status)}`,
                                            children: e.status,
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                )
                              : (0, d.jsx)(`tr`, {
                                  children: (0, d.jsx)(`td`, {
                                    colSpan: 7,
                                    className: `px-6 py-8 text-center text-gray-400 font-normal`,
                                    children: `No tasks found matching your search.`,
                                  }),
                                }),
                        }),
                      ],
                    }),
                  }),
                  (0, d.jsxs)(`div`, {
                    className: `p-4 bg-gray-50/20 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 select-none`,
                    children: [
                      (0, d.jsxs)(`span`, {
                        children: [`0 of `, h.length, ` row(s) selected.`],
                      }),
                      (0, d.jsxs)(`div`, {
                        className: `flex items-center gap-2`,
                        children: [
                          (0, d.jsx)(`button`, {
                            className: `h-8 px-3 rounded border border-gray-200 bg-white text-xs font-medium text-gray-400 cursor-not-allowed select-none`,
                            children: `Previous`,
                          }),
                          (0, d.jsx)(`button`, {
                            className: `h-8 px-3 rounded border border-gray-200 bg-white text-xs font-medium text-gray-400 cursor-not-allowed select-none`,
                            children: `Next`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
    ],
  })
}
export { p as component }
