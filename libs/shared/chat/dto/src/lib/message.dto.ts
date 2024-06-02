export interface MessageDto {
  id: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  message: string;
  createDateTime: string;
}
