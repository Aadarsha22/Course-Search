import { Box, Flex } from "@chakra-ui/react";

import { CourseSearch } from "../components";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />

      <Box flex="1">
        <Flex direction="row">
          {/* <Box><SortFilter /></Box> */}

          <Box flex="1">
            <CourseSearch />
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Flex>
  );
};

export default Home;
