import { i as e, n as t, t as n } from './jsx-runtime-Cltr0gcK.js'
import {
  a as r,
  i,
  n as a,
  r as o,
  t as s,
} from './counseltask-verification-seal 3-DEZ1BffT.js'
import { i as c } from './index-BAHNh0gS.js'
import { n as l, r as u, t as d } from './constants-BQ4ZHUjo.js'
var f = e(t()),
  p = n()
function m() {
  let e = c(),
    [t, n] = (0, f.useState)(``),
    [m, h] = (0, f.useState)(``),
    [g, _] = (0, f.useState)(!1),
    [v, y] = (0, f.useState)(``)
  return (0, p.jsxs)(`main`, {
    className: `min-h-screen bg-[#f9fafb] text-[#242424] grid grid-cols-1 lg:grid-cols-2`,
    children: [
      (0, p.jsx)(`section`, {
        className: `relative hidden lg:flex h-screen items-center justify-center bg-linear-to-b from-[#011422] to-[#042137] overflow-hidden`,
        children: (0, p.jsx)(`img`, { src: s, alt: `Engaging Lawyer seal` }),
      }),
      (0, p.jsxs)(`section`, {
        className: `flex min-h-screen w-full flex-col bg-white px-6 py-10 sm:px-16 lg:px-20 xl:px-28 justify-between`,
        children: [
          (0, p.jsx)(`div`, {
            className: `flex justify-end w-full mb-12 lg:mb-0`,
            children: (0, p.jsx)(`img`, {
              src: a,
              alt: `CounselTask`,
              className: `h-10 w-auto object-contain sm:h-12`,
            }),
          }),
          (0, p.jsx)(`div`, {
            className: `w-full max-w-160 mx-auto my-auto rise-in`,
            children: (0, p.jsxs)(`form`, {
              onSubmit: (n) => {
                if ((n.preventDefault(), y(``), !t || !m)) {
                  y(`Please complete all required fields.`)
                  return
                }
                e({ to: `/dashboard` })
              },
              className: `flex flex-col gap-8`,
              children: [
                (0, p.jsxs)(`div`, {
                  children: [
                    (0, p.jsxs)(`div`, {
                      className: `flex items-center gap-3`,
                      children: [
                        (0, p.jsx)(`span`, {
                          className: `h-0.5 w-8 bg-[#00726D]`,
                        }),
                        (0, p.jsx)(`p`, {
                          className: `font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]`,
                          children: `WELCOME BACK`,
                        }),
                      ],
                    }),
                    (0, p.jsx)(`h1`, {
                      className: `mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]`,
                      children: `Sign In`,
                    }),
                    (0, p.jsx)(`p`, {
                      className: `mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]`,
                      children: `We'll notify you by email once a decision is made. This usually takes 1—2 business days.`,
                    }),
                    (0, p.jsxs)(`div`, {
                      className: `mt-8 flex flex-col gap-5`,
                      children: [
                        (0, p.jsxs)(`label`, {
                          className: l,
                          children: [
                            (0, p.jsxs)(`span`, {
                              children: [`Email Address `, u],
                            }),
                            (0, p.jsx)(`input`, {
                              type: `email`,
                              value: t,
                              onChange: (e) => n(e.target.value),
                              placeholder: `You@gmail.com`,
                              className: d,
                            }),
                          ],
                        }),
                        (0, p.jsxs)(`label`, {
                          className: l,
                          children: [
                            (0, p.jsxs)(`span`, { children: [`Password `, u] }),
                            (0, p.jsxs)(`div`, {
                              className: `relative w-full`,
                              children: [
                                (0, p.jsx)(`input`, {
                                  type: g ? `text` : `password`,
                                  value: m,
                                  onChange: (e) => h(e.target.value),
                                  placeholder: `Create a password`,
                                  className: `${d} pr-12`,
                                }),
                                (0, p.jsx)(`button`, {
                                  type: `button`,
                                  onClick: () => _(!g),
                                  className: `absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer`,
                                  'aria-label': g
                                    ? `Hide password`
                                    : `Show password`,
                                  children: g
                                    ? (0, p.jsx)(i, { className: `h-5 w-5` })
                                    : (0, p.jsx)(o, { className: `h-5 w-5` }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    v
                      ? (0, p.jsx)(`div`, {
                          className: `mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700`,
                          children: v,
                        })
                      : null,
                  ],
                }),
                (0, p.jsx)(`div`, {
                  className: `mt-4 flex justify-end`,
                  children: (0, p.jsxs)(`button`, {
                    type: `submit`,
                    className: `inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer`,
                    children: [
                      (0, p.jsx)(`span`, { children: `Sign In` }),
                      (0, p.jsx)(r, {
                        className: `h-4 w-4 stroke-2`,
                        'aria-hidden': !0,
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  })
}
export { m as component }
