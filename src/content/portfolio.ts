export type UnsplashImage = {
  alt: string;
  height: number;
  id: string;
  imageUrl: string;
  photographerName: string;
  photographerProfileUrl: string;
  sourceUrl: string;
  width: number;
};

export type PortfolioProject = {
  category: string;
  images: UnsplashImage[];
  summary: string;
  title: string;
};

export type PortfolioSlide = {
  alt: string;
  category: string;
  id: string;
  imageUrl: string;
  photographerName: string;
  photographerProfileUrl: string;
  sourceUrl: string;
  title: string;
  videoUrl?: string;
};
