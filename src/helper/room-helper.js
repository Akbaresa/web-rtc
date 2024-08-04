export const generateRoomCode = async () => {
    const segments = 3;
    const segmentLength = 3;
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    let code = '';
    for (let i = 0; i < segments; i++) {
        if (i > 0) code += '-';
        for (let j = 0; j < segmentLength; j++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
    }

    return code;
}