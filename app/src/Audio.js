//import * as Tone from 'tone'
import { Sampler,Synth } from "tone";
import React, { Component,useEffect,useState,useRef } from 'react';
import A1 from "./A1.mp3";

function Audio() {
    const [isLoaded, setLoaded] = useState(false);
    const sampler = useRef(null);
    const synth = useRef(null);

    useEffect(() => {

        sampler.current = new Sampler(
          { A1 },
          {
            onload: () => {
              setLoaded(true);
            }
          }
        ).toMaster();

        synth.current = new Synth().toDestination();
    }, []);

    const handleClick = () => sampler.current.triggerAttack("A1");
    const handleClick2 = () => synth.current.triggerAttackRelease("C4", "8n");

    //play a middle 'C' for the duration of an 8th note
    return (
        <div>
          <button disabled={!isLoaded} onClick={handleClick}>
            start
          </button>
          <button disabled={!isLoaded} onClick={handleClick2}>
            start 2
          </button>
        </div>
    );
}

export default Audio;

