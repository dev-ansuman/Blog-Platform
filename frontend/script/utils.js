export const checkName = (str) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(str);
};

export const checkNumber = (str) => {
  const num = Number(str);
  return !isNaN(num);
};
