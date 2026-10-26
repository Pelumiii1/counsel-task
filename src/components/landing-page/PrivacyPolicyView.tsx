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
  Globe,
  Bell,
  Eye,
  Sliders,
  Phone,
} from 'lucide-react'
import { toast } from 'sonner'

export function PrivacyPolicyView() {
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
              <strong>1.1</strong> CounselTask (“CT”, the “Platform”) is an online marketplace, accessible at www.counseltask.com and through any associated mobile application, that enables lawyers called to the Nigerian Bar to post, find, accept and complete legal tasks for one another for a fee. The Platform is owned and operated by <strong>Casebox Technology Nigeria Ltd</strong> (“Casebox”, “we”, “us” or “our”).
            </p>
            <p>
              <strong>1.2</strong> This Privacy Policy explains how we collect, use, disclose, transfer, store and otherwise process personal data when you visit or use the Platform, and the rights you have in relation to your personal data. It is issued in compliance with the Nigeria Data Protection Act 2023 (the “NDPA”), the General Application and Implementation Directive issued by the Nigeria Data Protection Commission (the “GAID”), the Nigeria Data Protection Regulation 2019 (to the extent not inconsistent with the NDPA), the Cybercrimes (Prohibition, Prevention, etc.) Act 2015 (as amended), and other applicable Nigerian laws and regulations (together, “Data Protection Laws”).
            </p>
            <p>
              <strong>1.3</strong> Casebox is the data controller of personal data processed for the operation of the Platform. Where a User (as defined below) shares client or third-party information through the Platform in the course of a legal task, that User remains responsible, as an independent data controller, for having a lawful basis to share such information and for complying with professional confidentiality obligations; in respect of such information Casebox acts only to host and transmit it as directed by the Users.
            </p>
            <p>
              <strong>1.4</strong> By registering on or using the Platform, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        ),
      },
      {
        id: 'section-2',
        num: '2',
        title: 'Definitions',
        icon: Scale,
        content: (
          <div className="space-y-2 text-gray-700 leading-relaxed text-sm md:text-base">
            <p className="font-semibold text-[#041626]">2.1 In this Privacy Policy:</p>
            <div className="grid md:grid-cols-2 gap-2.5 pt-1 text-xs md:text-sm">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>“Client”</strong> means a User who posts a legal task.
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>“Commission”</strong> means the Nigeria Data Protection Commission (NDPC).
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>“Data Subject”</strong> has the meaning ascribed to in the NDPA.
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>“Personal Data”, “Processing” and “Sensitive Personal Data”</strong> have the meanings given in the NDPA.
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>“Service Provider”</strong> means a User who undertakes a legal task.
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>“User”</strong> means any person who registers an account on the Platform.
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'section-3',
        num: '3',
        title: 'Eligibility',
        icon: UserCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>3.1</strong> The Platform is exclusively for legal practitioners whose names are on the Roll of Legal Practitioners kept at the Supreme Court of Nigeria and who are entitled to practise under the Legal Practitioners Act.
            </p>
            <div className="p-3.5 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-lg text-amber-900 text-xs md:text-sm">
              <strong>Protection of Minors (Section 31 NDPA):</strong> The Platform is not directed at persons under 18 years of age, and we do not knowingly process the personal data of children. If we become aware that we hold a child’s personal data, we will delete it promptly, consistent with section 31 of the NDPA.
            </div>
          </div>
        ),
      },
      {
        id: 'section-4',
        num: '4',
        title: 'Personal Data We Collect',
        icon: Lock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="space-y-3 pt-1 text-xs md:text-sm">
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-[#041626] block mb-1">4.1 Account and Identity Data:</strong>
                <p className="text-gray-600">Full name, email address, telephone number, password, profile photograph, date of birth, gender (optional), state and address of practice, and government-issued identification (such as NIN, international passport or driver’s licence).</p>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-[#041626] block mb-1">4.2 Professional Verification Data:</strong>
                <p className="text-gray-600">Supreme Court enrolment number, year of call, call-to-Bar certificate, Nigerian Bar Association (NBA) branch, evidence of payment of practising fees and NBA dues, firm or chambers details, areas of practice, qualifications, experience, and any disciplinary status that is publicly available or that you disclose.</p>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-[#041626] block mb-1">4.3 Task and Communications Data:</strong>
                <p className="text-gray-600">Task descriptions, documents, files, messages, proposals, bids, deliverables, ratings, reviews and dispute submissions exchanged on the Platform.</p>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-[#041626] block mb-1">4.4 Financial and Transaction Data:</strong>
                <p className="text-gray-600">Bank account details, Bank Verification Number (BVN) where required by our payment partners, Tax Identification Number, payment history, escrow and payout records, and invoices. Card details are processed directly by our licensed payment service providers and are not stored by us.</p>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-[#041626] block mb-1">4.5 Third-Party Data in Tasks:</strong>
                <p className="text-gray-600">Task materials may contain personal data of clients, litigants, witnesses or other third parties. Users must share only such data as is necessary for the task, should anonymise or pseudonymise it wherever practicable, and must not upload Sensitive Personal Data unless strictly required and lawfully permitted.</p>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-[#041626] block mb-1">4.6 Sensitive Personal Data:</strong>
                <p className="text-gray-600">We do not collect Sensitive Personal Data (such as health, religious, political, ethnic or biometric data) about Users. Where facial or biometric checks are used for identity verification, we will obtain your explicit consent or rely on another ground permitted under section 30 of the NDPA.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'section-5',
        num: '5',
        title: 'How We Collect Personal Data',
        icon: UserCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p><strong>5.1</strong> We collect personal data:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-gray-700">
              <li><strong>(a) Directly from you:</strong> When you register, complete your profile, post or accept tasks, communicate or make payments;</li>
              <li><strong>(b) Automatically:</strong> When you use the Platform (including session logs, browser types, and usage data); and</li>
              <li><strong>(c) From third parties:</strong> Including the NBA, the Supreme Court of Nigeria or other public registers for verification, identity-verification and payment service providers, and other Users (for example, through reviews or dispute submissions).</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'section-6',
        num: '6',
        title: 'Purposes and Lawful Bases for Processing',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>6.1</strong> We process personal data only where a lawful basis under <strong>section 25 of the NDPA</strong> applies, as follows:
            </p>
            <div className="space-y-2 pt-1 text-xs md:text-sm">
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626]">(a) Performance of Contract:</strong> Creating and managing your account; facilitating task posting, bidding, communication and delivery; processing escrow payments, fees and payouts; and providing customer support.
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626]">(b) Legal Obligation:</strong> Verifying that Users are legal practitioners entitled to practise; complying with tax, anti-money laundering, know-your-customer and record-keeping obligations; and responding to lawful requests from courts, regulators and law enforcement agencies.
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626]">(c) Legitimate Interests:</strong> Maintaining Platform security; preventing fraud, impersonation of lawyers and misuse; resolving disputes between Users; enforcing our Terms of Use; and improving and analysing our services, provided that such interests are not overridden by your fundamental rights and freedoms.
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626]">(d) Consent:</strong> Sending marketing communications and newsletters; using non-essential cookies; and any biometric verification. You may withdraw consent at any time without affecting the lawfulness of processing before withdrawal.
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626]">(e) Vital or Public Interest:</strong> In rare cases, to protect the vital interests of any person or to perform a task carried out in the public interest.
              </div>
            </div>
            <p className="text-xs text-gray-600 pt-1">
              <strong>6.2 Compatibility:</strong> We will not process your personal data for a purpose incompatible with the purpose for which it was collected unless we notify you and, where required, obtain your consent.
            </p>
          </div>
        ),
      },
      {
        id: 'section-7',
        num: '7',
        title: 'Professional Confidentiality',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>7.1</strong> We recognise that Users are bound by the <strong>Rules of Professional Conduct for Legal Practitioners</strong>, including duties of confidentiality and privilege owed to their clients.
            </p>
            <div className="p-4 bg-orange-50/60 border border-orange-200/80 rounded-xl space-y-2 text-xs md:text-sm text-gray-800">
              <strong className="text-sm text-[#041626] block">Strict Access Safeguards</strong>
              <p>
                Casebox will not access the content of tasks, files or messages except where necessary to provide technical support, investigate a reported breach of our Terms of Use or a dispute, ensure security, or comply with law. Personnel with such access are bound by confidentiality obligations.
              </p>
              <p className="text-gray-600 pt-1">
                Each User remains solely responsible for ensuring that sharing client information on the Platform is consistent with their professional obligations and, where required, with the client’s instructions or consent.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'section-8',
        num: '8',
        title: 'Disclosure of Personal Data',
        icon: Eye,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p><strong>8.1 We do not sell your personal data.</strong> We may disclose personal data to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-gray-700">
              <li><strong>(a) Other Users:</strong> To the extent necessary for a task (for example, your public profile, ratings and verification badge are visible to Users, and contact details are shared once a task is engaged);</li>
              <li><strong>(b) Service Providers:</strong> Acting as our data processors, including cloud hosting, identity-verification, payment, email, analytics and customer-support providers, under written contracts that meet <strong>section 29 of the NDPA</strong>;</li>
              <li><strong>(c) Regulatory & Disciplinary Bodies:</strong> The NBA, the Body of Benchers, the Legal Practitioners Disciplinary Committee or other professional bodies where required by law or to report suspected professional misconduct or impersonation;</li>
              <li><strong>(d) Statutory Authorities:</strong> Courts, regulators, the Commission, tax authorities and law enforcement agencies where required by law;</li>
              <li><strong>(e) Professional Advisers:</strong> Auditors, legal advisers and insurers; and</li>
              <li><strong>(f) Corporate Successors:</strong> A purchaser or successor in the event of a merger, acquisition, restructuring or sale of all or part of our business, subject to equivalent confidentiality obligations.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'section-9',
        num: '9',
        title: 'Cross-Border Transfers',
        icon: Globe,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>9.1</strong> Some of our service providers may store or process personal data outside Nigeria. We will transfer personal data outside Nigeria only where the recipient is subject to a law, binding corporate rules, contractual clauses, code of conduct or certification mechanism that affords an adequate level of protection in accordance with <strong>sections 41 and 42 of the NDPA</strong> and any adequacy decisions or guidance issued by the Commission, or where a ground in <strong>section 43 of the NDPA</strong> applies (including your informed consent or the necessity of the transfer for the performance of a contract with you). We will keep a record of the basis for each such transfer.
            </p>
          </div>
        ),
      },
      {
        id: 'section-10',
        num: '10',
        title: 'Data Security & Breach Notification',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>10.1 Technical and Organisational Measures:</strong> We implement appropriate technical and organisational measures, as required by <strong>section 39 of the NDPA</strong>, including encryption in transit and at rest, access controls and role-based permissions, multi-factor authentication, regular security testing, staff training and confidentiality undertakings. No system is completely secure, and you are responsible for keeping your log-in credentials confidential and notifying us immediately of any unauthorised use of your account.
            </p>
            <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-xl space-y-1.5 text-xs md:text-sm text-red-950">
              <strong className="text-sm font-bold text-red-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                10.2 Statutory 72-Hour Breach Notification (Section 40 NDPA)
              </strong>
              <p>
                In the event of a personal data breach likely to result in a risk to the rights and freedoms of individuals, we will notify the Commission <strong>within 72 hours</strong> of becoming aware of it and, where the breach is likely to result in a high risk, we will notify affected Data Subjects without undue delay, in accordance with section 40 of the NDPA.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'section-11',
        num: '11',
        title: 'Data Retention',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>11.1</strong> We retain personal data only for as long as necessary for the purposes set out in this Privacy Policy:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs md:text-sm">
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626] block">Account & Task Records:</strong>
                <span className="text-gray-600">Retained for the life of your account and for <strong>six (6) years</strong> after account closure.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626] block">Financial & Tax Records:</strong>
                <span className="text-gray-600">Retained for at least <strong>six (6) years</strong> as required by applicable tax law.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-[#041626] block">Technical Logs:</strong>
                <span className="text-gray-600">Retained for up to <strong>twelve (12) months</strong>, then deleted or anonymised.</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'section-12',
        num: '12',
        title: 'Cookies and Similar Technologies',
        icon: Sliders,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>12.1</strong> We use strictly necessary cookies to operate the Platform and, with your consent, functional, analytics and marketing cookies. You can manage your preferences through our cookie banner or your browser settings at any time. Disabling certain cookies may affect Platform functionality.
            </p>
          </div>
        ),
      },
      {
        id: 'section-13',
        num: '13',
        title: 'Automated Decision-Making',
        icon: Sliders,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>13.1 Human Review (Section 37 NDPA):</strong> We may use automated tools to recommend tasks, rank profiles and detect fraud. We do not make decisions based solely on automated processing that produce legal or similarly significant effects on you, such as account suspension, without human review. You may request human intervention, express your point of view and contest any such decision in accordance with section 37 of the NDPA.
            </p>
          </div>
        ),
      },
      {
        id: 'section-14',
        num: '14',
        title: 'Your Rights',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>14.1 Statutory Rights:</strong> Subject to the NDPA, you have the right to:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs md:text-sm text-gray-700">
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(a) Be informed:</strong> About the processing of your personal data;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(b) Access:</strong> Obtain confirmation of and access to your personal data;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(c) Rectification:</strong> Rectify inaccurate, outdated or incomplete data;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(d) Erasure:</strong> Request erasure of your personal data;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(e) Restriction:</strong> Restrict processing of your personal data;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(f) Object:</strong> Object to processing, including for direct marketing;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(g) Withdraw consent:</strong> At any time without affecting prior lawfulness;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(h) Data portability:</strong> Receive data in a structured, machine-readable format;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(i) Human intervention:</strong> Not be subject to solely automated decisions;
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                <strong>(j) Lodge a complaint:</strong> File directly with the Commission (NDPC).
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-800">
              <strong>14.2 Exercise of Rights:</strong> To exercise any of these rights, contact our Data Protection Officer using the details in section 17. We may need to verify your identity before acting on a request. We will respond <strong>within thirty (30) days</strong> of receipt and free of charge, unless the request is manifestly unfounded or excessive.
            </div>
          </div>
        ),
      },
      {
        id: 'section-15',
        num: '15',
        title: 'Marketing',
        icon: Mail,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>15.1</strong> We will send marketing communications only with your consent or where otherwise permitted by law. You may opt out at any time by using the unsubscribe link in any message or updating your account settings. Service-related messages (such as task, payment, security notices, and updates on our policies) are not marketing and will continue while your account is active.
            </p>
          </div>
        ),
      },
      {
        id: 'section-16',
        num: '16',
        title: 'Third-Party Links',
        icon: Globe,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>16.1</strong> The Platform may contain links to third-party websites or services, including payment gateways. We are not responsible for their privacy practices, and you should review their privacy policies.
            </p>
          </div>
        ),
      },
      {
        id: 'section-17',
        num: '17',
        title: 'Data Protection Officer and Contact',
        icon: Building,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>17.1</strong> We have designated a Data Protection Officer in accordance with <strong>section 32 of the NDPA</strong>. Questions, requests and complaints may be directed to:
            </p>
            <div className="bg-[#041626] text-white p-5 rounded-xl space-y-2 text-xs md:text-sm">
              <div className="font-semibold text-base text-white">Data Protection Officer, Casebox Technology Nigeria Ltd</div>
              <div className="text-gray-300">
                No. 45 Ademola Alabi Street, off Kudirat Abiola Way, Ikeja, Lagos State, Nigeria
              </div>
              <div className="pt-2 grid sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-400 block">Email Address:</span>
                  <a href="mailto:privacy@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">
                    privacy@counseltask.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Telephone:</span>
                  <a href="tel:07065510304" className="text-gray-200 font-semibold hover:underline">
                    07065510304
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 pt-1">
              <strong>17.2 Regulatory Redress:</strong> If you are not satisfied with our response, you may lodge a complaint with the <strong>Nigeria Data Protection Commission</strong> (<a href="https://www.ndpc.gov.ng" target="_blank" rel="noopener noreferrer" className="text-[#CF6A52] hover:underline font-semibold">www.ndpc.gov.ng</a>) in accordance with section 46 of the NDPA.
            </p>
          </div>
        ),
      },
      {
        id: 'section-18',
        num: '18',
        title: 'Changes to This Privacy Policy',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>18.1</strong> We may update this Privacy Policy from time to time to reflect changes in law or our practices. We will notify you of material changes by email or a prominent notice on the Platform before they take effect, and the “Last updated” date above will be revised.
            </p>
          </div>
        ),
      },
      {
        id: 'section-19',
        num: '19',
        title: 'Governing Law',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>19.1</strong> This Privacy Policy is governed by the laws of the <strong>Federal Republic of Nigeria</strong> and should be read together with our Terms of Service.
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
                title="Print Privacy Policy"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CF6A52]/20 border border-[#CF6A52]/40 text-[#CF6A52] text-xs font-semibold tracking-wide uppercase mb-4">
              <Lock className="w-3.5 h-3.5" />
              Official Data Protection Notice
            </div>

            <h1 className="text-3xl md:text-5xl font-primary font-bold tracking-tight text-white mb-4">
              Privacy Policy
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-secondary">
              Explaining how Casebox Technology Nigeria Ltd collects, uses, discloses, stores, and protects personal data in strict compliance with the Nigeria Data Protection Act 2023 (NDPA).
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 text-xs text-gray-300">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Last Updated:</strong> 1st October 2026
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Data Controller:</strong> Casebox Technology Nigeria Ltd
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Framework:</strong> NDPA 2023 & GAID
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Regulator:</strong> Nigeria Data Protection Commission (NDPC)
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
              <span>19 Policy Sections</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-normal">Section 25 NDPA Lawful Bases</span>
            </div>

            {/* Section Search */}
            <div className="relative min-w-[240px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search privacy terms (e.g. rights, breach, retention)..."
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
                <span>Privacy Navigation</span>
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

            {/* DPO Quick Contact Box */}
            <div className="bg-gradient-to-br from-[#041626] to-[#0A2642] text-white rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#CF6A52]" />
                <h4 className="font-semibold text-sm">Data Protection Officer</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Appointed pursuant to Section 32 of the NDPA 2023:
              </p>
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">Email:</span>
                  <a href="mailto:privacy@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">
                    privacy@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">Phone:</span>
                  <a href="tel:07065510304" className="text-gray-200 font-semibold hover:underline">
                    07065510304
                  </a>
                </div>
                <div className="pt-1 text-gray-300 leading-tight">
                  <span className="text-gray-400 block mb-0.5">Physical Address:</span>
                  No. 45 Ademola Alabi Street, off Kudirat Abiola Way, Ikeja, Lagos
                </div>
              </div>
            </div>
          </aside>

          {/* Main Sections */}
          <main className="lg:col-span-8 space-y-6">
            {/* Highlights Box */}
            <div className="bg-gradient-to-r from-orange-50/50 via-white to-gray-50 border border-orange-200/60 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#CF6A52] mb-3">
                Key Privacy Safeguards
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">Lawyer Privilege</div>
                  <div className="text-gray-600">CT never accesses task files or messages except for technical support, disputes, or court order.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">72-Hour Notification</div>
                  <div className="text-gray-600">Statutory reporting of qualifying data breaches to the NDPC within 72 hours under Section 40 NDPA.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <div className="font-bold text-[#041626] mb-1">30-Day Rights Response</div>
                  <div className="text-gray-600">Free-of-charge response to access, erasure, or portability requests within 30 days.</div>
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
                <div className="font-semibold text-white">Need to Exercise Your Data Subject Rights?</div>
                <div className="text-xs text-gray-300">
                  Contact our Data Protection Officer for access, rectification, or erasure requests.
                </div>
              </div>
              <a
                href="mailto:privacy@counseltask.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#CF6A52] hover:bg-[#b85b45] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span>Email DPO Office</span>
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
