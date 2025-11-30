// src/components/EditDrawing.tsx

import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { Drawing, Room } from "../interfaces";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
  Spinner,
  Text,
  useToast,
  Select,
  SimpleGrid,
  HStack,
  Center,
} from "@chakra-ui/react";
import MultiOptionToggle from "./MultiOptionToggle";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import SpellcheckInput from "./SpellCheckInput";
import SpellcheckTextarea from "./SpellCheckTextarea";

const EditDrawing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [hasSaved, setHasSaved] = React.useState(false);

  // React Hook Form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<Drawing>({
    defaultValues: {
      completed: false,
      date: "",
      customerName: "",
      address: "",
      addressLineOne: "",
      addressLineTwo: "",
      addressLineThree: "",
      email: "",
      phone: "",
      postCode: "",
      rooms: [],
      options: [],
      planningPermission: "",
      siteNotes: "",
    },
  });

  // Dynamic rooms
  const {
    fields: rooms,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: "rooms",
  });

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const response = await axiosInstance.get<Drawing>(`/api/drawings/${id}`);
        const drawingData = response.data;

        // Populate form with fetched data
        reset(drawingData);
        replace(drawingData.rooms);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch drawing details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchDrawing();
  }, [id, reset, replace, toast]);

  // Warn if navigating away with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty || isSubmitting || hasSaved) return;
      event.preventDefault();
      event.returnValue = ""; // required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSubmitting, hasSaved]);

  const onSubmit = async (data: Drawing) => {
    try {
      await axiosInstance.put(`/api/drawings/${id}`, data);

      setHasSaved(true);

      toast({
        title: "Drawing Updated",
        description: "The drawing has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/viewDrawing/${id}`);
    } catch (err) {
      console.error("Error updating drawing:", err);
      toast({
        title: "Error",
        description: "Failed to update drawing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Options for 'options' field
  const availableOptions = ["New Windows", "Refurb", "PVC"];

  // Planning Permission options
  const planningPermissionOptions = [
    { label: "No", value: "No Planning" },
    {
      label: "Cons",
      value: "Planning Permission: Conservation Area",
    },
    {
      label: "A",
      value: "Planning Permission: Conservation Area, Category A",
    },
    {
      label: "B",
      value: "Planning Permission: Conservation Area, Category B",
    },
    {
      label: "C",
      value: "Planning Permission: Conservation Area, Category C",
    },
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

  // Extract boolean keys from Room
  type RoomBooleanKeys = {
    [K in keyof Room]-?: NonNullable<Room[K]> extends boolean ? K : never;
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
    { name: "outsidePatch", label: "Outside Facing Patch" },
    { name: "shutters", label: "Shutter Repairs" },
    { name: "sashRestrictor", label: "Sash Restrictor" },
    { name: "customItem", label: "Custom Item" },
  ];

  // Add a new room
  const addRoom = () => {
    append({
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
      priceChange2: "0",
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
  };

  // Loading state while rooms are being set
  if (rooms.length === 0 && !isSubmitting) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading drawing details...</Text>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Center>
        <Heading color="white" border="md" borderRadius="md" p={4}>
          Edit Drawing
        </Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          {/* Drawing details */}
          <Box
            bg="white"
            borderRadius="md"
            p={3}
            boxShadow="md"
            maxW="1200px"
            mx="auto"
          >
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={2}
            >
              {/* Left column */}
              <Box>
                <Stack spacing={1}>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <SpellcheckInput
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
                    <SpellcheckInput
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
                    <SpellcheckInput
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
                    <SpellcheckInput
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

              {/* Middle column */}
              <Box>
                <Stack spacing={1}>
                  <FormControl isRequired>
                    <FormLabel>Customer Name</FormLabel>
                    <SpellcheckInput
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
                    <SpellcheckInput
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
                    <SpellcheckInput
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
                    <SpellcheckTextarea
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

          {/* Room details */}
          {rooms.map((room, index) => (
            <Box
              key={room.id}
              bg="white"
              borderRadius="md"
              p={2}
              boxShadow="md"
              maxW="1400px"
              mx="auto"
              mt={2}
            >
              <HStack p={2}>
                <Heading as="h4" size="sm">
                  Room {index + 1}
                </Heading>
                <Button size="sm" onClick={() => remove(index)}>
                  Delete Room
                </Button>
              </HStack>
              <Grid
                templateRows="auto auto"
                templateColumns="3fr 2fr 1fr"
                gap={2}
              >
                {/* Top row */}
                <GridItem colSpan={3}>
                  <Box bg="gray.100" p={4} borderRadius="md">
                    <HStack>
                      <FormControl isRequired>
                        <FormLabel>Ref</FormLabel>
                        <SpellcheckInput
                          type="text"
                          {...register(`rooms.${index}.ref`, {
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
                        <SpellcheckInput
                          type="text"
                          {...register(`rooms.${index}.roomName`, {
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
                          name={`rooms.${index}.width`}
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
                          name={`rooms.${index}.height`}
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
                          {...register(`rooms.${index}.formation`, {
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
                          name={`rooms.${index}.count`}
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
                          {...register(`rooms.${index}.glassType`)}
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
                          {...register(`rooms.${index}.glassTypeTopBottom`)}
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
                          name={`rooms.${index}.cill`}
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
                          name={`rooms.${index}.sash`}
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
                          name={`rooms.${index}.panesNumber`}
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
                          name={`rooms.${index}.stainRepairs`}
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
                          name={`rooms.${index}.encapsulation`}
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
                        <FormLabel>Price Change (%)</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.priceChange2`}
                          defaultValue="0"
                          rules={{ required: true }}
                          render={({ field, fieldState }) => (
                            <SpellcheckInput
                              type="text"
                              {...field}
                              bg="white"
                              _focus={{ bg: "white", boxShadow: "outline" }}
                              boxShadow="sm"
                              borderRadius="md"
                              borderColor="gray.300"
                              size="sm"
                              isInvalid={!!fieldState.error}
                            />
                          )}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>+/-</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.positiveNegative`}
                          render={({ field }) => (
                            <MultiOptionToggle
                              options={[
                                { label: "+", value: "positive" },
                                { label: "-", value: "negative" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Center Mullion</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.centerMullion`}
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
                    </HStack>
                  </Box>
                </GridItem>

                {/* Options column */}
                <GridItem>
                  <Box bg="gray.200" p={4} borderRadius="md">
                    <Heading as="h5" size="sm" mb={2}>
                      Options
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={1}>
                      {roomOptionFields.map((option) => (
                        <Controller<Drawing, RoomOptionPath>
                          key={option.name}
                          control={control}
                          name={
                            `rooms.${index}.${option.name}` as RoomOptionPath
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

                {/* Window notes column */}
                <GridItem>
                  <Box bg="gray.200" p={4} borderRadius="md">
                    <FormControl>
                      <FormLabel>Window Notes</FormLabel>
                      <SpellcheckTextarea
                        {...register(`rooms.${index}.windowNotes`)}
                        placeholder="Window notes"
                        size="md"
                        height="105px"
                      />
                    </FormControl>
                  </Box>
                </GridItem>

                {/* Custom item column */}
                <Stack spacing={1} p={0}>
                  <GridItem>
                    <Box bg="gray.200" p={2} borderRadius="md">
                      <FormControl>
                        <FormLabel>Custom Item Text</FormLabel>
                        <SpellcheckInput
                          type="text"
                          {...register(`rooms.${index}.customItemText`)}
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
                  <GridItem>
                    <Box bg="gray.200" p={2} borderRadius="md">
                      <FormControl>
                        <FormLabel>Custom Item</FormLabel>
                        <Controller
                          control={control}
                          name={`rooms.${index}.customItem2`}
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
                </Stack>
              </Grid>
            </Box>
          ))}
        </VStack>

        <VStack spacing={1} align="center">
          <Button mt={4} onClick={addRoom} colorScheme="teal" variant="outline">
            Add Room
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            mt={6}
            isLoading={isSubmitting}
          >
            Update Drawing
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default EditDrawing;
