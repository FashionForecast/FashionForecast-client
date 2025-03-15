import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Button, InstagramIcon } from '@/shared/ui';

import { S, C } from './Footer.style';

const SITE_LINKS = [
  { to: '/terms-of-service', title: '이용약관' },
  { to: '/privacy-policy', title: '개인정보처리방침' },
  { to: '/feedback', title: '고객의 소리' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <S.FooterWrap>
      <S.LinkGroup>
        {SITE_LINKS.map(({ to, title }, index) => (
          <Fragment key={title}>
            <Link to={to}>
              <Button variant='text' size='small'>
                {title}
              </Button>
            </Link>
            {index !== SITE_LINKS.length - 1 && <S.DivideLine />}
          </Fragment>
        ))}
      </S.LinkGroup>

      <S.Additional>
        <span>©{currentYear}. OOTC</span>
        <a
          href='https://www.instagram.com/ootc.life/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <C.InstagramButton size='small' variant='text'>
            <InstagramIcon />
            ootc.life
          </C.InstagramButton>
        </a>
      </S.Additional>
    </S.FooterWrap>
  );
};
