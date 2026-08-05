import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Home } from "lucide-react";
//#region src/components/NotFound.tsx
function NotFound() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center md:px-8",
		style: {
			backgroundImage: `
          linear-gradient(to right, rgba(4, 22, 38, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(4, 22, 38, 0.03) 1px, transparent 1px)
        `,
			backgroundSize: "64px 64px",
			backgroundPosition: "center top"
		},
		children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,white_95%)]" }), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10 flex max-w-xl flex-col items-center",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center space-x-3 mb-6 animate-fade-in",
					children: [
						/* @__PURE__ */ jsx("span", { className: "h-0.5 w-8 bg-[#328f97]" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-[11px] font-roboto font-light tracking-[0.25em] text-[#328f97] uppercase",
							children: "Error Code 404"
						}),
						/* @__PURE__ */ jsx("span", { className: "h-0.5 w-8 bg-[#328f97]" })
					]
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "font-primary text-8xl md:text-9xl font-bold text-[#041626] tracking-tight mb-2",
					children: [
						"4",
						/* @__PURE__ */ jsx("span", {
							className: "italic font-normal text-[#CF6A52] tracking-wide inline-block transform hover:rotate-12 transition-transform duration-300",
							children: "0"
						}),
						"4"
					]
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "font-primary text-2xl md:text-3xl font-medium text-[#041626] mb-4",
					children: "Page Not Found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "font-secondary text-sm md:text-base text-[#242424] max-w-md leading-relaxed mb-10",
					children: "The page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row gap-4 items-center justify-center w-full",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#0e6e66] hover:bg-[#0b544e] text-white font-normal text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md shadow-[#0e6e66]/10 hover:shadow-lg hover:shadow-[#0e6e66]/20 cursor-pointer font-secondary",
						children: [/* @__PURE__ */ jsx(Home, { className: "w-4 h-4" }), "Go to Homepage"]
					}), /* @__PURE__ */ jsxs("button", {
						onClick: () => window.history.back(),
						className: "flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-[#041626]/20 hover:bg-[#041626]/5 text-[#041626] font-normal text-sm tracking-wide rounded-lg transition-all duration-200 cursor-pointer font-secondary",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), "Go Back"]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-DUTQRFGh.css";
//#endregion
//#region src/routes/__root.tsx
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Counsel Task" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico"
		}]
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/(landingpage)/index.tsx
var $$splitComponentImporter = () => import("./(landingpage)-CZp1C63k.js");
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = { landingpageIndexRoute: createFileRoute("/(landingpage)/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/(landingpage)/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter };
