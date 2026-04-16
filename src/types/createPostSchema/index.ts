export interface CreatePostSchemaType {
  img?: string[] | File[];
  title: string;
  description: string;
  mainKeyword: string;
  subkeyword?: string[];
  link?: [{
    id(id: any, arg1: string, value: string): void; keyword: string; title: string; link: string 
}];
  isPrivate: boolean;
}
