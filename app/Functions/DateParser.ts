export const GetFullDateAndTime = (date: string) => {
  let RealDate = new Date(date);
  return `${RealDate.getFullYear()}/${
    RealDate.getMonth() + 1
  }/${RealDate.getDate()} at ${RealDate.getHours()}:${RealDate.getMinutes()}:${RealDate.getSeconds()}`;
};

export const GetFullDate = (date: string) => {
  let RealDate = new Date(date);
  return `${RealDate.getFullYear()}/${
    RealDate.getMonth() + 1
  }/${RealDate.getDate()}`;
};
