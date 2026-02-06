export const checkEmail = (email: string): boolean => {
  const emailRegex =
    /^(?!.*\.\.)(?=.*[a-z])[a-z0-9](?:[a-z0-9.]{4,28}[a-z0-9])@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};
