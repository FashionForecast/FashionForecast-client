import { IconButton } from '@mui/material';
import { C } from './RecentSearchList.style';
import XIcon from '@/components/icon/XIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSearchWord, getRecentSearchList } from '@/services/search';
import { GUEST_UUID } from '@/constants/localStorageKey';
import { Region } from '@/types/region';
import { useAppSelector } from '@/shared/lib/useAppSelector';

export type RecentSearchRegion = {
  city: string;
  district: string;
};

type RecentSearchListProps = {
  regions: Region[];
  handleRegionClick: (regionData: Region) => void;
};

const RecentSearchList = ({
  regions,
  handleRegionClick,
}: RecentSearchListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.info);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [
      'recentSearch',
      user?.socialId ? user.socialId : localStorage.getItem(GUEST_UUID),
    ],
    queryFn: () => getRecentSearchList(user?.socialId, accessToken),
    retry: 1,
  });

  const { mutate } = useMutation({
    mutationFn: (region: RecentSearchRegion) =>
      deleteSearchWord(region, user?.socialId, accessToken),
  });

  const handleClick = (city: string, district: string) => () => {
    const regionData = regions.find(
      (region) => region.region === `${city} ${district}`
    );
    if (regionData) {
      handleRegionClick(regionData);
    }
  };

  const handleDeleteClick =
    (city: string, district: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      mutate(
        { city, district },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['recentSearch'] }),
        }
      );
    };

  if (!data) return;
  return (
    <section>
      <C.RecentList>
        {data.map(({ city, district }) => (
          <C.Item
            divider
            key={`${city} ${district}`}
            onClick={handleClick(city, district)}
          >
            {city} {district}
            <IconButton onClick={handleDeleteClick(city, district)}>
              <XIcon />
            </IconButton>
          </C.Item>
        ))}
      </C.RecentList>
    </section>
  );
};

export default RecentSearchList;
