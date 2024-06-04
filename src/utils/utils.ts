/**
 * Copy-pasted from app.js
 */
export function de(e: string) {
  const t = e.lastIndexOf(".");
  return t === -1 || t === e.length - 1 || t === 0 ? e : e.substr(0, t);
}
