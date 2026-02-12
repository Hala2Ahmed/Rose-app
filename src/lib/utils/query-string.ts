/** Decode brackets in query string so URLs show price[lte] instead of price%5Blte%5D */
export function toReadableQueryString(query: string): string {
  return query.replace(/%5B/g, "[").replace(/%5D/g, "]");
}
