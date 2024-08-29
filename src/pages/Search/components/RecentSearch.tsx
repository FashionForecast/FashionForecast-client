import { IconButton } from '@mui/material';
import { C } from './RecentSearchList.style';
import CloseIcon from '@/components/icon/Close';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSearchWord, getRecentSearch } from '@/service/search';
import { GUEST_UUID } from '@/constants/localStorage/key';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import { Region } from '@/types/region';
import { useNavigate } from 'react-router-dom';

type RecentSearchListProps = {
  regions: Region[];
};

const RecentSearchList = ({ regions }: RecentSearchListProps) => {
  const { data } = useQuery({
    queryKey: ['recentSearch', localStorage.getItem(GUEST_UUID)],
    queryFn: getRecentSearch,
    retry: 1,
  });
  const { mutate } = useMutation({
    mutationFn: deleteSearchWord,
  });
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegionClick = (city: string, district: string) => () => {
    const region = regions.find(
      (region) => region.region === `${city} ${district}`
    );
    if (region) {
      dispatch(currentRegionActions.setCurrentRegion(region));
      navigate('/');
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
            onClick={handleRegionClick(city, district)}
          >
            {city} {district}
            <IconButton onClick={handleDeleteClick(city, district)}>
              <CloseIcon />
            </IconButton>
          </C.Item>
        ))}
      </C.RecentList>
    </section>
  );
};

export default RecentSearchList;
