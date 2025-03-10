import { BuildCommentTreeType, CommentTypes } from "../types/cmtAndLike.type";
import { PostsType } from "../types/post.type";

export const chunkArray = (array: PostsType[], size: number) => {
  return array.reduce((acc: PostsType[][], _, index) => {
    if (index % size === 0) acc.push(array.slice(index, index + size));
    return acc;
  }, []);
};

export const buildCommentTree = (comments: CommentTypes[]) => {
  if (!comments || !Array.isArray(comments)) {
    return [];
  }
  
  const commentMap: Record<number, BuildCommentTreeType> = {};
  const rootComments: BuildCommentTreeType[] = [];

  // Create a map of comments by ID
  comments.forEach(comment => {
    if (!comment || !comment.id) {
      console.error("Invalid comment detected:", comment);
      return; // Skip processing undefined/null comments
    }
  
      commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Organize comments into a nested structure
  comments.forEach(comment => {
      if (comment.parent_comment_id) {
        const parentComment = commentMap[comment.parent_comment_id];
        if (parentComment) {
          parentComment.replies.push(commentMap[comment.id]);
        }
      } else {
          rootComments.push(commentMap[comment.id]);
      }
  });

  return rootComments;
}