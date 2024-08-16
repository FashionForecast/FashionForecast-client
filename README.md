### 브랜치 네이밍 규칙

브랜치 종류/이슈넘버-기능이름

e.g) feature/#5-login

### 브랜치 전략

gitflow 전략을 따르지만, release 브랜치가 없는 형태

main : 최종 배포 브랜치

develop : 개발 단계 브랜치 (디폴트)

### 커밋 메세지 컨벤션

| 타입     | 설명                                      |
| -------- | ----------------------------------------- |
| feat     | 새로운 기능을 추가                        |
| fix      | 버그를 수정                               |
| design   | css 수정 작업                             |
| docs     | 문서와 관련된 변경 사항을 기록            |
| style    | 코드 포맷팅                               |
| refactor | 리팩토링 작업을 기록                      |
| test     | 테스트 코드를 추가하거나 수정             |
| chore    | 초기세팅 및 코드에 영향을 주지 않는 작업  |
| rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업 |
| remove   | 파일을 삭제하는 작업 수행                 |

### 폴더 구조

```
src
  │  main.tsx
  │  routes.tsx
  │
  ├─components (공통 컴포넌트)
  │  └─EXAMPLE_TEXT
  │        │  index.tsx
  │        │  style.ts
  │        │
  │        └─ hooks (특정 컴포넌트의 hooks)
  │
  ├─contexts
  │      ReduxProvider.tsx
  │      TanstackQueryProvider.tsx
  │
  ├─hooks (공통 hooks)
  │      useAppDispatch.ts
  │      useAppSelector.ts
  │
  ├─pages
  │  ├─Home
  │  │   │  index.tsx
  │  │   │
  │  │   └─ components (특정 페이지 내 컴포넌트)
  │  │
  │  └─NotFound
  │         index.tsx
  │
  ├─redux
  │  │  store.ts
  │  │
  │  └─slice
  │          EXAMPLE_counterSlice.ts
  │
  ├─ service
  |     weather.ts
  |
  ├─ types
  │     weather.ts
  |
  ├─ utils
  │
  └─styles
          normalize.css
          reset.css
```

### 컴포넌트

```tsx
type SomeComponentProps = {
  text: string;
};

const SomeComponent = ({ text }: SomeComponentProps) => {
  return <span>{text}</span>;
};

export default SomeComponent;
```

- 컴포넌트는 함수 표현식으로 정의한다.
- props의 타입은 {컴포넌트명}Props로 정의한다.

### emotion style 컴포넌트

```tsx
import * as S from './style';

const SomeComponent = () => {
  return (
    <S.Contents>
      <S.Title>제목</S.Title>
      <S.Desc>설명</S.Desc>
    </S.Contents>
  );
};

export default SomeComponent;
```

- style 컴포넌트는 네임스페이스 S를 지정해 일반 컴포넌트와 구분한다.
