export interface Article {
  id?: string;
  title: string;
  content: string;
  image: string| ArrayBuffer|null;
  author: string;
  category: string;
  date: Date;
}
