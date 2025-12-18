export interface SocialTeaser {
  id: string;
  segmentId: string;
  videoUrl: string;
  prompt: string;
  status: 'processing' | 'ready' | 'failed';
  createdAt: string;
}

export type VideoAspectRatio = '16:9' | '9:16';
export type VideoResolution = '720p' | '1080p';