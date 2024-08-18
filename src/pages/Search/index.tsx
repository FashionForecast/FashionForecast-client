import ArrowIcon from '@/components/icon/Arrow';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();

  return (
    <div>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowIcon />
      </IconButton>
    </div>
  );
}
