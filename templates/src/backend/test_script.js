// using http module
const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('Testing cinemas filter...');
  let res = await get('http://localhost:3001/api/v1/cinemas?area=Jakarta');
  console.log(res.data && res.data.length > 0 ? 'PASS' : 'FAIL', '- Cinemas in Jakarta:', res.data ? res.data.length : 0);

  console.log('Testing movies filter...');
  res = await get('http://localhost:3001/api/v1/movies?area=Bandung');
  console.log(res.data && res.data.length > 0 ? 'PASS' : 'FAIL', '- Movies in Bandung:', res.data ? res.data.length : 0);

  console.log('Testing showtimes filter...');
  res = await get('http://localhost:3001/api/v1/showtimes?area=Surabaya&movie_id=m7');
  console.log(res.data && res.data.length > 0 ? 'PASS' : 'FAIL', '- Showtimes for m7 in Surabaya:', res.data ? res.data.length : 0);
  
  process.exit(0);
}

runTests();
