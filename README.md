


# Picks

Picks is a web application that displays all your Spotify playlists. For the app to work effectively, the user should already have a Spotify account set up with desired playlists.

---

## Features

- **Sign in to Spotify API**: Securely authenticate with your Spotify account.
- **View your Spotify playlists**: See all your playlists, including playlist details and a preview of tracks.
- **Search for playlists**: Instantly filter your playlists by name.

---

## Technologies Used

- React JS
- Spotify API

---

## Installation Requirements

- Node.js

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/picks.git
   cd picks
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Click **Sign in with Spotify** and authorize the app.
2. Browse your playlists and see a summary of your music.
3. Use the search box to filter playlists by name.

---

## Configuration Options

- The backend authentication URL is set in the code. If you deploy your own backend, update this URL in `App.js`.
- You may need to register your app with Spotify and set the correct redirect URI in your Spotify Developer Dashboard.

---

## Code Structure Overview

```
src/
  App.css
  App.js
  App.test.js
  index.css
  index.js
  logo192.png
  reportWebVitals.js
  setupTests.js
  components/
    PlaylistCounter.js
    HoursCounter.jsx
    Filter.jsx
```

---

## Troubleshooting

- **Spotify login not working:**
  - Ensure your Spotify app credentials and redirect URI are set up correctly in the Spotify Developer Dashboard.
  - Check that your backend authentication server is running and accessible.
- **API errors or blank playlists:**
  - Make sure your access token is valid and has the required scopes.
  - Check the browser console for error messages.
- **App not starting:**
  - Ensure Node.js is installed and up to date.
  - Run `npm install` to ensure all dependencies are installed.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please follow the existing code style and include tests where appropriate.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
