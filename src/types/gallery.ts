
export type AssetStatus = 'unrated' | 'selected' | 'rejected' | 'retouching';

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  x?: number; // For pinpoint comments on image
  y?: number;
}

export interface GalleryAsset {
  id: string;
  url: string;
  filename: string;
  status: AssetStatus;
  rating: number; // 0-5
  comments: Comment[];
  metadata: {
    fStop: string;
    shutter: string;
    iso: string;
    camera: string;
  };
}
