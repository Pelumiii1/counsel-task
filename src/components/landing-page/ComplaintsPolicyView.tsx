import React, { useState, useMemo } from 'react'
import {
  Scale,
  FileText,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Mail,
  Printer,
  Copy,
  Check,
  Search,
  Building,
  ArrowLeft,
  Clock,
  UserCheck,
  ExternalLink,
  ChevronRight,
  Gavel,
} from 'lucide-react'
import { toast } from 'sonner'

export function ComplaintsPolicyView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  const sections = useMemo(
    () => [
      {
        id: 'section-1',
        num: '1',
        title: 'Introduction and Purpose',
        icon: FileText,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>1.1</strong> CounselTask (“CT”) (“the Platform”, “we”, “us” or “our”) is an online legal platform exclusive to Nigerian lawyers (“Users”) operated by <strong>Casebox Technology Nigeria Ltd</strong>, a company incorporated under the laws of the Federal Republic of Nigeria.
            </p>
            <p>
              <strong>1.2</strong> We are committed to providing a fair, transparent and efficient means of resolving complaints. This Policy explains how Users may raise complaints; how we will handle them; and the outcomes available.
            </p>
            <p>
              <strong>1.3</strong> This Policy forms part of, and should be read together with, our <strong>Terms of Use</strong>, and <strong>Privacy Policy</strong>. Where there is a conflict between this Policy and the Terms of Use, the Terms of Use shall prevail.
            </p>
          </div>
        ),
      },
      {
        id: 'section-2',
        num: '2',
        title: 'Nature of the Platform',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>2.1</strong> CT is not a law firm and does not provide legal services or legal advice. Each engagement is a contract directly between Users who remain subject to the provisions of the <strong>Legal Practitioners Act</strong>, the <strong>Rules of Professional Conduct for Legal Practitioners 2023</strong> and any other applicable professional obligations.
            </p>
            <p>
              <strong>2.2</strong> Our complaints process deals with how Users behave on the Platform, how engagements and payments are handled through the Platform, and the Platform’s own services. It does not replace the professional disciplinary mechanisms of the <strong>Nigerian Bar Association (“NBA”)</strong> or the <strong>Legal Practitioners Disciplinary Committee (“LPDC”)</strong>, and it is not a determination of professional misconduct.
            </p>
          </div>
        ),
      },
      {
        id: 'section-3',
        num: '3',
        title: 'Scope',
        icon: AlertCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>3.1</strong> A “Complaint” means any expression of dissatisfaction, whether justified or not, about the Platform or a User. Complaints may include, for example:
            </p>
            <div className="grid md:grid-cols-2 gap-2.5 pt-1 text-sm text-gray-700">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(a)</strong> Failure by a User to deliver agreed work, missed deadlines, or poor communication;
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(b)</strong> Disputes over escrow releases or refunds;
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(c)</strong> Misrepresentation of qualifications, call to Bar status, experience or specialisation;
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(d)</strong> Users behaving abusively;
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(e)</strong> Breach of confidentiality or misuse of personal data;
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(f)</strong> Fraud, impersonation, or attempts to take payment outside CT;
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(g)</strong> Harassment, discrimination or other unprofessional conduct; and
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(h)</strong> Technical faults, account suspensions, billing errors or the conduct of our staff.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <p>
                <strong>3.2</strong> This Policy does <strong>not</strong> cover:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600 mt-1">
                <li>(a) Appeals against the outcome of court proceedings or the legal merits of advice given;</li>
                <li>(b) Matters that are already before a court, arbitral tribunal or professional disciplinary body;</li>
                <li>(c) Feedback or suggestions that do not express dissatisfaction; or</li>
                <li>(d) Complaints made more than <strong>six (6) months</strong> after the complainant became aware of the issue, unless we decide that there is good reason for the delay.</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'section-4',
        num: '4',
        title: 'Guiding Principles',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>We will handle all Complaints:</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-white border border-gray-200 rounded-xl">
                <span className="text-xs font-bold text-[#CF6A52] uppercase block mb-1">Principle (a)</span>
                <strong className="text-sm text-[#041626] block">Fairly & Impartially</strong>
                <p className="text-xs text-gray-600 mt-1">Giving every affected party an opportunity to respond.</p>
              </div>
              <div className="p-3.5 bg-white border border-gray-200 rounded-xl">
                <span className="text-xs font-bold text-[#CF6A52] uppercase block mb-1">Principle (b)</span>
                <strong className="text-sm text-[#041626] block">Promptly</strong>
                <p className="text-xs text-gray-600 mt-1">Strictly within the formal timeframes set out in this Policy.</p>
              </div>
              <div className="p-3.5 bg-white border border-gray-200 rounded-xl">
                <span className="text-xs font-bold text-[#CF6A52] uppercase block mb-1">Principle (c)</span>
                <strong className="text-sm text-[#041626] block">Confidentially</strong>
                <p className="text-xs text-gray-600 mt-1">Sharing info only as reasonably needed or required by law.</p>
              </div>
              <div className="p-3.5 bg-white border border-gray-200 rounded-xl">
                <span className="text-xs font-bold text-[#CF6A52] uppercase block mb-1">Principle (d)</span>
                <strong className="text-sm text-[#041626] block">Without Retaliation</strong>
                <p className="text-xs text-gray-600 mt-1">Protecting any person who raises a complaint in good faith.</p>
              </div>
              <div className="p-3.5 bg-white border border-gray-200 rounded-xl sm:col-span-2 md:col-span-2">
                <span className="text-xs font-bold text-[#CF6A52] uppercase block mb-1">Principle (e)</span>
                <strong className="text-sm text-[#041626] block">Free of Charge</strong>
                <p className="text-xs text-gray-600 mt-1">No administrative fees are charged to Users for lodging or handling a complaint.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'section-5',
        num: '5',
        title: 'Step One: Direct Resolution',
        icon: UserCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="flex items-start gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
              <Clock className="w-5 h-5 text-[#CF6A52] shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-[#041626] block mb-1">Initial 5 Business Days Window</strong>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  <strong>5.1</strong> Where a Complaint relates to an engagement, we encourage Users to first try to resolve it directly through the Platform’s messaging system within <strong>five (5) Business Days</strong>.
                </p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-600">
              <strong>Exception:</strong> This step does not apply where the Complaint involves fraud, harassment, safety concerns or a data breach. In such cases, please proceed directly to Step Two.
            </div>
          </div>
        ),
      },
      {
        id: 'section-6',
        num: '6',
        title: 'Step Two: Making a Formal Complaint',
        icon: Mail,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>6.1 Submission:</strong> A formal Complaint must be submitted by email to <a href="mailto:complaints@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">complaints@counseltask.com</a>.
            </p>
            <p>
              <strong>6.2 Information Required:</strong> A Complaint should include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
              <li><strong>(a)</strong> The complainant’s name, account details and contact information;</li>
              <li><strong>(b)</strong> The name of the User or the part of the Platform complained about;</li>
              <li><strong>(c)</strong> The relevant engagement or transaction reference;</li>
              <li><strong>(d)</strong> A clear description of the issue, including relevant dates;</li>
              <li><strong>(e)</strong> Supporting evidence such as messages, invoices, deliverables or screenshots; and</li>
              <li><strong>(f)</strong> The outcome the complainant is seeking.</li>
            </ul>
            <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3.5 rounded-r-lg text-amber-900 text-xs md:text-sm mt-2">
              <strong>6.3 Confidentiality & Privilege:</strong> Complainants should not include privileged or highly sensitive information beyond what is needed to explain the Complaint. Users responding to a Complaint must continue to observe their duty of confidentiality to their clients.
            </div>
          </div>
        ),
      },
      {
        id: 'section-7',
        num: '7',
        title: 'How We Handle Complaints',
        icon: Clock,
        content: (
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-xs">
                <span className="text-xs font-bold text-[#CF6A52] uppercase tracking-wider">7.1 Acknowledgement</span>
                <h4 className="text-sm font-bold text-[#041626] mt-1">Within 24 Hours</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  We will acknowledge receipt of a Complaint within twenty-four hours and assign it to an unconflicted officer.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-xs">
                <span className="text-xs font-bold text-[#CF6A52] uppercase tracking-wider">7.2 Assessment</span>
                <h4 className="text-sm font-bold text-[#041626] mt-1">Trust & Safety Team</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Where urgent (suspected fraud or fund risk), we may take immediate interim action, including freezing escrow or temporarily suspending an account.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-xs">
                <span className="text-xs font-bold text-[#CF6A52] uppercase tracking-wider">7.3 Investigation</span>
                <h4 className="text-sm font-bold text-[#041626] mt-1">5 Business Days to Respond</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  We will notify the User complained about and give them five (5) Business Days to respond. We may review messages, files, and payment audit logs.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-xs">
                <span className="text-xs font-bold text-[#CF6A52] uppercase tracking-wider">7.4 Decision</span>
                <h4 className="text-sm font-bold text-[#041626] mt-1">15 Business Days Target</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  We aim to issue a written decision with reasons within 15 Business Days (not usually more than 30 Business Days for complex matters).
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'section-8',
        num: '8',
        title: 'Possible Outcomes',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>8.1 Available Decisions:</strong> Depending on the findings, we may:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
              <li><strong>(a)</strong> Dismiss the Complaint where it is not substantiated;</li>
              <li><strong>(b)</strong> Facilitate an agreed settlement between the parties;</li>
              <li><strong>(c)</strong> Release, partly release or refund escrow funds in line with our Terms of Use;</li>
              <li><strong>(d)</strong> Issue a warning to a User;</li>
              <li><strong>(e)</strong> Remove reviews, listings or content;</li>
              <li><strong>(f)</strong> Suspend or permanently terminate an account;</li>
              <li><strong>(g)</strong> Correct a billing error or credit the User’s account; and</li>
              <li><strong>(h)</strong> Refer the matter to the <strong>NBA</strong>, the <strong>LPDC</strong>, the <strong>Nigeria Police Force</strong>, the <strong>EFCC</strong>, the <strong>Nigeria Data Protection Commission</strong> or another relevant authority where appropriate or required by law.</li>
            </ul>
            <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              <strong>8.2 Limitation:</strong> Except for refunds or releases of funds held by the Platform, and credits for our own service failures, we do not award damages or compensation. Our total liability in connection with any Complaint is limited as set out in our Terms of Use.
            </p>
          </div>
        ),
      },
      {
        id: 'section-9',
        num: '9',
        title: 'Step Three: Internal Review',
        icon: HelpCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <p>
                <strong>9.1</strong> A party who is dissatisfied with a decision may request a review within <strong>ten (10) Business Days</strong> of the decision by writing to <a href="mailto:complaintsreview@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">complaintsreview@counseltask.com</a> and explaining the grounds.
              </p>
              <p className="text-sm text-gray-600">
                A senior officer who was not involved in the original decision will consider the review and issue a final internal decision within <strong>ten (10) Business Days</strong>.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'section-10',
        num: '10',
        title: 'External Options',
        icon: Gavel,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <strong className="text-sm text-[#041626] block">10.1 Mediation at Lagos Multi-Door Courthouse</strong>
              <p className="text-sm text-gray-700">
                If a dispute is not resolved through this Policy, the parties <strong>SHALL</strong> refer it to mediation at the <strong>Lagos Multi-Door Courthouse</strong> or a similar alternative dispute resolution centre in any State in Nigeria, or take any other step set out in the dispute resolution clause of our Terms of Use.
              </p>
            </div>
            <p>
              <strong>10.2 Strict Compliance:</strong> All Users agree to be bound by and to strictly comply with the complaint procedure set out in this Policy in resolving any dispute arising from or in connection with their use of CT.
            </p>
          </div>
        ),
      },
      {
        id: 'section-11',
        num: '11',
        title: 'Malicious or Vexatious Complaints',
        icon: AlertCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>11.1</strong> Where we reasonably find that a Complaint is knowingly false, malicious, made to obtain an unfair advantage (such as avoiding payment for work properly done) or repeated without new evidence, we may decline to handle it and take action against the complainant’s account under our Terms of Use.
            </p>
          </div>
        ),
      },
      {
        id: 'section-12',
        num: '12',
        title: 'Data Protection and Records',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>12.1</strong> We will process personal data relating to Complaints in line with the <strong>Nigeria Data Protection Act 2023</strong> and our <strong>Privacy Policy</strong>. We keep complaint records for <strong>six (6) years</strong> from closure, and use anonymised complaint data to improve our services and monitor Lawyer performance.
            </p>
          </div>
        ),
      },
      {
        id: 'section-13',
        num: '13',
        title: 'Accessibility, Definitions and Review',
        icon: Building,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>13.1 Accessibility:</strong> If a complainant needs help making a Complaint, including because of a disability or language need, they may contact us at <a href="mailto:help@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">help@counseltask.com</a> and we will make reasonable adjustments.
            </p>
            <p>
              <strong>13.2 Definition:</strong> “Business Day” means any day other than a Saturday, Sunday or public holiday declared by any State Government and/or the Federal Government of Nigeria.
            </p>
            <p>
              <strong>13.3 Periodic Review:</strong> We may review and update this Policy from time to time. Changes will be published on the Platform and will apply to Complaints submitted after the updated Policy takes effect.
            </p>
          </div>
        ),
      },
    ],
    [],
  )

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections
    const q = searchQuery.toLowerCase()
    return sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.num.includes(q) ||
        sec.id.toLowerCase().includes(q),
    )
  }, [sections, searchQuery])

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-[#1E293B]">
      {/* Header Banner */}
      <div className="bg-[#041626] text-white border-b border-white/10 pt-10 pb-16 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CF6A52]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to CounselTask Home
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
                title="Copy Page Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
                title="Print this Policy"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CF6A52]/20 border border-[#CF6A52]/40 text-[#CF6A52] text-xs font-semibold tracking-wide uppercase mb-4">
              <Scale className="w-3.5 h-3.5" />
              CounselTask Policy Document
            </div>

            <h1 className="text-3xl md:text-5xl font-primary font-bold tracking-tight text-white mb-4">
              Complaints Policy
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-secondary">
              Providing a fair, transparent, and prompt procedure for resolving complaints and disputes arising from or in connection with the use of CounselTask, operated by Casebox Technology Nigeria Ltd.
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 text-xs text-gray-300">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Effective Date:</strong> 1st October 2026
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Version:</strong> 1.0
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Operator:</strong> Casebox Technology Nigeria Ltd
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>ADR Forum:</strong> Lagos Multi-Door Courthouse
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Search Sub-Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#041626]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>13 Policy Sections</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-normal">Legal Practitioners Act & RPC 2023 Compliant</span>
            </div>

            {/* Section Search */}
            <div className="relative min-w-[240px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sections (e.g. escrow, timelines, step)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#CF6A52] focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-between">
                <span>Policy Navigation</span>
                <span className="text-[10px] font-mono text-gray-400">
                  {filteredSections.length} / {sections.length}
                </span>
              </h3>

              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {filteredSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs md:text-sm text-gray-600 hover:text-[#041626] hover:bg-gray-50 transition-colors group"
                  >
                    <span className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-[#CF6A52] group-hover:text-white flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0 transition-colors">
                      {sec.num}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Process Overview Box */}
            <div className="bg-gradient-to-br from-[#041626] to-[#0A2642] text-white rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#CF6A52]" />
                <h4 className="font-semibold text-sm">Complaint Procedure Channels</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Contact channels specified under this Policy:
              </p>
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">Formal Complaints:</span>
                  <a href="mailto:complaints@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">
                    complaints@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">Internal Review:</span>
                  <a href="mailto:complaintsreview@counseltask.com" className="text-gray-200 font-semibold hover:underline">
                    complaintsreview@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-gray-400">Help & Accessibility:</span>
                  <a href="mailto:help@counseltask.com" className="text-gray-200 font-semibold hover:underline">
                    help@counseltask.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Sections */}
          <main className="lg:col-span-8 space-y-6">
            {/* Quick 3-Step Process Graphic */}
            <div className="bg-gradient-to-r from-orange-50/50 via-white to-gray-50 border border-orange-200/60 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#CF6A52] mb-3">
                Resolution Workflow at a Glance
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Step 1: Direct Resolution</div>
                  <div className="text-gray-600">Users attempt resolution via in-app chat within 5 Business Days.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Step 2: Formal Complaint</div>
                  <div className="text-gray-600">Email complaints@counseltask.com. Decision within 15 Business Days.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Step 3: Internal Review</div>
                  <div className="text-gray-600">Appeal within 10 days to complaintsreview@counseltask.com.</div>
                </div>
              </div>
            </div>

            {filteredSections.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-gray-800">No matching sections found</h3>
                <p className="text-xs text-gray-500 mt-1">Try another search keyword.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold rounded-lg text-gray-700 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const IconComponent = sec.icon
                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs scroll-mt-24 transition-all duration-200 hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-[#CF6A52] flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-[#CF6A52] uppercase tracking-wider">
                          Section {sec.num}
                        </span>
                        <h2 className="text-lg md:text-xl font-bold text-[#041626] font-primary">
                          {sec.title}
                        </h2>
                      </div>
                      <a
                        href={`#${sec.id}`}
                        className="text-gray-300 hover:text-[#CF6A52] text-xs font-mono transition-colors"
                        title="Direct link to this section"
                      >
                        #{sec.id}
                      </a>
                    </div>

                    <div className="font-secondary">{sec.content}</div>
                  </section>
                )
              })
            )}

            {/* Bottom Contact Box */}
            <div className="bg-[#041626] text-white rounded-2xl p-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1">
                <div className="font-semibold text-white">Have a Formal Complaint to Submit?</div>
                <div className="text-xs text-gray-300">
                  Send your statement and supporting documents to our Trust and Safety team.
                </div>
              </div>
              <a
                href="mailto:complaints@counseltask.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#CF6A52] hover:bg-[#b85b45] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span>Email Complaints Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
