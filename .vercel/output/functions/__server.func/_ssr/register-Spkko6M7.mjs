import { i as __toESM } from "../_runtime.mjs";
import { F as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Eye, h as ChevronRight, p as EyeOff } from "../_libs/lucide-react.mjs";
import { n as logo_new_default, t as counseltask_verification_seal_3_default } from "./counseltask-verification-seal 3-Bl0HWlPk.mjs";
import { n as labelClass, r as requiredMark, t as inputClass } from "./constants-OkfkKxhm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-Spkko6M7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountDetailsForm({ values, onChange, onProceed }) {
	const [error, setError] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const { fullName, firm, email, phone, password, confirmPassword } = values;
	const handleSubmit = (event) => {
		event.preventDefault();
		setError("");
		if (!fullName || !firm || !email || !phone || !password || !confirmPassword) {
			setError("Please complete all required fields.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords must match.");
			return;
		}
		onProceed();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-8 bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]",
					children: "STEP 1/2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]",
				children: "Account Details"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]",
				children: "Start with your basic details. You'll submit your professional credentials for verification next."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Full Name ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: fullName,
							onChange: (event) => onChange("fullName", event.target.value),
							placeholder: "e.g Onasanya Habeeb",
							className: inputClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Law Firm / Chambers ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: firm,
							onChange: (event) => onChange("firm", event.target.value),
							placeholder: "e.g Habeeb and Co.",
							className: inputClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Email Address ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (event) => onChange("email", event.target.value),
							placeholder: "You@gmail.com",
							className: inputClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Phone Number ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: phone,
							onChange: (event) => onChange("phone", event.target.value),
							placeholder: "090 837 333 272",
							className: inputClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Password ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPassword ? "text" : "password",
								value: password,
								onChange: (event) => onChange("password", event.target.value),
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: labelClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Confirm Password ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showConfirmPassword ? "text" : "password",
								value: confirmPassword,
								onChange: (event) => onChange("confirmPassword", event.target.value),
								placeholder: "Re-enter your password",
								className: `${inputClass} pr-12`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowConfirmPassword(!showConfirmPassword),
								className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer",
								"aria-label": showConfirmPassword ? "Hide password" : "Show password",
								children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5" })
							})]
						})]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700",
				children: error
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "h-4 w-4 stroke-2",
					"aria-hidden": true
				})]
			})
		})]
	});
}
function OtpConfirmationForm({ otp, setOtp, onVerify }) {
	const [error, setError] = (0, import_react.useState)("");
	const otpRefs = (0, import_react.useRef)([]);
	const handleOtpChange = (value, index) => {
		const cleanVal = value.replace(/[^0-9]/g, "").slice(-1);
		const newOtp = [...otp];
		newOtp[index] = cleanVal;
		setOtp(newOtp);
		if (cleanVal !== "" && index < 5) otpRefs.current[index + 1]?.focus();
	};
	const handleOtpKeyDown = (event, index) => {
		if (event.key === "Backspace") if (otp[index] === "" && index > 0) {
			const newOtp = [...otp];
			newOtp[index - 1] = "";
			setOtp(newOtp);
			otpRefs.current[index - 1]?.focus();
		} else {
			const newOtp = [...otp];
			newOtp[index] = "";
			setOtp(newOtp);
		}
	};
	const handleOtpPaste = (event) => {
		event.preventDefault();
		const pastedData = event.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
		if (pastedData.length === 6) {
			setOtp(pastedData.split(""));
			otpRefs.current[5]?.focus();
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setError("");
		if (otp.join("").length < 6) {
			setError("Please enter a valid 6-digit confirmation code.");
			return;
		}
		onVerify();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-[2px] w-8 bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]",
					children: "STEP 1/2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]",
				children: "OTP Confirmation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]",
				children: "Use the verification code below to complete your verification."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col items-center justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 sm:gap-2.5",
							children: [
								0,
								1,
								2
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: (el) => {
									otpRefs.current[i] = el;
								},
								type: "text",
								inputMode: "numeric",
								pattern: "[0-9]*",
								value: otp[i],
								onChange: (e) => handleOtpChange(e.target.value, i),
								onKeyDown: (e) => handleOtpKeyDown(e, i),
								onPaste: i === 0 ? handleOtpPaste : void 0,
								className: "h-[58px] w-[46px] sm:h-[66px] sm:w-[52px] rounded-lg border border-[#dedfe3] bg-white text-center font-secondary text-lg sm:text-xl font-medium text-[#242424] outline-none transition focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10"
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-bold text-[#080a0f] mx-1 sm:mx-2",
							children: "•"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 sm:gap-2.5",
							children: [
								3,
								4,
								5
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: (el) => {
									otpRefs.current[i] = el;
								},
								type: "text",
								inputMode: "numeric",
								pattern: "[0-9]*",
								value: otp[i],
								onChange: (e) => handleOtpChange(e.target.value, i),
								onKeyDown: (e) => handleOtpKeyDown(e, i),
								className: "h-[58px] w-[46px] sm:h-[66px] sm:w-[52px] rounded-lg border border-[#dedfe3] bg-white text-center font-secondary text-lg sm:text-xl font-medium text-[#242424] outline-none transition focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10"
							}, i))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-secondary text-[13px] text-[#6b7280] text-center",
					children: "Enter your one-time password."
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700",
				children: error
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verify and Continue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "h-4 w-4 stroke-[2]",
					"aria-hidden": true
				})]
			})
		})]
	});
}
function FileUploadInput({ label, file, onChange, placeholder = "No file chosen", required = false }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) onChange(e.target.files[0]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 font-secondary text-sm font-semibold text-[#080a0f] w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			label,
			" ",
			required && requiredMark
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between h-12.5 w-full rounded-lg border border-[#dedfe3] bg-white px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-sm ${file ? "text-[#242424]" : "text-[#9ca3af]"} truncate pr-4 font-normal`,
					children: file ? file.name : placeholder
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					ref: fileInputRef,
					onChange: handleFileChange,
					className: "hidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleButtonClick,
					className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dedfe3] bg-[#f9fafb] px-3 text-xs font-medium text-[#4b5563] transition hover:bg-gray-50 active:scale-[0.98] cursor-pointer shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-3.5 h-3.5 text-[#6b7280]",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: 2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
						})
					}), "Upload Document"]
				})
			]
		})]
	});
}
function ProfessionalCredentialsForm({ values, onChange, practisingFeeReceipt, setPractisingFeeReceipt, governmentId, setGovernmentId, supportingCredentials, setSupportingCredentials, onBack, onProceed }) {
	const [error, setError] = (0, import_react.useState)("");
	const { callToBarDate, enrolmentNumber } = values;
	const handleSubmit = (event) => {
		event.preventDefault();
		setError("");
		if (!callToBarDate || !enrolmentNumber || !practisingFeeReceipt || !governmentId) {
			setError("Please complete all required fields.");
			return;
		}
		onProceed();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-8 bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]",
					children: "STEP 2/2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]",
				children: "Submit your credentials"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]",
				children: "Verification confirms you're a practising Nigerian lawyer before you can post a task or message another member."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3 rounded-lg border border-[#D0ECE8] bg-[#F0FAF9] px-4 py-3.5 text-xs sm:text-sm text-[#00726D] items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "w-5 h-5 text-[#00726D] shrink-0 mt-0.5",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor",
					strokeWidth: 2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-secondary leading-normal",
					children: "Verification confirms you're a practising Nigerian lawyer. This is required before you can post a task or message another member."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: labelClass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Call to Bar Date ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: callToBarDate,
						onChange: (event) => onChange("callToBarDate", event.target.value),
						placeholder: "dd/mm/yyyy",
						className: inputClass
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: labelClass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Supreme Court Enrolment Number ", requiredMark] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: enrolmentNumber,
						onChange: (event) => onChange("enrolmentNumber", event.target.value),
						placeholder: "e.g SCN/2014/8999",
						className: inputClass
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadInput, {
						label: "Current Practising Fee Receipt (this year)",
						file: practisingFeeReceipt,
						onChange: setPractisingFeeReceipt,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadInput, {
						label: "Government-Issued Identification",
						file: governmentId,
						onChange: setGovernmentId,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadInput, {
						label: "Supporting Credentials (optional)",
						file: supportingCredentials,
						onChange: setSupportingCredentials
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700",
				children: error
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex justify-end gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 font-secondary text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "h-4 w-4 stroke-2 rotate-180",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "h-4 w-4 stroke-2",
					"aria-hidden": true
				})]
			})]
		})]
	});
}
function AccountStatus() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-8 bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]",
					children: "VERIFICATION"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]",
				children: "Your account status"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]",
				children: "We'll notify you by email once a decision is made. This usually takes 1—2 business days."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 p-6 sm:p-10 border border-gray-100 bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 h-16 rounded-full bg-[#E6F1F0] flex items-center justify-center mb-6",
						children: "⌛"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-secondary text-lg sm:text-xl font-medium text-black text-center",
						children: "Your Documents are under review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-secondary text-[12px] leading-[1.6] text-black text-center max-w-110",
						children: "An administrator is checking your Call to Bar record, enrolment number, and submitted documents. You'll be able to post a task as soon as you're approved."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 w-full max-w-125 px-2 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-1.25 left-[12%] right-[12%] -z-10 flex justify-between gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-dashed border-[#00726D]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-dashed border-[#00726D]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-dashed border-gray-200" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center w-20 sm:w-24",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-full bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight",
										children: "Account Created"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center w-20 sm:w-24",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-full bg-[#00726D]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight",
										children: "Document Submitted"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center w-20 sm:w-24",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-full bg-[#CF6A52]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight",
										children: "Under Review"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center w-20 sm:w-24",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-full border-2 border-gray-300 bg-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight",
										children: "Approved"
									})]
								})
							]
						})]
					})
				]
			})
		] })
	});
}
function AuthRegisterPage() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [showOtp, setShowOtp] = (0, import_react.useState)(false);
	const [step1Values, setStep1Values] = (0, import_react.useState)({
		fullName: "",
		firm: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: ""
	});
	const [otp, setOtp] = (0, import_react.useState)(Array(6).fill(""));
	const [step2Values, setStep2Values] = (0, import_react.useState)({
		callToBarDate: "",
		enrolmentNumber: ""
	});
	const [practisingFeeReceipt, setPractisingFeeReceipt] = (0, import_react.useState)(null);
	const [governmentId, setGovernmentId] = (0, import_react.useState)(null);
	const [supportingCredentials, setSupportingCredentials] = (0, import_react.useState)(null);
	const handleStep1Change = (key, val) => {
		setStep1Values((prev) => ({
			...prev,
			[key]: val
		}));
	};
	const handleStep2Change = (key, val) => {
		setStep2Values((prev) => ({
			...prev,
			[key]: val
		}));
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-160 mx-auto my-auto rise-in",
				children: [
					step === 1 && !showOtp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountDetailsForm, {
						values: step1Values,
						onChange: handleStep1Change,
						onProceed: () => setShowOtp(true)
					}),
					step === 1 && showOtp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpConfirmationForm, {
						otp,
						setOtp,
						onVerify: () => {
							setShowOtp(false);
							setStep(2);
						}
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfessionalCredentialsForm, {
						values: step2Values,
						onChange: handleStep2Change,
						practisingFeeReceipt,
						setPractisingFeeReceipt,
						governmentId,
						setGovernmentId,
						supportingCredentials,
						setSupportingCredentials,
						onBack: () => setStep(1),
						onProceed: () => setStep(3)
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountStatus, {})
				]
			})]
		})]
	});
}
//#endregion
export { AuthRegisterPage as component };
