import api from "./Api";
import type { Post } from "../Types/post";

export const getPosts = () => api.get<Post[]>("/posts");

export const getPost = (id: number) =>
  api.get<Post>(`/posts/${id}`);

export const createPost = (data: Post) =>
  api.post<Post>("/posts", data);