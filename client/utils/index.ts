export function isUserExist(user: any): boolean {
  if (
    user === null ||
    user === undefined ||
    user === "" ||
    (Array.isArray(user) && user.length === 0)
  )
    return false;

  if (
    typeof user === "object" &&
    !Array.isArray(user) &&
    Object.keys(user).length === 0
  )
    return false;

  return true;
}
