import { i as e, n as t, t as n } from './jsx-runtime-Cltr0gcK.js'
import { i as r, t as i } from './index-BAHNh0gS.js'
import { n as a, r as o, t as s } from './constants-BQ4ZHUjo.js'
var c = i(`bold`, [
    [
      `path`,
      {
        d: `M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8`,
        key: `mg9rjx`,
      },
    ],
  ]),
  l = i(`info`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 16v-4`, key: `1dtifu` }],
    [`path`, { d: `M12 8h.01`, key: `e9boi3` }],
  ]),
  u = i(`italic`, [
    [`line`, { x1: `19`, x2: `10`, y1: `4`, y2: `4`, key: `15jd3p` }],
    [`line`, { x1: `14`, x2: `5`, y1: `20`, y2: `20`, key: `bu0au3` }],
    [`line`, { x1: `15`, x2: `9`, y1: `4`, y2: `20`, key: `uljnxc` }],
  ]),
  d = i(`link`, [
    [
      `path`,
      {
        d: `M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71`,
        key: `1cjeqo`,
      },
    ],
    [
      `path`,
      {
        d: `M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71`,
        key: `19qd67`,
      },
    ],
  ]),
  f = i(`list-ordered`, [
    [`path`, { d: `M11 5h10`, key: `1cz7ny` }],
    [`path`, { d: `M11 12h10`, key: `1438ji` }],
    [`path`, { d: `M11 19h10`, key: `11t30w` }],
    [`path`, { d: `M4 4h1v5`, key: `10yrso` }],
    [`path`, { d: `M4 9h2`, key: `r1h2o0` }],
    [
      `path`,
      {
        d: `M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02`,
        key: `xtkcd5`,
      },
    ],
  ]),
  p = i(`list`, [
    [`path`, { d: `M3 5h.01`, key: `18ugdj` }],
    [`path`, { d: `M3 12h.01`, key: `nlz23k` }],
    [`path`, { d: `M3 19h.01`, key: `noohij` }],
    [`path`, { d: `M8 5h13`, key: `1pao27` }],
    [`path`, { d: `M8 12h13`, key: `1za7za` }],
    [`path`, { d: `M8 19h13`, key: `m83p4d` }],
  ]),
  m = i(`rotate-ccw`, [
    [
      `path`,
      { d: `M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`, key: `1357e3` },
    ],
    [`path`, { d: `M3 3v5h5`, key: `1xhq8a` }],
  ]),
  h = i(`rotate-cw`, [
    [
      `path`,
      { d: `M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8`, key: `1p45f6` },
    ],
    [`path`, { d: `M21 3v5h-5`, key: `1q7to0` }],
  ]),
  g = i(`upload`, [
    [`path`, { d: `M12 3v12`, key: `1x0j5s` }],
    [`path`, { d: `m17 8-5-5-5 5`, key: `7q97r8` }],
    [`path`, { d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`, key: `ih7n3h` }],
  ]),
  _ = e(t()),
  v = n()
function y() {
  let e = r(),
    [t, n] = (0, _.useState)(``),
    [i, y] = (0, _.useState)(``),
    [b, x] = (0, _.useState)(`Property Law`),
    [S, C] = (0, _.useState)(``),
    [w, T] = (0, _.useState)(``),
    [E, D] = (0, _.useState)(``),
    [O, k] = (0, _.useState)(`standard`),
    [A, j] = (0, _.useState)(null),
    [M, N] = (0, _.useState)(``)
  return (0, v.jsxs)(`div`, {
    className: `flex flex-col w-full min-h-full font-secondary`,
    children: [
      (0, v.jsxs)(`section`, {
        className: `w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none`,
        children: [
          (0, v.jsx)(`h1`, {
            className: `font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight`,
            children: `Welcome Oluwarotimi!!`,
          }),
          (0, v.jsx)(`p`, {
            className: `font-secondary text-[13px] text-gray-500 font-normal`,
            children: `What action are you taking today`,
          }),
        ],
      }),
      (0, v.jsxs)(`section`, {
        className: `flex-1 w-full max-w-4xl mx-auto px-6 py-10 sm:px-12`,
        children: [
          (0, v.jsxs)(`div`, {
            className: `flex flex-col gap-1.5 select-none`,
            children: [
              (0, v.jsx)(`h2`, {
                className: `font-primary text-2xl font-semibold text-black`,
                children: `Post a task`,
              }),
              (0, v.jsx)(`p`, {
                className: `text-sm text-gray-500 font-normal leading-relaxed`,
                children: `Describe what you need. Verified lawyers matching your practice area will be able to submit proposals.`,
              }),
            ],
          }),
          (0, v.jsxs)(`form`, {
            onSubmit: (n) => {
              if (
                (n.preventDefault(), N(``), !t || !i || !b || !S || !w || !E)
              ) {
                N(`Please complete all required fields.`)
                return
              }
              let r = parseFloat(E.replace(/[^0-9]/g, ``))
              if (b === `Property Law` && r < 3e4) {
                N(`Proposed fee is below the minimum limit for Property Law.`)
                return
              }
              let a = localStorage.getItem(`counsel_tasks`),
                o = a ? JSON.parse(a) : [],
                s = {
                  id: Date.now().toString(),
                  title: t,
                  category: b,
                  court: S,
                  deadline: w,
                  budget: E.startsWith(`₦`) ? E : `₦${E}`,
                  workers: `0 Proposals`,
                  status: `Open`,
                },
                c = [...o, s]
              ;(localStorage.setItem(`counsel_tasks`, JSON.stringify(c)),
                e({ to: `/dashboard` }))
            },
            className: `mt-8 bg-white border border-gray-150 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 sm:p-8 flex flex-col gap-6`,
            children: [
              (0, v.jsxs)(`label`, {
                className: a,
                children: [
                  (0, v.jsxs)(`span`, { children: [`Task Title `, o] }),
                  (0, v.jsx)(`input`, {
                    type: `text`,
                    value: t,
                    onChange: (e) => n(e.target.value),
                    placeholder: `e.g Hold brief - Land Dispute`,
                    className: s,
                  }),
                ],
              }),
              (0, v.jsxs)(`div`, {
                className: `flex flex-col gap-2`,
                children: [
                  (0, v.jsxs)(`span`, {
                    className: `text-sm font-semibold text-[#080a0f]`,
                    children: [`Service Description `, o],
                  }),
                  (0, v.jsxs)(`div`, {
                    className: `w-full rounded-lg border border-[#dedfe3] bg-white overflow-hidden focus-within:border-[#00726D]/50 focus-within:ring-2 focus-within:ring-[#00726D]/10`,
                    children: [
                      (0, v.jsxs)(`div`, {
                        className: `h-10 border-b border-[#dedfe3] bg-[#f9fafb] px-3 flex items-center gap-4 text-gray-500 select-none`,
                        children: [
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(c, { className: `w-4 h-4` }),
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(u, { className: `w-4 h-4` }),
                          }),
                          (0, v.jsx)(`div`, {
                            className: `w-px h-5 bg-gray-200`,
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(p, { className: `w-4 h-4` }),
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(f, { className: `w-4 h-4` }),
                          }),
                          (0, v.jsx)(`div`, {
                            className: `w-px h-5 bg-gray-200`,
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(d, { className: `w-4 h-4` }),
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(`svg`, {
                              className: `w-4 h-4`,
                              fill: `none`,
                              viewBox: `0 0 24 24`,
                              stroke: `currentColor`,
                              strokeWidth: 2,
                              children: (0, v.jsx)(`path`, {
                                strokeLinecap: `round`,
                                strokeLinejoin: `round`,
                                d: `M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89`,
                              }),
                            }),
                          }),
                          (0, v.jsx)(`div`, {
                            className: `w-px h-5 bg-gray-200`,
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(m, { className: `w-4 h-4` }),
                          }),
                          (0, v.jsx)(`button`, {
                            type: `button`,
                            className: `p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer`,
                            children: (0, v.jsx)(h, { className: `w-4 h-4` }),
                          }),
                        ],
                      }),
                      (0, v.jsx)(`textarea`, {
                        value: i,
                        onChange: (e) => y(e.target.value),
                        placeholder: `Enter a description...`,
                        className: `w-full h-32 px-4 py-3 text-sm font-normal text-[#242424] placeholder-gray-400 focus:outline-none resize-none`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, v.jsxs)(`div`, {
                className: `grid grid-cols-1 md:grid-cols-2 gap-5`,
                children: [
                  (0, v.jsxs)(`label`, {
                    className: a,
                    children: [
                      (0, v.jsxs)(`span`, { children: [`Practice Area `, o] }),
                      (0, v.jsx)(`input`, {
                        type: `text`,
                        value: b,
                        onChange: (e) => x(e.target.value),
                        placeholder: `Property Law`,
                        className: s,
                      }),
                    ],
                  }),
                  (0, v.jsxs)(`label`, {
                    className: a,
                    children: [
                      (0, v.jsxs)(`span`, { children: [`Court Location `, o] }),
                      (0, v.jsx)(`input`, {
                        type: `text`,
                        value: S,
                        onChange: (e) => C(e.target.value),
                        placeholder: `e.g ikeja high court`,
                        className: s,
                      }),
                    ],
                  }),
                ],
              }),
              (0, v.jsxs)(`div`, {
                className: `grid grid-cols-1 md:grid-cols-2 gap-5`,
                children: [
                  (0, v.jsxs)(`label`, {
                    className: a,
                    children: [
                      (0, v.jsxs)(`span`, { children: [`Deadline `, o] }),
                      (0, v.jsx)(`input`, {
                        type: `text`,
                        value: w,
                        onChange: (e) => T(e.target.value),
                        placeholder: `dd/mm/yyyy`,
                        className: s,
                      }),
                    ],
                  }),
                  (0, v.jsxs)(`div`, {
                    className: `flex flex-col gap-2`,
                    children: [
                      (0, v.jsxs)(`label`, {
                        className: a,
                        children: [
                          (0, v.jsxs)(`span`, {
                            children: [`Proposed Fee `, o],
                          }),
                          (0, v.jsx)(`input`, {
                            type: `text`,
                            value: E,
                            onChange: (e) => D(e.target.value),
                            placeholder: `e.g N35000`,
                            className: s,
                          }),
                        ],
                      }),
                      (0, v.jsxs)(`div`, {
                        className: `flex gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3.5 py-2.5 text-xs text-orange-800 items-start select-none leading-relaxed`,
                        children: [
                          (0, v.jsx)(l, {
                            className: `w-4 h-4 text-orange-600 shrink-0 mt-0.5`,
                          }),
                          (0, v.jsx)(`p`, {
                            children: `The minimum fee for Property Law tasks is ₦30,000. Proposed fees below this amount cannot be submitted.`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, v.jsxs)(`div`, {
                className: `flex flex-col gap-2.5`,
                children: [
                  (0, v.jsxs)(`span`, {
                    className: `text-sm font-semibold text-[#080a0f]`,
                    children: [
                      `Required Documents (optional)`,
                      ` `,
                      (0, v.jsx)(`span`, {
                        className: `text-red-500 font-normal`,
                        children: o,
                      }),
                      (0, v.jsx)(`span`, {
                        className: `ml-1 text-[11px] text-gray-500 font-normal bg-gray-100 px-2 py-0.5 rounded`,
                        children: `Only upload client instructions. Do not upload confidential documents.`,
                      }),
                    ],
                  }),
                  (0, v.jsx)(`div`, {
                    className: `border border-dashed border-gray-300 rounded-xl bg-[#f9fafb] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/50 transition`,
                    children: (0, v.jsxs)(`label`, {
                      className: `flex flex-col items-center cursor-pointer w-full`,
                      children: [
                        (0, v.jsx)(`div`, {
                          className: `w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3`,
                          children: (0, v.jsx)(g, {
                            className: `w-5 h-5 text-gray-400`,
                          }),
                        }),
                        (0, v.jsx)(`span`, {
                          className: `text-xs font-semibold text-gray-600`,
                          children: A ? A.name : `Upload Required Documents`,
                        }),
                        (0, v.jsx)(`span`, {
                          className: `mt-1 text-[11px] text-gray-400 font-normal`,
                          children: `Required Upload documents include PDF, Word Documents and Images`,
                        }),
                        (0, v.jsx)(`input`, {
                          type: `file`,
                          onChange: (e) => {
                            e.target.files &&
                              e.target.files.length > 0 &&
                              j(e.target.files[0])
                          },
                          className: `hidden`,
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, v.jsxs)(`div`, {
                className: `flex flex-col gap-3`,
                children: [
                  (0, v.jsxs)(`span`, {
                    className: `text-sm font-semibold text-[#080a0f]`,
                    children: [`Confidentiality Level `, o],
                  }),
                  (0, v.jsxs)(`div`, {
                    className: `grid grid-cols-1 md:grid-cols-2 gap-4`,
                    children: [
                      (0, v.jsxs)(`div`, {
                        onClick: () => k(`standard`),
                        className: `border p-4 rounded-xl cursor-pointer select-none transition-all flex flex-col gap-1 text-left ${O === `standard` ? `border-[#00726d] bg-[#f0faf9]` : `border-gray-200 bg-white hover:border-gray-300`}`,
                        children: [
                          (0, v.jsx)(`span`, {
                            className: `text-xs font-bold ${O === `standard` ? `text-[#00726d]` : `text-gray-800`}`,
                            children: `Standard`,
                          }),
                          (0, v.jsx)(`span`, {
                            className: `text-[11px] text-gray-500 font-normal`,
                            children: `Visible to lawyers who apply`,
                          }),
                        ],
                      }),
                      (0, v.jsxs)(`div`, {
                        onClick: () => k(`restricted`),
                        className: `border p-4 rounded-xl cursor-pointer select-none transition-all flex flex-col gap-1 text-left ${O === `restricted` ? `border-[#00726d] bg-[#f0faf9]` : `border-gray-200 bg-white hover:border-gray-300`}`,
                        children: [
                          (0, v.jsx)(`span`, {
                            className: `text-xs font-bold ${O === `restricted` ? `text-[#00726d]` : `text-gray-800`}`,
                            children: `Restricted`,
                          }),
                          (0, v.jsx)(`span`, {
                            className: `text-[11px] text-gray-500 font-normal`,
                            children: `Details shared only after selection`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              M
                ? (0, v.jsx)(`div`, {
                    className: `rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700`,
                    children: M,
                  })
                : null,
              (0, v.jsxs)(`div`, {
                className: `mt-4 flex justify-end gap-3 select-none`,
                children: [
                  (0, v.jsx)(`button`, {
                    type: `button`,
                    onClick: () => alert(`Saved to draft!`),
                    className: `inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 font-secondary text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] focus:outline-none cursor-pointer`,
                    children: `Save to draft`,
                  }),
                  (0, v.jsx)(`button`, {
                    type: `submit`,
                    className: `inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none cursor-pointer`,
                    children: `Post Task`,
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
export { y as component }
