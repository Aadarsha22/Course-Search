export interface FilterState {
  courseType: string;
  locations: string[];
  feeRange: [number | null, number | null];
  durations: number[];
}
