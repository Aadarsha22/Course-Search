import { HStack, Button, Text, IconButton } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const range: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, 4, 5, "...");
      } else if (currentPage >= totalPages - 2) {
        range.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        range.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return range;
  };

  return (
    <HStack justify="center" spacing={2} mt={4}>
      <IconButton
        aria-label="Previous Page"
        icon={<HiChevronLeft />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="ghost"
        size="sm"
      />

      {generatePageNumbers().map((page, index) =>
        page === "..." ? (
          <Text key={index} px={2}>
            ...
          </Text>
        ) : (
          <Button
            key={index}
            variant={page === currentPage ? "solid" : "ghost"}
            colorScheme={page === currentPage ? "gray" : "blackAlpha"}
            onClick={() => onPageChange(Number(page))}
            borderRadius="md"
            size="sm"
            fontWeight={page === currentPage ? "bold" : "normal"}
          >
            {page}
          </Button>
        )
      )}

      <IconButton
        aria-label="Next Page"
        icon={<HiChevronRight />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="ghost"
        size="sm"
      />
    </HStack>
  );
};

export default Pagination;
