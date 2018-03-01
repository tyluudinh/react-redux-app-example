export const toServerFormat = (fields) => ({
  designation: fields['roleDesignation'],
  email: fields['email'],
  full_name: fields['staffName'],
  message: fields['message'],
  password: fields['password'],
  phone_number: fields['phone']
})

