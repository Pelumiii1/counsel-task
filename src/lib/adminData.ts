export interface LawyerDetail {
  id: string
  name: string
  fullName: string
  email: string
  phone: string
  location: string
  role: string
  verification: string
  status: string
  joined: string
  totalTasksCompleted: number
  currentActiveTasks: number
  disputesInvolved: number
  tasksPosted: number
  activeTasks: number
  completedTasks: number
  disputesRaised: number
  recentTasks: Array<{
    id: string
    title: string
    status: string
    statusType: string
    budget: string
    date: string
  }>
  disputes: Array<{
    id: string
    task: string
    status: string
    date: string
  }>
}

export interface AdminTaskItem {
  id: string
  title: string
  engagingLawyer: string
  assistingLawyer: string
  budget: string
  status: 'Awaiting Approval' | 'In Progress' | 'Completed' | 'Disputed' | 'Cancelled'
  statusType: 'pending' | 'inprogress' | 'success' | 'disputed' | 'cancelled'
  created: string
  dueDate?: string
  category?: string
  description?: string
  engagingLawyerEmail?: string
  engagingLawyerPhone?: string
  assistingLawyerEmail?: string
  assistingLawyerPhone?: string
  platformFee?: string
  assistingEarnings?: string
  paymentStatus?: string
  timeline?: Array<{
    event: string
    date: string
  }>
}

export const ADMIN_TASKS_DATA: AdminTaskItem[] = [
  {
    id: 'TSK-1032',
    title: 'Employment Agreement',
    engagingLawyer: 'Johnson Legal',
    assistingLawyer: 'Sarah Johnson',
    budget: '₦35,000',
    status: 'Awaiting Approval',
    statusType: 'pending',
    created: '28 Jul 2026',
    dueDate: '31 Jul 2026',
    category: 'Contract Drafting',
    description:
      'Draft a comprehensive Employment Agreement for a technology startup in compliance with Nigerian labour laws. The agreement should cover confidentiality, intellectual property, termination clauses, employee obligations, and dispute resolution. Submit the final draft in Word and PDF formats.',
    engagingLawyerEmail: 'John76@gmail.com',
    engagingLawyerPhone: '090 56276 222 22',
    assistingLawyerEmail: 'John76@gmail.com',
    assistingLawyerPhone: '090 56276 222 22',
    platformFee: '₦10,000',
    assistingEarnings: '₦90,000',
    paymentStatus: 'Escrowed',
    timeline: [
      {
        event: 'Task created by Johnson Legal',
        date: '29 Jul 2026 • 09:15 AM',
      },
      {
        event: 'Accepted by Sarah Johnson',
        date: '29 Jul 2026 • 09:42 AM',
      },
      {
        event: 'Task Submitted',
        date: '31 Jul 2026 • 02:18 PM',
      },
    ],
  },
  {
    id: 'TSK-1032',
    title: 'Lease Review',
    engagingLawyer: 'Prime Chambers',
    assistingLawyer: 'David Williams',
    budget: '₦120,000',
    status: 'In Progress',
    statusType: 'inprogress',
    created: '3 days ago',
  },
  {
    id: 'TSK-1032',
    title: 'Lease Review',
    engagingLawyer: 'Elite Legal',
    assistingLawyer: 'David Williams',
    budget: '₦45,000',
    status: 'Completed',
    statusType: 'success',
    created: '3 days ago',
  },
  {
    id: 'TSK-1032',
    title: 'NDA Draft',
    engagingLawyer: 'Prime Chambers',
    assistingLawyer: 'Michael Brown',
    budget: '₦45,000',
    status: 'Disputed',
    statusType: 'disputed',
    created: '3 days ago',
  },
  {
    id: 'TSK-1032',
    title: 'Lease Review',
    engagingLawyer: 'Prime Chambers',
    assistingLawyer: 'David Williams',
    budget: '₦45,000',
    status: 'Cancelled',
    statusType: 'cancelled',
    created: '3 days ago',
  },
  {
    id: 'TSK-1032',
    title: 'Lease Review',
    engagingLawyer: 'Elite Legal',
    assistingLawyer: 'Michael Brown',
    budget: '₦45,000',
    status: 'Cancelled',
    statusType: 'cancelled',
    created: '3 days ago',
  },
  {
    id: 'TSK-1032',
    title: 'NDA Draft',
    engagingLawyer: 'Johnson Legal',
    assistingLawyer: 'David Williams',
    budget: '₦45,000',
    status: 'Disputed',
    statusType: 'disputed',
    created: '3 days ago',
  },
]


export const LAWYERS_DATA: LawyerDetail[] = [
  {
    id: 'LAW-001',
    name: 'Prime Chambers',
    fullName: 'Sarah Johnson',
    email: 'sarahjohnson@gmail.com',
    phone: '+234 905 627 2222',
    location: 'Lagos, Nigeria',
    role: 'Engaging Lawyer',
    verification: 'Verified',
    status: 'Active',
    joined: '10 Feb 2026',
    totalTasksCompleted: 58,
    currentActiveTasks: 4,
    disputesInvolved: 2,
    tasksPosted: 66,
    activeTasks: 8,
    completedTasks: 75,
    disputesRaised: 3,
    recentTasks: [
      {
        id: 'TSK-1021',
        title: 'Employment Agreement',
        status: 'Awaiting Approval',
        statusType: 'pending',
        budget: '₦35,000',
        date: 'Jul 28',
      },
      {
        id: 'TSK-1023',
        title: 'Lease Review',
        status: 'In Progress',
        statusType: 'inprogress',
        budget: '₦120,000',
        date: 'Jul 30',
      },
      {
        id: 'TSK-1028',
        title: 'NDA Draft',
        status: 'Completed',
        statusType: 'success',
        budget: '₦45,000',
        date: 'Aug 1',
      },
    ],
    disputes: [
      {
        id: 'DSP-001',
        task: 'Employment Agreement',
        status: 'Resolved',
        date: 'Jul 28',
      },
      {
        id: 'DSP-002',
        task: 'Lease Review',
        status: 'Open',
        date: 'Jul 30',
      },
    ],
  },
  {
    id: 'LAW-856',
    name: 'Kemi Okagun',
    fullName: 'Kemi Okagun',
    email: 'kemi.okagun@counsel.ng',
    phone: '+234 812 345 6789',
    location: 'Abuja, Nigeria',
    role: 'Assisting lawyer',
    verification: 'Pending Verification',
    status: 'Active',
    joined: 'Feb 10, 2026',
    totalTasksCompleted: 32,
    currentActiveTasks: 2,
    disputesInvolved: 1,
    tasksPosted: 0,
    activeTasks: 2,
    completedTasks: 32,
    disputesRaised: 1,
    recentTasks: [
      {
        id: 'TSK-1044',
        title: 'Commercial Tenancy Review',
        status: 'In Progress',
        statusType: 'inprogress',
        budget: '₦80,000',
        date: 'Aug 12',
      },
    ],
    disputes: [],
  },
  {
    id: 'LAW-016',
    name: 'Ibrahim yekini',
    fullName: 'Ibrahim Yekini',
    email: 'ibrahim.yekini@law.ng',
    phone: '+234 803 111 2233',
    location: 'Ibadan, Nigeria',
    role: 'Engaging Lawyer',
    verification: 'Verified',
    status: 'Active',
    joined: 'Mar 4, 2026',
    totalTasksCompleted: 45,
    currentActiveTasks: 3,
    disputesInvolved: 0,
    tasksPosted: 48,
    activeTasks: 3,
    completedTasks: 45,
    disputesRaised: 0,
    recentTasks: [],
    disputes: [],
  },
  {
    id: 'LAW-082',
    name: 'Solicitors Ng',
    fullName: 'David Adeleke',
    email: 'contact@solicitors.ng',
    phone: '+234 809 444 5566',
    location: 'Lagos, Nigeria',
    role: 'Engaging Lawyer',
    verification: 'Pending Verification',
    status: 'Active',
    joined: 'Mar 4, 2026',
    totalTasksCompleted: 12,
    currentActiveTasks: 1,
    disputesInvolved: 0,
    tasksPosted: 13,
    activeTasks: 1,
    completedTasks: 12,
    disputesRaised: 0,
    recentTasks: [],
    disputes: [],
  },
  {
    id: 'LAW-234',
    name: 'Bello Wahab',
    fullName: 'Bello Wahab',
    email: 'bello.wahab@counsel.ng',
    phone: '+234 814 777 8899',
    location: 'Kano, Nigeria',
    role: 'Assisting lawyer',
    verification: 'Verified',
    status: 'Suspended',
    joined: 'Feb 10, 2026',
    totalTasksCompleted: 19,
    currentActiveTasks: 0,
    disputesInvolved: 3,
    tasksPosted: 0,
    activeTasks: 0,
    completedTasks: 19,
    disputesRaised: 3,
    recentTasks: [],
    disputes: [
      {
        id: 'DSP-009',
        task: 'Court Appearance Filing',
        status: 'Open',
        date: 'Jan 22',
      },
    ],
  },
  {
    id: 'LAW-355',
    name: 'Mary John',
    fullName: 'Mary John',
    email: 'mary.john@legal.ng',
    phone: '+234 802 333 4455',
    location: 'Port Harcourt, Nigeria',
    role: 'Assisting lawyer',
    verification: 'Pending Verification',
    status: 'Suspended',
    joined: 'Feb 10, 2026',
    totalTasksCompleted: 5,
    currentActiveTasks: 0,
    disputesInvolved: 2,
    tasksPosted: 0,
    activeTasks: 0,
    completedTasks: 5,
    disputesRaised: 2,
    recentTasks: [],
    disputes: [],
  },
  {
    id: 'LAW-124',
    name: 'Prime Laws',
    fullName: 'Chidi Okafor',
    email: 'chambers@primelaws.ng',
    phone: '+234 805 666 7788',
    location: 'Enugu, Nigeria',
    role: 'Assisting lawyer',
    verification: 'Verified',
    status: 'Active',
    joined: 'Jan 8, 2026',
    totalTasksCompleted: 64,
    currentActiveTasks: 5,
    disputesInvolved: 1,
    tasksPosted: 0,
    activeTasks: 5,
    completedTasks: 64,
    disputesRaised: 1,
    recentTasks: [],
    disputes: [],
  },
]
