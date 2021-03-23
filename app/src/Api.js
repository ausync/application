const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});

export async function getData(cid) {
    let cidEscaped = cid;
    if (cid.startsWith("ipfs://")){
        cidEscaped = cidEscaped.replace("ipfs://", "");
    }
    const file = await ipfs.get(cidEscaped);
    const fileContent = await file[0].content;
    return JSON.parse(fileContent.toString('utf8'));
}

export async function postData(data) {
    const objectString = JSON.stringify(data);
    const bufferedString = await ipfs.Buffer.from(objectString);
    const result = await ipfs.add(bufferedString);

    //Example response: {"Name":"QmWGL7eYnZpRXNe4oL4VLg8r1aKLjHvhAwrcTJNvND5TFo","Hash":"QmWGL7eYnZpRXNe4oL4VLg8r1aKLjHvhAwrcTJNvND5TFo","Size":"91"}
    return "ipfs://" + result[0]["hash"];
}

