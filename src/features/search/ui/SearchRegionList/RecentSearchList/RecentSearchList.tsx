import { IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteSearchWord,
  getRecentSearchList,
} from '@/features/search/api/search';

import { Region } from '@/entities/region';

import { GUEST_UUID } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { XIcon } from '@/shared/ui';

import { RecentSearchRegion } from '../../../model/types';

import { C } from './RecentSearchList.style';

type RecentSearchListProps = {
  regions: Region[];
  handleRegionClick: (regionData: Region) => void;
};

export const RecentSearchList = ({
  regions,
  handleRegionClick,
}: RecentSearchListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.member.info);
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
