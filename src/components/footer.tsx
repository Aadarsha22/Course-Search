import { Box, Grid, Image, Link, Select, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import EduSic from "../assets/images/EduSic.png";

const Footer = () => {
  return (
    <Box bg="blue.400" color="white" py={6} mt={10} px={8}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={12}>
        <Box color={"blackAlpha.700"}>
          <RouterLink to="/">
            <Image src={EduSic} alt="EduSic" h={7} mb={3} />
          </RouterLink>
          <Text>Copyright © 2023 - AECC Global Event</Text>
          <Text>Disclaimer Privacy Policy Terms & Conditions</Text>
          <Text>You're accessing EduSic Search from</Text>
          <Select
            bg="white"
            color="black"
            size="sm"
            defaultValue="Nepal"
            mt={1}
            width={"fit-content"}
          >
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="Australia">Canada</option>
            <option value="Australia">UK</option>
          </Select>
        </Box>

        <Box color={"blackAlpha.700"}>
          <Text fontWeight="bold" mb={3}>
            Study Abroad
          </Text>
          <Link href="#">Study in Australia</Link> <br />
          <Link href="#">Study in Canada</Link> <br />
          <Link href="#">Study in UK</Link>
        </Box>

        <Box color={"blackAlpha.700"}>
          <Text fontWeight="bold" mb={3}>
            Search
          </Text>
          <Link href="#">Search by Courses</Link> <br />
          <Link href="#">Search by University</Link> <br />
          <Link href="#">Search by Careers</Link>
        </Box>

        <Box color={"blackAlpha.700"}>
          <Text fontWeight="bold" mb={3}>
            Helpful Links
          </Text>
          <Link href="#">Articles</Link> <br />
          <Link href="#">About Us</Link> <br />
          <Link href="#">Contact Us</Link>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
