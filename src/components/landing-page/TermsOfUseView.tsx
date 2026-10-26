import React, { useState, useMemo } from 'react'
import {
  FileText,
  Scale,
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
  Gavel,
  Lock,
  DollarSign,
  AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'

export function TermsOfUseView() {
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
        title: 'Introduction',
        icon: FileText,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              These Terms of Use govern access to and use of CounselTask, a digital platform designed to enable legal practitioners called to the Nigerian Bar to offer, request, accept, and perform legal work from legal practitioners only for a fee.
            </p>
            <p>
              If you want to use CounselTask, whether just by looking around or by registering an account, you must first read and agree to these Terms of Use. If you don’t understand the Terms of Use or you don’t agree to all of its terms and conditions, you may not use CounselTask. If you do not understand or agree to these Terms of Use, do not click to accept this Agreement, “Sign Up”, “Create My Account”, or similar, and do not visit the website of CounselTask, use our mobile applications, or otherwise use CounselTask.
            </p>
            <p>
              By registering for, accessing, or using CounselTask, you agree to be bound by these Terms of Use, as amended from time to time. If you do not agree with these Terms, you must not access or use the platform.
            </p>
          </div>
        ),
      },
      {
        id: 'section-2',
        num: '2',
        title: 'Eligibility and Account Registration',
        icon: UserCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              CounselTask is available only to persons who have been called to the Nigerian Bar and are legally entitled to practise as legal practitioners in Nigeria. By creating an account, you represent and warrant that you are a legal practitioner called to the Nigerian Bar, that all information and documents submitted during registration are true, accurate, current, and complete, and that you will promptly update such information where necessary.
            </p>
            <div className="bg-amber-50/90 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 text-xs md:text-sm space-y-1">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Verification & Enforcement:</strong> CounselTask may require verification of your call to Bar status, enrolment details, practising fee payment status, identity, contact information, or other credentials. CounselTask reserves the right to refuse registration, suspend access, or terminate any account where verification is unsuccessful, incomplete, misleading, or inconsistent with these Terms. CounselTask also reserves the right to report users to the relevant security agencies for criminal prosecution where false and/or misleading information is provided.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'section-3',
        num: '3',
        title: 'Nature of the Platform and No Professional Relationship with CounselTask',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              CounselTask is a marketplace and technology platform that facilitates introductions, communications, project postings, engagements, and payments between eligible legal practitioners. CounselTask is not a law firm, does not provide legal services, does not practise law and/or collaborate with any lawyer in the practice of law, and does not supervise or control the professional judgment, advice, strategy, or legal work of any user.
            </p>
            <p>
              Use of CounselTask does not create any business, employment, partnership, agency, fiduciary, solicitor-client, client-counsel, professional, advisory, or other professional relationship between CounselTask and any user. Any professional relationship, if created, exists solely between the lawyers who agree to work together through the platform, subject to the Rules of Professional Conduct for Legal Practitioners in Nigeria, Legal Practitioners Act, as amended from time to time and all other applicable Nigerian laws, and regulations.
            </p>
          </div>
        ),
      },
      {
        id: 'section-4',
        num: '4',
        title: 'User Responsibilities and Professional Conduct',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Users must comply with all applicable laws, the Legal Practitioners Act, applicable Rules of Professional Conduct for Legal Practitioners, and all ethical obligations relating to competence, confidentiality, conflicts of interest, client funds, professional independence, advertising, fees, and dealings with other lawyers.
            </p>
            <p>
              Users must not engage in fraud, misrepresentation, plagiarism, impersonation, harassment, unlawful solicitation, unauthorised practice, breach of confidentiality, misuse of client information, fee manipulation, circumvention of platform processes, or any conduct that brings the legal profession, CounselTask, or other users into disrepute.
            </p>
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs md:text-sm text-red-900">
              <strong>Mandatory Regulatory Reporting:</strong> Any misconduct, suspected professional misconduct, unethical conduct, or breach of professional obligations occurring on or in connection with CounselTask may be reported by CounselTask to the Legal Practitioners Disciplinary Committee, the Nigerian Bar Association, law enforcement agencies, courts, regulators, or any other competent authority, as CounselTask considers appropriate.
            </div>
          </div>
        ),
      },
      {
        id: 'section-5',
        num: '5',
        title: 'Engagements Between Users',
        icon: Gavel,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Users are solely responsible for negotiating and agreeing the scope of work, fees, timelines, deliverables, confidentiality obligations, conflict checks, client authorisations, file-sharing procedures, and any other terms applicable to a legal task. CounselTask is not a party to any engagement between users unless expressly stated in writing.
            </p>
            <p>
              Each user must independently determine whether accepting or assigning a task is consistent with that user’s professional obligations, including duties relating to professional competence, confidentiality, conflicts of interest, supervision, instructions, client authority, and fees.
            </p>
          </div>
        ),
      },
      {
        id: 'section-6',
        num: '6',
        title: 'Fees, Payments, and Platform Charges',
        icon: DollarSign,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Users may agree fees for tasks posted or accepted through CounselTask. CounselTask may charge subscription fees, service fees, transaction charges, administrative charges, or other platform fees, which may be displayed on the platform or communicated to users from time to time.
            </p>
            <p>
              Users are responsible for all taxes, levies, charges, and statutory obligations arising from payments received or made through the platform. In line with its statutory obligation, CounselTask may withhold applicable taxes and levies and remit them to the relevant tax authority in Nigeria.
            </p>
            <p>
              CounselTask may withhold, reverse, suspend, or delay payments where there is a suspected breach of these Terms, suspected fraud, a dispute between users, unlawful activity, chargeback risk, regulatory concern, or any obligation to comply with applicable law or payment processing requirements.
            </p>
          </div>
        ),
      },
      {
        id: 'section-7',
        num: '7',
        title: 'Confidentiality, Data Protection, and Client Information',
        icon: Lock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Users must treat all confidential, privileged, personal, commercial, and client-related information accessed through CounselTask with strict confidentiality and in accordance with the Rules of Professional Conduct for Legal Practitioners and any other applicable law and professional obligations in Nigeria.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs md:text-sm text-slate-800">
              <strong>Warranty of Client Authorization:</strong>
              <p>
                Users must not upload, disclose, process, or share client information unless they have all necessary authority, consent, lawful basis, and professional justification to do so. By uploading, disclosing, processing or sharing client-related information, Users warrant and confirm that they have the authority of their clients to do so and such disclosure, processing, or sharing is not a breach of counsel-client privilege, non-disclosure agreement and any other statutory, professional or contractual obligations.
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-600">
              CounselTask may collect and process user information for account verification, platform operation, payment processing, dispute management, compliance, security, analytics, communication, and other lawful purposes. Users must comply with all applicable data protection and privacy requirements when using the platform.
            </p>
          </div>
        ),
      },
      {
        id: 'section-8',
        num: '8',
        title: 'Prohibited Uses',
        icon: AlertTriangle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>Users must not use CounselTask to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-gray-700">
              <li>Commit unlawful acts or evade professional obligations to clients;</li>
              <li>Facilitate unauthorised practice of law;</li>
              <li>Solicit work contrary to professional rules (in the Rules of Professional Conduct for Legal Practitioners and the Legal Practitioners Act);</li>
              <li>Share false credentials or misrepresent qualification and experience;</li>
              <li>Infringe intellectual property rights;</li>
              <li>Upload malicious code or viruses;</li>
              <li>Interfere with platform security or circumvent authentication controls;</li>
              <li>Create multiple deceptive accounts;</li>
              <li>Bypass CounselTask fees or take transactions off-platform; or</li>
              <li>Communicate in a manner that is abusive, discriminatory, threatening, misleading, or otherwise improper.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'section-9',
        num: '9',
        title: 'Intellectual Property',
        icon: Building,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              All trademarks, trade names, logos, platform designs, software, workflows, databases, and other materials owned or licensed by CounselTask remain the intellectual property of CounselTask or its licensors. Users are granted a limited, revocable, non-exclusive, non-transferable licence to access and use the platform solely in accordance with these Terms.
            </p>
            <p>
              Users retain ownership of documents, drafts, work products, and materials they create or upload, subject to any rights granted between users under a task engagement and any licence reasonably necessary for CounselTask to host, transmit, store, display, process, and secure such materials for platform operation.
            </p>
          </div>
        ),
      },
      {
        id: 'section-10',
        num: '10',
        title: 'Platform Availability and Changes',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              CounselTask may modify, suspend, restrict, update, or discontinue any part of the platform at any time. CounselTask does not guarantee uninterrupted, error-free, secure, or continuous availability of the platform and will not be liable for downtime, data loss, delays, service interruptions, or technical failures except to the extent liability cannot be excluded under applicable law.
            </p>
          </div>
        ),
      },
      {
        id: 'section-11',
        num: '11',
        title: 'Suspension and Termination',
        icon: AlertCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              CounselTask may suspend, restrict, or terminate a user’s account or access to the platform where CounselTask reasonably believes that the user has breached these Terms, failed verification, engaged in misconduct, exposed other users to risk, violated applicable law, failed to pay applicable fees, or acted in a manner prejudicial to the integrity, reputation, or security of the platform.
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              Termination or suspension does not affect any accrued rights, outstanding payment obligations, confidentiality obligations, professional obligations, dispute resolution obligations, or any provision intended to survive termination.
            </p>
          </div>
        ),
      },
      {
        id: 'section-12',
        num: '12',
        title: 'Disclaimers and Limitation of Liability',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              CounselTask does not warrant the quality, legality, accuracy, timeliness, fitness for purpose, professional competence, or outcome of any legal work performed by users through the platform. Users rely on other users, postings, credentials, communications, and work products at their own risk and must conduct their own professional checks and due diligence.
            </p>
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-700">
              To the fullest extent permitted by Nigerian law, CounselTask shall not be liable for indirect, consequential, exemplary, punitive, special, or incidental loss, loss of profit, loss of business, loss of goodwill, loss of data, professional negligence by a user, breach of duty by a user, or any dispute between users arising from or connected with use of the platform.
            </div>
          </div>
        ),
      },
      {
        id: 'section-13',
        num: '13',
        title: 'Indemnity',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Each user agrees to indemnify and hold CounselTask, its officers, employees, agents, affiliates, and service providers harmless from and against any claims, demands, losses, liabilities, damages, penalties, costs, and expenses arising from that user’s breach of these Terms, professional misconduct, negligent or unlawful conduct, violation of applicable law, infringement of third-party rights, misuse of confidential information, or dispute with another user or client.
            </p>
          </div>
        ),
      },
      {
        id: 'section-14',
        num: '14',
        title: 'Dispute Resolution Between CounselTask and Users',
        icon: Gavel,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>Compulsory Negotiation:</strong> Any dispute, controversy, or claim arising between CounselTask and any user out of or in connection with these Terms, the platform, account access, payments, suspension, termination, or any related matter shall first be referred to compulsory good-faith negotiation. The complaining party shall give written notice of the dispute, and the parties shall attempt to resolve the dispute amicably within <strong>fourteen (14) days</strong> or such other period as the parties may agree in writing.
            </p>
            <div className="p-4 bg-orange-50/60 border border-orange-200/80 rounded-xl space-y-2">
              <strong className="text-sm text-[#041626] block">Binding Arbitration at Lagos Multi-Door Courthouse</strong>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                If negotiation fails, the dispute shall be finally resolved by arbitration administered at the <strong>Lagos Multi-Door Courthouse</strong> in Lagos, Nigeria, in accordance with the applicable arbitration rules and procedures of the Lagos Multi-Door Courthouse and <strong>Arbitration and Mediation Act, 2023</strong>. The seat and venue of arbitration shall be Lagos, Nigeria. The language of the arbitration shall be English. The arbitral award shall be final and binding on the parties and shall be recognised and enforced in any court of competent jurisdiction.
              </p>
            </div>
            <p className="text-xs text-gray-600 pt-1">
              Nothing in this clause prevents CounselTask from seeking urgent interim, injunctive, protective, or conservatory relief from any court or tribunal of competent jurisdiction where necessary to protect its rights, users, confidential information, platform security, intellectual property, or payment systems.
            </p>
          </div>
        ),
      },
      {
        id: 'section-15',
        num: '15',
        title: 'Disputes Between Users',
        icon: HelpCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Disputes between users concerning legal work, fees, deliverables, confidentiality, professional obligations, client authority, or related matters are primarily the responsibility of the affected users. CounselTask may, but is not obliged to, facilitate communication, request information, suspend payment, restrict accounts, or take administrative steps to preserve platform integrity while a dispute is being addressed.
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              Where a user dispute involves suspected professional misconduct, CounselTask may report the matter to the Legal Practitioners Disciplinary Committee or other competent professional or regulatory authority.
            </p>
          </div>
        ),
      },
      {
        id: 'section-16',
        num: '16',
        title: 'Governing Law',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              These Terms of Use and any non-contractual obligations arising from or connected with them shall be governed by and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>.
            </p>
          </div>
        ),
      },
      {
        id: 'section-17',
        num: '17',
        title: 'Amendments to These Terms',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              CounselTask may amend these Terms from time to time. Any amended Terms may be posted on the platform or otherwise communicated to users. Continued access to or use of CounselTask after the effective date of amended Terms constitutes acceptance of the amended Terms.
            </p>
          </div>
        ),
      },
      {
        id: 'section-18',
        num: '18',
        title: 'Notices and Communications',
        icon: Mail,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Notices to users may be sent through the platform, by email, by dashboard notification, or by any other contact details provided by the user. Users are responsible for maintaining accurate and current contact information on the platform.
            </p>
          </div>
        ),
      },
      {
        id: 'section-19',
        num: '19',
        title: 'Miscellaneous',
        icon: Building,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              If any provision of these Terms is held to be invalid, unlawful, or unenforceable, the remaining provisions shall remain in full force and effect. No failure or delay by CounselTask in exercising any right shall constitute a waiver of that right. Users may not assign or transfer their account or rights under these Terms without CounselTask’s prior written consent.
            </p>
            <p>
              These Terms constitute the entire agreement between CounselTask and each user regarding use of the platform, subject to any additional written policies or agreements expressly incorporated by CounselTask.
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
      {/* Top Banner */}
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
                title="Print Terms"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CF6A52]/20 border border-[#CF6A52]/40 text-[#CF6A52] text-xs font-semibold tracking-wide uppercase mb-4">
              <Gavel className="w-3.5 h-3.5" />
              Legal Agreement
            </div>

            <h1 className="text-3xl md:text-5xl font-primary font-bold tracking-tight text-white mb-4">
              Terms of Use
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-secondary">
              Governing access to and use of CounselTask, a digital platform designed to enable legal practitioners called to the Nigerian Bar to offer, request, accept, and perform legal work for a fee.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 text-xs text-gray-300">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Effective Date:</strong> 1st October 2026
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Target Users:</strong> Legal Practitioners Called to Nigerian Bar
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Dispute Resolution:</strong> Lagos Multi-Door Courthouse
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Arbitration Law:</strong> Arbitration & Mediation Act 2023
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#041626]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>19 Contractual Sections</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-normal">Legal Practitioners Act & RPC Compliant</span>
            </div>

            {/* Section Search */}
            <div className="relative min-w-[240px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search terms (e.g. eligibility, fees, arbitration)..."
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
                <span>Terms Navigation</span>
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

            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-[#041626] to-[#0A2642] text-white rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#CF6A52]" />
                <h4 className="font-semibold text-sm">Legal & Help Contacts</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                For questions regarding these Terms or formal legal correspondence:
              </p>
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">Support Desk:</span>
                  <a href="mailto:help@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">
                    help@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">Complaints Desk:</span>
                  <a href="mailto:complaints@counseltask.com" className="text-gray-200 font-semibold hover:underline">
                    complaints@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-gray-400">Governing Law:</span>
                  <span className="text-gray-200">Federal Republic of Nigeria</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Terms Sections */}
          <main className="lg:col-span-8 space-y-6">
            {/* Highlights Box */}
            <div className="bg-gradient-to-r from-orange-50/50 via-white to-gray-50 border border-orange-200/60 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#CF6A52] mb-3">
                Key Terms Summary
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Exclusive Eligibility</div>
                  <div className="text-gray-600">Strictly for legal practitioners called to the Nigerian Bar and entitled to practise.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Technology Platform</div>
                  <div className="text-gray-600">CounselTask is a marketplace and not a law firm; contracts are bilateral between lawyers.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Arbitration in Lagos</div>
                  <div className="text-gray-600">14-day negotiation followed by binding arbitration at the Lagos Multi-Door Courthouse.</div>
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

            {/* Bottom Footer Note */}
            <div className="bg-[#041626] text-white rounded-2xl p-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1">
                <div className="font-semibold text-white">Questions About These Terms?</div>
                <div className="text-xs text-gray-300">
                  Contact our support team for inquiries regarding account policies and verification.
                </div>
              </div>
              <a
                href="mailto:help@counseltask.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#CF6A52] hover:bg-[#b85b45] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span>Contact CounselTask</span>
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
