export default function getSearchParams(request: Request) {
  const url = new URL(request.url);
  return url.searchParams;
}
