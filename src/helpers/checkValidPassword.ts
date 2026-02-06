export const checkValidPassword = (password: string): boolean => {
  if (password.length < 6) return false;

  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSpecialCharacter = false;

  for (const char of password) {
    if (char >= 'A' && char <= 'Z') hasUpper = true;
    else if (char >= 'a' && char <= 'z') hasLower = true;
    else if (char >= '0' && char <= '9') hasNumber = true;
    else hasSpecialCharacter = true;
  }

  return hasUpper && hasLower && hasNumber && hasSpecialCharacter;
};
