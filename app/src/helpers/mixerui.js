import * as Tone from 'tone'
import React, { Component,useEffect,useState,useRef } from 'react';
import './mixerui.css';

export default function MixerUI(props) {

    const oscillator = useRef(new Tone.Oscillator(200, "triangle"));
    const [oscillatorDestination, setOscillatorDestination] = useState(false);

    const keymap = {
        "KeyB": "#btnB","KeyV": "#btnV","KeyC": "#btnC","KeyX": "#btnX","KeyZ": "#btnZ","KeyA": "#btnA","KeyS": "#btnS","KeyD": "#btnD","KeyF": "#btnF","KeyG": "#btnG","KeyH": "#btnH","KeyJ": "#btnJ","KeyK": "#btnK","KeyL": "#btnL","KeyM": "#btnM","KeyN": "#btnN",
    };
    const number_frequency = [
        "Cbb","Cb","C","C#","Cx","Dbb","Db","D","D#","Dx","Ebb","Eb","E","E#","Ex","Fbb","Fb","F","F#","Fx","Gbb","Gb","G","G#","Gx","Abb","Ab","A","A#","Ax","Bbb","Bb","B","B#","Bx"
    ];

    const effects = useRef({"AutoFilter": {obj: null, init:()=>new Tone.AutoFilter().toDestination(), change: (v,obj)=>{obj.frequency.value=v;}, vals: (obj)=>[{label:"frequency", value: obj ? obj.frequency.value:0, "min": 0, "max": 10, "step": 1}]},
                          "FeedbackDelay": {obj: null, init:()=>new Tone.FeedbackDelay(0,0.5).toDestination(), change: (v,y,obj)=>{obj.delayTime.value=v;obj.feedback.value=y}, vals: (obj)=>[{label:"delay time", value: obj ? obj.delayTime.value:0, "min": 0, "max": 1, "step": 0.1},{label:"feedback", value:obj ? obj.feedback.value:0.5, "min": 0, "max": 1, "step": 0.1}] },
                          "AutoPanner": {obj: null, init:()=>new Tone.AutoPanner().toDestination(), change: (v,obj)=>{obj.frequency.value=v;}, vals: (obj)=>[{label:"frequency", value: obj ? obj.frequency.value:0, "min": 0, "max": 10, "step": 1}] },
                          "AutoWah": {obj: null, init:()=>new Tone.AutoWah().toDestination(), change: (v,y,z,obj)=>{obj.baseFrequency=v;obj.octaves=y;obj.sensitivity=z-40;}, vals: (obj)=>[{label:"base frequency", value: obj ? obj.baseFrequency:0, "min": 0, "max": 10, "step": 1},{label:"octaves", value: obj ? obj.octaves:0, "min": 0, "max": 10, "step": 1}, {label:"sensitivity", value: obj ? obj.sensitivity+40:0, "min": 0, "max": 40, "step": 1}] },
                          "BitCrusher": {obj: null, init:()=>new Tone.BitCrusher().toDestination(), change: (v,obj)=>{obj.bits.value=v+1;}, vals: (obj)=>[{label:"bits", value: obj ? obj.bits.value-1:0, "min": 0, "max": 15, "step": 1}] },
                          "Chebyshev": {obj: null, init:()=>new Tone.Chebyshev().toDestination(), change: (v,obj)=>{obj.order=v+1;}, vals: (obj)=>[{label:"order", value: obj ? obj.order-1:0, "min": 0, "max": 99, "step": 1}] },
                          "Chorus": {obj: null, init:()=>new Tone.Chorus().toDestination(), change: (v,y,z,obj)=>{obj.frequency.value=v;obj.delayTime=y;obj.depth=z;}, vals: (obj)=>[{label:"frequency", value: obj ? obj.frequency.value:0, "min": 0, "max": 10, "step": 1},{label:"delay time", value: obj ? obj.delayTime:0, "min": 0, "max": 100, "step": 1}, {label:"depth", value: obj ? obj.depth:0, "min": 0, "max": 1, "step": 0.1}] },
                          "Distortion": {obj: null, init:()=>new Tone.Distortion().toDestination(), change: (v,obj)=>{obj.distortion=v;}, vals: (obj)=>[{label:"distortion", value: obj ? obj.distortion:0, "min": 0, "max": 10, "step": 1}] },
                          "Freeverb": {obj: null, init:()=>new Tone.Freeverb().toDestination(), change: (v,y,obj)=>{obj.roomSize.value=v;obj.dampening=y+1;}, vals: (obj)=>[{label:"room size", value: obj ? obj.roomSize.value:0, "min": 0, "max": 1, "step": 0.1},{label:"dampening", value: obj ? obj.dampening-1:0, "min": 0, "max": 10000, "step": 100}] },
                          "FrequencyShifter": {obj: null, init:()=>new Tone.FrequencyShifter().toDestination(), change: (v,obj)=>{obj.frequency.value=v;}, vals: (obj)=>[{label:"frequency", value: obj ? obj.frequency.value:0, "min": 0, "max": 50, "step": 1}] },
                          "JCReverb": {obj: null, init:()=>new Tone.JCReverb().toDestination(), change: (v,obj)=>{obj.roomSize.value=v;}, vals: (obj)=>[{label:"room size", value: obj ? obj.frequency.value:0, "min": 0, "max": 1, "step": 0.1}] },
                          "Phaser": {obj: null, init:()=>new Tone.Phaser().toDestination(), change: (v,y,z,obj)=>{obj.frequency.value=v;obj.octaves=y;obj.baseFrequency=z;}, vals: (obj)=>[{label:"frequency", value: obj ? obj.frequency.value:0, "min": 0, "max": 10, "step": 1},{label:"octaves", value: obj ? obj.octaves:0, "min": 0, "max": 10, "step": 1}, {label:"base frequency", value: obj ? obj.baseFrequency:0, "min": 0, "max": 10000, "step": 100}] },
                          "PingPongDelay": {obj: null, init:()=>new Tone.PingPongDelay().toDestination(), change: (v,y,obj)=>{obj.delayTime.value=v;obj.feedback.value=y;}, vals: (obj)=>[{label:"delay time", value: obj ? obj.delayTime.value:0, "min": 0, "max": 1, "step": 0.1},{label:"feedback", value:obj ? obj.feedback.value:0.5, "min": 0, "max": 1, "step": 0.1}] },
                          "PitchShift": {obj: null, init:()=>new Tone.PitchShift().toDestination(), change: (v,obj)=>{obj.pitch=v;}, vals: (obj)=>[{label:"pitch", value: obj ? obj.pitch:0, "min": 0, "max": 10, "step": 1}] },
                          "Tremolo": {obj: null, init:()=>new Tone.Tremolo().toDestination(), change: (v,y,obj)=>{obj.frequency.value=v;obj.depth.value=y}, vals: (obj)=>[{label:"frequency", value: obj ? obj.frequency.value:0, "min": 0, "max": 10, "step": 1}, {label:"depth", value: obj ? obj.depth.value:0, "min": 0, "max": 1, "step": 0.1}] }
                            });

     const components = useRef({"AmplitudeEnvelope": {obj: null, isDestination: true, init:()=>new Tone.AmplitudeEnvelope().toDestination(), change: (attack,decay,sustain,release,obj)=>{obj.attack=attack;obj.decay=decay;obj.sustain=sustain;obj.release=release;}, vals: (obj)=>[{label:"attack", value: obj ? obj.attack:0, "min": 0, "max": 1, "step": 0.1},{label:"decay", value: obj ? obj.decay:0, "min": 0, "max": 1, "step": 0.1},{label:"sustain", value: obj ? obj.sustain:0, "min": 0, "max": 1, "step": 0.1},{label:"release", value: obj ? obj.release:0, "min": 0, "max": 1, "step": 0.1}] },
                                "FrequencyEnvelope": {obj: null, isDestination: false, init:()=>new Tone.FrequencyEnvelope(), change: (attack,decay,sustain,release,obj)=>{obj.attack=attack;obj.decay=decay;obj.sustain=sustain;obj.release=release;}, vals: (obj)=>[{label:"attack", value: obj ? obj.attack:0, "min": 0, "max": 1, "step": 0.1},{label:"decay", value: obj ? obj.decay:0, "min": 0, "max": 1, "step": 0.1},{label:"sustain", value: obj ? obj.sustain:0, "min": 0, "max": 1, "step": 0.1},{label:"release", value: obj ? obj.release:0, "min": 0, "max": 1, "step": 0.1}] },
                                "Channel": {obj: null, isDestination: true, init:()=>new Tone.Channel().toDestination(), change: (v,y,obj)=>{obj.volume.value=v-100;obj.pan.value=y-1;}, vals: (obj)=>[{label:"volume", value: obj ? obj.volume.value+100:100, "min": 0, "max": 200, "step": 1},{label:"pan", value: obj ? obj.pan.value+1:1, "min": 0, "max": 2, "step": 0.1}] },
                                "EQ3": {obj: null, isDestination: true, init:()=>new Tone.EQ3().toDestination(), change: (v,y,z,obj)=>{obj.low.value=v-100;obj.mid.value=y-100;obj.mid.value=y-100;obj.high.value=z-100;}, vals: (obj)=>[{label:"low", value: obj ? obj.low.value+100:100, "min": 0, "max": 200, "step": 1},{label:"mid", value: obj ? obj.mid.value+100:100, "min": 0, "max": 200, "step": 1},{label:"high", value: obj ? obj.high.value+100:100, "min": 0, "max": 200, "step": 1}] },
                            });
     const componentContainsDestination = () => {
        for (const [key, value] of Object.entries(components.current)){
            if(value.obj && value.isDestination) {
                return true;
            }
        }
        return false;
     }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.code in keymap && !["text", "textarea", "select-one"].includes(e.target.type)){
                let btn = document.querySelector(keymap[e.code]);
                let note = btn.value;
                btn.classList.add("active");
                setTimeout(()=>btn.classList.remove("active"), 1000);
                party(note);
            }
        });

    }, []);

    const party = (note) => {
        oscillator.current.frequency.value = note;
        //oscillator.current.type = "triangle20";
        if (!componentContainsDestination()) {
            if (!oscillatorDestination){
                oscillator.current.toDestination();
                setOscillatorDestination(true);
            }
        } else {
            if (oscillatorDestination) {
                oscillator.current.disconnect();
                oscillator.current = new Tone.Oscillator(note, "triangle");
            }
        }
        oscillator.current.start();
        oscillator.current.stop("+1");

        for (const [key, value] of Object.entries(components.current)){
            if(value.obj && value.obj.triggerAttack) {
               //components.current[componentName].obj = new Tone.FrequencyEnvelope({attack: 0.2,baseFrequency: "C2",octaves: 4 });
                value.obj.baseFrequency = note;
                value.obj.triggerAttack();
            }
        }
        console.log("Note:", note);
    }

    const clickBtn = (e) => {
            //player.triggerAttackRelease(e.target.value, "8n");
            party(e.target.value);
        };

    const effectChange = (e) => {
        let effectName = document.querySelector("#effectsMultiSelect").value;
        let vals = [];
        let i=0;
        while (document.querySelector("#sliderEffect" + i)) {
            if (!document.querySelector("#sliderEffect" + i).disabled) {
                vals.push(parseFloat(document.querySelector("#sliderEffect" +i).value));
            }
            i=i+1;
        }
        if (effects.current[effectName].obj == null){
            effects.current[effectName].obj = effects.current[effectName].init();
            oscillator.current.connect(effects.current[effectName].obj);
        }
        effects.current[effectName].change(...vals, effects.current[effectName].obj);
    };

    const componentChange = (e) => {
        let componentName = document.querySelector("#componentsMultiSelect").value;
        let vals = [];
        let i=0;
        while (document.querySelector("#sliderComponent" + i)) {
            if (!document.querySelector("#sliderComponent" + i).disabled) {
                vals.push(parseFloat(document.querySelector("#sliderComponent" +i).value));
            }
            i=i+1;
        }
        if (components.current[componentName].obj == null){
            components.current[componentName].obj = components.current[componentName].init();

            if (components.current[componentName].isDestination) {
                oscillator.current.connect(components.current[componentName].obj);
            } else {
                components.current[componentName].obj.connect(oscillator.current.frequency);
            }
        }
        components.current[componentName].change(...vals, components.current[componentName].obj);
    }

    const effectSelected = (e) => {
        let effect = effects.current[e.target.value];

        // reset
        for (let i=0; i<3;i++) {
            let slider=document.querySelector("#sliderEffect" + i);
            slider.disabled = true;
            slider.value = 0;
            document.querySelector("#sliderEffectLabel" + i).innerHTML = "";
        }
        // set new values
        let vals = effect.vals(effect.obj);
        for (let i=0; i<vals.length; i++) {
            let val = vals[i];
            let slider=document.querySelector("#sliderEffect" + i);
            slider.disabled = false;
            slider.mix = val["min"];slider.max = val["max"];slider.step = val["step"];slider.value = val["value"];
            document.querySelector("#sliderEffectLabel" + i).innerHTML = val["label"];
        }
    }

    const componentSelected = (e) => {
      let component = components.current[e.target.value];

      // reset
      for (let i=0; i<4;i++) {
          let slider=document.querySelector("#sliderComponent" + i);
          slider.disabled = true;
          slider.value = 0;
          document.querySelector("#sliderComponentLabel" + i).innerHTML = "";
      }
      // set new values
      let vals = component.vals(component.obj);
      for (let i=0; i<vals.length; i++) {
          let val = vals[i];
          let slider=document.querySelector("#sliderComponent" + i);
          slider.disabled = false;
          slider.mix = val["min"];slider.max = val["max"];slider.step = val["step"];slider.value = val["value"];
          document.querySelector("#sliderComponentLabel" + i).innerHTML = val["label"];
      }
  }

    const noteChange = (e) => {
       let i =-4;
       for (const [key, value] of Object.entries(keymap)){
            document.querySelector(value).value = e.target.value + i;
            document.querySelector(value + " em").innerHTML = e.target.value + "<sub>"+i+"</sub>";
            i = i+1;
       }
    };

    return (
        <div className="container mixerui">
            <div className="row align-items-center">
                <div className="col form-group" className="buttons">
                    <button id="btnB" onClick={clickBtn} value="C-4"><p> (B) </p> <em>C<sub><sub>-4</sub></sub></em></button>
                    <button id="btnV" onClick={clickBtn} value="C-3"><p> (V) </p> <em>C<sub>-3</sub></em></button>
                    <button id="btnC" onClick={clickBtn} value="C-2"><p> (C) </p> <em>C<sub>-2</sub></em></button>
                    <button id="btnX" onClick={clickBtn} value="C-1"><p> (X) </p> <em>C<sub>-1</sub></em></button>
                    <button id="btnZ" onClick={clickBtn} value="C0"><p> (Z) </p> <em>C<sub>0</sub></em></button>
                    <button id="btnA" onClick={clickBtn} value="C1"><p> (A) </p> <em>C<sub>1</sub></em></button>
                    <button id="btnS" onClick={clickBtn} value="C2"><p> (S) </p> <em>C<sub>2</sub></em></button>
                    <button id="btnD" onClick={clickBtn} value="C3"><p> (D) </p> <em>C<sub>3</sub></em></button>
                    <button id="btnF" onClick={clickBtn} value="C4"><p> (F) </p> <em>C<sub>4</sub></em></button>
                    <button id="btnG" onClick={clickBtn} value="C5"><p> (G) </p> <em>C<sub>5</sub></em></button>
                    <button id="btnH" onClick={clickBtn} value="C6"><p> (H) </p> <em>C<sub>6</sub></em></button>
                    <button id="btnJ" onClick={clickBtn} value="C7"><p> (J) </p> <em>C<sub>7</sub></em></button>
                    <button id="btnK" onClick={clickBtn} value="C8"><p> (K) </p> <em>C<sub>8</sub></em></button>
                    <button id="btnL" onClick={clickBtn} value="C9"><p> (L) </p> <em>C<sub>9</sub></em></button>
                    <button id="btnM" onClick={clickBtn} value="C10"><p> (M) </p> <em>C<sub>10</sub></em></button>
                    <button id="btnN" onClick={clickBtn} value="C11"><p> (N) </p> <em>C<sub>11</sub></em></button>
                </div>
                <div className="col form-group">
                    <label htmlFor="customRange6" className="form-label">Frequency rage</label>
                    <select defaultValue="C" onChange={noteChange} type="range" className="form-control-rang" min="0" max="34" step="1" id="customRange6" aria-describedby="customRange6Help" >
                        {number_frequency.map( (name,index)=><option value={name}>{name}</option>)}
                    </select>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col">
                    <label htmlFor="effectsMultiSelect" className="form-label">Effects</label>
                    <select onChange={effectSelected} defaultValue="AutoFilter" size="5" class="form-control" id="effectsMultiSelect">
                        <option value="AutoFilter">Auto filter</option>
                        <option value="FeedbackDelay">Feedback delay</option>
                        <option value="AutoPanner">Auto panner</option>
                        <option value="AutoWah">Auto wah</option>
                        <option value="BitCrusher">Bit crusher</option>
                        <option value="Chebyshev">Chebyshev</option>
                        <option value="Chorus">Chorus</option>
                        <option value="Distortion">Distortion</option>
                        <option value="Freeverb">Freeverb</option>
                        <option value="FrequencyShifter">Frequency shifter</option>
                        <option value="JCReverb">JCReverb</option>
                        <option value="Phaser">Phaser</option>
                        <option value="PingPongDelay">Ping Pong delay</option>
                        <option value="PitchShift">Pitch shift</option>
                        <option value="Tremolo">Tremolo</option>
                    </select>
                </div>
                <div className="col">
                    <div className="">
                        <label htmlFor="sliderEffect0" id="sliderEffectLabel0" className="form-label slider-label">frequency</label>
                        <input defaultValue="0" onChange={effectChange} type="range" className="form-control form-control-rang" min="0" max="10" id="sliderEffect0" />
                    </div>
                    <div className="">
                        <label htmlFor="sliderEffect1" id="sliderEffectLabel1" className="form-label slider-label"></label>
                        <input disabled="disabled" defaultValue="0" onChange={effectChange} type="range" className="form-control form-control-rang" min="0" max="10" id="sliderEffect1" />
                    </div>
                    <div className="">
                        <label htmlFor="sliderEffect2" id="sliderEffectLabel2" className="form-label slider-label"></label>
                        <input disabled="disabled" defaultValue="0" onChange={effectChange} type="range" className="form-control form-control-rang" min="0" max="10" id="sliderEffect2" />
                    </div>
                </div>

                <div className="col">
                    <label htmlFor="componentsMultiSelect" className="form-label">Components</label>
                    <select onChange={componentSelected} defaultValue="AmplitudeEnvelope" size="5" class="form-control" id="componentsMultiSelect">
                        <option value="AmplitudeEnvelope">Amplitude envelope</option>
                        <option value="FrequencyEnvelope">Frequency envelope</option>
                        <option value="Channel">Volume and pan</option>
                        <option value="EQ3">Equalizer</option>
                    </select>
                </div>
                <div className="col">
                    <div className="">
                        <label htmlFor="sliderComponent0" id="sliderComponentLabel0" className="form-label slider-label">attack</label>
                        <input defaultValue="0" onChange={componentChange} type="range" className="form-control form-control-rang" step="0.1" min="0" max="1" id="sliderComponent0" />
                    </div>
                    <div className="">
                        <label htmlFor="sliderComponent1" id="sliderComponentLabel1" className="form-label slider-label">decay</label>
                        <input defaultValue="0" onChange={componentChange} type="range" className="form-control form-control-rang" step="0.1" min="0" max="1" id="sliderComponent1" />
                    </div>
                    <div className="">
                        <label htmlFor="sliderComponent2" id="sliderComponentLabel2" className="form-label slider-label">sustain</label>
                        <input defaultValue="0" onChange={componentChange} type="range" className="form-control form-control-rang" step="0.1" min="0" max="1" id="sliderComponent2" />
                    </div>
                    <div className="">
                        <label htmlFor="sliderComponent3" id="sliderComponentLabel3" className="form-label slider-label">release</label>
                        <input defaultValue="0" onChange={componentChange} type="range" className="form-control form-control-rang" step="0.1" min="0" max="1" id="sliderComponent3" />
                    </div>
                </div>
            </div>

        </div>
    );
}