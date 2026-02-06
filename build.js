const fs = require('fs');
const path = require('path');

// Read CSV file
const csvContent = fs.readFileSync('clinical_abbreviations.csv', 'utf8');

// Parse CSV with proper handling of quoted fields and newlines
function parseCSV(csv) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      currentLine.push(currentField.trim());
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      // Line separator
      currentLine.push(currentField.trim());
      if (currentLine.some(field => field !== '')) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Push last field and line if they exist
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some(field => field !== '')) {
      lines.push(currentLine);
    }
  }

  return lines;
}

// Parse the CSV
const rows = parseCSV(csvContent);

// Build the acronym data structure
const acronyms = {};

rows.forEach((row) => {
  if (row.length < 2) return; // Skip invalid rows

  const acronym = row[0];
  const meaning = row[1];
  const note = row[2] || '';

  if (!acronym || !meaning) return; // Skip if missing essential data

  // Initialize array for this acronym if it doesn't exist
  if (!acronyms[acronym]) {
    acronyms[acronym] = [];
  }

  // Add this meaning to the acronym's list
  acronyms[acronym].push({
    meaning: meaning,
    note: note
  });
});

// Read the HTML template
const template = fs.readFileSync('src/template.html', 'utf8');

// Inject the data into the template
const html = template.replace('{{ACRONYM_DATA}}', JSON.stringify(acronyms));

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Write the output file
fs.writeFileSync('dist/index.html', html);

console.log(`✓ Build complete! Generated dist/index.html`);
console.log(`✓ Processed ${Object.keys(acronyms).length} unique acronyms from ${rows.length} total entries`);
