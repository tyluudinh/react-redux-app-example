export const toMeClientFormat = (fields) => ({
  id: fields['id'],
  designation: fields['designation'],
  phone: fields['phone_number'],
  email: fields['email'],
  name: fields['full_name'],
  accountType: (fields['designation'] === 'Admin') ? 'Admin' : 'User',
})