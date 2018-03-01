const extractIds = (list) => {
  const ids = [];
  for (let i = 0, len = list.length; i < len; i++) {
    ids.push(list[i].id)
  }
  return ids;
}

export const toServerFormat = (fields) => {
  const { selectedRoute } = fields;
  const routeValue = selectedRoute.value;
  let deliveryStartDate = null;
  let deliveryEndDate = null;
  if (fields['orderType'].value === 'LOGISTICS') {
    console.log(fields['deliveryStartDate']);
    deliveryStartDate = new Date(fields['deliveryStartDate'].value);
    deliveryStartDate.setHours(parseInt(fields['deliveryStartHour'].value, 10));
    deliveryStartDate.setMinutes(parseInt(fields['deliveryStartMinute'].value, 10));
    deliveryEndDate = new Date(fields['deliveryEndDate'].value);
    deliveryEndDate.setHours(parseInt(fields['deliveryEndHour'].value, 10));
    deliveryEndDate.setMinutes(parseInt(fields['deliveryEndMinute'].value, 10));
  }

  const transformed = {
    costing: fields['finalCost'].value,
    customer: {
      additional_details: fields['customerDetail'].value,
      delivery_address: fields['customerDeliveryAddress'].value,
      location: fields['customerLocation'].value,
      name: fields['customerName'].value,
      warehouse_location: fields['customerWarehouse'].value,
    },
    delivery_end_date: deliveryEndDate ? deliveryEndDate.toISOString() : fields['deliveryEndDate'].value,
    delivery_start_date: deliveryStartDate ? deliveryStartDate.toISOString() : fields['deliveryStartDate'].value,
    destination: fields['deliveryRouteDest'].value,
    starting_point: fields['deliveryRouteStart'].value,
    number: fields['orderNumber'].value,
    project_start_date: fields['projectTimingStart'].value,
    project_end_date: fields['projectTimingEnd'].value,
    remarks: fields['remarks'].value,
    reservation_ids: extractIds(fields['reservations'].value),
    routing_options: `${routeValue.cat} - ${routeValue.name} - ${routeValue.cost}$ - ${routeValue.days} days`,
    sale_person: {
      email: fields['salespersonEmail'].value,
      name: fields['salespersonName'].value,
      phone_number: fields['salespersonPhone'].value,
    },
    driver: {
      name: fields['driverName'].value,
      email: fields['driverEmail'].value,
      phone_number: fields['driverPhone'].value,
      additional_details: fields['driverCompany'].value
    },
    tank_ids: extractIds(fields['tanks'].value),
    terms_of_order: fields['termOfOrder'].value,
    type: fields['orderType'].value,
  }
  console.log('transformed', transformed);
  return transformed;
}
