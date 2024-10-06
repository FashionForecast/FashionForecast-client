import Add from '@/assets/svg/add.svg?react';
import { IconButton } from '@mui/material';
import 민소매 from '@/assets/svg/clothes/민소매.svg?react';

import 후드티 from '@/assets/svg/clothes/후드티.svg?react';
import 반바지 from '@/assets/svg/clothes/반바지.svg?react';

import 청바지 from '@/assets/svg/clothes/청바지.svg?react';

type LookbookCardProps = {
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  title: string;
};

const LookbookCard = ({ type, title }: LookbookCardProps) => {
  return (
    <li>
      <div>
        <span>계절 {type}</span>
        <h3>{title}</h3>
        <IconButton>
          <Add />
        </IconButton>
      </div>

      <ol>
        <li>
          <후드티 />
          <청바지 />
        </li>
        <li>
          <민소매 />
          <반바지 />
        </li>
      </ol>
    </li>
  );
};

export default LookbookCard;
