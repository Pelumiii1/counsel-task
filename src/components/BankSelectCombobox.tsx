import * as React from 'react'
import { Check, ChevronsUpDown, Search, X, Sparkles } from 'lucide-react'
import { cn } from '#/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover'
import type { PaystackBank } from '#/hooks/useBanks'

interface BankSelectComboboxProps {
  banks: PaystackBank[]
  value: string // Bank Name or code
  onChange: (bankName: string, bankCode: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function BankSelectCombobox({
  banks,
  value,
  onChange,
  disabled = false,
  className,
  placeholder = 'Select bank...',
}: BankSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  // Find currently selected bank
  const selectedBank = React.useMemo(() => {
    if (!value) return null
    return (
      banks.find(
        (b) =>
          b.name.toLowerCase() === value.toLowerCase() ||
          b.code === value
      ) || null
    )
  }, [banks, value])

  // Filter banks based on search query
  const filteredBanks = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return banks

    return banks.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q)
    )
  }, [banks, search])

  const handleSelect = (bank: PaystackBank) => {
    onChange(bank.name, bank.code)
    setOpen(false)
    setSearch('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'flex h-11 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-sm font-normal text-gray-900 shadow-2xs transition hover:bg-gray-50/50 focus:border-[#00726D] focus:outline-none focus:ring-2 focus:ring-[#00726D]/10 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer',
            !selectedBank && 'text-gray-400',
            className
          )}
        >
          <span className="truncate">
            {selectedBank ? selectedBank.name : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
        className="w-full min-w-[280px] p-0 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden z-50"
      >
        {/* Search Input Box */}
        <div className="flex items-center border-b border-gray-100 px-3.5 py-2.5 bg-gray-50/60">
          <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bank name or code..."
            className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            autoFocus
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md transition cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Bank List Items */}
        <div className="max-h-64 overflow-y-auto p-1.5 divide-y divide-gray-50">
          {filteredBanks.length === 0 ? (
            <div className="py-6 text-center text-xs text-gray-400">
              No bank found matching "{search}".
            </div>
          ) : (
            filteredBanks.map((bank) => {
              const isSelected = selectedBank?.code === bank.code
              const isTestBank = bank.code === '000'

              return (
                <button
                  key={`${bank.code}-${bank.name}`}
                  type="button"
                  onClick={() => handleSelect(bank)}
                  className={cn(
                    'group flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer text-left',
                    isSelected
                      ? 'bg-[#E8F7F5] text-[#00726D] font-medium'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900',
                    isTestBank && !isSelected && 'bg-amber-50/50 hover:bg-amber-50 text-amber-950'
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="truncate">{bank.name}</span>
                    {isTestBank && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100/90 border border-amber-200/80 px-1.5 py-0.2 rounded shrink-0">
                        <Sparkles className="w-2.5 h-2.5" />
                        Test Mode
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        'text-[10px] font-mono px-1.5 py-0.5 rounded border',
                        isSelected
                          ? 'border-[#00726D]/30 bg-white/70 text-[#00726D]'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      )}
                    >
                      {bank.code}
                    </span>
                    <Check
                      className={cn(
                        'h-4 w-4 text-[#00726D] transition',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-3.5 py-2 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 flex items-center justify-between">
          <span>{filteredBanks.length} banks available</span>
          <span className="text-[10px] text-gray-400">Paystack NUBAN</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
