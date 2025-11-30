import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./NavBar";
import { Drawing } from "../interfaces";
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useToast,
  LinkBox,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon, ArrowUpDownIcon } from "@chakra-ui/icons";
import axiosInstance from "../utils/axiosInstance";

const ViewAllDrawings: React.FC = () => {
  type SortField = "customerName" | "date" | "address";

  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const toast = useToast();

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const response = await axiosInstance.get("/api/drawings");
        setDrawings(response.data as Drawing[]);
      } catch (err: any) {
        const msg = err.response?.data?.error || "Failed to fetch drawings.";
        setError(msg);
        toast({
          title: "Error",
          description: msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, [toast]);

  const sortedDrawings = [...drawings].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (sortField === "date") {
      return sortOrder === "asc"
        ? new Date(fieldA as string).getTime() -
            new Date(fieldB as string).getTime()
        : new Date(fieldB as string).getTime() -
            new Date(fieldA as string).getTime();
    } else {
      return sortOrder === "asc"
        ? (fieldA as string).localeCompare(fieldB as string)
        : (fieldB as string).localeCompare(fieldA as string);
    }
  });

  const filteredDrawings = sortedDrawings.filter((d) => {
    const lowerSearch = searchTerm.toLowerCase();
    const addressFields = [
      d.address ?? "",
      d.addressLineOne ?? "",
      d.addressLineTwo ?? "",
      d.addressLineThree ?? "",
      d.postCode ?? "",
    ].join(" ");

    return (
      d.customerName?.toLowerCase().includes(lowerSearch) ||
      addressFields.toLowerCase().includes(lowerSearch)
    );
  });

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading drawings...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );

  function getDrawingAddress(drawing: Drawing): string {
    if (drawing.address && drawing.address.trim() !== "") {
      return drawing.address + (drawing.postCode ? `, ${drawing.postCode}` : "");
    }
    const addressLines = [
      drawing.addressLineOne,
      drawing.addressLineTwo,
      drawing.addressLineThree,
    ].filter((line) => line && line.trim() !== "");
    let joined = addressLines.join(" ");
    if (drawing.postCode && drawing.postCode.trim() !== "") {
      joined += (joined ? ", " : "") + drawing.postCode;
    }
    return joined;
  }

  return (
    <>
      <Navbar />
      <Box maxW="1000px" mx="auto" p={6} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          All Drawings
        </Heading>

        {/* Search & sorting */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb={6}
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="sm"
        >
          <InputGroup maxW={{ base: "100%", md: "300px" }} mb={{ base: 4, md: 0 }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or address"
              bg="white"
              borderColor="gray.300"
              _focus={{ borderColor: "teal.400", boxShadow: "outline" }}
            />
          </InputGroup>

          <Flex align="center">
            <Text mr={2} fontWeight="medium">
              Sort By:
            </Text>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              maxW="150px"
              mr={2}
              bg="white"
              borderColor="gray.300"
              _focus={{ borderColor: "teal.400", boxShadow: "outline" }}
            >
              <option value="date">Date</option>
              <option value="customerName">Name</option>
              <option value="address">Address</option>
            </Select>
            <IconButton
              aria-label="Sort Order"
              icon={<ArrowUpDownIcon />}
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              bg="white"
              borderColor="gray.300"
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.200" }}
              borderWidth="1px"
            />
          </Flex>
        </Flex>

        {/* List */}
        {filteredDrawings.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.700">
            No drawings found.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {filteredDrawings.map((d) => (
              <LinkBox
                key={d._id}
                bg="white"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                boxShadow="sm"
                _hover={{
                  boxShadow: "md",
                  transform: "scale(1.02)",
                  transition: "0.2s",
                }}
              >
                <VStack spacing={3} align="stretch">
                  <Heading as="h3" size="md" color="gray.800">
                    {d.customerName}
                  </Heading>
                  <Text color="gray.600">{getDrawingAddress(d)}</Text>
                  <Text color="gray.600">
                    {new Date(d.date).toLocaleDateString()}
                  </Text>
                  <Button
                    as={RouterLink}
                    to={`/viewDrawing/${d._id}`}
                    colorScheme="teal"
                    size="sm"
                  >
                    View Drawing
                  </Button>
                </VStack>
              </LinkBox>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

export default ViewAllDrawings;
