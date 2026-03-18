import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Heading,
  Flex,
  RadioGroup,
  Radio,
  Select,
  Text,
  Textarea,
  Stack,
  Container,
  Divider,
  FormControl,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  email: string;
  nationality: string;
  country: string;
  city: string;
  educationLevel: string;
  qualification: string;
  provider: string;
  startTime: string;
  funding: string;
  message?: string;
}

// Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  countryCode: yup.string().required("Country code is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  nationality: yup.string().required("Nationality is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  educationLevel: yup.string().required("Education level is required"),
  qualification: yup.string().required("Qualification name is required"),
  provider: yup.string().required("Provider name is required"),
  startTime: yup.string().required("Start time is required"),
  funding: yup.string().required("Funding is required"),
  message: yup.string(),
});

const CourseEnquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      <Box alignItems={"center"} px={"450px"} py={8}>
        <Button onClick={() => navigate(-1)} mb={4}>
          ← Back
        </Button>
        <Heading mb={2}>Enquiry info</Heading>
        <Divider mb={3} borderColor={"gray.700"} />
      </Box>

      <Container maxW="container.md" bg={"gray.100"} p={8} borderRadius={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size="md" mb={4}>
            Your details
          </Heading>

          <Flex gap={4} mb={4}>
            <FormControl>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="First name"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.firstName && (
                <Text color="red.500" fontSize="sm">
                  {errors.firstName.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Last name"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.lastName && (
                <Text color="red.500" fontSize="sm">
                  {errors.lastName.message}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex gap={4} mb={4}>
            <FormControl>
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Country code"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.countryCode && (
                <Text color="red.500" fontSize="sm">
                  {errors.countryCode.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Phone number"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.phone && (
                <Text color="red.500" fontSize="sm">
                  {errors.phone.message}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex gap={4} mb={4}>
            <FormControl>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Email address"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Nationality"
                    {...field}
                    borderColor={"gray.700"}
                  >
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </Select>
                )}
              />
              {errors.nationality && (
                <Text color="red.500" fontSize="sm">
                  {errors.nationality.message}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex gap={4} mb={4}>
            <FormControl>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Country of residence"
                    {...field}
                    borderColor={"gray.700"}
                  >
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </Select>
                )}
              />
              {errors.country && (
                <Text color="red.500" fontSize="sm">
                  {errors.country.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="City of residence"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.city && (
                <Text color="red.500" fontSize="sm">
                  {errors.city.message}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Heading size="md" mb={2}>
            Educational background
          </Heading>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            What is the highest level of study gained?
          </Text>

          <FormControl mb={2}>
            <Controller
              name="educationLevel"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="row">
                    <Radio value="Diploma">Diploma</Radio>
                    <Radio value="Bachelors">Bachelors</Radio>
                    <Radio value="Masters">Masters</Radio>
                    <Radio value="Research">Research</Radio>
                    <Radio value="Other">Other</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            {errors.educationLevel && (
              <Text color="red.500" fontSize="sm">
                {errors.educationLevel.message}
              </Text>
            )}
          </FormControl>

          <Flex gap={4} mb={4}>
            <FormControl>
              <Text fontSize="sm" fontWeight="bold">
                Name of Qualification
              </Text>
              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Name of qualification"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.qualification && (
                <Text color="red.500" fontSize="sm">
                  {errors.qualification.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Text fontSize="sm" fontWeight="bold">
                Name of Provider
              </Text>
              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Name of provider"
                    {...field}
                    borderColor={"gray.700"}
                  />
                )}
              />
              {errors.provider && (
                <Text color="red.500" fontSize="sm">
                  {errors.provider.message}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Heading size="md" mb={2}>
            More information
          </Heading>

          <Text fontSize={"sm"} fontWeight={"bold"}>
            When are you looking to start studying?
          </Text>
          <FormControl mb={4}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="row">
                    <Radio value="Within next 6 months">
                      Within next 6 months
                    </Radio>
                    <Radio value="6–12 months">6–12 months</Radio>
                    <Radio value="12 months+">12 months+</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            {errors.startTime && (
              <Text color="red.500" fontSize="sm">
                {errors.startTime.message}
              </Text>
            )}
          </FormControl>

          <Text fontSize={"sm"} fontWeight={"bold"}>
            How would you fund your studies?
          </Text>
          <FormControl mb={4}>
            <Controller
              name="funding"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="row">
                    <Radio value="Self-funded">Self-funded</Radio>
                    <Radio value="Scholarship">Scholarship</Radio>
                    <Radio value="Grant or loan">Grant or loan</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            {errors.funding && (
              <Text color="red.500" fontSize="sm">
                {errors.funding.message}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Comments
            </Text>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder={`Message / Question to ${course?.Column2}`}
                  mb={4}
                  borderColor={"gray.700"}
                  {...field}
                />
              )}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Send Email
          </Button>
        </form>
      </Container>

      <Footer />
    </Box>
  );
};

export default CourseEnquiry;
