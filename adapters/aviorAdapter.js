// adapters/aviorMobikeyAdapter.js
const axios = require('axios');

const mobikeyUrl = (responseType, device, password) =>
  `http://www.mobikey.eu/cmd/${responseType}/${device}/pwd/${password}`;

exports.open = async (adapterData) => {
  const { device, password, out } = adapterData;
  if (!device || !password || !out) throw new Error('adapterData mangler device, password eller out');

  const url = mobikeyUrl('J', device, password);
  const command = `OUT${out}=1`;
  try {
    const res = await axios.post(url, command, {
      headers: { 'Content-Type': 'text/plain' }
    });
    console.log(`[MOBIKEY] OPEN: ${url} →`, res.data);
    return res.data;
  } catch (err) {
    console.error('[MOBIKEY] Feil ved OPEN:', err.message);
    throw new Error('Kunne ikke åpne via Mobikey');
  }
};

exports.lock = async (adapterData) => {
  const { device, password, out } = adapterData;
  if (!device || !password || !out) throw new Error('adapterData mangler device, password eller out');

  const url = mobikeyUrl('J', device, password);
  const command = `OUT${out}=0`;
  try {
    const res = await axios.post(url, command, {
      headers: { 'Content-Type': 'text/plain' }
    });
    console.log(`[MOBIKEY] LOCK: ${url} →`, res.data);
    return res.data;
  } catch (err) {
    console.error('[MOBIKEY] Feil ved LOCK:', err.message);
    throw new Error('Kunne ikke låse via Mobikey');
  }
};