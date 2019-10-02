#!/usr/bin/env node
const https = require('https')

function get(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode >= 400) {
        return reject(new Error('Could not get salon info. Status code', response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
      request.on('error', (err) => reject(err))
    })
  })
}

async function printTimes() {
  try {
    const res = await get('https://www.cutters.no/api/salons')
    const salonsData = JSON.parse(res).data
    salonsData
      .sort((a, b) => a.details.estimatedWait - b.details.estimatedWait)
      .map(({ name, postalPlace, details }) => ({
        estimatedWait: `${Math.round(details.estimatedWait / 60000)} min`,
        numberOfWaiting: details.numberOfWaiting,
        name,
        postalPlace,
      }))
      .forEach(({ name, postalPlace, estimatedWait, numberOfWaiting }) => {
        console.log(`${name.padEnd(30, ' ')}${postalPlace.padEnd(14, ' ')}${estimatedWait}\t${numberOfWaiting} waiting`)
      })
  } catch (error) {
    console.error(error.message);
  }
}

printTimes()
