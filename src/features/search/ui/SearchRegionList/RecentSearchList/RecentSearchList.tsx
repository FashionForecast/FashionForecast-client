import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteRecentSearchRegion,
  getRecentSearchList,
} from '@/features/search/api/search';
import { RecentSearchRegion } from '@/features/search/model/types';

import { Region } from '@/entities/region';

import { GUEST_UUID } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import {
  IconButton,
  ListItemButton,
  RecentSearchIcon,
  XIcon,
} from '@/shared/ui';

import { S } from './RecentSearchList.style';

type RecentSearchListProps = {
  regions: Region[];
  onRegionClick: (regionData: Region) => void;
};

export const RecentSearchList = ({
  regions,
  onRegionClick,
}: RecentSearchListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.member.info);

  const queryClient = useQueryClient();

  const { data: recentSearchList } = useQuery({
    queryKey: [
      'recentSearch',
      user?.socialId ? user.socialId : localStorage.getItem(GUEST_UUID),
    ],
    queryFn: () => getRecentSearchList(user?.socialId, accessToken),
    retry: 1,
  });

  const { mutate: mutateDeleteRecentRegion } = useMutation({
    mutationFn: (region: RecentSearchRegion) =>
      deleteRecentSearchRegion(region, user?.socialId, accessToken),
  });

  const handleRegionClick = (city: string, district: string) => () => {
    const regionName = `${city} ${district}`;
    const region = regions.find((region) => region.region === regionName);

    if (region) {
      onRegionClick(region);
    }
  };

  const handleDeleteRegionClick =
    (city: string, district: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      mutateDeleteRecentRegion(
        { city, district },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['recentSearch'] }),
        }
      );
    };

  if (!recentSearchList) return;
  return (
    <S.RecentListWrap>
      {recentSearchList.map(({ city, district }) => (
        <ListItemButton
          key={city + district}
          label={`${city} ${district}`}
          iconPosition={{
            left: <RecentSearchIcon />,
            right: (
              <IconButton
                size='small'
                onClick={handleDeleteRegionClick(city, district)}
              >
                <XIcon />
              </IconButton>
            ),
          }}
          onClick={handleRegionClick(city, district)}
        />
      ))}
    </S.RecentListWrap>
  );
};
