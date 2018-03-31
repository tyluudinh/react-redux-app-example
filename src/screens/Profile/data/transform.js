const authorityMap = {
  ORDER: 'orders',
  USER: 'settings',
  TANK: 'tankInfo',
  RESERVATION: 'reservations',
  REPORT: 'reports',
}

const getPermission = (operations) => {
  if (!operations || !operations.length) return 'ALL';
  // if (operations.length > 1) return 'ALL';
  return operations[0];
}

const permissionTransform = (roles) => {
  const permissions = {
    tankInfo: 'ALL',
    orders: 'ALL',
    reports: 'ALL',
    settings: 'ALL',
    report: 'ALL',
  }
  if (roles) {
    for (let i = 0, len = roles.length; i < len; i++) {
      console.log(authorityMap[roles[i].authority], getPermission(roles[i].operations));
      permissions[authorityMap[roles[i].authority]] = getPermission(roles[i].operations)
    }
  }
  return permissions;
}

export const toUserListClientFormat = (list) => {
  return list;
}

const toPermissionRequest = (acc) => {
  return {
    order: `ORDER_${acc['orders']}`,
    reservation: `RESERVATION_NONE`,
    tank: `TANK_${acc['tankInfo']}`,
    user: `USER_${acc['settings']}`,
    report: `REPORT_${acc['reports']}`,
  }
}

export const toServerPermissionRequest = (acc) => {
  return {
    id: acc['id'],
    permissionRequest: toPermissionRequest(acc)
  }
}