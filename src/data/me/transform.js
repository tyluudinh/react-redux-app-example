export const toMeClientFormat = (fields, platform = 'email') => ({
  ...fields,
  platform: platform
});