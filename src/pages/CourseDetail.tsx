import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Divider,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";

import { GoBookmark, GoBookmarkSlashFill } from "react-icons/go";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import courseData from "../data/courseFilterData.json";
import { CourseData, Course } from "../types";

import { toggleFavourite, isFavourite } from "../utils/favourites";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const apiKey = import.meta.env.VITE_APP_API_KEY;

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const course = location.state?.course;

  const locationName = course?.Column2;

  const allCourses = (courseData as unknown as CourseData).Courses.slice(2);
  const relatedCourses: Course[] = allCourses
    .filter(
      (c) =>
        c.Column4 === course.Column4 &&
        c.Column2 !== course.Column2 && // exclude current institution
        c.Column3 !== course.Column3 // optionally exclude current course code
    )
    .slice(0, 6); // get only 4 related courses

  const allInstitutions = (courseData as unknown as CourseData).Institutions.slice(2);
  const matchedInstitution = allInstitutions.find(
    (inst) => inst.Institutions === course.Courses
  );
  const websiteUrl = matchedInstitution?.Column6;

  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (course) {
      setFav(isFavourite(course));
    }
  }, [course]);

  if (!course) {
    return (
      <Container>
        <Heading>No Course Found</Heading>
      </Container>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      <Box flex="1" p={14}>
        <Button
          onClick={() => navigate(-1)}
          mb={4}
          variant={"outline"}
          colorScheme="gray"
        >
          ← Back
        </Button>

        <Box mb={2}>
          <Heading mb={1}>{course.Column4}</Heading>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            {course.Column2}
          </Text>
          <Flex justifyContent={"start"} gap={4}>
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
              Enquire
            </Button>
            <Button
              borderRadius={12}
              bg={"blue.400"}
              color={"white"}
              variant={"outline"}
              _hover={{
                bg: "white",
                color: "blue.700",
                borderColor: "blue.700",
              }}
              onClick={() => {
                const urlToOpen = websiteUrl?.startsWith("http")
                  ? websiteUrl
                  : `https://${websiteUrl}`;
                window.open(urlToOpen, "_blank");
              }}
            >
              Visit Website
            </Button>
            <Button
              borderRadius={12}
              variant="outline"
              borderColor="gray.800"
              onClick={() => {
                toggleFavourite(course);
                const newFavState = !fav;
                setFav(newFavState);

                toast({
                  title: newFavState
                    ? "Course added to Favourites"
                    : "Course removed from Favourites",
                  status: newFavState ? "success" : "error",
                  duration: 2000,
                  isClosable: true,
                  position: "bottom-right",
                });
              }}
            >
              {fav ? <GoBookmarkSlashFill /> : <GoBookmark />}
            </Button>
          </Flex>
        </Box>
        <Divider mb={2} borderColor={"gray.800"} />

        <Flex direction={{ base: "column", md: "row" }} gap={4} mb={4}>
          <Box flex="1" mr={{ md: 4 }}>
            <Accordion allowMultiple defaultIndex={[0]}>
              <AccordionItem>
                <h2>
                  <AccordionButton bg={"#F0F0F0"} p={5}>
                    <Box as="span" flex="1" textAlign="left">
                      <Text fontWeight={"bold"}>Key Information</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex align="center" mb={2} mt={2}>
                    <Text fontWeight={"bold"}>Cricos Code:</Text>
                    <Text>{course.Column3}</Text>
                  </Flex>

                  <Flex align="start" mb={2} flexDirection={"column"}>
                    <Text fontWeight={"bold"}>Address</Text>
                    <Text>
                      {course.Column25} {course.Column26 || "Australia"}
                    </Text>
                  </Flex>

                  <Flex align="start" mb={2} flexDirection={"column"}>
                    <Text fontWeight={"bold"}>Duration</Text>{" "}
                    <Text> {course.Column20} weeks</Text>
                  </Flex>

                  <Flex align="start" mb={2} flexDirection={"column"}>
                    <Text fontWeight={"bold"}>Course Language</Text>
                    <Text> {course.Column19}</Text>
                  </Flex>

                  <Flex flexDirection={"row"} justifyContent={"space-between"}>
                    <Flex align="start" mb={2} flexDirection={"column"}>
                      <Text fontWeight={"bold"}>Tuition Fee</Text>
                      <Text>AUD ${course.Column21}</Text>
                    </Flex>

                    <Flex align="start" mb={2} flexDirection={"column"}>
                      <Text fontWeight={"bold"}>Non Tuition Fee</Text>
                      <Text>AUD ${course.Column22}</Text>
                    </Flex>

                    <Flex align="start" mb={2} flexDirection={"column"}>
                      <Text fontWeight={"bold"}>Total Tuition Costs</Text>
                      <Text>AUD ${course.Column23}</Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton bg={"#F0F0F0"} p={5}>
                    <Box as="span" flex="1" textAlign="left">
                      <Text fontWeight={"bold"}>Related Courses</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex wrap="wrap" gap={4}>
                    {relatedCourses.length > 0 ? (
                      relatedCourses.map((related, index) => (
                        <Box
                          key={index}
                          flex="1 1 calc(50% - 1rem)" // two cards per row with gap
                          minW="250px"
                          maxW="400px"
                          p={4}
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          onClick={() =>
                            navigate(`/course/${related.Column2}`, {
                              state: { course: related },
                            })
                          }
                        >
                          <Text fontSize="md" fontWeight="bold">
                            {related.Column4}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {related.Column2}
                          </Text>
                        </Box>
                      ))
                    ) : (
                      <Text color="gray.500">No related courses found.</Text>
                    )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Box flex="1" height="419px" borderRadius="md" overflow="hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/directions?key=${encodeURIComponent(
                apiKey
              )}&origin=My+Location&destination=${encodeURIComponent(
                locationName
              )}`}
              title="Google Map"
            />
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Box>
  );
};

export default CourseDetail;
