import React, { useEffect, useState } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import Navbar from "./NavBar";
import { Job } from "../interfaces";
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
  VStack,
  useToast,
} from "@chakra-ui/react";
import axiosInstance from "../utils/axiosInstance";
import NewWindowsPDF from "./pdfs/NewWindowsPDF";
import RefurbPDF from "./pdfs/RefurbPDF";
import PVCPDF from "./pdfs/PVCPDF";

const pdfComponents: { [key: string]: React.FC<{ job: Job }> } = {
  "New Windows": NewWindowsPDF,
  Refurb: RefurbPDF,
  PVC: PVCPDF,
};

const ViewSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDownloadingMap, setIsDownloadingMap] = useState<{
    [option: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get<Job>(`/api/jobs/${id}`);
        setJob(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch job data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Handle Delete Job
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/api/jobs/${id}`);
      if (response.status === 200) {
        onOpen(); // Open the modal upon successful deletion
      } else {
        throw new Error("Failed to delete the job.");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Duplicate job handler
  const handleDuplicate = async () => {
    if (!job) return;
    try {
      // Clone the job data and update the date to the current date (YYYY-MM-DD)
      const duplicateJob = {
        ...job,
        date: new Date().toISOString().split("T")[0],
      };
      // Remove fields that should not be copied
      delete duplicateJob._id;
      delete duplicateJob.quoteId;

      // Specify the type parameter so response.data is recognized as Job
      const response = await axiosInstance.post<Job>("/api/jobs", duplicateJob);
      const createdJob = response.data;
      toast({
        title: "Job Duplicated",
        description: "The job has been duplicated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Navigate to the ViewSingle page for the newly duplicated job
      navigate(`/viewSingle/${createdJob._id}`);
    } catch (error: any) {
      console.error("Error duplicating job:", error);
      toast({
        title: "Error",
        description: "There was an error duplicating the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Drawing/ invoice helper
  const [isConverting, setIsConverting] = useState(false);

  const handleConvertToDrawing = async () => {
    if (!id) return;
    try {
      setIsConverting(true);
      const response = await axiosInstance.post<Job>(
        `/api/jobs/${id}/convert-to-drawing`
      );
      const drawing = response.data;
      toast({
        title: "Converted to Drawing",
        description: "This job has been converted to a drawing list.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/viewDrawing/${drawing._id}`);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description:
          err.response?.data?.error || "Failed to convert job to drawing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsConverting(false);
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text>Loading job data...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );

  if (!job)
    return (
      <Box textAlign="center" mt={10}>
        <Text>No job data available.</Text>
      </Box>
    );

  return (
    <>
      <Navbar />
      {/* Main Container with Green Background */}
      <Box maxW="1000px" mx="auto" p={6} bg="#B5C9BD" minH="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="gray.800">
          View Quote
        </Heading>

        {/* PDF Viewers */}
        {job.options.map((option, index) => {
          const PDFComponent = pdfComponents[option];
          if (PDFComponent) {
            return (
              <Box
                key={index}
                width="100%"
                height={{ base: "50vh", md: "70vh" }}
                mb={6}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                overflow="hidden"
              >
                <Heading as="h3" size="md" mb={4} textAlign="center">
                  {option} Quote
                </Heading>
                <PDFViewer width="100%" height="100%">
                  <PDFComponent job={job} />
                </PDFViewer>
              </Box>
            );
          }
          return null;
        })}

        {/* Action Buttons */}
        <VStack spacing={4} align="stretch">
          <HStack spacing={4} justify="center">
            {/* Edit Quote Button */}
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => navigate(`/editJob/${id}`)}
            >
              Edit Quote
            </Button>

            {/* Duplicate Quote Button */}
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={handleDuplicate}
            >
              Duplicate Quote
            </Button>

            {/* Download PDF Buttons */}
            {job.options.map((option) => {
              const PDFComponent = pdfComponents[option];
              if (PDFComponent) {
                const isDownloading = isDownloadingMap[option] || false;

                const handleDownload = async () => {
                  setIsDownloadingMap((prev) => ({ ...prev, [option]: true }));
                  try {
                    const blob = await pdf(<PDFComponent job={job} />).toBlob();
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `${job.customerName.replace(/ /g, "_")}_${
                      job.date
                    }_${option}_QUOTE.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode?.removeChild(link);
                    URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Error generating PDF:", error);
                  } finally {
                    setIsDownloadingMap((prev) => ({
                      ...prev,
                      [option]: false,
                    }));
                  }
                };

                return (
                  <Button
                    key={option}
                    colorScheme="teal"
                    variant="outline"
                    isLoading={isDownloading}
                    onClick={handleDownload}
                  >
                    {isDownloading
                      ? `Generating ${option} PDF...`
                      : `Download ${option} PDF`}
                  </Button>
                );
              }
              return null;
            })}

            {/* Delete Quote Button */}
            <Button colorScheme="red" variant="solid" onClick={handleDelete}>
              Delete Quote
            </Button>
          </HStack>
          <Button
            colorScheme="teal"
            variant="outline"
            isLoading={isConverting}
            onClick={handleConvertToDrawing}
          >
            {isConverting ? "Converting..." : "Convert to Drawing"}
          </Button>
        </VStack>
      </Box>

      {/* Deletion Confirmation Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/viewAll");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Deleted Successfully</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The job has been successfully deleted.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                onClose();
                navigate("/viewAll");
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

export default ViewSingle;
