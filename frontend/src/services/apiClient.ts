const BASE_URL = import.meta.env.VITE_API_URL ?? "";

/** How long a request may take before it is cancelled. */
const DEFAULT_TIMEOUT_MS = 10_000;

/** Error thrown for failed requests. `detail` is the backend message ({"detail": "..."}). */
export class ApiError extends Error {
  readonly status: number;
  readonly detail: string;

  constructor(status: number, detail: string) {
    super(`Request failed (${status}): ${detail}`);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

interface RequestOptions {
  /** Lets the caller cancel the request, for example when a component unmounts. */
  signal?: AbortSignal;
  timeoutMs?: number;
}

/** Reads the backend error message if the body is JSON, otherwise falls back to the status text. */
async function readDetail(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "detail" in body && typeof body.detail === "string") {
      return body.detail;
    }
  } catch {
    // Not JSON: use the status text below.
  }
  return response.statusText || "Unknown error";
}

export async function apiGet<T>(path: string, { signal, timeoutMs = DEFAULT_TIMEOUT_MS }: RequestOptions = {}): Promise<T> {
  const timeout = AbortSignal.timeout(timeoutMs);
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  if (!response.ok) {
    throw new ApiError(response.status, await readDetail(response));
  }
  return (await response.json()) as T;
}
