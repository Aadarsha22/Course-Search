import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EduSic from "../assets/images/EduSic.png";

const Navbar = () => {
  return (
    <Box bg="blue.400" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">
        <Link to="/">
          {" "}
          <Image src={EduSic} alt="EduSic" h={10} />
        </Link>
        <Flex gap={6}>
          <Button
            variant={"unstyled"}
            _hover={{ color: "white" }}
            color={"black"}
          >
            Courses
          </Button>
          <Button
            variant={"unstyled"}
            _hover={{ color: "white" }}
            color={"black"}
          >
            About
          </Button>
          <Button
            variant={"outline"}
            borderRadius={"24px"}
            borderColor={"black"}
            color={"black"}
            _hover={{ color: "white", borderColor: "white" }}
          >
            Join Us
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
