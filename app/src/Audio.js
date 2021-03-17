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

function AudioDetail() {
    const { audioId } = useParams();

    window.Tone = Tone;
    const [isLoaded, setLoaded] = useState(false);
    const resource = useRef(null);

    useEffect(async () => {
        //postData({ script: 'new Tone.Synth().toDestination().triggerAttackRelease("C4", "8n");' }).then((hash) => {
        //    console.log("hash: ", hash);
        //});

        getData(audioId).then((data) => {
            resource.current = data.script;
            console.log("data from ipfs: ", data);
        }).catch( err => {
            alert("Error occurred: ", err);

        }).finally( () => {
            setLoaded(true);
        });
    }, []);

    const handleClick = () => eval(resource.current);

    return (
        <div>
            {(!isLoaded)?
            <p><em>Loading...</em></p>:
            <button disabled={!isLoaded} onClick={handleClick}>
                start layer music
            </button>}
        </div>
    );
}
