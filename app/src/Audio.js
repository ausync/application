import * as Tone from 'tone'
import {getData,postData} from './Api'
import React, { Component,useEffect,useState,useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";


export default function Audio(props) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:audioId`}>
              <AudioDetail />
            </Route>
            <Route path={match.path}>
              <h3>Audio not found</h3>
            </Route>
        </Switch>
    )
}

function oscillator() {
    // TODO: this is not working, is not getting values from Tone.js

    const analyser = new Tone.Waveform();
    Tone.getDestination().connect(analyser);

    var frequencyData = new Uint8Array(analyser.getValue().length);//analyser.frequencyBinCount
    var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 10,
        gap = 2,
        capHeight = 2,
        capStyle = '#000',
        meterNum = 800 / (10 + 2),
        capYPositionArray = [];
    var ctx = canvas.getContext('2d'), gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#0f0');
    gradient.addColorStop(0.5, '#ff0');
    gradient.addColorStop(0, '#f00');

    function renderFrame() {
        let array = analyser.getValue();
        var step = Math.round(array.length / meterNum);
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
            ctx.fillStyle = capStyle;
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };
            ctx.fillStyle = gradient;
            ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
        }
        requestAnimationFrame(renderFrame);
    }
    renderFrame();
}

function AudioDetail() {
    const { audioId } = useParams();

    window.Tone = Tone;
    const [resource, setResource] = useState(null);

    useEffect(async () => {
        getData(audioId).then((data) => {
            setResource(data);
            console.log("data from ipfs: ", data);
        }).catch( err => {
            alert("Error occurred: ", err);
        });
    }, []);

    const handleClick = () => {
        eval(resource.script);
        //oscillator();
    };

    return (
        <div className="container">
            {(resource == null)?
            <p><em>Loading...</em></p>:
            <div className="mt-4">
                <div className="row">
                    <h5 className="h5">Audio layer</h5>
                </div>
                <div className="row">
                    <div className="col">
                        <div>
                            <img src="/wave2.png" height="135px"/>
                        </div>
                        <div>
                            <button onClick={handleClick} className="btn btn-success">
                                start the music
                            </button>
                        </div>
                        <div className="mt-5">
                            <button onClick={handleClick} className="btn btn-light">
                                show on blockchain TODO
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="h1">{resource.title}</h1>
                        <p className="p-3">{resource.description}</p>
                        <p className="p-3"><b>Created on </b> {new Date(resource.created).toDateString()}</p>
                        <p className="p-3"><i>{resource.script.split("\n").length} line{resource.script.split("\n").length > 1? "s": ""} of code</i></p>
                    </div>
                </div>
            </div>
            }

            { // <canvas id="canvas" width="800" height="350"></canvas>
            }
        </div>
    );
}
