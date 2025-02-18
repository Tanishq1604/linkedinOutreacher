// This is a simple encryption implementation for demo purposes
// In a production environment, use a proper encryption library and store keys securely

export async function encrypt(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );

  // Convert encrypted data to base64
  const encryptedArray = Array.from(new Uint8Array(encrypted));
  const encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedArray));

  // Store the key and IV for decryption
  // In a real app, the key should be stored securely on the server
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);
  const keyArray = Array.from(new Uint8Array(exportedKey));
  const keyBase64 = btoa(String.fromCharCode.apply(null, keyArray));
  const ivBase64 = btoa(String.fromCharCode.apply(null, Array.from(iv)));

  return JSON.stringify({
    data: encryptedBase64,
    key: keyBase64,
    iv: ivBase64,
  });
}

export async function decrypt(encryptedData: string): Promise<string> {
  const { data, key: keyBase64, iv: ivBase64 } = JSON.parse(encryptedData);

  // Convert base64 back to ArrayBuffer
  const encrypted = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
  const keyArray = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));

  const key = await window.crypto.subtle.importKey(
    "raw",
    keyArray,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encrypted,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}
