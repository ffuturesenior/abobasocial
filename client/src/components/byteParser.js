export function byteparser(binaryData){
    String.fromCharCode(...new Uint8Array(binaryData))
}