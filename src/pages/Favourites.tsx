import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  CardBody,
  Card,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Course } from "../types";
import { getFavourites, removeFavourite } from "../utils/favourites";
import { IconType } from "react-icons";
import { MdLocationOn } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";

interface CourseInfoProps {
  icon: IconType;
  children: ReactNode;
}

const Favourites = () => {
  const [favourites, setFavourites] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = getFavourites();
    setFavourites(favs);
  }, []);

  const CourseInfo: React.FC<CourseInfoProps> = ({ icon, children }) => (
    <Flex gap={2} alignItems="center" mt={1}>
      <Icon as={icon} />
      <Text fontSize="sm">{children}</Text>
    </Flex>
  );

  const handleCourseClick = (course: Course) =>
    navigate(`/course/${course.Column2}`, { state: { course } });

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />

      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="start"
        py={10}
        px={4}
      >
        <Container maxW="4xl" centerContent>
          <Heading mb={6} textAlign="center">
            Favourite Courses
          </Heading>

          <Flex wrap="wrap" gap={6} justify="center" width="100%">
            {favourites.length > 0 ? (
              favourites.map((course, idx) => (
                <Card key={idx} width="100%">
                  <CardBody py={9} px={6}>
                    <Flex justifyContent={"space-between"}>
                      <Flex flexDirection={"column"}>
                        <Heading size="md" textAlign="start" mb={1}>
                          {course.Column4}
                        </Heading>
                        <Text fontSize="lg" textAlign="start">
                          {course.Column2}
                        </Text>
                      </Flex>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => {
                          removeFavourite(course); // update localStorage
                          setFavourites((prev) =>
                            prev.filter(
                              (item) => item.Column3 !== course.Column3
                            )
                          );
                        }}
                      >
                        Remove
                      </Button>
                    </Flex>

                    <CourseInfo icon={MdLocationOn}>
                      Location: {course.Column25 || "N/A"},{" "}
                      {course.Column26 || "N/A"}
                    </CourseInfo>

                    <CourseInfo icon={IoIosTime}>
                      Duration: {course.Column20} weeks
                    </CourseInfo>

                    <CourseInfo icon={FaLanguage}>
                      Course Language: {course.Column19}
                    </CourseInfo>

                    <CourseInfo icon={AiFillDollarCircle}>
                      <Text as="span" color="green.500">
                        Fee: ${course.Column21}
                      </Text>
                    </CourseInfo>

                    <Flex gap={6} mt={4} wrap="wrap">
                      <Button
                        borderRadius={12}
                        bg="blue.900"
                        color="white"
                        variant="outline"
                        _hover={{
                          bg: "white",
                          color: "blue.900",
                          borderColor: "blue.900",
                        }}
                        onClick={() =>
                          navigate("/enquiry", { state: { course } })
                        }
                      >
                        Enquire Now
                      </Button>

                      <Button
                        onClick={() => handleCourseClick(course)}
                        borderRadius={12}
                        bg="blue.400"
                        color="white"
                        variant="outline"
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
              ))
            ) : (
              <Card>
                <CardBody>
                  <Text>No Favourites added yet.</Text>
                </CardBody>
              </Card>
            )}
          </Flex>
        </Container>
      </Flex>

      <Footer />
    </Box>
  );
};

export default Favourites;
