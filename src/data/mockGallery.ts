
import { GalleryAsset } from '../types/gallery';

export const MOCK_GALLERY_ASSETS: GalleryAsset[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `img-${i + 1}`,
  url: `https://images.unsplash.com/photo-${
    [
      '1534528741775-53994a69daeb',
      '1515886657613-9f3515b0c78f', 
      '1494790108377-be9c29b29330',
      '1509631179647-0177331693ae',
      '1483985988355-763728e1935b',
      '1500917293891-ef795e70e1f6',
      '1529139574466-a302d2053990',
      '1469334031218-e382a71b716b',
      '1550614000-4b9519e02d48',
      '1611162617474-5b21e879e113',
      '1581044777550-4cfa60707c03',
      '1531746020798-e6953c6e8e04'
    ][i % 12]
  }?q=80&w=1200&auto=format&fit=crop`,
  filename: `CAM_25_${1000 + i}.jpg`,
  status: i === 0 ? 'selected' : i === 2 ? 'rejected' : 'unrated',
  rating: i === 0 ? 5 : 0,
  comments: i === 0 ? [
    { id: 'c1', user: 'Creative Director', text: 'Love the lighting here. Let\'s bring up the shadows slightly.', timestamp: '2h ago' }
  ] : [],
  metadata: {
    fStop: 'f/2.8',
    shutter: '1/250',
    iso: '100',
    camera: 'Canon R5'
  }
}));
