export function safeString(v, fallback = "") {
  return v == null ? fallback : String(v);
}