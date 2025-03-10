export type CommentTypes = {
    id: string;
    user_id: string;
    post_id: string;
    reel_id: string | null;
    parent_comment_id: string | null;
    text: string
    created_at: string
}

export type BuildCommentTreeType = CommentTypes & {
    replies: BuildCommentTreeType[];
};