const fetch = require('node-fetch');
const pThrottle = require('p-throttle');

const { GOOGLE_MAPS_API_KEY } = process.env;
const url = (address, key = GOOGLE_MAPS_API_KEY) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;

const findLatLng = (apiKey, opts = { debug: false }) => async addresses => {
  const uniqueAddresses = new Set();

  // eslint-disable-next-line no-restricted-syntax
  for (const address of addresses) {
    if (!uniqueAddresses.has(address)) {
      uniqueAddresses.add(address);
    }
  }

  const throttledFetch = pThrottle(
    async x =>
      new Promise(async resolve => {
        const { results, status } = await fetch(
          url(encodeURIComponent(x), apiKey),
        ).then(res => res.json());

        if (status !== 'OK' || (!results || results.length === 0)) {
          if (opts.debug) {
            console.warn(`Could not find lat/lng for ${x}`); // eslint-disable-line no-console
          }

          return resolve({
            address: x,
            lat: null,
            lng: null,
          });
        }

        const { geometry: { location: { lat, lng } } } = results[0];

        return resolve({
          address: x,
          lat,
          lng,
        });
      }),
    40,
    1000,
  );

  return Promise.all(Array.from(uniqueAddresses).map(throttledFetch));
};

module.exports = findLatLng;
