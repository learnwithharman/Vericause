export const validator = {
  isValidEmail: (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  isStrongPassword: (password: string) => {
    return password.length >= 6;
  }
};
