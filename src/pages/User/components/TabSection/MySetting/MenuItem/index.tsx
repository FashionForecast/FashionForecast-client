import { Icon } from '@mui/material';
import { S } from './style';

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  value?: string;
  dividerThick?: boolean;
  handleClick?: () => void;
};

const MenuItem = ({
  icon,
  title,
  value,
  dividerThick = false,
  handleClick,
}: MenuItemProps) => {
  return (
    <S.Li
      className={dividerThick ? 'divider-thick' : undefined}
      onClick={handleClick}
    >
      <Icon>{icon}</Icon>
      <S.TextWrap>
        <h6>{title}</h6>
        {value && <span>{value}</span>}
      </S.TextWrap>
    </S.Li>
  );
};

export default MenuItem;
