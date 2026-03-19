// Placeholder image data URI (1x1 transparent pixel)
export const PLACEHOLDER_IMAGE =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

// Sample placeholder image with color
export const SAMPLE_IMAGE_1 =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%234F46E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3ESample Image 1%3C/text%3E%3C/svg%3E"

export const SAMPLE_IMAGE_2 =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2310B981'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3ESample Image 2%3C/text%3E%3C/svg%3E"

export const SAMPLE_IMAGE_3 =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23F59E0B'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3ESample Image 3%3C/text%3E%3C/svg%3E"

// Mock file data generator
export function createMockFile(
	name: string,
	type: string,
	_size: number,
): File {
	const blob = new Blob(["mock content"], { type })
	return new File([blob], name, { type, lastModified: Date.now() })
}

// Mock file metadata
export interface MockFileMetadata {
	name: string
	size: number
	type: string
	lastModified: Date
	url?: string
}

export function createMockFileMetadata(
	name: string,
	type: string,
	size: number,
): MockFileMetadata {
	return {
		name,
		size,
		type,
		lastModified: new Date(),
		url: type.startsWith("image/") ? SAMPLE_IMAGE_1 : undefined,
	}
}

// Format file size
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes"
	const k = 1024
	const sizes = ["Bytes", "KB", "MB", "GB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`
}
