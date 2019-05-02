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
    const res = await get('https://www.cutters.no/wp-content/themes/cutters/sql/ventetid.php')
    const salonsData = JSON.parse(res).data
    salonsData
      .sort((a, b) => a.ventetid - b.ventetid)
      .map(({ ventetid, venter, navn, sted }) => ({
        ventetid: `${Math.round(ventetid / 60000)} min`,
        venter,
        navn,
        sted,
      }))
      .forEach(({ navn, sted, ventetid, venter }) => {
        console.log(`${navn.padEnd(30, ' ')}${sted.padEnd(14, ' ')}${ventetid}\t${venter} waiting`)
      })
  } catch (error) {
    console.error(error.message);
  }
}

printTimes()
