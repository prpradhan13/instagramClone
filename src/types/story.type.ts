export type StoryType = {
    id: string;
    user_id: string;
    content_type: string;
    content_url: string;
    views_count: number;
    expires_at: string;
    created_at: string;
    user: {
        user_name: string;
        avatar_url: string;
    }
};