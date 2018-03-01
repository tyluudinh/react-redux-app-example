import camel from 'to-camel-case';

export const toCamel = (fields) => {
  const serverFields = {};
  for (let key in fields) {
    serverFields[camel(key)] =  fields[key];
  }
  return serverFields;
}