import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { setMemberRegion, storeMember } from '@/entities/member';
import { Region, regionActions } from '@/entities/region';
import { RegionItem } from '@/entities/search';

import { REGION } from '@/shared/consts';
import regionList from '@/shared/consts/regionList.json';
import { useAppDispatch, useAppSelector, useSnackbar } from '@/shared/lib';

import { registerResentSearch } from '../../api/search';
import { SearchPageState } from '../../model/types';

import { RecentSearchList } from './RecentSearchList/RecentSearchList';

type SearchRegionListProps = {
  keyword: string;
};

export const SearchRegionList = ({ keyword }: SearchRegionListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.member.info);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const searchPageState: SearchPageState = useLocation().state;

  const { mutate: recentSearchMutate } = useMutation({
    mutationFn: (region: string) =>
      registerResentSearch(region, user?.socialId, accessToken),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['recentSearch'] }),
  });

  const { mutate: userRegionMutate } = useMutation({
    mutationFn: (region: string) => setMemberRegion(region, accessToken),
  });

  const matchItems = keyword
    ? regionList.filter((v) =>
        v.region.split(' ').some((v) => v.startsWith(keyword))
      )
    : [];

  const handleRegionClick = (regionData: Region) => {
    if (searchPageState?.mode === 'memberSetting') {
      updatePersonalRegionSetting(regionData);
      return;
    }

    setCurrntRegionUpdate(regionData);
  };

  const setCurrntRegionUpdate = (regionData: Region) => {
    if (!user) {
      localStorage.setItem(REGION, regionData.region);
    }

    dispatch(regionActions.updateSelectedRegion(regionData));

    recentSearchMutate(regionData.region, {
      onSuccess: () => navigate('/'),
    });
  };

  const updatePersonalRegionSetting = (regionData: Region) => {
    recentSearchMutate(regionData.region);
    userRegionMutate(regionData.region, {
      onSuccess: async () => {
        dispatch(regionActions.updateGeolocation(regionData));
        await storeMember(accessToken, dispatch);
        navigate('/user?tab=set');
      },
      onError: () => snackbar.open('위치 설정 변경에 오류가 발생했어요'),
    });
  };

  return (
    <>
      {!keyword && (
        <RecentSearchList
          regions={regionList}
          handleRegionClick={handleRegionClick}
        />
      )}

      <ol>
        {matchItems.map((item) => (
          <RegionItem
            key={item.region}
            keyword={keyword}
            handleRegionClick={handleRegionClick}
            {...item}
          />
        ))}
      </ol>
    </>
  );
};
