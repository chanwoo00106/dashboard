export function valideEmail(inputValue: any): boolean {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (regexEmail.test(inputValue)) return true;
  return false;
}
