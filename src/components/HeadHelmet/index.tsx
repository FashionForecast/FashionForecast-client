import { Helmet } from 'react-helmet-async';

type HeadHelmetProps = {
  title?: string;
  description?: string;
  urlPath?: string;
  children?: React.ReactNode;
};

const HeadHelmet = ({
  title = 'OOTC',
  description = '오늘 날씨에 딱 맞는 옷차림을 한 눈에 확인하세요! 계절별, 환절기 옷차림 추천!',
  urlPath = '',
  children,
}: HeadHelmetProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <meta property='og:url' content={'https://ootc.life' + urlPath} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content='/thumbnail.png' />

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:image' content='/thumbnail.png' />
      {children}
    </Helmet>
  );
};

export default HeadHelmet;
