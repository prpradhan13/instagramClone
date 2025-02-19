export type PostsType = {
    id: string;
    user_id: {
        id: string;
        user_name: string;
        avatar_url: string | null;
    };
    content_type: string;
    content_urls: string[];
    caption: string;
    location: string;
    visibility: string;
    created_at: string;
}