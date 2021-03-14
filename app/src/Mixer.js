import * as Tone from 'tone'
import * as Api from './Api'
import React, { Component,useEffect,useState,useRef } from 'react';


function Mixer() {
    const [isLoaded, setLoaded] = useState(false);
    const sampler = useRef(null);

    useEffect(() => {

        sampler.current = new Tone.Sampler(
          {
            urls: {A1: "A1.mp3"},
            baseUrl: "/",
            onload: () => {
              setLoaded(true);
            }
          }
        ).toDestination();
    }, []);

    const handleClick = () => sampler.current.triggerAttack("A1");

    return (
        <div>
          <button disabled={!isLoaded} onClick={handleClick}>
            Play sample 1
          </button>
        </div>
    );
}

export default Mixer;

