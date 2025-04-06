import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { deleteRecentSearchRegion } from '@/features/search/api/search';

import { Region } from '@/entities/region';
import {
  getRecentSearchList,
  RecentSearchRegion,
  SearchPageState,
} from '@/entities/search';

import { GUEST_UUID } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import {
  CheckCircleIcon,
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
  const { selectedRegion } = useAppSelector((state) => state.region);

  const searchPageState: SearchPageState = useLocation().state;
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

  const handleRegionClick = (regionName: string) => () => {
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

  function checkSelected(region: string) {
    if (searchPageState?.mode === 'memberSetting') return false;
    return selectedRegion?.region === region;
  }

  if (!recentSearchList) return;
  return (
    <S.RecentListWrap>
      {recentSearchList.map(({ city, district }) => {
        const regionName = `${city} ${district}`;
        const isSelected = checkSelected(regionName);

        return (
          <ListItemButton
            key={regionName}
            label={regionName}
            selected={isSelected}
            iconPosition={{
              left: (
                <RecentSearchIcon color={isSelected ? 'white' : 'primary'} />
              ),
              right: isSelected ? (
                <CheckCircleIcon />
              ) : (
                <IconButton
                  size='small'
                  onClick={handleDeleteRegionClick(city, district)}
                >
                  <XIcon />
                </IconButton>
              ),
            }}
            onClick={handleRegionClick(regionName)}
          />
        );
      })}
    </S.RecentListWrap>
  );
};
