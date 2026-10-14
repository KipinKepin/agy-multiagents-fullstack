const fs = require('fs');
const path = require('path');

/**
 * Parses a CSV string into an array of objects.
 * Handles commas inside quotes.
 */
function parseCSVLine(line) {
  const result = [];
  let inQuotes = false;
  let currentVal = '';
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(currentVal.trim());
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  
  result.push(currentVal.trim());
  return result;
}

function parseCSV(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const obj = {};
      headers.forEach((header, index) => {
        let val = values[index];
        if (val === undefined) val = "";
        
        // Data type parsing (try to parse integers where appropriate)
        if (/^\d+$/.test(val) && !val.startsWith("0")) {
             // Only parse as int if it's purely digits and doesn't start with 0 (like phone numbers)
             obj[header] = parseInt(val, 10);
        } else {
             obj[header] = val;
        }
      });
      data.push(obj);
    }

    return data;
  } catch (error) {
    console.error(`Error parsing CSV file ${filePath}:`, error.message);
    throw error;
  }
}

class Database {
  constructor() {
    this.data = {};
  }

  loadData() {
    const dataDir = path.join(__dirname, '..', 'data');
    this.data.movies = parseCSV(path.join(dataDir, 'movies.csv'));
    this.data.cinemas = parseCSV(path.join(dataDir, 'cinemas.csv'));
    this.data.showtimes = parseCSV(path.join(dataDir, 'showtimes.csv'));
    this.data.snacks = parseCSV(path.join(dataDir, 'snacks.csv'));
    this.data.vouchers = parseCSV(path.join(dataDir, 'vouchers.csv'));
    console.log('All CSV data loaded and cached in-memory.');
  }

  get(collection) {
    return this.data[collection] || [];
  }
}

const db = new Database();
db.loadData(); // Load immediately on module require

module.exports = {
  db
};
