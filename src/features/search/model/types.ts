export type RecentSearchListDto = Array<{
  city: string;
  district: string;
}>;

export type SearchLocationState = {
  state?: {
    mode?: 'set';
  };
};

export type RecentSearchRegion = {
  city: string;
  district: string;
};
