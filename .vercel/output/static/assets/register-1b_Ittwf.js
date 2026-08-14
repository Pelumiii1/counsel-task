import { i as e, n as t, t as n } from './jsx-runtime-Cltr0gcK.js'
import {
  a as r,
  i,
  n as a,
  r as o,
  t as s,
} from './counseltask-verification-seal 3-DEZ1BffT.js'
import { n as c, r as l, t as u } from './constants-BQ4ZHUjo.js'
var d = e(t(), 1),
  f = n()
function p({ values: e, onChange: t, onProceed: n }) {
  let [a, s] = (0, d.useState)(``),
    [p, m] = (0, d.useState)(!1),
    [h, g] = (0, d.useState)(!1),
    {
      fullName: _,
      firm: v,
      email: y,
      phone: b,
      password: x,
      confirmPassword: S,
    } = e
  return (0, f.jsxs)(`form`, {
    onSubmit: (e) => {
      if ((e.preventDefault(), s(``), !_ || !v || !y || !b || !x || !S)) {
        s(`Please complete all required fields.`)
        return
      }
      if (x !== S) {
        s(`Passwords must match.`)
        return
      }
      n()
    },
    children: [
      (0, f.jsxs)(`div`, {
        children: [
          (0, f.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [
              (0, f.jsx)(`span`, { className: `h-0.5 w-8 bg-[#00726D]` }),
              (0, f.jsx)(`p`, {
                className: `font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]`,
                children: `STEP 1/2`,
              }),
            ],
          }),
          (0, f.jsx)(`h1`, {
            className: `mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]`,
            children: `Account Details`,
          }),
          (0, f.jsx)(`p`, {
            className: `mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]`,
            children: `Start with your basic details. You'll submit your professional credentials for verification next.`,
          }),
          (0, f.jsxs)(`div`, {
            className: `mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5`,
            children: [
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, { children: [`Full Name `, l] }),
                  (0, f.jsx)(`input`, {
                    type: `text`,
                    value: _,
                    onChange: (e) => t(`fullName`, e.target.value),
                    placeholder: `e.g Onasanya Habeeb`,
                    className: u,
                  }),
                ],
              }),
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, {
                    children: [`Law Firm / Chambers `, l],
                  }),
                  (0, f.jsx)(`input`, {
                    type: `text`,
                    value: v,
                    onChange: (e) => t(`firm`, e.target.value),
                    placeholder: `e.g Habeeb and Co.`,
                    className: u,
                  }),
                ],
              }),
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, { children: [`Email Address `, l] }),
                  (0, f.jsx)(`input`, {
                    type: `email`,
                    value: y,
                    onChange: (e) => t(`email`, e.target.value),
                    placeholder: `You@gmail.com`,
                    className: u,
                  }),
                ],
              }),
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, { children: [`Phone Number `, l] }),
                  (0, f.jsx)(`input`, {
                    type: `text`,
                    value: b,
                    onChange: (e) => t(`phone`, e.target.value),
                    placeholder: `090 837 333 272`,
                    className: u,
                  }),
                ],
              }),
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, { children: [`Password `, l] }),
                  (0, f.jsxs)(`div`, {
                    className: `relative w-full`,
                    children: [
                      (0, f.jsx)(`input`, {
                        type: p ? `text` : `password`,
                        value: x,
                        onChange: (e) => t(`password`, e.target.value),
                        placeholder: `Create a password`,
                        className: `${u} pr-12`,
                      }),
                      (0, f.jsx)(`button`, {
                        type: `button`,
                        onClick: () => m(!p),
                        className: `absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer`,
                        'aria-label': p ? `Hide password` : `Show password`,
                        children: p
                          ? (0, f.jsx)(i, { className: `h-5 w-5` })
                          : (0, f.jsx)(o, { className: `h-5 w-5` }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, { children: [`Confirm Password `, l] }),
                  (0, f.jsxs)(`div`, {
                    className: `relative w-full`,
                    children: [
                      (0, f.jsx)(`input`, {
                        type: h ? `text` : `password`,
                        value: S,
                        onChange: (e) => t(`confirmPassword`, e.target.value),
                        placeholder: `Re-enter your password`,
                        className: `${u} pr-12`,
                      }),
                      (0, f.jsx)(`button`, {
                        type: `button`,
                        onClick: () => g(!h),
                        className: `absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer`,
                        'aria-label': h ? `Hide password` : `Show password`,
                        children: h
                          ? (0, f.jsx)(i, { className: `h-5 w-5` })
                          : (0, f.jsx)(o, { className: `h-5 w-5` }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          a
            ? (0, f.jsx)(`div`, {
                className: `mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700`,
                children: a,
              })
            : null,
        ],
      }),
      (0, f.jsx)(`div`, {
        className: `mt-8 flex justify-end`,
        children: (0, f.jsxs)(`button`, {
          type: `submit`,
          className: `inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer`,
          children: [
            (0, f.jsx)(`span`, { children: `Continue` }),
            (0, f.jsx)(r, { className: `h-4 w-4 stroke-2`, 'aria-hidden': !0 }),
          ],
        }),
      }),
    ],
  })
}
function m({ otp: e, setOtp: t, onVerify: n }) {
  let [i, a] = (0, d.useState)(``),
    o = (0, d.useRef)([]),
    s = (n, r) => {
      let i = n.replace(/[^0-9]/g, ``).slice(-1),
        a = [...e]
      ;((a[r] = i), t(a), i !== `` && r < 5 && o.current[r + 1]?.focus())
    },
    c = (n, r) => {
      if (n.key === `Backspace`)
        if (e[r] === `` && r > 0) {
          let n = [...e]
          ;((n[r - 1] = ``), t(n), o.current[r - 1]?.focus())
        } else {
          let n = [...e]
          ;((n[r] = ``), t(n))
        }
    },
    l = (e) => {
      e.preventDefault()
      let n = e.clipboardData
        .getData(`text`)
        .replace(/[^0-9]/g, ``)
        .slice(0, 6)
      n.length === 6 && (t(n.split(``)), o.current[5]?.focus())
    }
  return (0, f.jsxs)(`form`, {
    onSubmit: (t) => {
      if ((t.preventDefault(), a(``), e.join(``).length < 6)) {
        a(`Please enter a valid 6-digit confirmation code.`)
        return
      }
      n()
    },
    children: [
      (0, f.jsxs)(`div`, {
        children: [
          (0, f.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [
              (0, f.jsx)(`span`, { className: `h-[2px] w-8 bg-[#00726D]` }),
              (0, f.jsx)(`p`, {
                className: `font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]`,
                children: `STEP 1/2`,
              }),
            ],
          }),
          (0, f.jsx)(`h1`, {
            className: `mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]`,
            children: `OTP Confirmation`,
          }),
          (0, f.jsx)(`p`, {
            className: `mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]`,
            children: `Use the verification code below to complete your verification.`,
          }),
          (0, f.jsxs)(`div`, {
            className: `mt-12 flex flex-col items-center justify-center gap-4`,
            children: [
              (0, f.jsxs)(`div`, {
                className: `flex items-center gap-2 sm:gap-3`,
                children: [
                  (0, f.jsx)(`div`, {
                    className: `flex gap-2 sm:gap-2.5`,
                    children: [0, 1, 2].map((t) =>
                      (0, f.jsx)(
                        `input`,
                        {
                          ref: (e) => {
                            o.current[t] = e
                          },
                          type: `text`,
                          inputMode: `numeric`,
                          pattern: `[0-9]*`,
                          value: e[t],
                          onChange: (e) => s(e.target.value, t),
                          onKeyDown: (e) => c(e, t),
                          onPaste: t === 0 ? l : void 0,
                          className: `h-[58px] w-[46px] sm:h-[66px] sm:w-[52px] rounded-lg border border-[#dedfe3] bg-white text-center font-secondary text-lg sm:text-xl font-medium text-[#242424] outline-none transition focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10`,
                        },
                        t,
                      ),
                    ),
                  }),
                  (0, f.jsx)(`span`, {
                    className: `text-xl font-bold text-[#080a0f] mx-1 sm:mx-2`,
                    children: `•`,
                  }),
                  (0, f.jsx)(`div`, {
                    className: `flex gap-2 sm:gap-2.5`,
                    children: [3, 4, 5].map((t) =>
                      (0, f.jsx)(
                        `input`,
                        {
                          ref: (e) => {
                            o.current[t] = e
                          },
                          type: `text`,
                          inputMode: `numeric`,
                          pattern: `[0-9]*`,
                          value: e[t],
                          onChange: (e) => s(e.target.value, t),
                          onKeyDown: (e) => c(e, t),
                          className: `h-[58px] w-[46px] sm:h-[66px] sm:w-[52px] rounded-lg border border-[#dedfe3] bg-white text-center font-secondary text-lg sm:text-xl font-medium text-[#242424] outline-none transition focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10`,
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
              (0, f.jsx)(`p`, {
                className: `mt-3 font-secondary text-[13px] text-[#6b7280] text-center`,
                children: `Enter your one-time password.`,
              }),
            ],
          }),
          i
            ? (0, f.jsx)(`div`, {
                className: `mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700`,
                children: i,
              })
            : null,
        ],
      }),
      (0, f.jsx)(`div`, {
        className: `mt-8 flex justify-end`,
        children: (0, f.jsxs)(`button`, {
          type: `submit`,
          className: `inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer`,
          children: [
            (0, f.jsx)(`span`, { children: `Verify and Continue` }),
            (0, f.jsx)(r, {
              className: `h-4 w-4 stroke-[2]`,
              'aria-hidden': !0,
            }),
          ],
        }),
      }),
    ],
  })
}
function h({
  label: e,
  file: t,
  onChange: n,
  placeholder: r = `No file chosen`,
  required: i = !1,
}) {
  let a = (0, d.useRef)(null)
  return (0, f.jsxs)(`div`, {
    className: `flex flex-col gap-2 font-secondary text-sm font-semibold text-[#080a0f] w-full`,
    children: [
      (0, f.jsxs)(`span`, { children: [e, ` `, i && l] }),
      (0, f.jsxs)(`div`, {
        className: `flex items-center justify-between h-12.5 w-full rounded-lg border border-[#dedfe3] bg-white px-4`,
        children: [
          (0, f.jsx)(`span`, {
            className: `text-sm ${t ? `text-[#242424]` : `text-[#9ca3af]`} truncate pr-4 font-normal`,
            children: t ? t.name : r,
          }),
          (0, f.jsx)(`input`, {
            type: `file`,
            ref: a,
            onChange: (e) => {
              e.target.files &&
                e.target.files.length > 0 &&
                n(e.target.files[0])
            },
            className: `hidden`,
          }),
          (0, f.jsxs)(`button`, {
            type: `button`,
            onClick: () => {
              a.current?.click()
            },
            className: `inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dedfe3] bg-[#f9fafb] px-3 text-xs font-medium text-[#4b5563] transition hover:bg-gray-50 active:scale-[0.98] cursor-pointer shrink-0`,
            children: [
              (0, f.jsx)(`svg`, {
                className: `w-3.5 h-3.5 text-[#6b7280]`,
                fill: `none`,
                viewBox: `0 0 24 24`,
                stroke: `currentColor`,
                strokeWidth: 2,
                children: (0, f.jsx)(`path`, {
                  strokeLinecap: `round`,
                  strokeLinejoin: `round`,
                  d: `M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12`,
                }),
              }),
              `Upload Document`,
            ],
          }),
        ],
      }),
    ],
  })
}
function g({
  values: e,
  onChange: t,
  practisingFeeReceipt: n,
  setPractisingFeeReceipt: i,
  governmentId: a,
  setGovernmentId: o,
  supportingCredentials: s,
  setSupportingCredentials: p,
  onBack: m,
  onProceed: g,
}) {
  let [_, v] = (0, d.useState)(``),
    { callToBarDate: y, enrolmentNumber: b } = e
  return (0, f.jsxs)(`form`, {
    onSubmit: (e) => {
      if ((e.preventDefault(), v(``), !y || !b || !n || !a)) {
        v(`Please complete all required fields.`)
        return
      }
      g()
    },
    className: `flex flex-col gap-6`,
    children: [
      (0, f.jsxs)(`div`, {
        children: [
          (0, f.jsxs)(`div`, {
            className: `flex items-center gap-3`,
            children: [
              (0, f.jsx)(`span`, { className: `h-0.5 w-8 bg-[#00726D]` }),
              (0, f.jsx)(`p`, {
                className: `font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]`,
                children: `STEP 2/2`,
              }),
            ],
          }),
          (0, f.jsx)(`h1`, {
            className: `mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]`,
            children: `Submit your credentials`,
          }),
          (0, f.jsx)(`p`, {
            className: `mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]`,
            children: `Verification confirms you're a practising Nigerian lawyer before you can post a task or message another member.`,
          }),
          (0, f.jsxs)(`div`, {
            className: `mt-6 flex gap-3 rounded-lg border border-[#D0ECE8] bg-[#F0FAF9] px-4 py-3.5 text-xs sm:text-sm text-[#00726D] items-start`,
            children: [
              (0, f.jsx)(`svg`, {
                className: `w-5 h-5 text-[#00726D] shrink-0 mt-0.5`,
                fill: `none`,
                viewBox: `0 0 24 24`,
                stroke: `currentColor`,
                strokeWidth: 2,
                children: (0, f.jsx)(`path`, {
                  strokeLinecap: `round`,
                  strokeLinejoin: `round`,
                  d: `M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z`,
                }),
              }),
              (0, f.jsx)(`p`, {
                className: `font-secondary leading-normal`,
                children: `Verification confirms you're a practising Nigerian lawyer. This is required before you can post a task or message another member.`,
              }),
            ],
          }),
          (0, f.jsxs)(`div`, {
            className: `mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5`,
            children: [
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, { children: [`Call to Bar Date `, l] }),
                  (0, f.jsx)(`input`, {
                    type: `text`,
                    value: y,
                    onChange: (e) => t(`callToBarDate`, e.target.value),
                    placeholder: `dd/mm/yyyy`,
                    className: u,
                  }),
                ],
              }),
              (0, f.jsxs)(`label`, {
                className: c,
                children: [
                  (0, f.jsxs)(`span`, {
                    children: [`Supreme Court Enrolment Number `, l],
                  }),
                  (0, f.jsx)(`input`, {
                    type: `text`,
                    value: b,
                    onChange: (e) => t(`enrolmentNumber`, e.target.value),
                    placeholder: `e.g SCN/2014/8999`,
                    className: u,
                  }),
                ],
              }),
            ],
          }),
          (0, f.jsxs)(`div`, {
            className: `mt-5 flex flex-col gap-5`,
            children: [
              (0, f.jsx)(h, {
                label: `Current Practising Fee Receipt (this year)`,
                file: n,
                onChange: i,
                required: !0,
              }),
              (0, f.jsx)(h, {
                label: `Government-Issued Identification`,
                file: a,
                onChange: o,
                required: !0,
              }),
              (0, f.jsx)(h, {
                label: `Supporting Credentials (optional)`,
                file: s,
                onChange: p,
              }),
            ],
          }),
          _
            ? (0, f.jsx)(`div`, {
                className: `mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700`,
                children: _,
              })
            : null,
        ],
      }),
      (0, f.jsxs)(`div`, {
        className: `mt-10 flex justify-end gap-3`,
        children: [
          (0, f.jsxs)(`button`, {
            type: `button`,
            onClick: m,
            className: `inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 font-secondary text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer`,
            children: [
              (0, f.jsx)(r, {
                className: `h-4 w-4 stroke-2 rotate-180`,
                'aria-hidden': !0,
              }),
              (0, f.jsx)(`span`, { children: `Previous` }),
            ],
          }),
          (0, f.jsxs)(`button`, {
            type: `submit`,
            className: `inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer`,
            children: [
              (0, f.jsx)(`span`, { children: `Continue` }),
              (0, f.jsx)(r, {
                className: `h-4 w-4 stroke-2`,
                'aria-hidden': !0,
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
function _() {
  return (0, f.jsx)(`div`, {
    className: `flex flex-col gap-8`,
    children: (0, f.jsxs)(`div`, {
      children: [
        (0, f.jsxs)(`div`, {
          className: `flex items-center gap-3`,
          children: [
            (0, f.jsx)(`span`, { className: `h-0.5 w-8 bg-[#00726D]` }),
            (0, f.jsx)(`p`, {
              className: `font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]`,
              children: `VERIFICATION`,
            }),
          ],
        }),
        (0, f.jsx)(`h1`, {
          className: `mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]`,
          children: `Your account status`,
        }),
        (0, f.jsx)(`p`, {
          className: `mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]`,
          children: `We'll notify you by email once a decision is made. This usually takes 1—2 business days.`,
        }),
        (0, f.jsxs)(`div`, {
          className: `mt-10 p-6 sm:p-10 border border-gray-100 bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col items-center`,
          children: [
            (0, f.jsx)(`div`, {
              className: `w-16 h-16 rounded-full bg-[#E6F1F0] flex items-center justify-center mb-6`,
              children: `⌛`,
            }),
            (0, f.jsx)(`h2`, {
              className: `font-secondary text-lg sm:text-xl font-medium text-black text-center`,
              children: `Your Documents are under review`,
            }),
            (0, f.jsx)(`p`, {
              className: `mt-3 font-secondary text-[12px] leading-[1.6] text-black text-center max-w-110`,
              children: `An administrator is checking your Call to Bar record, enrolment number, and submitted documents. You'll be able to post a task as soon as you're approved.`,
            }),
            (0, f.jsxs)(`div`, {
              className: `mt-12 w-full max-w-125 px-2 relative`,
              children: [
                (0, f.jsxs)(`div`, {
                  className: `absolute top-1.25 left-[12%] right-[12%] -z-10 flex justify-between gap-4`,
                  children: [
                    (0, f.jsx)(`div`, {
                      className: `flex-1 border-t border-dashed border-[#00726D]`,
                    }),
                    (0, f.jsx)(`div`, {
                      className: `flex-1 border-t border-dashed border-[#00726D]`,
                    }),
                    (0, f.jsx)(`div`, {
                      className: `flex-1 border-t border-dashed border-gray-200`,
                    }),
                  ],
                }),
                (0, f.jsxs)(`div`, {
                  className: `flex justify-between items-start`,
                  children: [
                    (0, f.jsxs)(`div`, {
                      className: `flex flex-col items-center w-20 sm:w-24`,
                      children: [
                        (0, f.jsx)(`div`, {
                          className: `size-3 rounded-full bg-[#00726D]`,
                        }),
                        (0, f.jsx)(`span`, {
                          className: `mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight`,
                          children: `Account Created`,
                        }),
                      ],
                    }),
                    (0, f.jsxs)(`div`, {
                      className: `flex flex-col items-center w-20 sm:w-24`,
                      children: [
                        (0, f.jsx)(`div`, {
                          className: `size-3 rounded-full bg-[#00726D]`,
                        }),
                        (0, f.jsx)(`span`, {
                          className: `mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight`,
                          children: `Document Submitted`,
                        }),
                      ],
                    }),
                    (0, f.jsxs)(`div`, {
                      className: `flex flex-col items-center w-20 sm:w-24`,
                      children: [
                        (0, f.jsx)(`div`, {
                          className: `size-3 rounded-full bg-[#CF6A52]`,
                        }),
                        (0, f.jsx)(`span`, {
                          className: `mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight`,
                          children: `Under Review`,
                        }),
                      ],
                    }),
                    (0, f.jsxs)(`div`, {
                      className: `flex flex-col items-center w-20 sm:w-24`,
                      children: [
                        (0, f.jsx)(`div`, {
                          className: `size-3 rounded-full border-2 border-gray-300 bg-white`,
                        }),
                        (0, f.jsx)(`span`, {
                          className: `mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight`,
                          children: `Approved`,
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
    }),
  })
}
function v() {
  let [e, t] = (0, d.useState)(1),
    [n, r] = (0, d.useState)(!1),
    [i, o] = (0, d.useState)({
      fullName: ``,
      firm: ``,
      email: ``,
      phone: ``,
      password: ``,
      confirmPassword: ``,
    }),
    [c, l] = (0, d.useState)([, , , , , ,].fill(``)),
    [u, h] = (0, d.useState)({ callToBarDate: ``, enrolmentNumber: `` }),
    [v, y] = (0, d.useState)(null),
    [b, x] = (0, d.useState)(null),
    [S, C] = (0, d.useState)(null)
  return (0, f.jsxs)(`main`, {
    className: `min-h-screen bg-[#f9fafb] text-[#242424] grid grid-cols-1 lg:grid-cols-2`,
    children: [
      (0, f.jsx)(`section`, {
        className: `relative hidden lg:flex h-screen items-center justify-center bg-linear-to-b from-[#011422] to-[#042137] overflow-hidden`,
        children: (0, f.jsx)(`img`, { src: s, alt: `Engaging Lawyer seal` }),
      }),
      (0, f.jsxs)(`section`, {
        className: `flex min-h-screen w-full flex-col bg-white px-6 py-10 sm:px-16 lg:px-20 xl:px-28 justify-between`,
        children: [
          (0, f.jsx)(`div`, {
            className: `flex justify-end w-full mb-12 lg:mb-0`,
            children: (0, f.jsx)(`img`, {
              src: a,
              alt: `CounselTask`,
              className: `h-10 w-auto object-contain sm:h-12`,
            }),
          }),
          (0, f.jsxs)(`div`, {
            className: `w-full max-w-160 mx-auto my-auto rise-in`,
            children: [
              e === 1 &&
                !n &&
                (0, f.jsx)(p, {
                  values: i,
                  onChange: (e, t) => {
                    o((n) => ({ ...n, [e]: t }))
                  },
                  onProceed: () => r(!0),
                }),
              e === 1 &&
                n &&
                (0, f.jsx)(m, {
                  otp: c,
                  setOtp: l,
                  onVerify: () => {
                    ;(r(!1), t(2))
                  },
                }),
              e === 2 &&
                (0, f.jsx)(g, {
                  values: u,
                  onChange: (e, t) => {
                    h((n) => ({ ...n, [e]: t }))
                  },
                  practisingFeeReceipt: v,
                  setPractisingFeeReceipt: y,
                  governmentId: b,
                  setGovernmentId: x,
                  supportingCredentials: S,
                  setSupportingCredentials: C,
                  onBack: () => t(1),
                  onProceed: () => t(3),
                }),
              e === 3 && (0, f.jsx)(_, {}),
            ],
          }),
        ],
      }),
    ],
  })
}
export { v as component }
