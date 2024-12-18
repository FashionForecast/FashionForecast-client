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
script/  # 스크립트 파일
  │
  │
src/
  │  main.tsx
  │  routes.tsx
  │
  │
  ├─ assets/  # 이미지, json 파일 등
  │   └─ svg/
  │
  ├─ components/  # 전역으로 재사용 가능한 컴포넌트
  │   ├─ CustomMui/
  │   │    └─  CustomButton.tsx
  │   └─ layout/
  │        └─  RootLayout/
  │
  ├─ layout/  # 레이아웃
  │
  ├─ constants/  # 상수
  │
  │
  ├─ contexts/  # react context 및 라이브러리 provider
  │   ├─  ReduxProvider.tsx
  │   └─  TanstackQueryProvider.tsx
  │
  ├─ hooks/  # 전역으로 재사용 가능한 hooks
  │   ├─  useAppDispatch.ts
  │   └─  useAppSelector.ts
  │
  ├─ pages/  # 각 라우트에 해당하는 페이지 컴포넌트
  │   ├─ Home/
  │   │   ├─ ClothesSection/
  │   │   │    └─ ClothesSection.tsx
  │   │   └─ HomePage.tsx
  │   │
  │   └─ NotFound/
  │        └─ NotFound.tsx
  │
  ├─ store/  # 전역 상태 관리
  │   ├─ slice/
  │   │   └─ currentRegionSlice.ts
  │   └─ store.ts
  │
  ├─ service/  # api 호출 등 서비스 로직
  |   └─  weather.ts
  |
  ├─ types/  # typescript 타입 정의
  │   └─  emotion.d.ts
  |
  ├─ utils/  # 유틸리티 함수
  │
  └─ styles/  # 스타일 파일
       ├─  normalize.css
       └─  reset.css
```

### emotion style 컴포넌트

```tsx
import { C, S } from './style';

const SomeComponent = () => {
  return (
    <S.Contents>
      <Header />
      <S.Title>제목</S.Title>
      <C.Button>설명</C.Button>
    </S.Contents>
  );
};

export default SomeComponent;
```

- style 컴포넌트는 S 또는 C 네임스페이스를 통해 일반 컴포넌트와 구분한다.
  - S는 html 태그에 적용한 styled 컴포넌트이다. `styled.div`
  - C는 기존 컴포넌트의 스타일을 재정의 한 styled 컴포넌트이다. `styled(CustomButton)`
