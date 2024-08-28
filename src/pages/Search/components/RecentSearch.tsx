import { IconButton } from '@mui/material';
import { C } from './RecentSearchList.style';
import CloseIcon from '@/components/icon/Close';
import { useQuery } from '@tanstack/react-query';
import { getRecentSearch } from '@/service/search';
import { GUEST_UUID } from '@/constants/localStorage/key';

const RecentSearchList = () => {
  const { data } = useQuery({
    queryKey: ['recentSearch', localStorage.getItem(GUEST_UUID)],
    queryFn: getRecentSearch,
    retry: 1,
  });

  if (!data) return;
  return (
    <section>
      <C.RecentList>
        {data.map((search) => (
          <C.Item divider key={`${search.city} ${search.district}`}>
            {search.city} {search.district}
            <IconButton>
              <CloseIcon />
            </IconButton>
          </C.Item>
        ))}
      </C.RecentList>
    </section>
  );
};

export default RecentSearchList;
