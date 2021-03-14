
export function api(resource) {
    return ["",""];
}

export function get(args) {
    return  args[1] + 'new Tone.Synth().toDestination().triggerAttackRelease("C4", "8n");';
}