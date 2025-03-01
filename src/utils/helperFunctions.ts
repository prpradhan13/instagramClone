import { PostsType } from "../types/post.type";

export const chunkArray = (array: PostsType[], size: number) => {
  return array.reduce((acc: PostsType[][], _, index) => {
    if (index % size === 0) acc.push(array.slice(index, index + size));
    return acc;
  }, []);
};
