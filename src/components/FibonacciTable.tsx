import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  Center,
  Box,
  Heading,
  Stack,
} from "@chakra-ui/react";

const DynamicTable = () => {
  const [header, setHeader] = useState("");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(5);
  const [cycles, setCycles] = useState(1);

  // Precompute the first 100 Fibonacci numbers
  const fibonacciArray = (() => {
    const fibs = [0, 1];
    for (let i = 2; i < 100; i++) {
      fibs[i] = fibs[i - 1] + fibs[i - 2];
    }
    return fibs;
  })();

  const handleHeaderChange = (e: any) => {
    setHeader(e.target.value);
  };

  const handleCyclesChange = (e: any) => {
    setCycles(parseInt(e.target.value) || 0);
  };

  // Function to generate a color based on the Fibonacci status
  const getFibonacciColor = (value: number) => {
    return fibonacciArray.includes(value)
      ? `hsl(${(value * 137) % 360}, 70%, 85%)`
      : "transparent";
  };

  const generateRows = () => {
    let allValues = [];
    for (let cycle = 0; cycle < cycles; cycle++) {
      for (let i = start; i <= end; i++) {
        allValues.push(i);
      }
    }
    const rowLength = header.split(",").length;
    const rows = [];
    while (allValues.length > 0) {
      rows.push(allValues.splice(0, rowLength));
    }
    return rows;
  };

  // Function to collect header titles for each Fibonacci number
  const fibonacciHeaders = () => {
    const headers = header.split(",").map((h) => h.trim());
    const rows = generateRows();
    let fibNotes: FibonacciNumber[] = [];
    rows.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (fibonacciArray.includes(value)) {
          const note = headers[colIndex];
          const fibItem = fibNotes.find((f) => f.number === value);
          if (fibItem) {
            fibItem.notes.push(note);
          } else {
            fibNotes.push({ number: value, notes: [note] });
          }
        }
      });
    });
    console.log(fibNotes);
    return fibNotes;
  };

  return (
    <div>
      <Input
        placeholder="Enter table headers separated by comma"
        value={header}
        onChange={handleHeaderChange}
      />
      <br />
      <br />
      <div>
        Start:
        <Input
          type="number"
          value={start}
          onChange={(e) => setStart(parseInt(e.target.value))}
        />
        End:
        <Input
          type="number"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value))}
        />
      </div>
      <br />
      <div>
        Cycles:
        <Input type="number" value={cycles} onChange={handleCyclesChange} />
      </div>
      <br />
      {header.length > 0 && (
        <Stack>
          <Table>
            <Thead>
              <Tr>
                {header.split(",").map((item, index) => (
                  <Th key={index} textTransform="none">
                    {item.trim()}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {generateRows().map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {row.map((value, cellIndex) => (
                    <Td key={cellIndex} bg={getFibonacciColor(value)}>
                      {value}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Heading as="h1" fontSize="2xl" mb={4} pr="30px" mt="16px">
            Chords Generated
          </Heading>
          <Flex justify="center">
            {fibonacciHeaders().map((fib, index) => (
              <div key={index}>
                <Center
                  width="100px"
                  height="50px"
                  bg={getFibonacciColor(fib.number)}
                >
                  {fib.number}
                </Center>
                {fib.notes.map((note, index) => (
                  <Box key={index} p="5px" border="0.5px solid gray">
                    {note}
                  </Box>
                ))}
              </div>
            ))}
          </Flex>
        </Stack>
      )}

      <br />
    </div>
  );
};

export default DynamicTable;
