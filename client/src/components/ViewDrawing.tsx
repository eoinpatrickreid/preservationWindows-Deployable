import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Navbar from "./NavBar";
import { Drawing } from "../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axiosInstance from "../utils/axiosInstance";
import DrawingPlaceholderPDF from "./pdfs/DrawingPlaceholderPDF";

const ViewDrawing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const response = await axiosInstance.get<Drawing>(`/api/drawings/${id}`);
        setDrawing(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch drawing data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrawing();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/api/drawings/${id}`);
      if (response.status === 200) {
        onOpen();
      } else {
        throw new Error("Failed to delete drawing.");
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description:
          err.response?.data?.error || "Failed to delete drawing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text>Loading drawing data...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );

  if (!drawing)
    return (
      <Box textAlign="center" mt={10}>
        <Text>No drawing data available.</Text>
      </Box>
    );

  return (
    <>
      <Navbar />
      <Box maxW="1000px" mx="auto" p={6} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          View Drawing
        </Heading>

        <Box
          width="100%"
          height={{ base: "50vh", md: "70vh" }}
          mb={6}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          overflow="hidden"
        >
          <Heading as="h3" size="md" mb={4} textAlign="center">
            Drawing PDF (Placeholder)
          </Heading>
          <PDFViewer width="100%" height="100%">
            <DrawingPlaceholderPDF drawing={drawing} />
          </PDFViewer>
        </Box>

        <VStack spacing={4} align="stretch">
          <HStack spacing={4} justify="center">
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => navigate(`/editDrawing/${id}`)}
            >
              Edit Drawing
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={handleDelete}
            >
              Delete Drawing
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/viewAllDrawings");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Drawing Deleted Successfully</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The drawing has been successfully deleted.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                onClose();
                navigate("/viewAllDrawings");
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewDrawing;
