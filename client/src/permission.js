const flag_bit = {
  VIEW_TASKS : 0,
  EDIT_TASKS: 1,
  CREATE_TASKS: 2,
  DELETE_TASKS: 3,
  ASSIGN_TASKS: 4,
  MARK_COMPLETE_TASKS: 5,
  VIEW_PROJECT_DETAILS: 6,
  EDIT_PROJECT_DETAILS: 7,
  ADD_REMOVE_USERS: 8,
  MANAGE_ROLES: 9,
  CREATE_BRANCHES: 10,
  DELETE_BRANCHES: 11,
  VIEW_REPORTS: 12,
  GENERATE_REPORTS: 13,
  MANAGE_PERMISSIONS: 14,
  MANAGE_BUDGET: 15
}

function if_can(permissions, bit_flag){
  if(bit_flag > 0 && bit_flag < 16){
    const flag = 1 << bit_flag;
    return (permissions & flag) == flag;
  }else{
    return false;
  }
}

export { flag_bit, if_can };
