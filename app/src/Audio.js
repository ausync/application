import * as Tone from 'tone'
import * as Api from './Api'
import React, { Component,useEffect,useState,useRef } from 'react';


function Audio() {
    window.Tone = Tone;
    const [isLoaded, setLoaded] = useState(false);
    const resource = useRef(null);

    useEffect(() => {
        resource.current = Api.get(Api.api("example1"));
        setLoaded(true);
    }, []);

    const handleClick = () => eval(resource.current);

    return (
        <div>
          <button disabled={!isLoaded} onClick={handleClick}>
            start layer music
          </button>
        </div>
    );
}

export default Audio;

