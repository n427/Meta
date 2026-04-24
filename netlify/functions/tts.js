exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { text, voiceId } = JSON.parse(event.body);
  if (!text) return { statusCode: 400, body: 'Missing text' };

  const voice = voiceId || '21m00Tcm4TlvDq8ikWAM';
  const apiKey = process.env.ELEVENLABS_API_KEY;

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { statusCode: res.status, body: err };
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'audio/mpeg' },
    body: buffer.toString('base64'),
    isBase64Encoded: true,
  };
};
