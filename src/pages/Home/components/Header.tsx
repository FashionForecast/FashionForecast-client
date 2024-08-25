import CustomPaper from '@/components/CustomPaper';
import CustomToolbar from '@/components/CustomToolBar';
import AccountIcon from '@/components/icon/Account';
import LocationIcon from '@/components/icon/Location';
import PlusIcon from '@/components/icon/Plus';
import TriangleIcon from '@/components/icon/Triangle';
import { IconButton } from '@mui/material';
import CustomAppBar from '@/components/CustomAppBar';
import CustomButton from '@/components/CustomButton';
import { Region } from '@/types/region';

const DEFAULT_REGION = {
  region: '서울특별시 종로구',
  nx: 37,
  ny: 126,
};

type HeaderProps = {
  geolocation: Region | null;
};

const Header = ({ geolocation }: HeaderProps) => {
  return (
    <CustomAppBar position='relative'>
      <CustomPaper>
        <CustomToolbar>
          <IconButton>
            <PlusIcon />
          </IconButton>
          <CustomButton
            startIcon={geolocation?.region && <LocationIcon />}
            endIcon={<TriangleIcon />}
            fullWidth
          >
            {geolocation?.region || DEFAULT_REGION.region}
          </CustomButton>
          <IconButton>
            <AccountIcon />
          </IconButton>
        </CustomToolbar>
      </CustomPaper>
    </CustomAppBar>
  );
};

export default Header;
