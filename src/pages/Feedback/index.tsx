import GoBackButton from '@/components/GoBackButton';
import { S, C } from './style';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  return (
    <S.FeedbackWrap>
      <S.Header>
        <Link to={'/'}>
          <GoBackButton />
        </Link>
        <h6>고객의 소리</h6>
      </S.Header>
      <S.Section>
        <p>
          여러분이 남겨주시는 소중한 피드백은 OOTC가 더욱 성장할 수 있는 바탕이
          됩니다. 남겨주신 피드백은 앞으로의 OOTC에 적극적으로 반영하겠습니다!
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
      <C.SubmitButton size='large' fullWidth variant='contained'>
        피드백 남기기
      </C.SubmitButton>
    </S.FeedbackWrap>
  );
};

export default Feedback;
