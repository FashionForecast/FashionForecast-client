import GoBackButton from '@/components/GoBackButton/GoBackButton';
import { S, C } from './FeedbackPage.style';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomButton from '@/components/CustomMui/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { submitFeedback } from '@/services/feedback';
import { useSnackbar } from '@/app/providers/SnackbarProvider';
import HeadHelmet from '@/components/HeadHelmet/HeadHelmet';

export const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => submitFeedback(feedback),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (feedback.trim().length === 0) return;

    mutate(undefined, {
      onSuccess: () => {
        openSnackbar('피드백을 성공적으로 남겼어요');
        navigate('/user?tab=set');
      },
    });
  };

  return (
    <>
      <HeadHelmet
        title='고객의 소리'
        description='서비스에 대한 소중한 피드백을 남겨주세요.'
        urlPath='/feedback'
      />

      <S.FeedbackWrap>
        <S.Header>
          <Link to={'/user?tab=set'}>
            <GoBackButton />
          </Link>
          <h6>고객의 소리</h6>
        </S.Header>

        <S.Section>
          <p>
            여러분이 남겨주시는 소중한 피드백은 OOTC가 더욱 성장할 수 있는
            바탕이 됩니다. 남겨주신 피드백은 앞으로의 OOTC에 적극적으로
            반영하겠습니다!
          </p>
          <C.TextField
            variant='filled'
            multiline
            minRows={6}
            placeholder='익명으로 피드백을 편하게 남겨주세요'
            fullWidth
            value={feedback}
            spellCheck={false}
            onChange={handleInputChange}
          />
        </S.Section>

        <CustomButton
          size='large'
          fullWidth
          variant='contained'
          disabled={feedback.trim().length === 0}
          onClick={handleSubmit}
        >
          피드백 남기기
        </CustomButton>
      </S.FeedbackWrap>
    </>
  );
};
