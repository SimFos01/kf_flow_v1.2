const axios = require('axios');

const INTERNAL_API_KEY = process.env.PI_API_KEY;

if (!INTERNAL_API_KEY) {
  throw new Error('PI_API_KEY environment variable not set');
}

exports.unlock = async (adapterData) => {
  const { ip, pin } = adapterData;
  if (!ip || pin == null) {
    throw new Error('Ugyldig adapterData i unlock');
  }

  try {
    const res = await axios.post(`http://${ip}/open`, { pin }, {
      headers: { 'x-api-key': INTERNAL_API_KEY }
    });
    console.log(`🔓 [UNLOCK] Respons fra Pi ${ip}:`, {
      status: res.status,
      data: res.data
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error(`🔴 [UNLOCK] Feil fra Pi ${ip}:`, {
        status: err.response.status,
        data: err.response.data
      });
    } else {
      console.error(`🔴 [UNLOCK] Nettverksfeil mot Pi ${ip}:`, err.message);
    }
    throw new Error('Kunne ikke åpne via Raspberry');
  }
};

exports.lock = async (adapterData) => {
  const { ip, pin } = adapterData;
  if (!ip || pin == null) {
    throw new Error('Ugyldig adapterData i lock');
  }

  try {
    const res = await axios.post(`http://${ip}/lock`, { pin }, {
      headers: { 'x-api-key': INTERNAL_API_KEY }
    });
    console.log(`🔒 [LOCK] Respons fra Pi ${ip}:`, {
      status: res.status,
      data: res.data
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error(`🔴 [LOCK] Feil fra Pi ${ip}:`, {
        status: err.response.status,
        data: err.response.data
      });
    } else {
      console.error(`🔴 [LOCK] Nettverksfeil mot Pi ${ip}:`, err.message);
    }
    throw new Error('Kunne ikke låse via Raspberry');
  }
};

exports.status = async (adapterData) => {
  const { ip, pin } = adapterData;
  if (!ip || pin == null) {
    throw new Error('Ugyldig adapterData i status');
  }

  try {
    const res = await axios.get(`http://${ip}/status`, {
      params: { pin },
      headers: { 'x-api-key': INTERNAL_API_KEY }
    });
    console.log(`📊 [STATUS] Respons fra Pi ${ip}:`, {
      status: res.status,
      data: res.data
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error(`🔴 [STATUS] Feil fra Pi ${ip}:`, {
        status: err.response.status,
        data: err.response.data
      });
    } else {
      console.error(`🔴 [STATUS] Nettverksfeil mot Pi ${ip}:`, err.message);
    }
    throw new Error('Status ikke tilgjengelig');
  }
};
