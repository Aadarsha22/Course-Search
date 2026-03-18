// import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Text, Divider } from "@chakra-ui/react";

const Footer = () => {
  // const [country, setCountry] = useState({
  //   name: "Country not found ):",
  //   code: null,
  // });

  // useEffect(() => {
  //   fetch("https://ipapi.co/json/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data && data.country_name && data.country_code) {
  //         setCountry({
  //           name: data.country_name,
  //           code: data.country_code.toLowerCase(),
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       setCountry({ name: "Country not found ):", code: null });
  //     });
  // }, []);

  return (
    <Box as="footer" bg="blue.400" color="blackAlpha.700" py={6} px={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="flex-start"
        align={{ base: "flex-start", md: "center" }}
        gap={6}
      >
        {/* Logo / Brand */}
        <RouterLink to="/">
          <Heading color="gray.800">Deedy</Heading>
        </RouterLink>

        {/* Copyright */}
        <Text fontSize="sm" whiteSpace="nowrap">
          © {new Date().getFullYear()} deedy
        </Text>

        {/* Country Info */}
        {/* <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize="sm" mb={1}>
            You're accessing EduSic Search from
          </Text>
          <Flex
            bg="white"
            px={2}
            py={1}
            borderRadius="md"
            align="center"
            gap={2}
            width="fit-content"
          >
            {country.code && (
              <Image
                src={`https://flagcdn.com/w40/${country.code}.png`}
                alt={`${country.name} flag`}
                boxSize="20px"
                borderRadius="sm"
              />
            )}
            <Text fontWeight="medium" fontSize="sm" color="gray.700">
              {country.name}
            </Text>
          </Flex>
        </Flex> */}
      </Flex>

      {/* Optional Divider for visual separation */}
      <Divider mt={6} borderColor="gray.300" />
    </Box>
  );
};

export default Footer;
