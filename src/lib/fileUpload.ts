import { apiClient } from './apiClient'

export interface UploadedFileResponse {
  url: string
  fileName: string
  provider: string
  size: number
  contentType: string
}

export interface StorageStatus {
  provider: string
  readyForUploads: boolean
  cloudinaryConfigured: boolean
}

/**
 * Upload a file to Counsel Task backend storage (Cloudinary or local fallback)
 * @param file The File object from input
 * @param folder Optional folder name (e.g. 'briefs', 'evidence', 'profiles')
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
