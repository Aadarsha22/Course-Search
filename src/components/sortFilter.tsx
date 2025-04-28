import { Box, Flex, Grid } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { CourseResults, Filter } from "./Filter/filter";
import { FilterState } from "../types";

export const SortFilter = () => {
  const [filters, setFilters] = useState<FilterState>({
    courseType: "",
    locations: [],
    feeRange: [null, null],
    durations: [],
  });

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <Flex direction="column" p={4} width={"600px"}>
      <Grid>
        <Box>
          <Filter onFilterChange={handleFilterChange} />
        </Box>

        <Box>
          <CourseResults filters={filters} />
        </Box>
      </Grid>
    </Flex>
  );
};
