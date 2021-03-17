const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});

export async function getData(cid) {
    //play a middle 'C' for the duration of an 8th note
    //return  args[1] + 'new Tone.Synth().toDestination().triggerAttackRelease("C4", "8n");';

    const file = await ipfs.get(cid);
    const fileContent = await file[0].content;
    return JSON.parse(fileContent.toString('utf8'));
}

export async function postData(data) {
    const objectString = JSON.stringify(data);
    const bufferedString = await ipfs.Buffer.from(objectString);
    const result = await ipfs.add(bufferedString);

    return result[0]["Hash"];
    //TODO: returns {"Name":"QmWGL7eYnZpRXNe4oL4VLg8r1aKLjHvhAwrcTJNvND5TFo","Hash":"QmWGL7eYnZpRXNe4oL4VLg8r1aKLjHvhAwrcTJNvND5TFo","Size":"91"}
}

