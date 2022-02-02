export function valideEmail(inputValue: any): boolean {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (regexEmail.test(inputValue)) return true;
  return false;
}

export const truncate = (str: string) => {
  if (!str) return str;
  return str.length > 1 ? str.substring(0, 1) + "" : str;
};
