export const updateUserLocalStorage = (user: any) => {
  localStorage.setItem('weSheild_user', JSON.stringify(user));
  location.reload();
};

export const updateUserLocalStorageWithoutReload = (user: any) => {
  localStorage.setItem('weSheild_user', JSON.stringify(user));
};

export const GetUserLocalStorage = () => {
  const user = JSON.parse(
    localStorage.getItem('weSheild_user') ||
      `{"firstName": "", "lastName": "", "role": "" }`
  );
  return user;
};

export const updateTokenLocalStorage = (token: string) => {
  localStorage.setItem('weSheild_token', token);
};

export const GetTokenLocalStorage = () => {
  const token =
    'Bearer ' +
    localStorage.getItem('weSheild_token')?.replace('"', '').replace('"', '');
  return token;
};

// Expert Administrator SuperAdministrator

export const isExpert = (): boolean => {
  const user = GetUserLocalStorage();
  return user.role == 'Expert';
};

export const isAdmin = (): boolean => {
  const user = GetUserLocalStorage();
  return user.role == 'Administrator';
};

export const isSuperAdmin = (): boolean => {
  const user = GetUserLocalStorage();
  return user.role == 'SuperAdministrator';
};

export const isMember = (): boolean => {
  const user = GetUserLocalStorage();
  return (
    user.role != 'Expert' &&
    user.role != 'Administrator' &&
    user.role != 'SuperAdministrator'
  );
};
