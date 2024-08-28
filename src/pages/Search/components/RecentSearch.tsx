import { IconButton } from '@mui/material';
import { C } from './RecentSearchList.style';
import CloseIcon from '@/components/icon/Close';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSearchWord, getRecentSearch } from '@/service/search';
import { GUEST_UUID } from '@/constants/localStorage/key';

const RecentSearchList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['recentSearch', localStorage.getItem(GUEST_UUID)],
    queryFn: getRecentSearch,
    retry: 1,
  });

  const { mutate } = useMutation({
    mutationFn: deleteSearchWord,
  });

  const handleDeleteClick = (city: string, district: string) => () => {
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
          <C.Item divider key={`${city} ${district}`}>
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
