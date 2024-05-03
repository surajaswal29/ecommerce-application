
export const decryptData = async (data) => {
    const ivHex = data.slice(0, 16);
    const encrypted = data.slice(16);

    const iv = hexStringToUint8Array(ivHex);
    const key = await importKey(import.meta.env.VITE_ENCRYPTION_KEY);

    const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        key,
        hexStringToUint8Array(encrypted)
    );

    return new TextDecoder().decode(decryptedArrayBuffer);
}

async function importKey(key) {
    return window.crypto.subtle.importKey(
        "raw",
        hexStringToUint8Array(key),
        { name: "AES-CBC" },
        false,
        ["decrypt"]
    );
}

function hexStringToUint8Array(hexString) {
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }
    return bytes;
}
