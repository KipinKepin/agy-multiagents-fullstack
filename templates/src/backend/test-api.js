const http = require('http');

http.get('http://localhost:3000/api/v1/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('/health response:', data);
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
