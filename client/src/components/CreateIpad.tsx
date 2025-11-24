// src/components/CreateIpad.tsx

import axiosInstance from "../utils/axiosInstance";
import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { Job, Room } from "../interfaces";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Grid,
  GridItem,
  Heading,
  VStack,
  useToast,
  SimpleGrid,
  Select,
  Center,
  HStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import MultiOptionToggle from "./MultiOptionToggle";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const getDefaultRoom = (): Room => ({
  ref: "",
  roomName: "",
  width: 0,
  height: 0,
  count: 0,
  putty: false,
  mastic: false,
  paint: false,
  tenon: false,
  eC: false,
  encapsulation: 0,
  bottomRail: false,
  dormer: false,
  easyClean: false,
  pullyWheel: false,
  panesNumber: 0,
  stainRepairs: 0,
  cill: "",
  sash: "",
  notes: "",
  formation: "",
  customFormation: "",
  glassType: "Clear",
  glassTypeTopBottom: "Bottom",
  casement: false,
  priceChange2: "",
  priceChange: 0,
  priceChangeNotes: "",
  positiveNegative: "positive",
  masticPatch: false,
  outsidePatch: false,
  concealedVent: false,
  trickleVent: false,
  handles: false,
  shutters: false,
  customItem: false,
  sashRestrictor: false,
  customItemText: "",
  customItem2: 0,
  quoteNotes: "",
  windowNotes: "",
  centerMullion: 0,
});

const CreateIpad: React.FC = () => {
  const getCurrentDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzoffset).toISOString().split("T")[0];
  };

  const toast = useToast();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: {  },
  } = useForm<Job>({
    defaultValues: {
      completed: false,
      date: getCurrentDate(),
      customerName: "",
      address: "",
      email: "",
      phone: "",
      postCode: "",
      siteNotes: "",
      addressLineOne: "",
      addressLineTwo: "",
      addressLineThree: "",
      rooms: [getDefaultRoom()],
      options: [],
      planningPermission: "",
    },
  });

  const {
    fields: rooms,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "rooms",
  });

  // 0 = first room
  const [activePageIdx, setActivePageIdx] = useState(0);

  // Ensure activePageIdx is valid after add/remove
  useEffect(() => {
    if (activePageIdx > rooms.length - 1) {
      setActivePageIdx(Math.max(rooms.length - 1, 0));
    }
  }, [rooms.length, activePageIdx]);

  const availableOptions = ["New Windows", "Refurb", "PVC"];
  const planningPermissionOptions = [
    { label: "No", value: "No Planning" },
    { label: "Cons", value: "Planning Permission: Conservation Area" },
    { label: "A", value: "Planning Permission: Conservation Area, Category A" },
    { label: "B", value: "Planning Permission: Conservation Area, Category B" },
    { label: "C", value: "Planning Permission: Conservation Area, Category C" },
  ];
  const formationOptions = [
    { label: "1/1", value: "1/1" },
    { label: "1/2", value: "1/2" },
    { label: "2/1", value: "2/1" },
    { label: "2/2", value: "2/2" },
    { label: "2/4", value: "2/4" },
    { label: "3/1", value: "3/1" },
    { label: "3/1_portrait", value: "3/1_side" },
    { label: "3/2", value: "3/2" },
    { label: "3/3", value: "3/3" },
    { label: "4/1", value: "4/1" },
    { label: "4/2", value: "4/2" },
    { label: "4/4", value: "4/4" },
    { label: "6/1", value: "6/1" },
    { label: "6/1_portrait", value: "6/1_side" },
    { label: "6/2", value: "6/2" },
    { label: "6/2_portrait", value: "6/2_side" },
    { label: "6/4_portrait", value: "6/4_side" },
    { label: "6/6", value: "6/6" },
    { label: "6/6_portrait", value: "6/6_side" },
    { label: "7/1", value: "7/1" },
    { label: "placeholder", value: "placeholder" },
  ];
  const glassTypeOptions = [
    { label: "Clear", value: "Clear" },
    { label: "Toughened", value: "Toughened" },
    { label: "Obscured", value: "Obscured" },
    { label: "Laminated", value: "Laminated" },
    { label: "Fineo", value: "Fineo" },
    { label: "Toughened and Obscured", value: "ToughenedObscured" },
  ];
  const glassTypeTopBottom = [
    { label: "Top", value: "Top" },
    { label: "Bottom", value: "Bottom" },
    { label: "Top and Bottom", value: "Both" },
  ];

  type RoomBooleanKeys = {
    [K in keyof Room]: Room[K] extends boolean ? K : never;
  }[keyof Room];
  type RoomOptionPath = `rooms.${number}.${RoomBooleanKeys}`;
  const roomOptionFields: { name: RoomBooleanKeys; label: string }[] = [
    { name: "easyClean", label: "Easy Clean" },
    { name: "dormer", label: "Dormer" },
    { name: "mastic", label: "Mastic" },
    { name: "masticPatch", label: "Mastic Patch" },
    { name: "putty", label: "Putty" },
    { name: "paint", label: "Paint" },
    { name: "tenon", label: "Tenon" },
    { name: "bottomRail", label: "Bottom Rail" },
    { name: "pullyWheel", label: "Pulley Style" },
    { name: "casement", label: "Casement" },
    { name: "concealedVent", label: "Concealed Vent" },
    { name: "trickleVent", label: "Trickle Vent" },
    { name: "handles", label: "Handles" },
    { name: "outsidePatch", label: "Outside Patch" },
    { name: "shutters", label: "Shutter Repairs" },
    { name: "customItem", label: "Custom Item" },
  ];

  const onSubmit = async (data: Job) => {
    try {
      const response = await axiosInstance.post("/api/jobs", data);
      console.log("Job created:", response.data);
      const createdJob: Job = response.data as Job;
      toast({
        title: "Job Created",
        description: "The job has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/viewSingle/${createdJob._id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Validate that all rooms have count > 0
  const onValidSubmit = (data: Job) => {
    const invalidRoom = data.rooms.find((room) => room.count === 0);
    if (invalidRoom) {
      toast({
        title: "Error",
        description: "One or more rooms have a count of 0. Please enter a valid count.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <>
      <Navbar />
      <Center>
        <Heading color="white" border="md" borderRadius="md" p={4}>
          Create Job
        </Heading>
      </Center>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <VStack spacing={4} align="stretch">
          {/* --- JOB DETAILS BOX --- */}
          <Box
            bg="white"
            borderRadius="md"
            p={3}
            boxShadow="md"
            maxW="1200px"
            mx="auto"
            mt={2}
            position="relative"
          >
            <Heading size="md" mb={4}>Job Details</Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={2}>
              {/* Left column */}
              <Box>
                <Stack spacing={1}>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      {...register("date", { required: true })}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      {...register("addressLineOne")}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                      placeholder="Line 1"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel></FormLabel>
                    <Input
                      type="text"
                      {...register("addressLineTwo")}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                      placeholder="Line 2"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel></FormLabel>
                    <Input
                      type="text"
                      {...register("addressLineThree")}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                      placeholder="Line 3"
                    />
                  </FormControl>
                </Stack>
              </Box>
              {/* Center column */}
              <Box>
                <Stack spacing={1}>
                  <FormControl isRequired>
                    <FormLabel>Customer Name</FormLabel>
                    <Input
                      type="text"
                      {...register("customerName", { required: true })}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      {...register("email")}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="tel"
                      {...register("phone")}
                      bg="white"
                      _focus={{ bg: "white", boxShadow: "outline" }}
                      boxShadow="sm"
                      borderRadius="md"
                      borderColor="gray.300"
                      size="sm"
                    />
                  </FormControl>
                </Stack>
              </Box>
              {/* Right column */}
              <Box>
                <Stack spacing={1}>
                  <FormControl>
                    <FormLabel>Options</FormLabel>
                    <Controller
                      control={control}
                      name="options"
                      render={({ field }) => (
                        <Stack direction="row" spacing={2}>
                          {availableOptions.map((option) => (
                            <Button
                              key={option}
                              colorScheme="teal"
                              variant={
                                field.value.includes(option)
                                  ? "solid"
                                  : "outline"
                              }
                              onClick={() => {
                                let newOptions = [...field.value];
                                if (newOptions.includes(option)) {
                                  newOptions = newOptions.filter(
                                    (opt) => opt !== option
                                  );
                                } else {
                                  newOptions.push(option);
                                }
                                field.onChange(newOptions);
                              }}
                              size="sm"
                              borderRadius="md"
                              _focus={{ boxShadow: "outline" }}
                            >
                              {option}
                            </Button>
                          ))}
                        </Stack>
                      )}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Planning Permission</FormLabel>
                    <Controller
                      control={control}
                      name="planningPermission"
                      render={({ field }) => (
                        <MultiOptionToggle
                          options={planningPermissionOptions}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Site Notes</FormLabel>
                    <Textarea
                      {...register("siteNotes")}
                      placeholder="Site notes"
                      size="md"
                      height="50px"
                    />
                  </FormControl>
                </Stack>
              </Box>
            </Grid>
          </Box>

          <Divider my={2} />

          {/* --- ROOM CAROUSEL --- */}
          <Box
            bg="white"
            borderRadius="md"
            p={2}
            boxShadow="md"
            maxW="1400px"
            mx="auto"
            mt={2}
            position="relative"
          >
            {/* Carousel Nav */}
            <HStack justify="space-between" p={2}>
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon />}
                onClick={() => setActivePageIdx((i) => Math.max(i - 1, 0))}
                isDisabled={activePageIdx === 0}
              />
              <Heading as="h4" size="sm">
                {rooms.length === 0
                  ? "No Rooms"
                  : `Room ${activePageIdx + 1} of ${rooms.length}`}
              </Heading>
              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon />}
                onClick={() =>
                  setActivePageIdx((i) => Math.min(i + 1, rooms.length - 1))
                }
                isDisabled={activePageIdx === rooms.length - 1}
              />
            </HStack>

            {/* --- Active Room Page --- */}
            {rooms[activePageIdx] && (
              <Box key={rooms[activePageIdx].id}>
                <Grid
                  templateRows="auto auto"
                  templateColumns="3fr 2fr 1fr"
                  gap={2}
                >
                  {/* Top row of job form */}
                  <GridItem colSpan={3}>
                    <Box bg="gray.100" p={4} borderRadius="md">
                      <HStack>
                        <FormControl isRequired>
                          <FormLabel>Ref</FormLabel>
                          <Input
                            type="text"
                            {...register(`rooms.${activePageIdx}.ref`, {
                              required: true,
                            })}
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                            size="sm"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Location</FormLabel>
                          <Input
                            type="text"
                            {...register(`rooms.${activePageIdx}.roomName`, {
                              required: true,
                            })}
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                            size="sm"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Width</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.width`}
                            render={({ field }) => (
                              <NumberInput
                                min={0}
                                size="sm"
                                value={field.value}
                                onChange={(valueString) =>
                                  field.onChange(Number(valueString))
                                }
                              >
                                <NumberInputField
                                  bg="white"
                                  _focus={{ bg: "white", boxShadow: "outline" }}
                                  boxShadow="sm"
                                  borderRadius="md"
                                  borderColor="gray.300"
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Height</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.height`}
                            render={({ field }) => (
                              <NumberInput
                                min={0}
                                size="sm"
                                value={field.value}
                                onChange={(valueString) =>
                                  field.onChange(Number(valueString))
                                }
                              >
                                <NumberInputField
                                  bg="white"
                                  _focus={{ bg: "white", boxShadow: "outline" }}
                                  boxShadow="sm"
                                  borderRadius="md"
                                  borderColor="gray.300"
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Formation</FormLabel>
                          <Select
                            {...register(`rooms.${activePageIdx}.formation`, {
                              required: true,
                            })}
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                            size="sm"
                          >
                            <option value="">Select Formation</option>
                            {formationOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Count</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.count`}
                            render={({ field }) => (
                              <NumberInput
                                min={1}
                                size="sm"
                                value={field.value}
                                onChange={(valueString) =>
                                  field.onChange(Number(valueString))
                                }
                              >
                                <NumberInputField
                                  bg="white"
                                  _focus={{ bg: "white", boxShadow: "outline" }}
                                  boxShadow="sm"
                                  borderRadius="md"
                                  borderColor="gray.300"
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Glass Type</FormLabel>
                          <Select
                            {...register(`rooms.${activePageIdx}.glassType`)}
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                            size="sm"
                          >
                            {glassTypeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Glass Type T/B</FormLabel>
                          <Select
                            {...register(
                              `rooms.${activePageIdx}.glassTypeTopBottom`
                            )}
                            bg="white"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            boxShadow="sm"
                            borderRadius="md"
                            borderColor="gray.300"
                            size="sm"
                          >
                            {glassTypeTopBottom.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </HStack>
                      <HStack p={2}>
                        <FormControl>
                          <FormLabel>Cill</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.cill`}
                            render={({ field }) => (
                              <MultiOptionToggle
                                options={[
                                  { label: "None", value: "" },
                                  { label: "Full", value: "Full" },
                                  { label: "Half", value: "Half" },
                                  { label: "Repairs", value: "Repairs" },
                                ]}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Sash</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.sash`}
                            render={({ field }) => (
                              <MultiOptionToggle
                                options={[
                                  { label: "None", value: "" },
                                  { label: "Top", value: "Top" },
                                  { label: "Bottom", value: "Bottom" },
                                  { label: "Both", value: "Both" },
                                ]}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>New Panes</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.panesNumber`}
                            render={({ field }) => (
                              <NumberInput
                                min={0}
                                size="sm"
                                value={field.value}
                                onChange={(valueString) =>
                                  field.onChange(Number(valueString))
                                }
                              >
                                <NumberInputField
                                  bg="white"
                                  _focus={{ bg: "white", boxShadow: "outline" }}
                                  boxShadow="sm"
                                  borderRadius="md"
                                  borderColor="gray.300"
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Stain Repairs</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.stainRepairs`}
                            render={({ field }) => (
                              <NumberInput
                                min={0}
                                size="sm"
                                value={field.value}
                                onChange={(valueString) =>
                                  field.onChange(Number(valueString))
                                }
                              >
                                <NumberInputField
                                  bg="white"
                                  _focus={{ bg: "white", boxShadow: "outline" }}
                                  boxShadow="sm"
                                  borderRadius="md"
                                  borderColor="gray.300"
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Encapsulation</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.encapsulation`}
                            render={({ field }) => (
                              <NumberInput
                                min={0}
                                size="sm"
                                value={field.value}
                                onChange={(valueString) =>
                                  field.onChange(Number(valueString))
                                }
                              >
                                <NumberInputField
                                  bg="white"
                                  _focus={{ bg: "white", boxShadow: "outline" }}
                                  boxShadow="sm"
                                  borderRadius="md"
                                  borderColor="gray.300"
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Price Change (%)</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.priceChange2`}
                            render={() => (
                              <Input
                                type="text"
                                {...register(
                                  `rooms.${activePageIdx}.priceChange2`,
                                  {
                                    required: true,
                                  }
                                )}
                                bg="white"
                                _focus={{ bg: "white", boxShadow: "outline" }}
                                boxShadow="sm"
                                borderRadius="md"
                                borderColor="gray.300"
                                size="sm"
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Positive/Negative</FormLabel>
                          <Controller
                            control={control}
                            name={`rooms.${activePageIdx}.positiveNegative`}
                            render={({ field }) => (
                              <MultiOptionToggle
                                options={[
                                  { label: "Positive", value: "positive" },
                                  { label: "Negative", value: "negative" },
                                ]}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </FormControl>
                      </HStack>
                    </Box>
                  </GridItem>

                  <GridItem>
                    <Box bg="gray.200" p={4} borderRadius="md">
                      <Heading as="h5" size="sm" mb={2}>
                        Options
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={1}>
                        {roomOptionFields.map((option) => (
                          <Controller<Job, RoomOptionPath>
                            key={option.name}
                            control={control}
                            name={
                              `rooms.${activePageIdx}.${option.name}` as RoomOptionPath
                            }
                            render={({ field }) => {
                              const { value, ...rest } = field;
                              return (
                                <Checkbox
                                  {...rest}
                                  isChecked={value as boolean}
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  size="md"
                                  colorScheme="teal"
                                >
                                  {option.label}
                                </Checkbox>
                              );
                            }}
                          />
                        ))}
                      </SimpleGrid>
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box bg="gray.200" p={4} borderRadius="md">
                      <FormControl>
                        <FormLabel>Window Notes</FormLabel>
                        <Textarea
                          {...register(`rooms.${activePageIdx}.windowNotes`)}
                          placeholder="Window notes"
                          size="md"
                          height="105px"
                        />
                      </FormControl>
                    </Box>
                  </GridItem>
                  <Stack spacing={0.5} p={1} bg="gray.200" borderRadius="md">
                  <GridItem>
                    <Box bg="gray.200" p={1} borderRadius="md">
                      <FormControl>
                        <FormLabel>Custom Item</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${activePageIdx}.customItem2`}
                          render={({ field }) => (
                            <NumberInput
                              min={0}
                              size="sm"
                              value={field.value}
                              onChange={(valueString) =>
                                field.onChange(Number(valueString))
                              }
                            >
                              <NumberInputField
                                bg="white"
                                _focus={{ bg: "white", boxShadow: "outline" }}
                                boxShadow="sm"
                                borderRadius="md"
                                borderColor="gray.300"
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          )}
                        />
                      </FormControl>
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box bg="gray.200" p={1} borderRadius="md">
                      <FormControl>
                        <FormLabel>Custom Item Text</FormLabel>
                        <Input
                          type="text"
                          {...register(
                            `rooms.${activePageIdx}.customItemText`
                          )}
                          bg="white"
                          _focus={{ bg: "white", boxShadow: "outline" }}
                          boxShadow="sm"
                          borderRadius="md"
                          borderColor="gray.300"
                          size="sm"
                        />
                      </FormControl>
                    </Box>
                  </GridItem>
                  </Stack>
                </Grid>
              </Box>
            )}

            {/* ---- Quick nav buttons ---- */}
            <HStack justify="center" spacing={2} mt={4}>
              {rooms.map((room, idx) => (
                <Button
                  key={room.id}
                  size={activePageIdx === idx ? "md" : "sm"}
                  variant={activePageIdx === idx ? "solid" : "outline"}
                  colorScheme={activePageIdx === idx ? "teal" : "gray"}
                  onClick={() => setActivePageIdx(idx)}
                >
                  {idx + 1}
                </Button>
              ))}
            </HStack>

            {/* Only show Delete Room when more than one room */}
            {rooms.length > 1 && (
              <HStack justify="flex-end" mt={2}>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    const deletedIdx = activePageIdx;
                    remove(deletedIdx);
                    setTimeout(() => {
                      setActivePageIdx(() => {
                        if (rooms.length === 1) return 0;
                        if (deletedIdx >= rooms.length - 1) return rooms.length - 2;
                        return deletedIdx;
                      });
                    }, 0);
                  }}
                  isDisabled={rooms.length === 1}
                >
                  Delete Room
                </Button>
              </HStack>
            )}
          </Box>

          {/* Add Room Button and Submit */}
          <VStack spacing={1} align="center">
            <Button
              mt={4}
              onClick={() => {
                append(getDefaultRoom());
                setActivePageIdx(rooms.length); // Go to new room
              }}
              colorScheme="teal"
              variant="outline"
            >
              Add Room
            </Button>
            <Button type="submit" colorScheme="teal" size="lg" mt={6}>
              Create Job
            </Button>
          </VStack>
        </VStack>
      </form>
    </>
  );
};

export default CreateIpad;
