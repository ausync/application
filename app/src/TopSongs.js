import * as Tone from 'tone'
import {getData} from './Api'
import React, { Component,useEffect,useState,useRef } from 'react';


const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 0 }
];

function timeSince(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

export default function TopSongs(props) {

    //TODO: remove those from ipfs
    //const songsF = ["QmWGL7eYnZpRXNe4oL4VLg8r1aKLjHvhAwrcTJNvND5TFo", "QmPtKSGdJ2RjwjwJWUVHpTKJAfHB5marrvqoFL1jS9tkir", "QmYnzDPSjPAD4F2HatEY2c4M7R58R58T6Esuqcw4iMb2hF"];

    const songsF = ["QmT4ZjTaJj8eNGoKxkAuMTmFAy4LMu3gVHFz62RFn1VEfB", "QmQaB9bVjVBFibtqAmLnwKMpiyXwG5SHSzcb2DoNqatwe3"];

    const [songs, setSongs] = useState(null);

    useEffect(async () => {
            if (!props.contract) {
                return;
            }
            const { totalSupply,tokenURI } = props.contract.methods;

            totalSupply().call().then(async total => {
                 setSongs((await Promise.all(
                    Array.from({length: parseInt(total)}, (x, i) =>
                         tokenURI(i+1).call().then(async url => {
                            const response = await getData(url);
                            response["token"] = i+1;
                            return response;
                        }).catch(err => {
                            console.log(err);
                        })
                    )
                )).filter(e => e != null) );
            });

    }, [props.contract]);

    return (
        <div className="list-group">
          <h1 className="h5 text-center p-4"> Latest added songs </h1>
          { (songs == null) ?
              <em>Loading...</em>:

              songs.map( song =>
                <a key={song.token} href={"/audio/"+song.token} className="list-group-item list-group-item-action p-4" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{song.title}</h5>
                    </div>
                    <p className="mb-1">{song.description}</p>
                    <small>{timeSince(new Date(song.created))}</small>
                    {// TODO: Author name?
                    }
                </a>
              )}
        </div>
    );
}
