import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { submitFeedback } from '@/features/feedback/api/feedback';

import { useSnackbar } from '@/shared/lib/useSnackbar';
import { Button, TextField } from '@/shared/ui';

import { S } from './Feedback.style';

export const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => submitFeedback(feedback),
  });

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim().length === 0) return;

    mutate(undefined, {
      onSuccess: () => {
        snackbar.open('피드백을 성공적으로 남겼어요');
        navigate('/');
      },
    });
  };

  return (
    <>
      <S.FeedbackSection>
        <S.Description>
          여러분이 남겨주시는 소중한 피드백은 OOTC가 더욱 성장할 수 있는 바탕이
          됩니다. 남겨주신 피드백은 앞으로의 OOTC에 적극적으로 반영하겠습니다!
        </S.Description>

        <TextField
          multiline
          minRows={5}
          placeholder='익명으로 피드백을 편하게 남겨주세요'
          value={feedback}
          onChange={handleFeedbackChange}
        />
      </S.FeedbackSection>

      <S.ButtonWrap>
        <Button
          size='large'
          fullWidth
          disabled={feedback.trim().length === 0}
          onClick={handleFeedbackSubmit}
        >
          피드백 남기기
        </Button>
      </S.ButtonWrap>
    </>
  );
};
