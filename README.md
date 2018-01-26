# find-lat-lng [![Build Status](https://travis-ci.org/motleyagency/find-lat-lng.svg?branch=master)](https://travis-ci.org/motleyagency/find-lat-lng)

Finds latitude and longitude for an array of street names.

## Install

```
$ npm install --save find-lat-lng

# or with yarn

$ yarn add find-lat-lng
```

## Usage

```js
import findLatLong from 'find-lat-lng';

const client = findLatLng(GOOGLE_API_KEY);
const GOOGLE_API_KEY = 'your_google_api_key'; // (https://developers.google.com/maps/documentation/javascript/get-api-key)
const items = ["Lönnrotinkatu 5, Helsinki", "Lönnrotinkatu 4, Helsinki"];

const itemsWithLatLng = await client(items, { debug: false });

console.log(itemsWithLatLng);

/*
[
  { address: 'Lonnrotinkatu 5', lat: 60.166924, lng: 24.939788},
  { address: 'Lonnrotinkatu 4', lat: 60.167142, lng: 24.940959},
  ...
]
*/

```

If lat and/or lng is not found `null` is returned

## API

### findLatLng(GOOGLE_API_KEY)(items [,options])

`findLatLng` must be initialized with your Google Maps API Key. After calling the initialized client it
returns a promise for an array of `address, lat, lng` objects.

Items must be an array of addresses to search for.

#### Options

Type: `Object`
default: {`debug: false`}

Object of optional options.

##### debug

Type: `Boolean`
default: `false`

If true, `console.warn`s about lat/lngs that were not found.

## CLI

See [find-lat-lng-cli](https://github.com/motleyagency/find-lat-lng-cli) for a CLI for this module


## Related

- [find-lat-lng-cli](https://github.com/motleyagency/find-lat-lng-cli) - Make a directory and its parents if needed

## License

MIT © Pete Nykänen
