export type Course = {
  Column2: string; // Institution Name
  Column3: string; // Location Name
  Column4: string; // Course Name
  Column5: string; // Location City
  Column6: string; // Location State
  Column19: string; // Course Language
  Column13: string; // Course type
  Column20: number; // Duration (Weeks)
  Column21: number; // Tuition Fee
  Column25: string; //City
  Column26: string; //State
};

export type CourseData = {
  Courses: Course[];
  Locations: Location[];
};

export type Location = {
  Column2?: string;
  Column3?: string;
  Column4?: string;
  Column5?: string;
  Column6?: string;
  Column7?: string;
  Column8?: string;
  Column9?: string;
  Column10?: string;
  Column11?: string;
  Column25?: string;
  Column26?: string;
};
