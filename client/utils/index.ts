export function isObjectEmpty(obj: any): boolean {
  return obj && typeof obj === "object" && Object.keys(obj).length === 0;
}
