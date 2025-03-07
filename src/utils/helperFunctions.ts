import { PostsType } from "../types/post.type";
import type { DeepPartial, Theme } from 'stream-chat-expo';

export const chunkArray = (array: PostsType[], size: number) => {
  return array.reduce((acc: PostsType[][], _, index) => {
    if (index % size === 0) acc.push(array.slice(index, index + size));
    return acc;
  }, []);
};

export const theme: DeepPartial<Theme> = {
  messageSimple: {
    file: {
      container: {
        backgroundColor: 'black',
        flex: 1,
      },
    },
  },
};