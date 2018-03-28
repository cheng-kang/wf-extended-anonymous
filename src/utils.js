export const getCookie = () => {
  const key = 'WfExtendedAnonymous=';
  const ck = document.cookie.split(';').find((item) => item.indexOf(key) !== -1);
  if (!ck || ck.length <= key.length) return {};
  try {
    return JSON.parse(ck.split('=')[1]);
  } catch (error) {
    return {};
  }
};
