import { create } from "zustand";

interface CommentState {
  postId: string | null;
  setPostId: (id: string) => void;
  replyToComment: string | null;
  setReplyToComment: (id: string | null) => void;
  commentUserId: string | null;
  setCommentUserId: (id: string | null) => void;
}

const useCommentStore = create<CommentState>((set) => ({
  postId: null,
  setPostId: (id) => set({ postId: id }),
  replyToComment: null,
  setReplyToComment: (id) => set({ replyToComment: id }),
  commentUserId: null,
  setCommentUserId: (id) => set({ commentUserId: id }),
}));

export default useCommentStore;
