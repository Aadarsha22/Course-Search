import { Course } from "../types";

const STORAGE_KEY = "favouriteCourses";

export const getFavourites = (): Course[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse favourites:", e);
    return [];
  }
};

export const saveFavourites = (favourites: Course[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
};

export const toggleFavourite = (course: Course) => {
  const current = getFavourites();
  const exists = current.some((c) => c.Column3 === course.Column3);
  const updated = exists
    ? current.filter((c) => c.Column3 !== course.Column3)
    : [...current, course];

  saveFavourites(updated);
};

export const isFavourite = (course: Course): boolean => {
  const current = getFavourites();
  return current.some((c) => c.Column3 === course.Column3);
};

// Remove a specific favourite
export const removeFavourite = (course: Course) => {
  const current = getFavourites();
  const updated = current.filter((c) => c.Column3 !== course.Column3);
  saveFavourites(updated);
};

// Clear all favourites
export const clearFavourites = () => {
  localStorage.removeItem(STORAGE_KEY);
};
