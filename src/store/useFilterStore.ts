import { create } from "zustand";

interface FilterStore {
  selectedCourseType: string;
  setSelectedCourseType: (type: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  tuitionFee: number;
  setTuitionFee: (fee: number) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCourseType: "",
  setSelectedCourseType: (type) => set({ selectedCourseType: type }),
  selectedLocation: "",
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  tuitionFee: 0,
  setTuitionFee: (fee) => set({ tuitionFee: fee }),
}));
