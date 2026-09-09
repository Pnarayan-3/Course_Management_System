const API_BASE = import.meta.env.VITE_API_URL || "https://localhost:7278/api/courses";

async function requestJson(url, options) {
  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const err = new Error(data?.title || `Request failed (${res.status})`);
    err.status = res.status;
    err.details = data?.errors || null;
    throw err;
  }

  return data;
}

export function getCourses() {
  return requestJson(API_BASE);
}

export function createCourse(course) {
  return requestJson(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export function updateCourse(id, course) {
  return requestJson(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export function deleteCourse(id) {
  return requestJson(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
}