// Backend API manzili. Productionda NEXT_PUBLIC_API_URL muhit o'zgaruvchisi orqali beriladi.
export const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "https://safo-1.onrender.com").replace(/\/$/, "");

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`GET ${path} -> ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail =
      typeof data === "object" && data && "detail" in data
        ? String((data as { detail: unknown }).detail)
        : `POST ${path} -> ${res.status}`;
    throw new Error(detail);
  }
  return data as T;
}
