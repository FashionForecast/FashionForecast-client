import CustomAppBar from '@/components/CustomAppBar';
import CustomPaper from '@/components/CustomPaper';
import CustomToolbar from '@/components/CustomToolBar';
import AccountIcon from '@/components/icon/Account';
import LocationIcon from '@/components/icon/Location';
import PlusIcon from '@/components/icon/Plus';
import TriangleIcon from '@/components/icon/Triangle';
import { Button, IconButton } from '@mui/material';

const Header = () => {
  return (
    <CustomAppBar>
      <CustomPaper>
        <CustomToolbar>
          <IconButton>
            <PlusIcon />
          </IconButton>
          <Button startIcon={<LocationIcon />} endIcon={<TriangleIcon />}>
            00도 00시
          </Button>
          <IconButton>
            <AccountIcon />
          </IconButton>
        </CustomToolbar>
      </CustomPaper>
    </CustomAppBar>
  );
};

export default Header;
