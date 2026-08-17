import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Award, Shield, MapPin, Briefcase, Star, Building } from 'lucide-react'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard/profile')({
  component: AssistingProfilePage,
})

function AssistingProfilePage() {
  const [bio, setBio] = useState(
    'Experienced litigator and legal researcher called to the Nigerian Bar (2018). Specializing in commercial litigation, property dispute advocacy, and motions practice across Lagos State High Courts and Magistrate Courts.',
  )
  const [yearsOfExp, setYearsOfExp] = useState('8 years')
  const [supremeCourtNo, setSupremeCourtNo] = useState('SCN/094821')

  return (
    <div className="flex flex-col w-full min-h-full pb-16">
      {/* Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
          My Lawyer Profile
        </h1>
        <p className="font-secondary text-[13px] text-gray-500 font-normal">
          Manage your verified credentials, practice jurisdictions, bio, and standing.
        </p>
      </section>

      {/* Main Profile Content */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6 max-w-4xl">
        {/* Profile Card Header */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#00726D]/30 shadow-xs shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240&h=240"
                alt="Funke Akindele"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900">Funke Akindele, Esq.</h2>
                <span className="inline-flex items-center gap-1 bg-[#E8F5F3] text-[#00726D] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#96D2CD]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Counsel
                </span>
              </div>
              <p className="text-xs text-gray-500">
                SCN: <strong>{supremeCourtNo}</strong> • Call to Bar: <strong>2018 (6+ Yrs Post-Call)</strong>
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> Lagos & Ogun Courts
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 (28 Briefs)
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shrink-0"
          >
            Edit Profile Details
          </button>
        </div>

        {/* Credentials & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Practice Areas */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4.5 h-4.5 text-[#00726D]" />
              <h3 className="text-sm font-bold text-gray-900">Practice Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Commercial Litigation',
                'Property & Land Law',
                'Criminal Defence',
                'Corporate Practice',
                'Motions & Brief Holding',
                'Legal Research & Drafting',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Verification Badges */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-[#00726D]" />
              <h3 className="text-sm font-bold text-gray-900">Verification Status</h3>
            </div>
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <span className="font-medium">Supreme Court Enrollment verified</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <span className="font-medium">NBA Stamp & Seal Verified (2026)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <span className="font-medium">NIN Identity Verification Passed</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bio summary */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col gap-3">
          <h3 className="text-sm font-bold text-gray-900">Professional Bio</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-normal">{bio}</p>
        </div>
      </section>
    </div>
  )
}
