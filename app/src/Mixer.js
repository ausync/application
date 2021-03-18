import * as Tone from 'tone'
import * as Api from './Api'
import React, { Component,useEffect,useState,useRef } from 'react';


export default function Mixer() {
    window.Tone = Tone;
    const [isLoaded, setLoaded] = useState(false);
    const sampler = useRef(null);
    const form = useRef(null);
    const [errorScript, setErrorScript] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        let object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        let json = JSON.stringify(object);

        // TODO: create content on ipfs and perform transaction
    }

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

    const playAudio = () => {
        try {
            setErrorScript(null);
            eval(form.current.script.value);
        } catch (err) {
            setErrorScript(err.message);
        }
    };

    return (
        <div className="p-3">
            <h4 className="text-center">Submit an NFT audio on the blockchain</h4>
            <form ref={form} onSubmit={handleSubmit} className="needs-validation">
                <div className="form-group">
                    <label htmlFor="exampleInputTitle">Title</label>
                    <input type="text" className="form-control" id="exampleInputTitle" aria-describedby="titleHelp" placeholder="Insert a meaningful title" name="title" required={true} />
                </div>

                <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <input type="text" className="form-control" id="descriptionInput" aria-describedby="descriptionHelp" placeholder="Optional description" name="description" />
                </div>
                <hr/>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Lyrics (javascript code)</label>
                    {//TODO: use codeMirror or some javascript editor
                    }
                    <textarea required={true} className="form-control" name="script" rows="3" aria-describedby="scriptHelp">{
                        "//play a middle 'C' for the duration of an 8th note \nnew Tone.Synth().toDestination().triggerAttackRelease(\"C4\", \"8n\");"
                     }</textarea>
                     { errorScript != null ?
                         <div className="alert alert-danger" role="alert">
                            Error: <span id="error-script">{errorScript}</span>
                         </div>:
                         <span></span>
                     }
                     <small id="scriptHelp" className="form-text text-muted">the Tone library is used, you can find more examples here <b>https://tonejs.github.io/docs</b> and here <b>https://tonejs.github.io/examples/</b>.</small>
                </div>

                <div className="form-group text-center">
                    <button type="button" className="btn btn-info" onClick={playAudio}>
                        Play the audio
                    </button>

                    <input className="btn btn-danger m-3" type="submit" value="Submit on blockchain" />
                </div>


            </form>
        </div>
    );
}

