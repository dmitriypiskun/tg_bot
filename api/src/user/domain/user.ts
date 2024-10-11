export class User {
  id: string;
  tgId: string;
  firstName: string;
  lastName?: string | null;
  phone: string;
  userName?: string | null;
  language?: string | null;
  photo?: string | null;
  createdAt: Date;
}
