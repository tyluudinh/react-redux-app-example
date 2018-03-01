import moment from 'moment';

const fieldTitleMap = {
  serialNumber: 'serial Number',
  type: 'type of tank',
  appliedRegulations: 'applied Regulations',
  manufacturedDate: 'manufactured Date',
  manufacturer: 'manufacturer',
  capacity: 'capacity',
  workingPressure: 'working pressure',
  tareWeight: 'tare weight',
  lastCarriedGas: 'last carried gas',
  airPressure: 'air pressure',
  vacuumReading: 'vacuum reading',
  location: 'location',
  warehouseLocation: 'warehouse location',
  loadMedium: 'load medium',
  nextMaintenanceDate: 'next maintenance date',
  nextInspectionDate: 'next inspection date',
  comment: 'comment',
  order_id: 'tagged order',
  reservation_id: 'tagged reservation',
}

const getWho = (person) => person || 'You';

const transformLogItem = ({ created_at, type, new_data, old_data, by }) => {
  let newData = JSON.parse(new_data);
  let oldData = JSON.parse(old_data);
  // flatten data
  newData = { ...newData, ...newData.relationships }
  oldData = { ...oldData, ...oldData.relationships }

  if (type === 'CREATE') {
    return [{ message: `${getWho(by)} create tank #${newData.id}` }];
  }

  if (type === 'EDIT') {
    const transformedLogs = [];
    for (const key in newData) {
      if (fieldTitleMap[key] && (typeof oldData[key] === 'undefined' || newData[key] !== oldData[key])) {
        transformedLogs.push({
          message: `${getWho(by)} changed ${fieldTitleMap[key]} to ${newData[key]}`
        })
        delete oldData[key];
      }
    }

    for (const key in oldData) {
      if (fieldTitleMap[key]) {
        transformedLogs.push({
          message: `${getWho(by)} removed ${key} ${fieldTitleMap[key]}`
        })
      }
    }

    return transformedLogs;
  }
}
export const toClientFormat = (data) => {
  const transformed = [];
  for (let i = 0, len = data.length; i < len; i++) {
    transformed.push({
      date: moment(new Date(data[i].created_at)).format('DD MMM YYYY'),
      logs: transformLogItem(data[i])
    })
  }
  return transformed;
}