import camel from 'to-camel-case';
import { toCamel } from 'app/services/transform';

export const toClientFormat = list => {
  const transformed = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const tempItem = {};
    for (let key in list[i]) {
      tempItem[camel(key)] = list[i][key];
    }
    tempItem['selected'] = false;
    transformed.push(tempItem);
  }
  return transformed;
}

export const toTankClientFormat = fields => toCamel(fields);