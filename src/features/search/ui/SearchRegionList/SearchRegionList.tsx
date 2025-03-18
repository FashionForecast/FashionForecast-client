import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { setMemberRegion, storeMember } from '@/entities/member';
import { Region, regionActions } from '@/entities/region';
import { RegionItem } from '@/entities/search';

import { REGION } from '@/shared/consts';
import regionList from '@/shared/consts/regionList.json';
import { useAppDispatch, useAppSelector, useSnackbar } from '@/shared/lib';

import { updateResentSearch } from '../../api/search';
import { SearchPageState } from '../../model/types';

import { RecentSearchList } from './RecentSearchList/RecentSearchList';

type SearchRegionListProps = {
  keyword: string;
};

export const SearchRegionList = ({ keyword }: SearchRegionListProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const member = useAppSelector((state) => state.member.info);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const searchPageState: SearchPageState = useLocation().state;

  const matchItems = keyword
    ? regionList.filter((v) =>
        v.region.split(' ').some((v) => v.startsWith(keyword))
      )
    : [];

  const { mutate: mutateRecentSearch } = useMutation({
    mutationFn: (regionName: string) =>
      updateResentSearch(regionName, member?.socialId, accessToken),
  });

  const { mutate: mutateMemberRegion } = useMutation({
    mutationFn: (regionName: string) =>
      setMemberRegion(regionName, accessToken),
  });

  const handleRegionClick = (region: Region) => {
    if (searchPageState?.mode === 'memberSetting') {
      updateMemberRegion(region.region);
      return;
    }

    updateSelectedRegion(region);
  };

  const updateSelectedRegion = (region: Region) => {
    const regionName = region.region;

    if (!member) {
      localStorage.setItem(REGION, regionName);
    }

    dispatch(regionActions.updateSelectedRegion(region));
    mutateRecentSearch(regionName, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['recentSearch'] });
        navigate('/');
      },
    });
  };

  const updateMemberRegion = (regionName: string) => {
    mutateMemberRegion(regionName, {
      onSuccess: async () => {
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
