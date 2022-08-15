export default function getKakaoToken(rest_api_key, redirect_uri, kakao_code) {
  return fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=authorization_code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}&code=${kakao_code}`,
  });
}
