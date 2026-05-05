import api from "./Api";

export type User = {
  id: number;
  name: string;
};

export const getUsers = () => {
  return api.get<User[]>("/users");
};