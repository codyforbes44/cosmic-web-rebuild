export interface AudioFile {
  id: string;
  original_name: string;
  file_size: number;
  duration?: number;
  mime_type: string;
  storage_path: string;
  review_notes?: string;
  created_at: string;
}