import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const App = () => {
  const [encryptedObject, setEncryptedObject] = useState(null);
  const encryptionKey = 'YourEncryptionKey';

  const encryptObject = (objectToEncrypt) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(objectToEncrypt), encryptionKey).toString();
      localStorage.setItem('encryptedData', encrypted);
      setEncryptedObject(objectToEncrypt);
    } catch (error) {
      console.error('Encryption failed:', error.message);
    }
  };

  const decryptObject = () => {
    const encryptedData = localStorage.getItem('encryptedData');
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log('Decrypted Object:', decryptedObject);
      } catch (error) {
        console.error('Decryption failed:', error.message);
      }
    } else {
      console.log('No encrypted data found.');
    }
  };

  const handleEncrypt = () => {
    const objectToEncrypt = { example: 'data' };
    encryptObject(objectToEncrypt);
  };

  const handleDecrypt = () => {
    decryptObject();
  };

  return (
    <div>
      <button onClick={handleEncrypt}>Encrypt and Save</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      {encryptedObject && (
        <div>
          <h2>Encrypted Object:</h2>
          <pre>{JSON.stringify(encryptedObject, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
