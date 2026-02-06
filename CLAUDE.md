# Project Guidelines: Medical Acronym Search

## Architecture Decisions

### Simplicity Over Complexity
- **Prefer vanilla HTML/CSS/JS** over frameworks unless complexity truly warrants it
- This project uses vanilla JavaScript because the dataset is small (76KB) and the functionality is straightforward
- No runtime dependencies except Tailwind CSS CDN

### Build Step Philosophy
- **Build steps are acceptable** when they provide clear value
- This project uses a build step to:
  - Convert CSV to JSON at build time (not runtime)
  - Embed data directly in HTML for zero-latency access
  - Ensure single-file deployment

### Deployment Target: Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`
- Single HTML file output (144KB including all data)
- No server-side processing required

## UX Requirements

### Mobile-First Design
- **Results must be visible without scrolling** even when mobile keyboard is displayed
- Large, touch-friendly search input (text-lg, p-4)
- Results container limited to `max-h-[60vh]` to ensure visibility
- No horizontal scrolling

### Search Behavior
- **Search acronyms only, not meanings** - users search by abbreviation, not definition
- **Instant results** as user types (50ms debounce)
- **Prefix matching** (case-insensitive) - "CM" matches "CM", "CMP", etc.
- **Limit displayed results** to 50 for performance and UX
- **Smart sorting**:
  1. Exact matches first
  2. Then by acronym length (shorter first)
  3. Then alphabetically

### Display Format
Each result shows:
- **Line 1**: ACRONYM (bold, blue, larger text)
- **Line 2**: MEANING(S) (one or more meanings per acronym)
- **Optional**: Note (smaller, italic, gray) if present

## Data Handling

### CSV Structure
- Format: `acronym,meaning,note`
- Handles edge cases:
  - Quoted fields with embedded commas
  - Multi-line quoted fields
  - Multiple meanings per acronym (175+ duplicates in dataset)
  - Optional third column (notes)

### Data Embedding Strategy
- For datasets <500KB, embed directly in HTML/JS bundle
- This provides:
  - Instant loading (no API calls)
  - Offline capability
  - Simplified deployment
  - Zero latency searches

## Technical Constraints

### No Large Libraries
- Avoid bringing in complex dependencies for simple tasks
- Acceptable: Tailwind CDN (styling only)
- Not needed: jQuery, React, Vue, etc. for this use case

### Static Output
- Final product must be a static site
- Single HTML file with embedded data and logic
- No server-side rendering or API endpoints
- Works offline after initial load
