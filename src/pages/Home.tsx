import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Studyimage from "../assets/images/study.webp";
import { SortFilter } from "../components/sortFilter";
import { CourseSearch } from "../components";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />

      <Flex mt={"1px"} position="relative">
        <Box
          bg={"blue.400"}
          width={"full"}
          p={4}
          position="relative"
          h={"300px"}
          alignContent={"center"}
        >
          <Heading color={"whitesmoke"} width={"30%"}>
            Find a Suitable Course <br /> for your <br />
            dream destination.
          </Heading>
        </Box>

        <Image
          src={Studyimage}
          alt="EduSic"
          h={"290px"}
          w={"60%"}
          objectFit={"cover"}
          position="absolute"
          right={0}
          zIndex={60}
          p={3}
        />
      </Flex>

      <Flex direction={"row"}>
        <Box>
          <SortFilter />
        </Box>

        <Box flex="1">
          <CourseSearch />
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
};

export default Home;
