import { IconButton } from '@mui/material';
import { C } from './style';
import CloseIcon from '@/components/icon/CloseIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSearchWord, getRecentSearch } from '@/service/search';
import { GUEST_UUID } from '@/constants/localStorage/key';
import { Region } from '@/types/region';

type RecentSearchListProps = {
  regions: Region[];
  handleRegionClick: (regionData: Region) => void;
};

const RecentSearchList = ({
  regions,
  handleRegionClick,
}: RecentSearchListProps) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['recentSearch', localStorage.getItem(GUEST_UUID)],
    queryFn: getRecentSearch,
    retry: 1,
  });

  const { mutate } = useMutation({
    mutationFn: deleteSearchWord,
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
              <CloseIcon />
            </IconButton>
          </C.Item>
        ))}
      </C.RecentList>
    </section>
  );
};

export default RecentSearchList;
