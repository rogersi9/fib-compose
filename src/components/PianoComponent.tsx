import React, { useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import SoundfontProvider from "../utils/SoundfontProvider";
import { Select, Button } from "@chakra-ui/react";
import DimensionsProvider from "../utils/DimensionsProvider";

const audioContext = new window.AudioContext();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f5"),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: MidiNumbers.fromNote("c3"),
  lastNote: MidiNumbers.fromNote("f5"),
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const PianoComponent = ({ chords }) => {
  const [instrument, setInstrument] = useState("acoustic_grand_piano");
  const [instrumentObject, setInstrumentObject] = useState(null);

  // Function to play a chord
  const playChord = () => {
    if (instrumentObject && chords) {
      chords.forEach((midiNumber) => {
        instrumentObject.playNote(midiNumber);
        setTimeout(() => {
          instrumentObject.stop(midiNumber);
        }, 1000); // Note is held for 1 second
      });
    }
  };

  return (
    <div>
      <Select
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <option value="acoustic_grand_piano">Acoustic Grand Piano</option>
        <option value="electric_piano_1">Electric Piano</option>
        <option value="synth_drum">Synth Drum</option>
        <option value="church_organ">Church Organ</option>
        <option value="accordion">Accordion</option>
      </Select>
      <Button colorScheme="blue" onClick={playChord}>Play Chord</Button>
      <DimensionsProvider>
        {({ containerWidth }) => (
          <SoundfontProvider
            instrumentName={instrument}
            hostname={soundfontHostname}
            audioContext={audioContext}
            render={({ isLoading, playNote, stopNote, instrument }) => {
              // Update loaded instrument when it's available
              if (!isLoading && instrument !== instrumentObject) {
                setInstrumentObject(instrument);
              }
              return (
                <Piano
                  noteRange={noteRange}
                  width={containerWidth}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  keyboardShortcuts={keyboardShortcuts}
                />
              );
            }}
          />
        )}
      </DimensionsProvider>
    </div>
  );
};

export default PianoComponent;
