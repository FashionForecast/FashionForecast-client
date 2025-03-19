export type RecentSearchRegion = {
  city: string;
  district: string;
};

export type RecentSearchListDto = Array<RecentSearchRegion>;

export type SearchPageState =
  | {
      mode?: 'memberSetting';
    }
  | undefined;
