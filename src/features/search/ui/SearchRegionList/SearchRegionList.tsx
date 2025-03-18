import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { setMemberRegion, storeMember } from '@/entities/member';
import { Region, regionActions } from '@/entities/region';

import { REGION } from '@/shared/consts';
import regionList from '@/shared/consts/regionList.json';
import { useAppDispatch, useAppSelector, useSnackbar } from '@/shared/lib';

import { updateResentSearch } from '../../api/search';
import { SearchPageState } from '../../model/types';

import { RecentSearchList } from './RecentSearchList/RecentSearchList';
import { MatchedRegion } from './RegionItem/MatchedRegion';
import { S } from './SearchRegionList.style';

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

  const keywordParts = keyword.split(' ');
  const matchRegions = keyword ? getMatchedRegions(keywordParts) : [];

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
          onRegionClick={handleRegionClick}
        />
      )}

      <S.MatchedRegionList>
        {matchRegions.map((region) => (
          <MatchedRegion
            key={region.region}
            keywordParts={keywordParts}
            handleRegionClick={handleRegionClick}
            {...region}
          />
        ))}
      </S.MatchedRegionList>
    </>
  );
};

/** 주어진 키워드 배열과 일치하는 지역 목록을 반환하는 함수 */
function getMatchedRegions(keywordParts: string[]) {
  return regionList.filter((region) =>
    keywordParts.every((keyword) => someMatchRegionName(region.region, keyword))
  );
}

/** 시군구 첫 부분이 키워드와 일치하는지 확인 */
function someMatchRegionName(regionName: string, keywordPart: string) {
  const regionNameParts = regionName.split(' ');
  return regionNameParts.some((part) => part.startsWith(keywordPart));
}
