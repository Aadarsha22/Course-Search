import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Input,
  Select,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import courseData from "../../data/updated_cricos_courses_with_locations.json";
import { useCourseStore } from "../../store/useCourseStore";
import Pagination from "../pagination";
import { useNavigate } from "react-router-dom";
import { Course, CourseData } from "../../types";
import TabsComponent from "../tabsComponent";

export const CourseSearch = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredResults, setFilteredResults] = useState<Course[]>([]);
  const [useExternalFilter, setUseExternalFilter] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { filteredCourses } = useCourseStore();

  useEffect(() => {
    const rawCourses = (courseData as CourseData).Courses.slice(2);
    const courses = rawCourses.filter(
      (course) =>
        course.Column2 && course.Column4 && course.Column20 && course.Column21
    );

    const rawLocations = (courseData as unknown as CourseData).Locations.slice(
      2
    );
    const locationsMap = new Map();

    rawLocations.forEach((location) => {
      locationsMap.set(location.Column2, location);
    });

    const mergedCourses = courses.map((course) => ({
      ...course,
      location: locationsMap.get(course.Column2) || null,
    }));

    setCourses(mergedCourses);
    setFilteredResults(mergedCourses);
  }, []);

  useEffect(() => {
    if (filteredCourses.length > 0) {
      setFilteredResults(filteredCourses);
      setUseExternalFilter(true);
    }
  }, [filteredCourses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setUseExternalFilter(false);

    if (!query) {
      setFilteredResults(courses);
      return;
    }

    const filteredLocalCourses = courses.filter((course) => {
      let matches = true;

      if (searchFilter === "Institution") {
        matches = Boolean(
          course.Column2 &&
            course.Column2.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (searchFilter === "Course Name") {
        matches = Boolean(
          course.Column4 &&
            course.Column4.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (searchFilter === "Duration") {
        matches = course.Column20?.toString() === query;
      }

      if (searchFilter === "Fee") {
        matches = course.Column21?.toString() === query;
      }

      if (searchFilter === "Location") {
        matches = Boolean(
          (course.Column25 &&
            course.Column25.toLowerCase().includes(query.toLowerCase())) ||
            (course.Column26 &&
              course.Column26.toLowerCase().includes(query.toLowerCase()))
        );
      }

      return matches;
    });

    setFilteredResults(filteredLocalCourses);
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  useEffect(() => {
    let updatedResults = [...courses];

    if (!searchQuery && !useExternalFilter) {
      updatedResults = [...courses];
    } else {
      updatedResults = updatedResults.filter((course) => {
        if (searchFilter === "Institution") {
          return (
            course.Column2 &&
            course.Column2.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (searchFilter === "Course Name") {
          return (
            course.Column4 &&
            course.Column4.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (searchFilter === "Duration") {
          return course.Column20?.toString() === searchQuery;
        }
        if (searchFilter === "Fee") {
          return course.Column21?.toString() === searchQuery;
        }
        if (searchFilter === "Location") {
          return (
            (course.Column25 &&
              course.Column25.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (course.Column26 &&
              course.Column26.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
        return true;
      });
    }

    if (sortOption) {
      updatedResults.sort((a, b) => {
        switch (sortOption) {
          case "name":
            return a.Column4.localeCompare(b.Column4);
          case "fee-low":
            return a.Column21 - b.Column21;
          case "fee-high":
            return b.Column21 - a.Column21;
          case "duration-short":
            return a.Column20 - b.Column20;
          case "duration-long":
            return b.Column20 - a.Column20;
          default:
            return 0;
        }
      });
    }

    setFilteredResults(updatedResults);
  }, [searchQuery, searchFilter, sortOption, courses, useExternalFilter]);

  const displayResults =
    useExternalFilter || searchQuery ? filteredResults : courses;
  const displayTotal = displayResults.length;

  const paginateResults = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return displayResults.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    navigate(`/course/${course.Column2}`, { state: { course } });
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading
        mb={4}
        textAlign="center"
        fontFamily={"monospace"}
        color={"blue.400"}
      >
        Find a Course
      </Heading>

      <VStack spacing={3} mb={4}>
        <Select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Select search filter"
        >
          <option value="Institution">Institution</option>
          <option value="Course Name">Course Name</option>
          <option value="Duration">Duration (Weeks)</option>
          <option value="Fee">Tuition Fees</option>
          <option value="Location">Location (City/State)</option>
        </Select>

        <Input
          placeholder={`Search by ${searchFilter}...`}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Text
          textAlign="center"
          fontFamily={"monospace"}
          color={"blue.400"}
          fontSize={"2xl"}
        >
          Sort By
        </Text>
        <Select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
          placeholder="Sort By"
        >
          <option value="name">Course Name (A-Z)</option>
          <option value="fee-low">Tuition Fees (Low to High)</option>
          <option value="fee-high">Tuition Fees (High to Low)</option>
          <option value="duration-short">Duration (Shortest to Longest)</option>
          <option value="duration-long">Duration (Longest to Shortest)</option>
        </Select>
      </VStack>

      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabsComponent />

        <TabPanels>
          <TabPanel>
            {displayTotal > 0 ? (
              <>
                <Box
                  bg="blue.400"
                  h="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={4}
                  mb={4}
                >
                  <Text fontSize="lg" color="white">
                    Showing {paginateResults().length} of {displayTotal} results
                  </Text>
                </Box>

                {paginateResults().map((course, index) => (
                  <Card
                    key={index}
                    border="1px solid"
                    borderColor="gray.200"
                    mb={3}
                    cursor="pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    <CardBody>
                      <Heading size="md">{course.Column4}</Heading>
                      <Text fontSize="sm">Institution: {course.Column2}</Text>
                      <Text fontSize="sm">
                        Location: {course.Column25 || "N/A"},{" "}
                        {course.Column26 || "N/A"}
                      </Text>
                      <HStack justify="space-between">
                        <Text>Duration: {course.Column20} weeks</Text>
                        <Text>Course Language: {course.Column19}</Text>
                        <Text color="green.500">Fee: ${course.Column21}</Text>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}

                <HStack justify="center" spacing={4} mt={4}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(displayTotal / itemsPerPage)}
                    onPageChange={handlePageChange}
                  />
                </HStack>
              </>
            ) : (
              <Text fontSize="lg" color="red.500" textAlign="center">
                No results found
              </Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
