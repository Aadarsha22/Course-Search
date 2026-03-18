import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getFavourites } from "../utils/favourites";

const Navbar = () => {
  const [favouritesCount, setFavouritesCount] = useState(0);

  useEffect(() => {
    const favs = getFavourites();
    setFavouritesCount(favs.length);

    const handleStorageChange = () => {
      const updated = getFavourites();
      setFavouritesCount(updated.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Box bg="blue.400" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">
        <Link to="/">
          <Heading color={"gray.900"} fontWeight={"bold"}>
            Deedy
          </Heading>
        </Link>
        <Flex gap={6} align="center">
          <Button
            as={Link}
            to="/favourites"
            variant="unstyled"
            _hover={{ color: "white" }}
            color="black"
            display="flex"
            alignItems="center"
            gap={2}
            position={"relative"}
          >
            Favourites
            <Box
              bg={"red"}
              borderRadius="100%"
              color={"white"}
              fontSize={"xx-small"}
              width={"12px"}
              height={"12px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position={"absolute"}
              right={"-6px"}
              top={"6px"}
            >
              {favouritesCount}
            </Box>
          </Button>

          <Button
            variant="outline"
            borderRadius="24px"
            borderColor="black"
            color="black"
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
