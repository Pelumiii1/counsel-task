export function formatCurrency(value?: string | number): string {
  if (value === undefined || value === null || value === '') return '₦0'
  const str = String(value).trim()
  const numericOnly = str.replace(/[^0-9.]/g, '')
  if (!numericOnly) return str.startsWith('₦') ? str : `₦${str}`

  const num = parseFloat(numericOnly)
  if (isNaN(num)) return str.startsWith('₦') ? str : `₦${str}`

  return `₦${num.toLocaleString('en-NG')}`
}
