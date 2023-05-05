export interface Contact {
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  createdAt: string;
}

export type Context = "create" | "update" | "delete";