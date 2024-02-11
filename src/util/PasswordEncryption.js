import crypto from 'crypto';

export const encrypt = (password) => {
    const algorithm = process.env.REACT_APP_ENCRYPTION_ALGORITHM;
    const secretKey = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export const decryptLoginResponse = (data) => {
    const secret = process.env.REACT_APP_JSON_DECRYPTION_SECRET_KEY;
    const rounds = parseInt(process.env.REACT_APP_JSON_DECRYPTION_ROUNDS);
    const keySize = parseInt(process.env.REACT_APP_JSON_DECRYPTION_KEY_SIZE);
    const algorithm = process.env.REACT_APP_JSON_DECRYPTION_ALGORITHM;
    const salt = crypto.createHash('sha1').update(secret).digest('hex');

    let textParts = data.split(':');
    let iv = Buffer.from(textParts.shift(), 'base64');
    let encryptedData = Buffer.from(textParts.join(':'), 'base64');
    let key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, 'sha512');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
    return JSON.parse(JSON.parse(decryptedData.toString()));
}
