// Page Types
export type Photo = {
    imageUrl: string;
    blurDataUrl: string | null;
    alt: string;
    width: number;
    height: number;
    linkUrl: string;
};

// Unsplash
export type UnsplashPhoto = {
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string | null;
    urls: UnsplashUrls;
    links: UnsplashLinks;
    user: UnsplashUser;
};

type UnsplashUrls = {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
};

type UnsplashLinks = {
    self: string;
    html: string;
    download?: string;
    download_location?: string;
    photos?: string;
    likes?: string;
    portfolio?: string;
    following?: string;
    followers?: string;
};

type UnsplashUser = {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: UnsplashLinks;
    profile_image: UnsplashProfileImage;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: UnsplashSocial;
};

type UnsplashProfileImage = {
    small: string;
    medium: string;
    large: string;
};

type UnsplashSocial = {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: string;
    paypal_email: null;
};
