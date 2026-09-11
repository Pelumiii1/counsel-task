import { apiClient } from './apiClient'

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, any>) => {
        openIframe: () => void
      }
      new (): {
        newTransaction: (options: Record<string, any>) => void
      }
    }
  }
}

export interface PaystackPaymentOptions {
  key?: string
  email: string
  amountInKobo: number
  currency?: string
  reference?: string
  channels?: ('card' | 'bank' | 'ussd' | 'qr' | 'bank_transfer')[]
  metadata?: Record<string, any>
  onSuccess: (response: { reference: string; [key: string]: any }) => void
  onClose?: () => void
}

let scriptLoadingPromise: Promise<boolean> | null = null

/**
 * Dynamically loads the official Paystack Inline script if not already loaded.
 */
export function loadPaystackScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.PaystackPop) return Promise.resolve(true)
  if (scriptLoadingPromise) return scriptLoadingPromise

  scriptLoadingPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      console.error('Failed to load Paystack Inline script.')
      resolve(false)
    }
    document.body.appendChild(script)
  })

  return scriptLoadingPromise
}

/**
 * Retrieves the Paystack public key from env or backend config.
 */
export async function getPaystackPublicKey(): Promise<string> {
  const envKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
  if (envKey && envKey.trim() !== '' && !envKey.includes('your_public_key_here')) {
    return envKey.trim()
  }

  try {
    const res = await apiClient.get<{ success: boolean; data?: { publicKey?: string } }>(
      '/payments/paystack/config',
    )
    if (res.data?.data?.publicKey) {
      return res.data.data.publicKey
    }
  } catch (err) {
    console.warn('Could not fetch Paystack public key from backend:', err)
  }

  return envKey || ''
}

/**
 * Opens the Paystack modal for payment.
 */
export async function launchPaystackPayment(options: PaystackPaymentOptions): Promise<void> {
  const isLoaded = await loadPaystackScript()
  if (!isLoaded || !window.PaystackPop) {
    throw new Error('Paystack SDK could not be loaded. Please check your internet connection.')
  }

  const publicKey = options.key || (await getPaystackPublicKey())
  if (!publicKey || publicKey.includes('your_public_key_here')) {
    throw new Error(
      'Paystack Public Key is not configured. Please add your key to frontend/.env (VITE_PAYSTACK_PUBLIC_KEY) or backend application.properties (paystack.public.key).',
    )
  }

  const handler = window.PaystackPop.setup({
    key: publicKey,
    email: options.email,
    amount: Math.round(options.amountInKobo),
    currency: options.currency || 'NGN',
    ref: options.reference || `counsel_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    channels: options.channels && options.channels.length > 0 ? options.channels : ['card', 'bank', 'bank_transfer', 'ussd', 'qr'],
    metadata: options.metadata || {},
    callback: function (response: { reference: string; [key: string]: any }) {
      options.onSuccess(response)
    },
    onClose: function () {
      if (options.onClose) {
        options.onClose()
      }
    },
  })

  handler.openIframe()
}
