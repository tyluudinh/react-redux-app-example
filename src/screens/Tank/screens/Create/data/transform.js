import snake from 'to-snake-case';

export const toServerFormat = (fields) => {
  const serverFields = {};
  for (let key in fields) {
    serverFields[snake(key)] =  fields[key].value;
  }
  return serverFields;
}