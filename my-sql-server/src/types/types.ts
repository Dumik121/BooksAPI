export interface BookInterface {
  _id: number;
  title: string;
  pageCount: number;
  publishedDate: {
    date: string;
  };
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: string[];
}

export interface DatabaseInterface {
  books: BookInterface[];
}
