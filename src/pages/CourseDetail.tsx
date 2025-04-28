import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdSchool,
  MdLocationOn,
  MdAccessTime,
  MdLanguage,
  MdAttachMoney,
  MdInfoOutline,
} from "react-icons/md";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const defaultLocation = {
  city: "Sydney",
  state: "Australia",
};

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const course = location.state?.course;

  const city = course?.Column25 || defaultLocation.city;
  const state = course?.Column26 || defaultLocation.state;

  const osmQuery = encodeURIComponent(`${city}, ${state}`);

  if (!course) {
    return (
      <Container>
        <Heading>No Course Found</Heading>
        <Text fontSize="xl" color="blue.500">
          Course is located in {defaultLocation.city}, {defaultLocation.state}
        </Text>
        <Box height="400px" borderRadius="md" overflow="hidden" mt={4}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=-74.25909%2C40.477399%2C-73.700171%2C40.917577&amp;layer=mapnik&amp;marker=${osmQuery}`}
            title="OpenStreetMap"
          />
        </Box>
        <Flex justify="center" mt={6}>
          <Button
            colorScheme="teal"
            leftIcon={<Icon as={MdSchool} />}
            size="lg"
            borderRadius="full"
            boxShadow="lg"
            _hover={{
              bg: "teal.600",
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
            _active={{
              bg: "teal.700",
            }}
            onClick={() => alert("Applying Now!")}
          >
            Apply Now
          </Button>
        </Flex>
      </Container>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      <Box flex="1" p={4}>
        <Button
          onClick={() => navigate(-1)}
          mb={4}
          variant={"solid"}
          colorScheme="gray"
        >
          ← Back
        </Button>

        <Heading mb={2}>{course.Column4}</Heading>
        <Text fontSize="lg" fontWeight="bold">
          Institution: {course.Column2}
        </Text>

        <Flex direction={{ base: "column", md: "row" }} gap={4} mb={4}>
          <Box flex="1" mr={{ md: 4 }}>
            <Box bg="blue.100" p={4} borderRadius="md">
              <Flex align="center" mb={2}>
                <Icon as={MdLocationOn} mr={2} />
                <Text>
                  {course.Column25} {course.Column26 || "Australia"}
                </Text>
              </Flex>

              <Flex align="center" mb={2}>
                <Icon as={MdAccessTime} mr={2} />
                <Text>Duration: {course.Column20} weeks</Text>
              </Flex>

              <Flex align="center" mb={2}>
                <Icon as={MdLanguage} mr={2} />
                <Text>Course Language: {course.Column19}</Text>
              </Flex>

              <Flex align="center" mb={2}>
                <Icon as={MdAttachMoney} mr={2} />
                <Text fontSize="xl" color="green.500">
                  {course.Column21}
                </Text>
              </Flex>

              <Flex justify="center" mt={4}>
                <Button
                  colorScheme="green"
                  leftIcon={<Icon as={MdSchool} />}
                  size="lg"
                  borderRadius="full"
                  boxShadow="lg"
                  _hover={{
                    bg: "green.600",
                    transform: "scale(1.05)",
                    boxShadow: "xl",
                  }}
                  _active={{
                    bg: "green.700",
                  }}
                >
                  Apply Now
                </Button>
              </Flex>
            </Box>
          </Box>

          <Box flex="1" height="400px" borderRadius="md" overflow="hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=150.644%2C-34.1186%2C151.355%2C-33.865%2C%20&layer=mapnik&marker=-33.8688%2C151.2093"
              title="OpenStreetMap"
            />
          </Box>
        </Flex>

        <Text fontSize="lg" color="blue.500">
          {`Course is located in ${state}`}
        </Text>

        <Box mt={6} textAlign="center">
          <Button
            colorScheme="teal"
            leftIcon={<Icon as={MdInfoOutline} />}
            onClick={onOpen}
          >
            Scholarship Information
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scholarship Terms & Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" mb={4}>
              To apply for the scholarship, you must meet the following
              criteria:
            </Text>
            <Text>
              1. A minimum score of 6.0 in IELTS (or equivalent PTE score).
            </Text>
            <Text>
              2. Completion of a high school (+2) or Bachelor's degree.
            </Text>
            <Text>
              3. Proof of proficiency in the course's language (e.g., English).
            </Text>
            <Text>
              4. A completed application form with necessary documents.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              variant={"outline"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button variant="solid" colorScheme="blue">
              Apply Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default CourseDetail;
