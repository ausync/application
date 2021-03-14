import * as Tone from 'tone'
import * as Api from './Api'
import React, { Component,useEffect,useState,useRef } from 'react';


function Audio() {
    window.Tone = Tone;
    const [isLoaded, setLoaded] = useState(false);
    const sampler = useRef(null);
    const resource = useRef(null);

    useEffect(() => {

        sampler.current = new Tone.Sampler(
          {
            urls: {A1: "A1.mp3"},
            baseUrl: "http://localhost:3000/",
            onload: () => {
              setLoaded(true);
            }
          }
        ).toMaster();

        resource.current = Api.get(Api.api("example1"));
        setLoaded(true);
    }, []);

    const handleClick = () => sampler.current.triggerAttack("A1");
    const handleClick2 = () => eval(resource.current);

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

