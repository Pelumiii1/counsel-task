import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as Eye, w as ChevronRight, x as EyeOff } from "../_libs/lucide-react.mjs";
import { n as logo_new_default, t as counseltask_verification_seal_3_default } from "./counseltask-verification-seal 3-Bl0HWlPk.mjs";
import { n as labelClass, r as requiredMark, t as inputClass } from "./constants-OkfkKxhm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BPbNux8e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = (event) => {
		event.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Please complete all required fields.");
			return;
		}
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-[#f9fafb] text-[#242424] grid grid-cols-1 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative hidden lg:flex h-screen items-center justify-center bg-linear-to-b from-[#011422] to-[#042137] overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: counseltask_verification_seal_3_default,
				alt: "Engaging Lawyer seal"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-screen w-full flex-col bg-white px-6 py-10 sm:px-16 lg:px-20 xl:px-28 justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end w-full mb-12 lg:mb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo_new_default,
					alt: "CounselTask",
					className: "h-10 w-auto object-contain sm:h-12"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-160 mx-auto my-auto rise-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "flex flex-col gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-8 bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]",
								children: "WELCOME BACK"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]",
							children: "Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]",
							children: "We'll notify you by email once a decision is made. This usually takes 1—2 business days."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Email Address ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (event) => setEmail(event.target.value),
									placeholder: "You@gmail.com",
									className: inputClass
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Password ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: showPassword ? "text" : "password",
										value: password,
										onChange: (event) => setPassword(event.target.value),
										placeholder: "Create a password",
										className: `${inputClass} pr-12`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer",
										"aria-label": showPassword ? "Hide password" : "Show password",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5" })
									})]
								})]
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700",
							children: error
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign In" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								className: "h-4 w-4 stroke-2",
								"aria-hidden": true
							})]
						})
					})]
				})
			})]
		})]
	});
}
//#endregion
export { RouteComponent as component };
