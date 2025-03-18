export type RecentSearchListDto = Array<{
  city: string;
  district: string;
}>;

export type SearchPageState =
  | {
      mode?: 'memberSetting';
    }
  | undefined;

export type RecentSearchRegion = {
  city: string;
  district: string;
};
