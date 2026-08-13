import { i as __toESM } from "../_runtime.mjs";
import { F as require_react, _ as useNavigate, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Bold, a as List, c as Link, i as RotateCcw, l as Italic, o as ListOrdered, r as RotateCw, t as Upload, u as Info } from "../_libs/lucide-react.mjs";
import { n as labelClass, r as requiredMark, t as inputClass } from "./constants-OkfkKxhm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-job--uIgDvjz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostJobPage() {
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [practiceArea, setPracticeArea] = (0, import_react.useState)("Property Law");
	const [courtLocation, setCourtLocation] = (0, import_react.useState)("");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	const [proposedFee, setProposedFee] = (0, import_react.useState)("");
	const [confidentiality, setConfidentiality] = (0, import_react.useState)("standard");
	const [uploadedFile, setUploadedFile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setUploadedFile(e.target.files[0]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		if (!title || !description || !practiceArea || !courtLocation || !deadline || !proposedFee) {
			setError("Please complete all required fields.");
			return;
		}
		const feeAmount = parseFloat(proposedFee.replace(/[^0-9]/g, ""));
		if (practiceArea === "Property Law" && feeAmount < 3e4) {
			setError("Proposed fee is below the minimum limit for Property Law.");
			return;
		}
		const stored = localStorage.getItem("counsel_tasks");
		const currentTasks = stored ? JSON.parse(stored) : [];
		const newTask = {
			id: Date.now().toString(),
			title,
			category: practiceArea,
			court: courtLocation,
			deadline,
			budget: proposedFee.startsWith("₦") ? proposedFee : `₦${proposedFee}`,
			workers: "0 Proposals",
			status: "Open"
		};
		const nextTasks = [...currentTasks, newTask];
		localStorage.setItem("counsel_tasks", JSON.stringify(nextTasks));
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col w-full min-h-full font-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight",
				children: "Welcome Oluwarotimi!!"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-secondary text-[13px] text-gray-500 font-normal",
				children: "What action are you taking today"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex-1 w-full max-w-4xl mx-auto px-6 py-10 sm:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5 select-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-primary text-2xl font-semibold text-black",
					children: "Post a task"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 font-normal leading-relaxed",
					children: "Describe what you need. Verified lawyers matching your practice area will be able to submit proposals."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-8 bg-white border border-gray-150 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 sm:p-8 flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Task Title ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "e.g Hold brief - Land Dispute",
							className: inputClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold text-[#080a0f]",
							children: ["Service Description ", requiredMark]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full rounded-lg border border-[#dedfe3] bg-white overflow-hidden focus-within:border-[#00726D]/50 focus-within:ring-2 focus-within:ring-[#00726D]/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-10 border-b border-[#dedfe3] bg-[#f9fafb] px-3 flex items-center gap-4 text-gray-500 select-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Italic, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-5 bg-gray-200" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-5 bg-gray-200" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-4 h-4",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											strokeWidth: 2,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												d: "M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89"
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-5 bg-gray-200" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "w-4 h-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: description,
								onChange: (e) => setDescription(e.target.value),
								placeholder: "Enter a description...",
								className: "w-full h-32 px-4 py-3 text-sm font-normal text-[#242424] placeholder-gray-400 focus:outline-none resize-none"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Practice Area ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: practiceArea,
								onChange: (e) => setPracticeArea(e.target.value),
								placeholder: "Property Law",
								className: inputClass
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Court Location ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: courtLocation,
								onChange: (e) => setCourtLocation(e.target.value),
								placeholder: "e.g ikeja high court",
								className: inputClass
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: labelClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Deadline ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: deadline,
								onChange: (e) => setDeadline(e.target.value),
								placeholder: "dd/mm/yyyy",
								className: inputClass
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: labelClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Proposed Fee ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: proposedFee,
									onChange: (e) => setProposedFee(e.target.value),
									placeholder: "e.g N35000",
									className: inputClass
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3.5 py-2.5 text-xs text-orange-800 items-start select-none leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-4 h-4 text-orange-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The minimum fee for Property Law tasks is ₦30,000. Proposed fees below this amount cannot be submitted." })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold text-[#080a0f]",
							children: [
								"Required Documents (optional)",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500 font-normal",
									children: requiredMark
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-[11px] text-gray-500 font-normal bg-gray-100 px-2 py-0.5 rounded",
									children: "Only upload client instructions. Do not upload confidential documents."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border border-dashed border-gray-300 rounded-xl bg-[#f9fafb] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/50 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col items-center cursor-pointer w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5 text-gray-400" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-gray-600",
										children: uploadedFile ? uploadedFile.name : "Upload Required Documents"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-[11px] text-gray-400 font-normal",
										children: "Required Upload documents include PDF, Word Documents and Images"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										onChange: handleFileChange,
										className: "hidden"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold text-[#080a0f]",
							children: ["Confidentiality Level ", requiredMark]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setConfidentiality("standard"),
								className: `border p-4 rounded-xl cursor-pointer select-none transition-all flex flex-col gap-1 text-left ${confidentiality === "standard" ? "border-[#00726d] bg-[#f0faf9]" : "border-gray-200 bg-white hover:border-gray-300"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs font-bold ${confidentiality === "standard" ? "text-[#00726d]" : "text-gray-800"}`,
									children: "Standard"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-gray-500 font-normal",
									children: "Visible to lawyers who apply"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setConfidentiality("restricted"),
								className: `border p-4 rounded-xl cursor-pointer select-none transition-all flex flex-col gap-1 text-left ${confidentiality === "restricted" ? "border-[#00726d] bg-[#f0faf9]" : "border-gray-200 bg-white hover:border-gray-300"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs font-bold ${confidentiality === "restricted" ? "text-[#00726d]" : "text-gray-800"}`,
									children: "Restricted"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-gray-500 font-normal",
									children: "Details shared only after selection"
								})]
							})]
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-end gap-3 select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => alert("Saved to draft!"),
							className: "inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 font-secondary text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] focus:outline-none cursor-pointer",
							children: "Save to draft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none cursor-pointer",
							children: "Post Task"
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { PostJobPage as component };
