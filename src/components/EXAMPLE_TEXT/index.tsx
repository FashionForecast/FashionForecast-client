import * as S from './style';

type ExampleTextProps = {
  children: string | number;
};

// FIXME: EXMAPLE 입니다. 개발 시 제거해주세요.
const ExampleText = ({ children }: ExampleTextProps) => {
  return <S.Text>{children}</S.Text>;
};

export default ExampleText;
