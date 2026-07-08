export function getOAuthErrorMessage(params: Pick<URLSearchParams, "get">) {
  const description = params.get("error_description");

  if (description) {
    return description;
  }

  const error = params.get("error");

  if (error) {
    return error.replaceAll("_", " ");
  }

  return null;
}
