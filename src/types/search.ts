export type ResponseBase<T> = {
  data: T;
  message: string;
  status: number;
  code: string;
};

export type RecentSearchData = Array<{
  city: string;
  district: string;
}>;
