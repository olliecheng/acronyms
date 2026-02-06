# Medical Acronym Search

A simple, fast static website for searching clinical abbreviations and medical acronyms. Features instant search across 2,600+ medical terms with zero runtime dependencies.

## Features

- **Instant search**: Results appear as you type with <100ms response time
- **Mobile-optimized**: Large touch targets, results visible with keyboard open
- **Offline-capable**: Works offline after initial load
- **Zero dependencies**: Single HTML file with embedded data
- **2,600+ acronyms**: Comprehensive medical abbreviation database

## Local Development

### Build the site

```bash
npm run build
```

This will:
1. Parse `clinical_abbreviations.csv`
2. Convert CSV data to JSON format
3. Inject data into the HTML template
4. Generate `dist/index.html`

### Preview locally

Simply open `dist/index.html` in your browser after building.

## Deployment to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. Push this repository to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click "Save and Deploy"

### Option 2: Direct Upload

1. Run `npm run build` locally
2. Go to Cloudflare Pages dashboard
3. Click "Create a project" → "Direct Upload"
4. Upload the `dist` folder
5. Deploy

## File Structure

```
.
├── build.js                    # Build script (CSV → JSON → HTML)
├── src/
│   └── template.html          # HTML template with search logic
├── dist/
│   └── index.html             # Generated output (gitignored)
├── clinical_abbreviations.csv # Source data
├── package.json               # Build configuration
└── README.md                  # This file
```

## How It Works

1. **Build time**: `build.js` reads the CSV file, parses it properly (handling quoted fields and newlines), groups multiple meanings per acronym, and injects the JSON into `template.html`

2. **Search**: The HTML includes JavaScript that:
   - Searches acronyms only (not meanings)
   - Uses prefix matching (case-insensitive)
   - Debounces input for performance
   - Limits to 50 results
   - Sorts by: exact match → length → alphabetical

3. **Display**: Results show acronym name in bold blue, followed by all meanings, with optional notes in smaller italic text

## Customization

### Modify styling
Edit `src/template.html` and update the Tailwind classes or add custom CSS in the `<style>` tag.

### Update data
Replace `clinical_abbreviations.csv` with your own data in the format:
```
acronym,meaning,note
AA,Alcoholics Anonymous,
CM,Certified Midwife,
CM,Case Manager,
```

Then rebuild: `npm run build`

### Change search behavior
Edit the `search()` function in `src/template.html`:
- Modify the `startsWith` logic for different matching
- Adjust the result limit (currently 50)
- Change sorting criteria

## Technical Details

- **File size**: ~144 KB (includes all data)
- **Load time**: <500ms on typical connections
- **Search performance**: <100ms for most queries
- **Data format**: JSON object with acronyms as keys, arrays of meanings as values
- **Browser support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT
