import { HeadHelmet } from '@/shared/ui';

export const PrivacyPolicyPage = () => {
  return (
    <>
      <HeadHelmet
        title='개인정보처리방침'
        description='개인정보처리방침'
        urlPath='/privacy-policy'
      />

      <div>
        <div>
          <p>
            이 개인정보 처리방침은 본 웹서비스(이하 "서비스")가 사용자로부터
            수집한 개인정보를 어떻게 처리하는지 설명합니다. 본 방침은 사용자가
            서비스에 회원 가입, 로그인 및 이용할 때 적용됩니다.
          </p>
        </div>
        <br />

        <div>
          <strong>1. 수집하는 개인정보</strong>
          <div>
            서비스는 사용자로부터 다음과 같은 개인정보를 수집할 수 있습니다:
            <div>
              - 필수 정보: 회원 가입 시, 이름, 이메일 주소, 비밀번호 등 기본
              정보
            </div>
            <div>
              - 선택 정보: 사용자 프로필 설정 시, 성별, 생년월일, 선호 설정 등
              추가 정보
            </div>
            <div>
              - 자동 수집 정보: 서비스 이용 기록, 접속 로그, 쿠키, IP 주소 등
            </div>
          </div>
        </div>
        <br />

        <div>
          <strong>2. 개인정보 수집 방법</strong>
          <div>
            서비스는 다음과 같은 방법으로 개인정보를 수집합니다:
            <div>- 회원 가입 및 로그인 과정에서 사용자가 직접 입력한 정보</div>
            <div>- 사용자가 서비스 이용 시 자동으로 수집되는 정보</div>
          </div>
        </div>
        <br />

        <div>
          <strong>3. 개인정보의 이용 목적</strong>
          <div>
            수집된 개인정보는 다음과 같은 목적으로 이용됩니다:
            <div>- 회원 관리: 회원 가입, 로그인 등</div>
            <div>
              - 서비스 제공: 날씨 맞춤형 옷차림 추천 및 맞춤형 서비스 제공
            </div>
            <div>
              - 서비스 개선 및 분석: 사용자 만족도 조사, 서비스 이용 통계 분석
            </div>
            <div>- 법적 의무 이행: 법률 및 규제 요건 준수</div>
          </div>
        </div>
        <br />

        <div>
          <strong>4. 개인정보의 보유 및 이용 기간</strong>
          <div>
            서비스는 개인정보 수집 목적이 달성된 후에는 관련 법령에 따라 일정
            기간 동안 보관 후 파기합니다. 구체적인 보유 기간은 다음과 같습니다:
            <div>- 회원 가입 정보: 회원 탈퇴 시까지</div>
            <div>- 서비스 이용 기록: 회원 탈퇴 시까지</div>
          </div>
        </div>
        <br />

        <div>
          <strong>5. 개인정보의 제3자 제공</strong>
          <p>
            서비스는 사용자의 동의 없이는 개인정보를 제3자에게 제공하지
            않습니다. 단, 법적 요구가 있는 경우 예외적으로 제공될 수 있습니다.
          </p>
        </div>
        <br />

        <div>
          <strong>6. 개인정보의 처리 위탁</strong>
          <p>
            서비스는 원활한 업무 처리를 위해 일부 개인정보 처리를 외부 업체에
            위탁할 수 있습니다. 위탁 시에는 위탁 업체가 개인정보 보호법을
            준수하도록 관리 및 감독합니다.
          </p>
        </div>
        <br />

        <div>
          <strong>7. 개인정보 보호를 위한 기술적/관리적 대책</strong>
          <div>
            서비스는 사용자의 개인정보를 안전하게 보호하기 위해 다음과 같은
            조치를 취합니다:
            <div>
              - 개인정보 암호화: 비밀번호 및 중요한 개인정보는 암호화되어 저장
              및 관리됩니다.
            </div>
            <div>
              - 접근 통제: 개인정보에 대한 접근 권한을 최소화하고, 접근 권한을
              관리합니다.
            </div>
            <div>
              - 보안 시스템: 개인정보를 보호하기 위한 방화벽, 보안 프로그램을
              사용합니다.
            </div>
          </div>
        </div>
        <br />

        <div>
          <strong>8. 사용자 권리</strong>
          <p>
            사용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
            회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있습니다. 또한,
            개인정보의 처리에 대한 이의 제기 및 제한을 요구할 수 있습니다.
          </p>
        </div>
        <br />

        <div>
          <strong>9. 개인정보 보호책임자 및 문의</strong>
          <div>
            개인정보와 관련된 문의 사항은 아래의 개인정보 보호책임자에게
            연락해주시기 바랍니다.
          </div>
          <br />
          <div>- 이메일: ootc.life@gmail.com</div>
        </div>
        <br />

        <div>
          <strong>10. 개인정보 처리방침의 변경</strong>
          <p>
            본 개인정보 처리방침은 법령 또는 서비스 운영 방침에 따라 변경될 수
            있으며, 변경 사항은 서비스 화면 또는 이메일을 통해 공지됩니다.
          </p>
        </div>
        <br />
      </div>
    </>
  );
};
