import { i as __toESM } from '../_runtime.mjs'
import {
  F as require_react,
  g as Link,
  v as require_jsx_runtime,
} from '../_libs/@tanstack/react-router+[...].mjs'
import {
  n as Search,
  s as ListFilter,
  y as ArrowRight,
} from '../_libs/lucide-react.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-qICTUJfA.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var post_job_default = '/assets/post-job-Cy5kd776.png'
var apply_job_default = '/assets/apply-job-BcTzjGW9.png'
var DEFAULT_TASKS = [
  {
    id: '1',
    title: 'Hold Brief — Land Dispute',
    category: 'Property Law',
    court: 'Ikeja High Court',
    deadline: 'Tomorrow, 9:00am',
    budget: '₦35,000',
    workers: '3 Proposals',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Draft Statement of Defence',
    category: 'Commercial Litigation',
    court: 'Remote',
    deadline: '3 days',
    budget: '₦120,000',
    workers: 'Tunde Okafor',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Court Appearance — Bail Application',
    category: 'Criminal Law',
    court: 'Yaba Magistrate Court',
    deadline: 'Friday, 8:30am',
    budget: '₦45,000',
    workers: 'Chiamaka Bello',
    status: 'Awaiting review',
  },
  {
    id: '4',
    title: 'Tenancy Notice — Review',
    category: 'Criminal Law',
    court: 'Yaba Magistrate Court',
    deadline: 'Friday, 8:30am',
    budget: '₦45,000',
    workers: 'Funke Adeyemi',
    status: 'Completed',
  },
]
function DashboardIndex() {
  const [tasks, setTasks] = (0, import_react.useState)([])
  const [searchQuery, setSearchQuery] = (0, import_react.useState)('')
  ;(0, import_react.useEffect)(() => {
    const stored = localStorage.getItem('counsel_tasks')
    if (stored) setTasks(JSON.parse(stored))
    else {
      localStorage.setItem('counsel_tasks', JSON.stringify(DEFAULT_TASKS))
      setTasks(DEFAULT_TASKS)
    }
  }, [])
  const handleClearTasks = () => {
    localStorage.setItem('counsel_tasks', JSON.stringify([]))
    setTasks([])
  }
  const handleResetTasks = () => {
    localStorage.setItem('counsel_tasks', JSON.stringify(DEFAULT_TASKS))
    setTasks(DEFAULT_TASKS)
  }
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'In Progress':
        return 'bg-green-50 text-green-600 border-green-100'
      case 'Awaiting review':
        return 'bg-red-50 text-red-600 border-red-100'
      case 'Completed':
        return 'bg-gray-100 text-gray-500 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex flex-col w-full min-h-full',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('section', {
        className:
          'w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex items-center justify-between gap-4 select-none',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-1',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
                className:
                  'font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight',
                children: 'Welcome Oluwarotimi!!',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                className:
                  'font-secondary text-[13px] text-gray-500 font-normal',
                children: 'What action are you taking today',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'mt-2 flex items-center gap-3 text-[11px]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('button', {
                    onClick: handleClearTasks,
                    className:
                      'text-red-600 hover:text-red-800 transition cursor-pointer font-medium',
                    children: 'Clear Tasks (Test Empty State)',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    className: 'text-gray-300',
                    children: '|',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('button', {
                    onClick: handleResetTasks,
                    className:
                      'text-[#00726d] hover:text-[#005c58] transition cursor-pointer font-medium',
                    children: 'Reset Tasks (Test List State)',
                  }),
                ],
              }),
            ],
          }),
          tasks.length > 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: '/dashboard/post-job',
              className:
                'inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] px-4 font-secondary text-xs sm:text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shrink-0',
              children: 'New Task',
            }),
        ],
      }),
      tasks.length === 0
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('section', {
            className:
              'flex-1 w-full px-6 py-12 sm:px-12 flex items-center justify-center',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className:
                'grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-190 justify-center',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                  to: '/dashboard/post-job',
                  className:
                    'group flex flex-col bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-pointer text-left',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className:
                        'flex items-center justify-center overflow-hidden relative h-40 sm:h-44 bg-[#F7F7F7] rounded-lg',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        'img',
                        {
                          src: post_job_default,
                          alt: 'Post a job',
                          className:
                            'w-36 h-36 object-contain absolute -bottom-6 group-hover:scale-105 transition-transform duration-300',
                        },
                      ),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      className: 'pt-5 px-1 flex flex-col gap-1.5',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                              className:
                                'font-secondary text-[15px] font-bold text-[#00726D]',
                              children: 'Post a Job',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              ArrowRight,
                              {
                                className:
                                  'w-4.5 h-4.5 text-[#00726D] transition-transform duration-300 group-hover:translate-x-1',
                              },
                            ),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          className:
                            'font-secondary text-xs sm:text-[13px] text-gray-500 leading-[1.6]',
                          children:
                            'Post a job and approve or decline job request',
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  className:
                    'group flex flex-col bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-pointer',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      className:
                        'flex items-center justify-center overflow-hidden relative h-40 sm:h-44 bg-[#F7F7F7] rounded-lg',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        'img',
                        {
                          src: apply_job_default,
                          alt: 'Apply for job',
                          className:
                            'w-36 h-36 object-contain absolute -bottom-6 group-hover:scale-105 transition-transform duration-300',
                        },
                      ),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      className: 'pt-5 px-1 flex flex-col gap-1.5',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                              className:
                                'font-secondary text-[15px] font-bold text-[#00726D]',
                              children: 'Apply for Job',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              ArrowRight,
                              {
                                className:
                                  'w-4.5 h-4.5 text-[#00726D] transition-transform duration-300 group-hover:translate-x-1',
                              },
                            ),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          className:
                            'font-secondary text-xs sm:text-[13px] text-gray-500 leading-[1.6]',
                          children:
                            'Sign up, Apply for job, deliver your best and get paid',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('section', {
            className: 'flex-1 w-full px-6 py-10 sm:px-12 flex flex-col gap-6',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className: 'flex flex-col gap-1 select-none',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
                    className: 'text-xl sm:text-2xl font-semibold text-black',
                    children: 'All tasks',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-xs sm:text-sm text-gray-500 font-normal',
                    children:
                      "Every task you've posted, with its current status. Click one to pick up where you left off.",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className:
                  'flex flex-col sm:flex-row gap-3 items-stretch sm:items-center',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'relative flex-1 max-w-sm',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                        className:
                          'absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          Search,
                          { className: 'w-4.5 h-4.5' },
                        ),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
                        type: 'text',
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                        placeholder: 'Search task',
                        className:
                          'w-full h-[38px] pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className: 'flex flex-wrap gap-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('button', {
                        className:
                          'inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            ListFilter,
                            { className: 'w-3.5 h-3.5' },
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            children: 'Court Location',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('button', {
                        className:
                          'inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            ListFilter,
                            { className: 'w-3.5 h-3.5' },
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            children: 'Budget',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('button', {
                        className:
                          'inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            ListFilter,
                            { className: 'w-3.5 h-3.5' },
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            children: 'Status',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                className:
                  'w-full bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    className: 'overflow-x-auto w-full',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      'table',
                      {
                        className: 'w-full border-collapse',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('thead', {
                            children: /* @__PURE__ */ (0,
                            import_jsx_runtime.jsxs)('tr', {
                              className:
                                'border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  { className: 'px-6 py-4 text-left w-12' },
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  {
                                    className: 'px-6 py-4 text-left',
                                    children: 'Task',
                                  },
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  {
                                    className: 'px-6 py-4 text-left',
                                    children: 'Court',
                                  },
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  {
                                    className: 'px-6 py-4 text-left',
                                    children: 'Deadline',
                                  },
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  {
                                    className: 'px-6 py-4 text-left',
                                    children: 'Budget',
                                  },
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  {
                                    className: 'px-6 py-4 text-left',
                                    children: 'Workers',
                                  },
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  'th',
                                  {
                                    className: 'px-6 py-4 text-left',
                                    children: 'Status',
                                  },
                                ),
                              ],
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('tbody', {
                            className: 'divide-y divide-gray-100',
                            children:
                              filteredTasks.length > 0
                                ? filteredTasks.map((task) =>
                                    /* @__PURE__ */ (0,
                                    import_jsx_runtime.jsxs)(
                                      'tr',
                                      {
                                        className:
                                          'hover:bg-gray-50/50 transition text-sm font-normal text-[#242424] cursor-pointer',
                                        children: [
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className: 'px-6 py-4 text-left',
                                            onClick: (e) => e.stopPropagation(),
                                            children: /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsx)('input', {
                                              type: 'checkbox',
                                              className:
                                                'rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer',
                                            }),
                                          }),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className: 'px-6 py-4 text-left',
                                            children: /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsxs)('div', {
                                              className:
                                                'flex flex-col gap-0.5',
                                              children: [
                                                /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsx)(
                                                  'span',
                                                  {
                                                    className:
                                                      'font-semibold text-gray-900 leading-tight',
                                                    children: task.title,
                                                  },
                                                ),
                                                /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsx)(
                                                  'span',
                                                  {
                                                    className:
                                                      'text-[11px] text-gray-400 font-normal',
                                                    children: task.category,
                                                  },
                                                ),
                                              ],
                                            }),
                                          }),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className:
                                              'px-6 py-4 text-left text-gray-600',
                                            children: task.court,
                                          }),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className:
                                              'px-6 py-4 text-left text-gray-600',
                                            children: task.deadline,
                                          }),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className:
                                              'px-6 py-4 text-left text-gray-900 font-medium',
                                            children: task.budget,
                                          }),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className:
                                              'px-6 py-4 text-left text-gray-600',
                                            children: task.workers,
                                          }),
                                          /* @__PURE__ */ (0,
                                          import_jsx_runtime.jsx)('td', {
                                            className: 'px-6 py-4 text-left',
                                            children: /* @__PURE__ */ (0,
                                            import_jsx_runtime.jsx)('span', {
                                              className: `inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusStyle(task.status)}`,
                                              children: task.status,
                                            }),
                                          }),
                                        ],
                                      },
                                      task.id,
                                    ),
                                  )
                                : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    'tr',
                                    {
                                      children: /* @__PURE__ */ (0,
                                      import_jsx_runtime.jsx)('td', {
                                        colSpan: 7,
                                        className:
                                          'px-6 py-8 text-center text-gray-400 font-normal',
                                        children:
                                          'No tasks found matching your search.',
                                      }),
                                    },
                                  ),
                          }),
                        ],
                      },
                    ),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    className:
                      'p-4 bg-gray-50/20 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 select-none',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                        children: [
                          '0 of ',
                          filteredTasks.length,
                          ' row(s) selected.',
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            'button',
                            {
                              className:
                                'h-8 px-3 rounded border border-gray-200 bg-white text-xs font-medium text-gray-400 cursor-not-allowed select-none',
                              children: 'Previous',
                            },
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            'button',
                            {
                              className:
                                'h-8 px-3 rounded border border-gray-200 bg-white text-xs font-medium text-gray-400 cursor-not-allowed select-none',
                              children: 'Next',
                            },
                          ),
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
//#endregion
export { DashboardIndex as component }
