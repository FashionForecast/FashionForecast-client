import CustomButton from '@/components/CustomMui/CustomButton';
import styled from '@emotion/styled';

const Clock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  overscroll-behavior: none;

  & svg,
  path {
    touch-action: none;
    user-select: none;
  }
`;

const ClockFace = styled.svg`
  user-select: none;
`;

const TimeRange = styled.circle<{ $degree: number; $range: number }>`
  stroke-dasharray: 910;
  stroke-dashoffset: calc(910 - (910 * ${({ $range }) => $range}) / 100);
  transform: rotate(${({ $degree }) => `${$degree}deg`}); /* -90deg 오전00사 */
`;

const PhraseWrap = styled.div`
  ${({ theme }) => theme.typo['body-2']};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 190px;
  color: ${({ theme }) => theme.colors.text.secondary};
  transform: translate(-50%, -50%);
`;

const DefaultPhrase = styled.p`
  text-align: center;
`;

const CountingPhraseWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 16px;
  }
`;

const DeleteButton = styled(CustomButton)`
  padding: 8px 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary} !important;
  background-color: ${({ theme }) => theme.colors.blueGrey[200]} !important;
  border-radius: 100px;
`;

export const S = {
  Clock,
  ClockFace,
  TimeRange,
  PhraseWrap,
  DefaultPhrase,
  CountingPhraseWrap,
};

export const C = {
  DeleteButton,
};
