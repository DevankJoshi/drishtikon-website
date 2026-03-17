const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, 'public/songs');

const songs = [
  '01. DRISHTIKON.wav',
  '02. 100TAKGINN!! ft. Bellicose.wav',
  '03. HAADSE ft. Sarthak.wav',
  '04. GHAFLAT.wav',
  '05. METAMORPHOSIS ft. Anoushka.wav',
  'Sarkashi ft. Jyeshtha.wav'
];

function getWavDuration(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // WAV header format
    // Bytes 24-27: Sample rate (little-endian)
    // Bytes 28-29: Bytes per sample (little-endian)
    // Bytes 40-43: Subchunk2Size (data size in bytes)
    
    const sampleRate = buffer.readUInt32LE(24);
    const byteRate = buffer.readUInt32LE(28);
    
    // Find DATA chunk
    let dataSize = 0;
    for (let i = 0; i < buffer.length - 8; i++) {
      if (buffer[i] === 0x64 && buffer[i+1] === 0x61 && buffer[i+2] === 0x74 && buffer[i+3] === 0x61) {
        dataSize = buffer.readUInt32LE(i + 4);
        break;
      }
    }
    
    const durationSeconds = dataSize / byteRate;
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.round(durationSeconds % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  } catch (err) {
    return 'Unknown';
  }
}

console.log('Song Durations:');
console.log('================');

songs.forEach(song => {
  const filePath = path.join(songsDir, song);
  const duration = getWavDuration(filePath);
  console.log(`${song}: ${duration}`);
});
