import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
  WrapItem,
  CloseButton,
} from "@chakra-ui/react";
import { useEffect, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { IconType } from "react-icons";

import courseData from "../../data/updated_cricos_courses_with_locations.json";
import { useCourseStore } from "../../store/useCourseStore";
import Pagination from "../pagination";
import { Course, CourseData } from "../../types";
import { GoChevronDown } from "react-icons/go";

interface CourseInfoProps {
  icon: IconType;
  children: ReactNode;
}

export const CourseSearch = () => {
  const [searchCourseNameInput, setSearchCourseNameInput] = useState("");
  const [searchInstitutionInput, setSearchInstitutionInput] = useState("");
  const [searchLocationInput, setSearchLocationInput] = useState("");

  const [searchCourseName, setSearchCourseName] = useState("");
  const [searchInstitution, setSearchInstitution] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Multi-select arrays for Areas, Levels, and Cost Ranges
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCostRanges, setSelectedCostRanges] = useState<string[]>([]);

  const [sortOption, setSortOption] = useState<string>("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredResults, setFilteredResults] = useState<Course[]>([]);

  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isCostOpen, setIsCostOpen] = useState(false);

  const [areaSearch, setAreaSearch] = useState("");
  const [levelSearch, setLevelSearch] = useState("");

  const [uniqueAreas, setUniqueAreas] = useState<string[]>([]);
  const [uniqueLevels, setUniqueLevels] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { filteredCourses } = useCourseStore();
  const navigate = useNavigate();

  // Define cost ranges
  const costRanges = [
    "Up to $10,000",
    "$10,000 - $20,000",
    "$20,000 - $30,000",
    "$30,000 - $40,000",
    "$40,000 - $50,000",
    "$50,000 and more",
  ];

  useEffect(() => {
    const rawCourses = (courseData as CourseData).Courses.slice(2).filter(
      (course) =>
        course.Column2 && course.Column4 && course.Column20 && course.Column21
    );

    const rawLocations = (courseData as CourseData).Locations.slice(2);
    const locationsMap = new Map();
    rawLocations.forEach((location) => {
      locationsMap.set(location.Column2, location);
    });

    const mergedCourses = rawCourses.map((course) => ({
      ...course,
      location: locationsMap.get(course.Column2) || null,
      Column10:
        typeof course.Column10 === "string" && course.Column10.trim() !== ""
          ? course.Column10
          : "Unknown Area",
      Column13:
        typeof course.Column13 === "string" && course.Column13.trim() !== ""
          ? course.Column13
          : "Unknown Level",
    }));

    setCourses(mergedCourses);
    setFilteredResults(mergedCourses);

    const areas = Array.from(
      new Set(
        mergedCourses
          .map((course) => course.Column10)
          .filter((val): val is string => val !== "Unknown Area")
      )
    );
    setUniqueAreas(areas);

    const levels = Array.from(
      new Set(
        mergedCourses
          .map((course) => course.Column13)
          .filter((val): val is string => val !== "Unknown Level")
      )
    );
    setUniqueLevels(levels);
  }, []);

  useEffect(() => {
    if (filteredCourses.length > 0) {
      setFilteredResults(filteredCourses);
    }
  }, [filteredCourses]);

  const applyFilters = useCallback(() => {
    let results = [...courses];

    if (searchCourseName) {
      const query = searchCourseName.toLowerCase();
      results = results.filter((course) =>
        course.Column4?.toLowerCase().includes(query)
      );
    }

    if (searchInstitution) {
      const query = searchInstitution.toLowerCase();
      results = results.filter((course) =>
        course.Column2?.toLowerCase().includes(query)
      );
    }

    if (searchLocation) {
      const query = searchLocation.toLowerCase();
      results = results.filter(
        (course) =>
          course.Column25?.toLowerCase().includes(query) ||
          course.Column26?.toLowerCase().includes(query)
      );
    }

    // Multi-select Area of Study filter (OR logic)
    if (selectedAreas.length > 0) {
      results = results.filter((course) =>
        selectedAreas.includes(course.Column10)
      );
    }

    // Multi-select Level of Study filter (OR logic)
    if (selectedLevels.length > 0) {
      results = results.filter((course) =>
        selectedLevels.includes(course.Column13)
      );
    }

    // Multi-select Cost Range filter (OR logic)
    if (selectedCostRanges.length > 0) {
      results = results.filter((course) => {
        const fee = course.Column21;
        return selectedCostRanges.some((range) => {
          switch (range) {
            case "Up to $10,000":
              return fee <= 10000;
            case "$10,000 - $20,000":
              return fee > 10000 && fee <= 20000;
            case "$20,000 - $30,000":
              return fee > 20000 && fee <= 30000;
            case "$30,000 - $40,000":
              return fee > 30000 && fee <= 40000;
            case "$40,000 - $50,000":
              return fee > 40000 && fee <= 50000;
            case "$50,000 and more":
              return fee > 50000;
            default:
              return true;
          }
        });
      });
    }

    if (sortOption) {
      results.sort((a, b) => {
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

    setFilteredResults(results);
    setCurrentPage(1);
  }, [
    courses,
    searchCourseName,
    searchInstitution,
    searchLocation,
    sortOption,
    selectedAreas,
    selectedLevels,
    selectedCostRanges,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const totalResults = filteredResults.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const paginateResults = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(start, start + itemsPerPage);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleCourseClick = (course: Course) =>
    navigate(`/course/${course.Column2}`, { state: { course } });

  const CourseInfo: React.FC<CourseInfoProps> = ({ icon, children }) => (
    <Flex gap={2} alignItems="center" mt={1}>
      <Icon as={icon} />
      <Text fontSize="sm">{children}</Text>
    </Flex>
  );

  const renderCourses = (paginatedCourses: Course[], total: number) => {
    if (total === 0) {
      return (
        <Text fontSize="lg" color="red.500" textAlign="center">
          No results found
        </Text>
      );
    }

    return (
      <>
        <Box
          bg="blue.400"
          color="white"
          borderRadius="md"
          p={3}
          textAlign="center"
          mb={4}
        >
          Showing {paginatedCourses.length} of {total} results
        </Box>

        {paginatedCourses.map((course, index) => (
          <Card key={index} mb={3}>
            <CardBody py={9} px={12}>
              <Heading size="md" textAlign="start" mb={1}>
                {course.Column4}
              </Heading>
              <Text fontSize="lg" textAlign="start">
                {course.Column2}
              </Text>

              <CourseInfo icon={MdLocationOn}>
                Location: {course.Column25 || "N/A"}, {course.Column26 || "N/A"}
              </CourseInfo>

              <CourseInfo icon={IoIosTime}>
                Duration: {course.Column20} weeks
              </CourseInfo>

              <CourseInfo icon={FaLanguage}>
                Course Language: {course.Column19}
              </CourseInfo>

              <CourseInfo icon={AiFillDollarCircle}>
                <Text as="span" color="green.500">
                  Fee: ${course.Column21.toLocaleString()}
                </Text>
              </CourseInfo>

              <Flex gap={8} mt={3}>
                <Button
                  borderRadius={12}
                  bg={"blue.900"}
                  color={"white"}
                  variant={"outline"}
                  _hover={{
                    bg: "white",
                    color: "blue.900",
                    borderColor: "blue.900",
                  }}
                  onClick={() => navigate("/enquiry", { state: { course } })}
                >
                  Enquire Now
                </Button>
                <Button
                  onClick={() => handleCourseClick(course)}
                  borderRadius={12}
                  bg={"blue.400"}
                  color={"white"}
                  variant={"outline"}
                  _hover={{
                    bg: "white",
                    color: "blue.700",
                    borderColor: "blue.700",
                  }}
                >
                  Learn More
                </Button>
              </Flex>
            </CardBody>
          </Card>
        ))}

        <HStack justify="center" mt={6}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </HStack>
      </>
    );
  };

  const onSearchClick = () => {
    setSearchCourseName(searchCourseNameInput);
    setSearchInstitution(searchInstitutionInput);
    setSearchLocation(searchLocationInput);
  };

  // Add area if not already selected
  const addSelectedArea = (area: string) => {
    if (!selectedAreas.includes(area)) {
      setSelectedAreas((prev) => [...prev, area]);
    }
    setIsAreaOpen(false);
    setAreaSearch("");
  };

  // Remove area from selected
  const removeSelectedArea = (area: string) => {
    setSelectedAreas((prev) => prev.filter((a) => a !== area));
  };

  // Add level if not already selected
  const addSelectedLevel = (level: string) => {
    if (!selectedLevels.includes(level)) {
      setSelectedLevels((prev) => [...prev, level]);
    }
    setIsLevelOpen(false);
    setLevelSearch("");
  };

  // Remove level from selected
  const removeSelectedLevel = (level: string) => {
    setSelectedLevels((prev) => prev.filter((l) => l !== level));
  };

  // Add cost range if not already selected
  const addSelectedCostRange = (range: string) => {
    if (!selectedCostRanges.includes(range)) {
      setSelectedCostRanges((prev) => [...prev, range]);
    }
    setIsCostOpen(false);
  };

  // Remove cost range from selected
  const removeSelectedCostRange = (range: string) => {
    setSelectedCostRanges((prev) => prev.filter((r) => r !== range));
  };

  return (
    <Box bg="white" py={10}>
      <Container maxW="container.lg">
        <Box bg={"gray.50"} py={3} px={2}>
          <Heading
            mb={6}
            textAlign="center"
            fontSize="3xl"
            fontFamily="heading"
            color="blue.500"
          >
            Find a Course
          </Heading>

          <Tabs variant="solid-rounded" colorScheme="blue" isFitted>
            <TabList justifyContent="center" mb={4} gap={3}>
              <Tab _hover={{ bg: "blue.300" }}>Courses</Tab>
              <Tab _hover={{ bg: "blue.300" }}>Institution</Tab>
              <Tab _hover={{ bg: "blue.300" }}>Location</Tab>
            </TabList>

            <TabPanels>
              {[0, 1, 2].map((tabIndex) => (
                <TabPanel key={tabIndex}>
                  <Flex
                    wrap="wrap"
                    gap={4}
                    justify="center"
                    mb={6}
                    alignItems="center"
                  >
                    <Input
                      placeholder={`Search by ${
                        tabIndex === 0
                          ? "Course Name"
                          : tabIndex === 1
                          ? "Institution"
                          : "Location"
                      }`}
                      value={
                        tabIndex === 0
                          ? searchCourseNameInput
                          : tabIndex === 1
                          ? searchInstitutionInput
                          : searchLocationInput
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (tabIndex === 0) setSearchCourseNameInput(value);
                        else if (tabIndex === 1)
                          setSearchInstitutionInput(value);
                        else setSearchLocationInput(value);
                      }}
                      maxW="300px"
                      borderRadius="full"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "black" }}
                    />
                    <Button
                      colorScheme="blue"
                      onClick={onSearchClick}
                      borderRadius="full"
                      minW="100px"
                    >
                      Search
                    </Button>

                    {tabIndex === 0 && (
                      <>
                        <Select
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          placeholder="Sort By"
                          maxW="250px"
                          borderRadius="full"
                          borderColor={"gray.800"}
                        >
                          <option value="name">Course Name (A–Z)</option>
                          <option value="fee-low">
                            Tuition Fees (Low to High)
                          </option>
                          <option value="fee-high">
                            Tuition Fees (High to Low)
                          </option>
                          <option value="duration-short">
                            Duration (Short → Long)
                          </option>
                          <option value="duration-long">
                            Duration (Long → Short)
                          </option>
                        </Select>

                        <HStack spacing={4} mt={2}>
                          {/* Area of Study multi-select */}
                          <Menu
                            isOpen={isAreaOpen}
                            onClose={() => setIsAreaOpen(false)}
                          >
                            <MenuButton
                              as={Button}
                              variant="outline"
                              borderRadius="full"
                              colorScheme="blue"
                              rightIcon={<GoChevronDown />}
                              onClick={() => setIsAreaOpen(!isAreaOpen)}
                            >
                              Area of Study
                            </MenuButton>
                            <MenuList
                              maxH="300px"
                              overflowY="auto"
                              px={2}
                              py={2}
                            >
                              <Input
                                placeholder="Search Area..."
                                value={areaSearch}
                                onChange={(e) => setAreaSearch(e.target.value)}
                                mb={2}
                                borderRadius="md"
                              />
                              {uniqueAreas
                                .filter((area) =>
                                  area
                                    .toLowerCase()
                                    .includes(areaSearch.toLowerCase())
                                )
                                .map((area, idx) => (
                                  <MenuItem
                                    key={idx}
                                    onClick={() => addSelectedArea(area)}
                                    isDisabled={selectedAreas.includes(area)}
                                  >
                                    {area}
                                  </MenuItem>
                                ))}
                            </MenuList>
                          </Menu>

                          {/* Level of Study multi-select */}
                          <Menu
                            isOpen={isLevelOpen}
                            onClose={() => setIsLevelOpen(false)}
                          >
                            <MenuButton
                              as={Button}
                              variant="outline"
                              borderRadius="full"
                              colorScheme="blue"
                              rightIcon={<GoChevronDown />}
                              onClick={() => setIsLevelOpen(!isLevelOpen)}
                            >
                              Level of Study
                            </MenuButton>
                            <MenuList
                              maxH="300px"
                              overflowY="auto"
                              px={2}
                              py={2}
                            >
                              <Input
                                placeholder="Search Level..."
                                value={levelSearch}
                                onChange={(e) => setLevelSearch(e.target.value)}
                                mb={2}
                                borderRadius="md"
                              />
                              {uniqueLevels
                                .filter((level) =>
                                  level
                                    .toLowerCase()
                                    .includes(levelSearch.toLowerCase())
                                )
                                .map((level, idx) => (
                                  <MenuItem
                                    key={idx}
                                    onClick={() => addSelectedLevel(level)}
                                    isDisabled={selectedLevels.includes(level)}
                                  >
                                    {level}
                                  </MenuItem>
                                ))}
                            </MenuList>
                          </Menu>

                          {/* Estimated Total Cost multi-select */}
                          <Menu
                            isOpen={isCostOpen}
                            onClose={() => setIsCostOpen(false)}
                          >
                            <MenuButton
                              as={Button}
                              variant="outline"
                              borderRadius="full"
                              colorScheme="blue"
                              rightIcon={<GoChevronDown />}
                              onClick={() => setIsCostOpen(!isCostOpen)}
                            >
                              Estimated Total Cost (AUD)
                            </MenuButton>
                            <MenuList
                              maxH="300px"
                              overflowY="auto"
                              px={2}
                              py={2}
                            >
                              {costRanges.map((range, idx) => (
                                <MenuItem
                                  key={idx}
                                  onClick={() => addSelectedCostRange(range)}
                                  isDisabled={selectedCostRanges.includes(
                                    range
                                  )}
                                >
                                  {range}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        </HStack>
                      </>
                    )}
                  </Flex>

                  {/* Show selected Areas badges */}
                  {selectedAreas.length > 0 && (
                    <Wrap spacing={2} justify="center" mb={2}>
                      {selectedAreas.map((area) => (
                        <WrapItem key={area}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="solid"
                            borderRadius="full"
                            rightIcon={
                              <CloseButton
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSelectedArea(area);
                                }}
                              />
                            }
                          >
                            {area}
                          </Button>
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}

                  {/* Show selected Levels badges */}
                  {selectedLevels.length > 0 && (
                    <Wrap spacing={2} justify="center" mb={2}>
                      {selectedLevels.map((level) => (
                        <WrapItem key={level}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="solid"
                            borderRadius="full"
                            rightIcon={
                              <CloseButton
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSelectedLevel(level);
                                }}
                              />
                            }
                          >
                            {level}
                          </Button>
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}

                  {/* Show selected Cost Ranges badges */}
                  {selectedCostRanges.length > 0 && (
                    <Wrap spacing={2} justify="center" mb={4}>
                      {selectedCostRanges.map((range) => (
                        <WrapItem key={range}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="solid"
                            borderRadius="full"
                            rightIcon={
                              <CloseButton
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSelectedCostRange(range);
                                }}
                              />
                            }
                          >
                            {range}
                          </Button>
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}

                  {renderCourses(paginateResults(), filteredResults.length)}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};
