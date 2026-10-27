import { apiClient } from './apiClient'
import { toast } from 'sonner'

export interface UploadedFileResponse {
  fileId?: string
  id?: number
  fileName: string
  originalName?: string
  contentType: string
  sizeBytes?: number
  sizeFormatted?: string
  storageType?: string
  downloadUrlEndpoint?: string
  url: string
}

export interface StorageStatus {
  provider: string
  storageType: string
  readyForUploads: boolean
  bucketName: string
  signedUrlDurationMinutes: number
}

/**
 * Upload a file to Counsel Task backend storage (Cloudflare R2 private bucket)
 * @param file The File object from input
 * @param folder Optional folder name (e.g. 'briefs', 'evidence', 'attachments', 'tasks')
 */
export async function uploadFile(
  file: File,
  folder: string = 'general'
): Promise<UploadedFileResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await apiClient.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  if (!response.data || !response.data.success) {
    throw new Error(response.data?.message || 'File upload failed')
  }

  return response.data.data as UploadedFileResponse
}

/**
 * Check storage configuration status
 */
export async function getStorageStatus(): Promise<StorageStatus> {
  const response = await apiClient.get('/files/status')
  return response.data.data as StorageStatus
}

/**
 * Requests a short-lived signed GET download URL from Cloudflare R2
 * using the authenticated user's session credentials.
 * If given a legacy full public URL (e.g. Cloudinary), it returns it directly.
 */
export async function getFileDownloadUrl(fileIdentifierOrUrl: string): Promise<string> {
  if (!fileIdentifierOrUrl || fileIdentifierOrUrl === '#') return ''

  // If already an external third-party URL (e.g. legacy Cloudinary)
  if (
    (fileIdentifierOrUrl.startsWith('http://') || fileIdentifierOrUrl.startsWith('https://')) &&
    !fileIdentifierOrUrl.includes('/api/files/')
  ) {
    return fileIdentifierOrUrl
  }

  // Extract fileId from "/api/files/{fileId}/download-url" or raw UUID/numeric ID
  let fileId = fileIdentifierOrUrl.trim()
  const match = fileIdentifierOrUrl.match(/\/api\/files\/([^/]+)\/download-url/)
  if (match) {
    fileId = match[1]
  }

  const response = await apiClient.get(`/files/${fileId}/download-url`)
  if (response.data && response.data.success && response.data.data?.downloadUrl) {
    return response.data.data.downloadUrl
  }
  throw new Error(response.data?.message || 'Failed to generate download URL')
}

/**
 * Helper to securely open or download a private R2 document in a new tab.
 */
export async function openSecureFile(fileIdentifierOrUrl?: string) {
  if (!fileIdentifierOrUrl || fileIdentifierOrUrl === '#') return

  const toastId = toast.loading('Preparing secure download link...')
  try {
    const url = await getFileDownloadUrl(fileIdentifierOrUrl)
    toast.dismiss(toastId)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  } catch (err: any) {
    toast.dismiss(toastId)
    toast.error(
      err?.response?.data?.message ||
        err?.message ||
        'Access denied: You are not authorized to view this document.'
    )
  }
}
