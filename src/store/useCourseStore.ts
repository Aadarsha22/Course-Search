import { create } from "zustand";

import { Course } from "../types";

interface CourseStore {
  filteredCourses: Course[];
  setFilteredCourses: (courses: Course[]) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  filteredCourses: [],
  setFilteredCourses: (courses) => set({ filteredCourses: courses }),
}));
