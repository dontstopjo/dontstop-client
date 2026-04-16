export interface CreatePostSchemaType {
  img?: (string | File)[];
  title: string;
  description: string;
  mainKeyword: string;
  subkeyword?: string[];
  link?: {
    id: string;
    keyword: string;
    title: string;
    link: string;
  }[];
  isPrivate: boolean;
}
