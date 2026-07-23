export function getFilters(
  searchParams: Record<string, string | undefined> | URLSearchParams,
) {
  const get = (key: string) => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) || "";
    }
    return searchParams[key] || "";
  };

  return {
    location: get("location"),
    form: get("form"),
    transmission: get("transmission"),
    engine: get("engine"),
  };
}