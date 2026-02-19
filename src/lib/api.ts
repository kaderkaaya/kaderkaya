/**
 * API client for kaderkaya-api backend.
 * Public GETs: no token. Mutations (POST): require Authorization header.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type ApiResponse<T> = {
  meta: { statusCode: number; message: string };
  data: T;
};

function getHeaders(token?: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["token"] = `${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (text.startsWith("<!") || text.startsWith("<")) {
    throw new Error(
      `API returned HTML instead of JSON (status ${res.status}). ` +
        "Check that NEXT_PUBLIC_API_URL points to kaderkaya-api and the API is running (e.g. on port 3001 if Next.js uses 3000)."
    );
  }
  let json: ApiResponse<T>;
  try {
    json = JSON.parse(text) as ApiResponse<T>;
  } catch {
    throw new Error(`API returned invalid JSON: ${text.slice(0, 100)}...`);
  }
  if (json.meta?.statusCode !== 0) {
    throw new Error(json.meta?.message ?? "Request failed");
  }
  return json.data as T;
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string>,
  token?: string | null
): Promise<T> {
  const url = new URL(path, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v != null && v !== "") url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getHeaders(token),
    cache: "no-store",
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  token?: string | null
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

/** Map API entity (_id) to app type (id) */
export function mapId<T extends { _id?: string; id?: string }>(item: T): T {
  if (item && "_id" in item && !("id" in item)) {
    const { _id, ...rest } = item as T & { _id: string };
    return { ...rest, id: _id } as T;
  }
  return item;
}

export function mapItems<T extends { _id?: string; id?: string }>(
  items: T[]
): T[] {
  return (items ?? []).map(mapId);
}
