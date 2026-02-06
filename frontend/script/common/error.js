export const showError = (errorClass, parentClass, addAt, fontSize, ERROR_MESSAGE, extra) => {
  const parentElement = document.querySelector(`.${parentClass}`);
  checkExistingError(errorClass);

  const errorMessage = document.createElement('div');
  errorMessage.className = errorClass;
  errorMessage.innerText = ERROR_MESSAGE;
  errorMessage.style.color = 'red';
  errorMessage.style.fontSize = fontSize;
  if (addAt === 'append') {
    parentElement?.append(errorMessage);
  } else if (addAt === 'after') {
    parentElement?.after(errorMessage);
  }

  if (extra) {
    errorMessage.style.marginLeft = extra;
  }
};

export const checkExistingError = (errorClass) => {
  let checkError = document.querySelector(`.${errorClass}`);
  if (checkError) {
    checkError.remove();
  }
};
