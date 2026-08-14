import { n as __exportAll } from '../_runtime.mjs'
import {
  F as require_react,
  c as HeadContent,
  d as createRouter,
  g as Link,
  h as createRootRoute,
  m as createFileRoute,
  p as lazyRouteComponent,
  s as Scripts,
  v as require_jsx_runtime,
} from '../_libs/@tanstack/react-router+[...].mjs'
import { b as ArrowLeft, d as House } from '../_libs/lucide-react.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/router-D09CTr2C.js
var router_D09CTr2C_exports = /* @__PURE__ */ __exportAll({
  getRouter: () => getRouter,
})
require_react()
var import_jsx_runtime = require_jsx_runtime()
function NotFound() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className:
      'relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center md:px-8',
    style: {
      backgroundImage: `
          linear-gradient(to right, rgba(4, 22, 38, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(4, 22, 38, 0.03) 1px, transparent 1px)
        `,
      backgroundSize: '64px 64px',
      backgroundPosition: 'center top',
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className:
          'absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,white_95%)]',
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        className: 'relative z-10 flex max-w-xl flex-col items-center',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex items-center space-x-3 mb-6 animate-fade-in',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                className: 'h-0.5 w-8 bg-[#328f97]',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                className:
                  'text-[11px] font-roboto font-light tracking-[0.25em] text-[#328f97] uppercase',
                children: 'Error Code 404',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                className: 'h-0.5 w-8 bg-[#328f97]',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('h1', {
            className:
              'font-primary text-8xl md:text-9xl font-bold text-[#041626] tracking-tight mb-2',
            children: [
              '4',
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                className:
                  'italic font-normal text-[#CF6A52] tracking-wide inline-block transform hover:rotate-12 transition-transform duration-300',
                children: '0',
              }),
              '4',
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            className:
              'font-primary text-2xl md:text-3xl font-medium text-[#041626] mb-4',
            children: 'Page Not Found',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            className:
              'font-secondary text-sm md:text-base text-[#242424] max-w-md leading-relaxed mb-10',
            children:
              "The page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track.",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className:
              'flex flex-col sm:flex-row gap-4 items-center justify-center w-full',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                to: '/',
                className:
                  'flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#0e6e66] hover:bg-[#0b544e] text-white font-normal text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md shadow-[#0e6e66]/10 hover:shadow-lg hover:shadow-[#0e6e66]/20 cursor-pointer font-secondary',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
                    className: 'w-4 h-4',
                  }),
                  'Go to Homepage',
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('button', {
                onClick: () => window.history.back(),
                className:
                  'flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-[#041626]/20 hover:bg-[#041626]/5 text-[#041626] font-normal text-sm tracking-wide rounded-lg transition-all duration-200 cursor-pointer font-secondary',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
                    className: 'w-4 h-4',
                  }),
                  'Go Back',
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
var styles_default = '/assets/styles-Cq-ctijV.css'
var Route$6 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Counsel Task' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: styles_default,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})
function RootDocument({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('html', {
    lang: 'en',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('head', {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('body', {
        children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
        ],
      }),
    ],
  })
}
var $$splitComponentImporter$5 = () => import('./dashboard-DdM0vIPh.mjs')
var Route$5 = createFileRoute('/(engaging-laywers)/dashboard')({
  component: lazyRouteComponent($$splitComponentImporter$5, 'component'),
})
var $$splitComponentImporter$4 = () => import('./(landingpage)-DPuxOElw.mjs')
var Route$4 = createFileRoute('/(landingpage)/')({
  component: lazyRouteComponent($$splitComponentImporter$4, 'component'),
})
var $$splitComponentImporter$3 = () => import('./dashboard-qICTUJfA.mjs')
var Route$3 = createFileRoute('/(engaging-laywers)/dashboard/')({
  component: lazyRouteComponent($$splitComponentImporter$3, 'component'),
})
var $$splitComponentImporter$2 = () => import('./post-job--uIgDvjz.mjs')
var Route$2 = createFileRoute('/(engaging-laywers)/dashboard/post-job')({
  component: lazyRouteComponent($$splitComponentImporter$2, 'component'),
})
var $$splitComponentImporter$1 = () => import('./login-BPbNux8e.mjs')
var Route$1 = createFileRoute('/(engaging-laywers)/auth/login/')({
  component: lazyRouteComponent($$splitComponentImporter$1, 'component'),
})
var $$splitComponentImporter = () => import('./register-Spkko6M7.mjs')
var Route = createFileRoute('/(engaging-laywers)/auth/register/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
})
var engagingLaywersDashboardRoute = Route$5.update({
  id: '/(engaging-laywers)/dashboard',
  path: '/dashboard',
  getParentRoute: () => Route$6,
})
var landingpageIndexRoute = Route$4.update({
  id: '/(landingpage)/',
  path: '/',
  getParentRoute: () => Route$6,
})
var engagingLaywersDashboardIndexRoute = Route$3.update({
  id: '/',
  path: '/',
  getParentRoute: () => engagingLaywersDashboardRoute,
})
var engagingLaywersDashboardPostJobRoute = Route$2.update({
  id: '/post-job',
  path: '/post-job',
  getParentRoute: () => engagingLaywersDashboardRoute,
})
var engagingLaywersAuthLoginIndexRoute = Route$1.update({
  id: '/(engaging-laywers)/auth/login/',
  path: '/auth/login/',
  getParentRoute: () => Route$6,
})
var engagingLaywersAuthRegisterIndexRoute = Route.update({
  id: '/(engaging-laywers)/auth/register/',
  path: '/auth/register/',
  getParentRoute: () => Route$6,
})
var engagingLaywersDashboardRouteChildren = {
  engagingLaywersDashboardPostJobRoute,
  engagingLaywersDashboardIndexRoute,
}
var rootRouteChildren = {
  engagingLaywersDashboardRoute: engagingLaywersDashboardRoute._addFileChildren(
    engagingLaywersDashboardRouteChildren,
  ),
  landingpageIndexRoute,
  engagingLaywersAuthLoginIndexRoute,
  engagingLaywersAuthRegisterIndexRoute,
}
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes()
function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}
//#endregion
export { getRouter, router_D09CTr2C_exports as t }
