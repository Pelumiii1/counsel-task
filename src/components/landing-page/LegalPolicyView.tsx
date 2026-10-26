import React, { useState, useMemo } from 'react'
import {
  ShieldCheck,
  Scale,
  FileText,
  Lock,
  UserCheck,
  AlertCircle,
  HelpCircle,
  Mail,
  Printer,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronRight,
  Clock,
  Building,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'

export type PolicyTab = 'privacy' | 'complaints'

interface LegalPolicyViewProps {
  initialTab?: PolicyTab
}

export function LegalPolicyView({ initialTab = 'privacy' }: LegalPolicyViewProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab)
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

  const privacySections = useMemo(
    () => [
      {
        id: 'priv-intro',
        num: '1',
        title: 'Introduction and Scope',
        icon: FileText,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>1.1</strong> CounselTask (“CT”, “the Platform”, “we”, “us”, or “our”) is an online legal marketplace and workflow platform exclusive to verified Nigerian legal practitioners (“Users”), operated by <strong>Casebox Technology Nigeria Ltd</strong>, a company duly incorporated under the laws of the Federal Republic of Nigeria.
            </p>
            <p>
              <strong>1.2</strong> We are committed to maintaining the utmost confidentiality, integrity, and security of personal and professional information entrusted to us. This Privacy Policy (“Policy”) explains how we collect, process, disclose, and safeguard Personal Data across our web services, mobile interfaces, and APIs.
            </p>
            <p>
              <strong>1.3</strong> This Policy is formulated pursuant to the <strong>Nigeria Data Protection Act 2023 (“NDPA”)</strong>, the general data protection guidelines issued by the <strong>Nigeria Data Protection Commission (“NDPC”)</strong>, and relevant sector regulations.
            </p>
            <p>
              <strong>1.4</strong> This Policy forms an integral part of, and must be read in conjunction with, our <strong>Terms of Use</strong> and <strong>Complaints Policy</strong>. Where any conflict arises, the Terms of Use and statutory provisions of Nigerian law shall prevail.
            </p>
          </div>
        ),
      },
      {
        id: 'priv-nature',
        num: '2',
        title: 'Nature of Platform and Professional Confidentiality',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>2.1</strong> CounselTask is a technology platform that connects verified legal practitioners. <strong>CounselTask is not a law firm and does not provide legal advice or legal representation.</strong> All legal engagements created through the Platform constitute direct bilateral contracts between Users.
            </p>
            <p>
              <strong>2.2 Professional Privilege:</strong> Every User remains strictly bound by the provisions of the <strong>Legal Practitioners Act</strong>, the <strong>Rules of Professional Conduct for Legal Practitioners 2023 (“RPC”)</strong>, and the attorney-client privilege.
            </p>
            <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Important Notice on Client Confidences:</strong> Users must not upload, share, or store privileged or sensitive client information beyond what is strictly necessary to describe and execute the assigned legal task. Redaction of sensitive client identifiers is strongly encouraged.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'priv-data-collected',
        num: '3',
        title: 'Categories of Personal Data We Collect',
        icon: Lock,
        content: (
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>We collect only Personal Data necessary for verifying identity, facilitating engagements, processing payments, and operating the Platform:</p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2">
                <h4 className="font-semibold text-[#041626] flex items-center gap-2 text-sm">
                  <UserCheck className="w-4 h-4 text-[#CF6A52]" />
                  A. Verification & Identity Data
                </h4>
                <ul className="list-disc pl-5 text-xs md:text-sm space-y-1 text-gray-600">
                  <li>Full legal name (as registered at the Supreme Court of Nigeria)</li>
                  <li>Supreme Court Enrollment Number (SCN)</li>
                  <li>Year of Call to the Nigerian Bar & Call to Bar certificate</li>
                  <li>Primary Nigerian Bar Association (NBA) Branch</li>
                  <li>Government-issued ID (NIN, International Passport, or Voter's Card)</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2">
                <h4 className="font-semibold text-[#041626] flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-[#CF6A52]" />
                  B. Contact & Professional Profile
                </h4>
                <ul className="list-disc pl-5 text-xs md:text-sm space-y-1 text-gray-600">
                  <li>Professional email address & verified telephone number</li>
                  <li>Office/practice location, state, and jurisdiction</li>
                  <li>Professional biography, areas of specialization, and PQE</li>
                  <li>Profile photograph and credentials</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2">
                <h4 className="font-semibold text-[#041626] flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#CF6A52]" />
                  C. Financial & Escrow Data
                </h4>
                <ul className="list-disc pl-5 text-xs md:text-sm space-y-1 text-gray-600">
                  <li>Bank account details (Bank Name, Account Number, Account Name)</li>
                  <li>Transaction and payout references via licensed processors (Paystack)</li>
                  <li>Escrow deposits, milestones, and release audit logs</li>
                  <li><em>We do not store full payment card details or CVVs</em></li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2">
                <h4 className="font-semibold text-[#041626] flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-[#CF6A52]" />
                  D. Communications & Technical Data
                </h4>
                <ul className="list-disc pl-5 text-xs md:text-sm space-y-1 text-gray-600">
                  <li>In-app encrypted chats, timestamps, task attachments</li>
                  <li>IP address, browser type, device information, session tokens</li>
                  <li>Real-time presence state and notification dispatch logs</li>
                  <li>Audit trails of task milestones, ratings, and formal complaints</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'priv-lawful-bases',
        num: '4',
        title: 'Lawful Bases for Processing',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>Under Section 25 of the <strong>NDPA 2023</strong>, we process your Personal Data based on:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Performance of a Contract:</strong> Creating and managing your account, verifying lawyer status, facilitating task agreements, escrow transactions, and client support.</li>
              <li><strong>Legal & Regulatory Obligations:</strong> Compliance with Nigerian anti-money laundering (AML/CFT) rules, tax reporting, court subpoenas, and statutory demands from the NDPC, NBA, or LPDC.</li>
              <li><strong>Legitimate Interests:</strong> Safeguarding Platform security, preventing unauthorized practice of law, detecting fraudulent behavior, and maintaining dispute records.</li>
              <li><strong>Consent:</strong> Where explicitly provided for optional features, notifications, or marketing updates (which can be revoked at any time).</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'priv-usage',
        num: '5',
        title: 'How We Use Your Personal Data',
        icon: UserCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>Your Personal Data is processed exclusively for legitimate operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Verification:</strong> Confirming active enrollment at the Supreme Court of Nigeria to preserve a trusted legal ecosystem.</li>
              <li><strong>Task Match & Collaboration:</strong> Enabling Engaging Lawyers to review proposals, qualifications, and communicate with Assisting Lawyers.</li>
              <li><strong>Escrow Operations:</strong> Receiving task funds, locking them in escrow, processing milestone approvals, and releasing bank disbursements.</li>
              <li><strong>Dispute Resolution:</strong> Providing an objective audit trail when reviewing complaints or mediating disagreements under our Complaints Policy.</li>
              <li><strong>Platform Security:</strong> Monitoring suspicious logins, enforcing session controls, and protecting user accounts against impersonation.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'priv-sharing',
        num: '6',
        title: 'Data Sharing and Disclosures',
        icon: Lock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p><strong>We never sell, rent, or trade your Personal Data.</strong> We share data strictly with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Other Registered Users:</strong> Your verified name, SCN year, NBA branch, public profile bio, and completed task ratings are visible to registered lawyers to enable engagements.</li>
              <li><strong>Payment Partners:</strong> Licensed financial processors (**Paystack**) for handling secure payments and settlement disbursements.</li>
              <li><strong>Cloud & Hosting Infrastructure:</strong> Secure cloud providers hosting our database, storage, and application backends, bound by stringent confidentiality and NDPA-compliant data processing agreements.</li>
              <li><strong>Regulatory & Law Enforcement Bodies:</strong> Where compelled by valid legal process, or when escalating substantiated fraud, criminal conduct, or professional misconduct to the <strong>NBA, LPDC, Nigeria Police Force, EFCC</strong>, or <strong>NDPC</strong>.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'priv-security',
        num: '7',
        title: 'Security and Technical Safeguards',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              We maintain rigorous administrative, technical, and physical safeguards designed to prevent unauthorized access, loss, or misuse of your information:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="border border-gray-200 p-3 rounded-lg bg-white">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Encryption</div>
                <div className="text-sm font-semibold text-[#041626]">TLS / HTTPS Everywhere</div>
                <p className="text-xs text-gray-600 mt-1">All in-transit data is protected using modern cryptographic ciphers.</p>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg bg-white">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Authentication</div>
                <div className="text-sm font-semibold text-[#041626]">BCrypt & Stateless JWT</div>
                <p className="text-xs text-gray-600 mt-1">Salted password hashing with short-lived session access tokens.</p>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg bg-white">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Access Control</div>
                <div className="text-sm font-semibold text-[#041626]">Strict Role Authorization</div>
                <p className="text-xs text-gray-600 mt-1">Admin least-privilege principles and zero unauthenticated endpoints.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'priv-retention',
        num: '8',
        title: 'Data Retention Schedule',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              We retain your data only for as long as necessary to fulfill the purposes set out in this Policy:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Active Accounts:</strong> Maintained throughout the duration of your active membership on the Platform.</li>
              <li><strong>Engagement & Transaction Records:</strong> In accordance with Nigerian statutory financial reporting requirements and Clause 12 of our Complaints Policy, records of tasks, payments, and closed complaints are retained for <strong>six (6) years</strong>.</li>
              <li><strong>Verification Media:</strong> Identity documents uploaded during onboarding are securely archived or purged once verification of SCN and Bar credentials is finalized.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'priv-rights',
        num: '9',
        title: 'Your Legal Rights Under the NDPA 2023',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>As a Data Subject under Nigerian law, you possess explicit legal rights:</p>
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-sm text-[#041626] block">1. Right of Access</strong>
                <span className="text-xs text-gray-600">Obtain confirmation and copies of your Personal Data held by CounselTask.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-sm text-[#041626] block">2. Right to Rectification</strong>
                <span className="text-xs text-gray-600">Request correction of outdated, incomplete, or inaccurate professional information.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-sm text-[#041626] block">3. Right to Erasure</strong>
                <span className="text-xs text-gray-600">Request deletion of data where retention is no longer justified by law or contract.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-sm text-[#041626] block">4. Right to Data Portability</strong>
                <span className="text-xs text-gray-600">Receive your engagement records in a structured, commonly used digital format.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-sm text-[#041626] block">5. Right to Object / Restrict</strong>
                <span className="text-xs text-gray-600">Restrict processing during an active dispute or challenge legitimate interest grounds.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <strong className="text-sm text-[#041626] block">6. Right to Lodge a Complaint</strong>
                <span className="text-xs text-gray-600">Lodge a complaint directly with the Nigeria Data Protection Commission (NDPC).</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 pt-2">
              To exercise any of these rights, contact our Data Protection Team at <a href="mailto:privacy@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">privacy@counseltask.com</a>.
            </p>
          </div>
        ),
      },
      {
        id: 'priv-cookies',
        num: '10',
        title: 'Cookies & Session Management',
        icon: Lock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              We use strictly necessary cookies and local storage tokens to keep you securely signed in, guard against cross-site request forgery, and retain your interface preferences. We do not employ third-party behavioral advertising or invasive tracking pixels.
            </p>
          </div>
        ),
      },
      {
        id: 'priv-updates',
        num: '11',
        title: 'Policy Updates and Notifications',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              We may periodically revise this Privacy Policy to reflect evolving legal requirements or platform updates. Any amendments will be published on the Platform with an updated Effective Date. Substantive updates will also be announced via your registered email or in-app notification.
            </p>
          </div>
        ),
      },
      {
        id: 'priv-contact',
        num: '12',
        title: 'Contact Information & Data Protection Officer',
        icon: Building,
        content: (
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              For inquiries, data requests, or compliance questions, please contact our designated Data Protection Officer:
            </p>
            <div className="bg-[#041626] text-white p-5 rounded-xl space-y-2 text-sm">
              <div className="font-semibold text-lg text-white">Casebox Technology Nigeria Ltd</div>
              <div className="text-gray-300 text-xs">Operator of CounselTask (“CT”)</div>
              <div className="pt-2 grid sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400 block">Data Protection Office:</span>
                  <a href="mailto:privacy@counseltask.com" className="text-[#CF6A52] font-medium hover:underline">
                    privacy@counseltask.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">General Help & Support:</span>
                  <a href="mailto:help@counseltask.com" className="text-gray-200 font-medium hover:underline">
                    help@counseltask.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Formal Complaints:</span>
                  <a href="mailto:complaints@counseltask.com" className="text-gray-200 font-medium hover:underline">
                    complaints@counseltask.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Jurisdiction:</span>
                  <span className="text-gray-200">Federal Republic of Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [],
  )

  const complaintsSections = useMemo(
    () => [
      {
        id: 'comp-intro',
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
        id: 'comp-nature',
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
        id: 'comp-scope',
        num: '3',
        title: 'Scope of Complaints',
        icon: AlertCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>3.1 Covered Complaints:</strong> A “Complaint” means any expression of dissatisfaction, whether justified or not, about the Platform or a User. Complaints may include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>(a) Failure by a User to deliver agreed work, missed deadlines, or poor communication;</li>
              <li>(b) Disputes over escrow releases or refunds;</li>
              <li>(c) Misrepresentation of qualifications, call to Bar status, experience or specialisation;</li>
              <li>(d) Users behaving abusively;</li>
              <li>(e) Breach of confidentiality or misuse of personal data;</li>
              <li>(f) Fraud, impersonation, or attempts to take payment outside CT;</li>
              <li>(g) Harassment, discrimination or other unprofessional conduct; and</li>
              <li>(h) Technical faults, account suspensions, billing errors or the conduct of our staff.</li>
            </ul>
            <p className="pt-2">
              <strong>3.2 Exclusions:</strong> This Policy does not cover:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>(a) Appeals against the outcome of court proceedings or the legal merits of advice given;</li>
              <li>(b) Matters that are already before a court, arbitral tribunal or professional disciplinary body;</li>
              <li>(c) Feedback or suggestions that do not express dissatisfaction; or</li>
              <li>(d) Complaints made more than <strong>six (6) months</strong> after the complainant became aware of the issue, unless we decide that there is good reason for the delay.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'comp-principles',
        num: '4',
        title: 'Guiding Principles',
        icon: ShieldCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>We will handle all Complaints:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Fairly and impartially:</strong> Giving every party affected an opportunity to respond;</li>
              <li><strong>Promptly:</strong> Within the explicit timeframes established in this Policy;</li>
              <li><strong>Confidentially:</strong> Sharing information only as reasonably needed to resolve the Complaint or as required by law;</li>
              <li><strong>Without retaliation:</strong> Protecting any person who complains in good faith; and</li>
              <li><strong>Free of charge:</strong> Zero fees for lodging or adjudicating complaints.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'comp-step-one',
        num: '5',
        title: 'Step One: Direct Resolution',
        icon: UserCheck,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>5.1</strong> Where a Complaint relates to an engagement, we encourage Users to first try to resolve it directly through the Platform’s messaging system within <strong>five (5) Business Days</strong>.
            </p>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-600">
              <em>Note:</em> This step does not apply where the Complaint involves fraud, harassment, safety concerns, or a data breach.
            </div>
          </div>
        ),
      },
      {
        id: 'comp-step-two',
        num: '6',
        title: 'Step Two: Making a Formal Complaint',
        icon: Mail,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>6.1 Submission:</strong> A formal Complaint must be submitted by email to <a href="mailto:complaints@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">complaints@counseltask.com</a>.
            </p>
            <p>
              <strong>6.2 Required Details:</strong> A Complaint should include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>(a) The complainant’s name, account details and contact information;</li>
              <li>(b) The name of the User or the part of the Platform complained about;</li>
              <li>(c) The relevant engagement or transaction reference;</li>
              <li>(d) A clear description of the issue, including relevant dates;</li>
              <li>(e) Supporting evidence such as messages, invoices, deliverables or screenshots; and</li>
              <li>(f) The outcome the complainant is seeking.</li>
            </ul>
            <p className="text-xs text-gray-500 pt-1">
              <strong>6.3</strong> Complainants should not include privileged or highly sensitive information beyond what is needed to explain the Complaint. Users responding to a Complaint must continue to observe their duty of confidentiality to their clients.
            </p>
          </div>
        ),
      },
      {
        id: 'comp-handling',
        num: '7',
        title: 'How We Handle Complaints (Timelines)',
        icon: Clock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-xs font-bold text-[#CF6A52] uppercase">7.1 Acknowledgement</span>
                <p className="text-sm font-semibold text-[#041626] mt-0.5">Within 24 Hours</p>
                <p className="text-xs text-gray-600 mt-1">Receipt is confirmed and assigned to an unconflicted Trust and Safety officer.</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-xs font-bold text-[#CF6A52] uppercase">7.2 Urgent Interim Action</span>
                <p className="text-sm font-semibold text-[#041626] mt-0.5">Immediate Freeze</p>
                <p className="text-xs text-gray-600 mt-1">Where funds or fraud are at risk, escrow may be frozen immediately.</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-xs font-bold text-[#CF6A52] uppercase">7.3 User Response Window</span>
                <p className="text-sm font-semibold text-[#041626] mt-0.5">5 Business Days</p>
                <p className="text-xs text-gray-600 mt-1">The respondent receives notification and has 5 business days to reply.</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-xs font-bold text-[#CF6A52] uppercase">7.4 Written Decision</span>
                <p className="text-sm font-semibold text-[#041626] mt-0.5">15 Business Days</p>
                <p className="text-xs text-gray-600 mt-1">A reasoned written decision is rendered (max 30 days for complex matters).</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'comp-outcomes',
        num: '8',
        title: 'Possible Outcomes & Remedies',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>8.1 Available Decisions:</strong> Depending on our factual findings, we may:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>(a) Dismiss the Complaint where it is not substantiated;</li>
              <li>(b) Facilitate an agreed settlement between the parties;</li>
              <li>(c) Release, partly release or refund escrow funds in line with our Terms of Use;</li>
              <li>(d) Issue a warning to a User;</li>
              <li>(e) Remove reviews, listings or content;</li>
              <li>(f) Suspend or permanently terminate an account;</li>
              <li>(g) Correct a billing error or credit the User’s account; and</li>
              <li>(h) Refer the matter to the <strong>NBA, LPDC, Nigeria Police Force, EFCC</strong>, or <strong>NDPC</strong> where appropriate or required by law.</li>
            </ul>
            <p className="text-xs text-gray-500 pt-1">
              <strong>8.2 Liability Limit:</strong> Except for refunds or releases of funds held by the Platform and credits for our own service failures, we do not award damages or compensation.
            </p>
          </div>
        ),
      },
      {
        id: 'comp-step-three',
        num: '9',
        title: 'Step Three: Internal Review',
        icon: HelpCircle,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>9.1</strong> A party who is dissatisfied with a decision may request a review within <strong>ten (10) Business Days</strong> of the decision by writing to <a href="mailto:complaintsreview@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">complaintsreview@counseltask.com</a> and explaining the grounds.
            </p>
            <p>
              A senior officer who was not involved in the original decision will consider the review and issue a final internal decision within <strong>ten (10) Business Days</strong>.
            </p>
          </div>
        ),
      },
      {
        id: 'comp-external',
        num: '10',
        title: 'External Options & ADR',
        icon: Scale,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>10.1 Lagos Multi-Door Courthouse:</strong> If a dispute is not resolved through this Policy, the parties <strong>SHALL</strong> refer it to mediation at the <strong>Lagos Multi-Door Courthouse</strong> or a similar alternative dispute resolution centre in any State in Nigeria, or take any other step set out in the dispute resolution clause of our Terms of Use.
            </p>
            <p>
              <strong>10.2</strong> All Users agree to be bound by and to strictly comply with the complaint procedure set out in this Policy in resolving any dispute arising from or in connection with their use of CT.
            </p>
          </div>
        ),
      },
      {
        id: 'comp-malicious',
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
        id: 'comp-records',
        num: '12',
        title: 'Data Protection and Records',
        icon: Lock,
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong>12.1</strong> We process personal data relating to Complaints in line with the <strong>Nigeria Data Protection Act 2023</strong> and our <strong>Privacy Policy</strong>. We keep complaint records for <strong>six (6) years</strong> from closure, and use anonymised complaint data to improve our services and monitor Lawyer performance.
            </p>
          </div>
        ),
      },
      {
        id: 'comp-definitions',
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
              <strong>13.3 Review:</strong> We may review and update this Policy from time to time. Changes will be published on the Platform and will apply to Complaints submitted after the updated Policy takes effect.
            </p>
          </div>
        ),
      },
    ],
    [],
  )

  const activeSections = activeTab === 'privacy' ? privacySections : complaintsSections

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return activeSections
    const q = searchQuery.toLowerCase()
    return activeSections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.num.includes(q) ||
        sec.id.toLowerCase().includes(q),
    )
  }, [activeSections, searchQuery])

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-[#1E293B]">
      {/* Top Breadcrumb & Return Banner */}
      <div className="bg-[#041626] text-white border-b border-white/10 pt-10 pb-16 relative overflow-hidden">
        {/* Subtle decorative glow */}
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
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Policy Documentation
            </div>

            <h1 className="text-3xl md:text-5xl font-primary font-bold tracking-tight text-white mb-4">
              {activeTab === 'privacy' ? 'Privacy Policy' : 'Complaints Policy'}
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-secondary">
              {activeTab === 'privacy'
                ? 'Governing how Casebox Technology Nigeria Ltd processes personal and professional data in strict compliance with the Nigeria Data Protection Act (NDPA) 2023.'
                : 'Providing a fair, transparent, and prompt procedure for resolving disputes and complaints on CounselTask in full alignment with the Legal Practitioners Act and RPC 2023.'}
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 text-xs text-gray-300">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Effective:</strong> 1st October 2026
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Version:</strong> 1.0
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Operator:</strong> Casebox Technology Nigeria Ltd
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                <strong>Jurisdiction:</strong> Federal Republic of Nigeria
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Selector Tabs */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto py-2">
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  setActiveTab('privacy')
                  setSearchQuery('')
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'bg-[#041626] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#041626] hover:bg-gray-100'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Privacy Policy</span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-white font-mono">
                  NDPA 2023
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('complaints')
                  setSearchQuery('')
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'complaints'
                    ? 'bg-[#041626] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#041626] hover:bg-gray-100'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>Complaints Policy</span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#CF6A52] text-white font-mono">
                  ADR & Dispute
                </span>
              </button>
            </div>

            {/* Quick search input */}
            <div className="relative min-w-[220px] max-w-xs shrink-0">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search policy sections..."
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
          {/* Sticky Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-between">
                <span>Table of Contents</span>
                <span className="text-[10px] font-mono text-gray-400">
                  {filteredSections.length} sections
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

            {/* Quick Contact & Escalation Box */}
            <div className="bg-gradient-to-br from-[#041626] to-[#0A2642] text-white rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#CF6A52]" />
                <h4 className="font-semibold text-sm">Need Assistance?</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                If you have queries regarding data privacy, need adjustments under accessibility, or wish to submit formal documentation:
              </p>
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-gray-400">Privacy Inquiries:</span>
                  <a href="mailto:privacy@counseltask.com" className="text-[#CF6A52] font-semibold hover:underline">
                    privacy@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-gray-400">Complaints Desk:</span>
                  <a href="mailto:complaints@counseltask.com" className="text-gray-200 font-semibold hover:underline">
                    complaints@counseltask.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Internal Review:</span>
                  <a href="mailto:complaintsreview@counseltask.com" className="text-gray-200 font-semibold hover:underline">
                    complaintsreview@counseltask.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Body */}
          <main className="lg:col-span-8 space-y-6">
            {filteredSections.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-gray-800">No matching sections found</h3>
                <p className="text-xs text-gray-500 mt-1">Try searching for keywords like "escrow", "data", "timeline", or "NDPA".</p>
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
                        title="Direct Link"
                      >
                        #{sec.id}
                      </a>
                    </div>

                    <div className="font-secondary">{sec.content}</div>
                  </section>
                )
              })
            )}

            {/* Bottom Affirmation Card */}
            <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 border border-gray-200 rounded-2xl p-6 text-sm text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#CF6A52] shrink-0" />
                <div>
                  <div className="font-semibold text-[#041626]">
                    Protected under Nigerian Law
                  </div>
                  <div className="text-xs text-gray-500">
                    Governed by the Nigeria Data Protection Act 2023 & the Legal Practitioners Act.
                  </div>
                </div>
              </div>
              <a
                href="mailto:privacy@counseltask.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#041626] text-white hover:bg-[#0A2642] text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span>Contact Legal Office</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
