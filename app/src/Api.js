
export function api(resource) {
    return ["",""];
}

export function get(args) {
    //play a middle 'C' for the duration of an 8th note
    return  args[1] + 'new Tone.Synth().toDestination().triggerAttackRelease("C4", "8n");';
}