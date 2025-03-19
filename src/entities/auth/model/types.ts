export type AccessToken = {
  accessToken: string;
};

export type Guest = { uuid: string; isNewGuest: false };

export type SocialProvider = 'kakao' | 'google';
