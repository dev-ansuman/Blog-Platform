export const checkName = (str) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(str);
};

export const checkNumber = (str) => {
  const num = Number(str);
  return !isNaN(num);
};

export const checkExistingPorfolioName = (portfolioName, recordId = null) => {
  const localStorageDataString = localStorage.getItem('portfolioFormData');

  if (localStorageDataString) {
    let localStorageData = JSON.parse(localStorageDataString);
    const nameExists = localStorageData.filter((record) => record.portfolioName === portfolioName);

    if (recordId) {
      if (nameExists.length > 0) {
        nameExists[0].id = recordId;
        return false;
      }
    } else {
      return nameExists.length > 0;
    }
  }

  return false;
};
