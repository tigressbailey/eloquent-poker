export function gotUserName(profile) {
  return {
    type: 'GOT_USER_NAME',
    data: {
      name,
    },
  };
}

export function getUserName() {
  return {
    type: 'GET_USER_NAME',
  };
}
