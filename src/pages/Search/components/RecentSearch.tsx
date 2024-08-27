import { IconButton } from '@mui/material';
import { C } from './RecentSearchList.style';
import CloseIcon from '@/components/icon/Close';

const RecentSearchList = () => {
  return (
    <section>
      <C.RecentList>
        <C.Item divider>
          서울특별시 강서구
          <IconButton>
            <CloseIcon />
          </IconButton>
        </C.Item>
        <C.Item divider>
          서울특별시 강서구
          <IconButton>
            <CloseIcon />
          </IconButton>
        </C.Item>
        <C.Item divider>
          서울특별시 강서구
          <IconButton>
            <CloseIcon />
          </IconButton>
        </C.Item>
      </C.RecentList>
    </section>
  );
};

export default RecentSearchList;
