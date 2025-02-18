export type UserDetailsType = {
    id: string;
    full_name: string;
    user_name: string;
    email: string;
    avatar_url: string | null;
    bio: string | null;
    account_type: "public" | "private";
    is_verified: boolean;
    last_seen: string;
    created_at: string;
}