import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import courseData from "../../data/course-location.json";
import { useCourseStore } from "../../store";
import { Course, CourseData, FilterState } from "../../types";

const CourseTypeSelect: React.FC<{ onSelect: (value: string) => void }> = ({
  onSelect,
}) => {
  const [courseTypes, setCourseTypes] = useState<string[]>([]);

  useEffect(() => {
    const typedCourseData = courseData as CourseData;
    const uniqueTypes = Array.from(
      new Set(typedCourseData.Courses.slice(2).map((course) => course.Column13))
    ).filter(Boolean);
    setCourseTypes(uniqueTypes);
  }, []);

  return (
    <Select
      placeholder="Select Course Type"
      onChange={(e) => onSelect(e.target.value)}
    >
      {courseTypes.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </Select>
  );
};

export const Filter: React.FC<{
  onFilterChange: (filters: FilterState) => void;
}> = ({ onFilterChange }) => {
  const [selectedCourseType, setSelectedCourseType] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minFee, setMinFee] = useState<number | null>(null);
  const [maxFee, setMaxFee] = useState<number | null>(null);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);

  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const typedCourseData = courseData as CourseData;
    const uniqueLocations = Array.from(
      new Set(
        typedCourseData.Courses.map((course) =>
          course.Column25 ? course.Column25.trim() : ""
        )
      )
    ).filter(Boolean);
    setLocations(uniqueLocations);
  }, []);

  useEffect(() => {
    onFilterChange({
      courseType: selectedCourseType,
      locations: selectedLocations,
      feeRange: [minFee, maxFee],
      durations: selectedDurations,
    });
  }, [
    selectedCourseType,
    selectedLocations,
    minFee,
    maxFee,
    selectedDurations,
    onFilterChange,
  ]);

  const handleLocationCheck = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const handleDurationCheck = (years: number) => {
    setSelectedDurations((prev) =>
      prev.includes(years) ? prev.filter((d) => d !== years) : [...prev, years]
    );
  };

  return (
    <Box border="1px solid gray" mt={3} p={3} shadow="md">
      <Text fontSize="2xl" color="blue.400" textAlign="center">
        Course Filter
      </Text>

      <Text mt={4} mb={3} color="blue.400" fontSize="md">
        Course Type
      </Text>
      <CourseTypeSelect onSelect={setSelectedCourseType} />

      <Text mt={4} mb={3} color="blue.400" fontSize="md">
        Location
      </Text>
      <Input
        type="search"
        placeholder="Search by city/state..."
        mb={3}
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
      />
      <Grid gap={3}>
        {locations
          .filter((loc) =>
            loc.toLowerCase().includes(locationSearch.toLowerCase())
          )
          .map((loc) => (
            <Checkbox
              key={loc}
              isChecked={selectedLocations.includes(loc)}
              onChange={() => handleLocationCheck(loc)}
            >
              {loc}
            </Checkbox>
          ))}
      </Grid>

      <Text mt={4} mb={3} color="blue.400" fontSize="md">
        Tuition Fees
      </Text>
      <Flex gap={3}>
        <Input
          width="80px"
          type="number"
          placeholder="Min"
          onChange={(e) => setMinFee(Number(e.target.value) || null)}
        />
        <Text>-</Text>
        <Input
          width="80px"
          type="number"
          placeholder="Max"
          onChange={(e) => setMaxFee(Number(e.target.value) || null)}
        />
      </Flex>

      <Text mt={4} mb={3} color="blue.400" fontSize="md">
        Duration (Years)
      </Text>
      <Grid gap={3}>
        {[1, 2, 3, 4, 5].map((year) => (
          <Checkbox
            key={year}
            isChecked={selectedDurations.includes(year)}
            onChange={() => handleDurationCheck(year)}
          >
            {year} Year{year > 1 ? "s" : ""}
          </Checkbox>
        ))}
      </Grid>
    </Box>
  );
};

export const CourseResults: React.FC<{ filters: FilterState }> = ({
  filters,
}) => {
  const { setFilteredCourses } = useCourseStore();

  useEffect(() => {
    const typedCourseData = courseData as { Courses: Course[] };

    const results = typedCourseData.Courses.filter((course) => {
      let matches = true;

      if (filters.courseType && course.Column13 !== filters.courseType) {
        matches = false;
      }

      if (
        filters.locations.length > 0 &&
        !filters.locations.includes(course.Column25)
      ) {
        matches = false;
      }

      if (
        (filters.feeRange[0] !== null &&
          course.Column21 < filters.feeRange[0]) ||
        (filters.feeRange[1] !== null && course.Column21 > filters.feeRange[1])
      ) {
        matches = false;
      }

      if (
        filters.feeRange[1] !== null &&
        course.Column21 > filters.feeRange[1]
      ) {
        matches = false;
      }

      if (
        filters.durations.length > 0 &&
        !filters.durations.includes(course.Column20 / 52)
      ) {
        matches = false;
      }

      return matches;
    });

    setFilteredCourses(results);
  }, [filters, setFilteredCourses]);

  return <></>;
};
