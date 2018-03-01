import snake from 'to-snake-case';
import camel from 'to-camel-case';

export const toServerFormat = (fields) => {
  const serverFields = {};
  for (let key in fields) {
    serverFields[snake(key)] =  fields[key].value;
  }
  return serverFields;
}

export const toClientFormat = (fields) => {
  const clientFields = {};
  for (let key in fields) {
    clientFields[camel(key)] = {
      value: `${fields[key]}`,
      errors: [],
    }
  }
  return clientFields;
}