# Fahlevi Thing - AI Coding Guidelines

## Project Overview
This is a static personal website/blog built with plain HTML, CSS, and JavaScript. The site focuses on financial/investment content from "Reza POV" and is written primarily in Indonesian. Recently integrated with Google Gemini AI for an interactive chat assistant.

## Architecture
- **Static Site Structure**: Multiple HTML pages (`index.html`, `about.html`, `privacy.html`) sharing common `style.css` and `script.js`
- **Layout Components**: Header with navigation, main content area, sidebar (including Gemini chat widget), and footer
- **Content Pattern**: Blog-style posts with thumbnail images, metadata categories, excerpts, and "read more" links
- **AI Integration**: Client-side Gemini API chat interface in the sidebar

## Key Conventions
- **Language**: Use Indonesian (`lang="id"`) for all HTML and content
- **Color Scheme**:
  - Primary: `#1a1a1a` (dark gray)
  - Accent: `#2584a1` (teal blue)
  - Use CSS custom properties from `:root` for consistency
- **Typography**:
  - Headings: Inter font family
  - Body text: Lora serif font
- **Icons**: FontAwesome 6.4.2 via CDN for all icons
- **Responsive Design**: Mobile-first with hamburger menu toggle

## Navigation Patterns
- **Dropdown Menu**: Portfolio section uses `<li class="dropdown">` with `.dropbtn` and `.dropdown-content`
- **Mobile Interaction**: JavaScript toggles `.active` class on `.nav-links` for hamburger menu
- **Active States**: Add `class="active"` to current page nav links

## Content Structure
- **Post Items**: Use `<article class="post-item">` with:
  - `.post-thumb` for images (800x400px recommended)
  - `.post-details` containing `.meta-cat`, `<h2>`, `.excerpt`, `.read-more`
- **Sidebar Widgets**: `<div class="widget">` with `<h3>` titles
- **Social Links**: `.social-widget` with `.soc-icon` classes (ig, tw, em)
- **Gemini Chat Widget**: `#gemini-chat` container with `#chat-messages`, `#chat-input`, `#send-btn`

## AI Integration (Gemini Assistant)
- **API Setup**: Requires Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Security Warning**: API key is currently stored client-side in `script.js` - exposed in browser source. For production, implement backend proxy to secure the key.
- **Model**: Uses `gemini-3-flash-preview` model via `@google/generativeai` library (loaded via CDN)
- **Chat Session**: Maintains conversation context using `startChat()` method
- **Error Handling**: Displays user-friendly error messages for API failures
- **UX Features**: Auto-scroll chat messages, send on Enter key press

## Development Workflow
- **No Build Tools**: Edit HTML/CSS/JS files directly
- **Image Assets**: Store in `Images/` folder
- **Placeholder Images**: Use `https://via.placeholder.com/` for development
- **External Dependencies**:
  - Google Fonts (Inter, Lora)
  - FontAwesome 6.4.2 via CDN
  - Google Generative AI library via CDN
- **API Key Management**: Replace `'YOUR_API_KEY_HERE'` in `script.js` with actual key (temporary - migrate to secure backend)

## Code Examples
- **CSS Variables**: `var(--accent-blue)` for consistent theming
- **JavaScript Events**: `DOMContentLoaded` for initialization, click handlers for mobile menu and chat
- **Gemini API Usage**:
  ```javascript
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
  let chat = model.startChat();
  const result = await chat.sendMessage(message);
  ```
- **HTML Structure**: Consistent `.container` wrapper with max-width 1100px

## File Organization
- `index.html`: Homepage with featured posts and Gemini chat
- `about.html`: Personal information page
- `privacy.html`: Privacy policy page
- `style.css`: All styling with CSS custom properties and chat styles
- `script.js`: Mobile menu, dropdown interactions, and Gemini chat logic
<parameter name="filePath">d:\Fahlevithing\.github\copilot-instructions.md