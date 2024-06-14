import {
  Box,
  Heading,
  Text,
  useColorMode,
  Card,
  CardBody,
} from "@chakra-ui/react";

import FibonacciTable from "../components/FibonacciTable";
import PianoComponent from "../components/PianoComponent";
import Header from "../components/Header";

const Fibonacci = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "purple.50" : "gray.800";

  return (
    <>
      <Header></Header>
      <Box bg={bgColor} minHeight="100vh" display="flex" flexDirection="column">
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            w="80%"
            textAlign="center"
            p={10}
            boxShadow="md"
            borderRadius="md"
          >
            <CardBody>
              <Heading as="h1" fontSize="6xl" mb={4} pr="30px">
                Fibonacci and Music Composition{" "}
              </Heading>
              <Text fontSize="2xl" mb={10}>
                Create customized scales using the Fibonacci Sequence
              </Text>
              <FibonacciTable></FibonacciTable>
              <div>
                <PianoComponent chords={[60, 64, 67]} />
              </div>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Fibonacci;
