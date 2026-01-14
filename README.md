# 🎬 Ambient Video Player

A beautiful fullscreen video player with YouTube Music playlist background audio. Perfect for creating ambient atmospheres with stunning visuals and music.

## ✨ Features

- **Fullscreen Video Playback**: Muted videos that play in full screen
- **YouTube Music Integration**: Play YouTube Music playlists or videos as background audio
- **Beautiful UI**: Premium glassmorphism design with smooth animations
- **Easy Controls**: Toggle panel with video navigation and music controls
- **Keyboard Shortcuts**: Quick navigation and control
- **Auto-Advance**: Automatically plays next video when current ends
- **Volume Control**: Smooth volume slider for background music

## 🚀 Quick Start

1. **Open the app**: Simply open `index.html` in a modern web browser
2. **Configure your content**: Edit `app.js` to add your videos and YouTube playlist

## ⚙️ Configuration

Edit the configuration section at the top of `app.js`:

### Adding Videos

```javascript
const VIDEO_PLAYLIST = [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    'videos/local-video.mp4', // Local files work too!
];
```

You can use:
- **Direct video URLs** (MP4, WebM, etc.)
- **Local video files** (place them in a `videos/` folder)
- **Any publicly accessible video URL**

### Adding YouTube Music

**Option 1: YouTube Playlist**
```javascript
const YOUTUBE_PLAYLIST_ID = 'YOUR_PLAYLIST_ID';
```

To find your playlist ID:
1. Open your YouTube playlist
2. Look at the URL: `https://www.youtube.com/playlist?list=PLxxx...`
3. Copy everything after `list=`

**Option 2: Single YouTube Video (looped)**
```javascript
// Comment out YOUTUBE_PLAYLIST_ID and use:
const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID';
```

To find video ID:
1. Open any YouTube video
2. Look at the URL: `https://www.youtube.com/watch?v=xxxxx`
3. Copy everything after `v=`

### Other Settings

```javascript
const AUTO_ADVANCE_VIDEO = true;  // Auto-play next video?
const INITIAL_MUSIC_VOLUME = 50;  // Starting volume (0-100)
```

## 🎮 Controls

### UI Controls
- **Menu Button** (top right): Show/hide control panel
- **Previous/Next**: Navigate through video playlist
- **Play/Pause Music**: Control background audio
- **Volume Slider**: Adjust music volume

### Keyboard Shortcuts
- `←` / `→`: Previous/Next video
- `Space`: Play/Pause music
- `F`: Toggle fullscreen
- `C`: Show/hide control panel

## 🎨 Design

The app features a premium design with:
- **Glassmorphism effects**: Frosted glass UI elements
- **Smooth gradients**: Purple-pink accent colors
- **Micro-animations**: Subtle hover and transition effects
- **Dark theme**: Easy on the eyes for extended viewing
- **Responsive layout**: Works on desktop and mobile

## 📝 Tips

1. **Browser Autoplay**: Some browsers block autoplay with sound. Click the video to start if needed.
2. **Fullscreen Mode**: Press `F` or click fullscreen for the best experience
3. **Local Videos**: For better performance with local videos, use compressed MP4 files
4. **YouTube Playlists**: Make sure your YouTube playlist is public or unlisted

## 🔧 Troubleshooting

**Videos won't play:**
- Check that video URLs are accessible
- Try clicking the video to trigger playback
- Check browser console for errors

**Music won't play:**
- Verify your playlist/video ID is correct
- Make sure the YouTube content is not region-blocked
- Check that the playlist is public

**Fullscreen not working:**
- Some browsers require user interaction first
- Press `F` or click the video area

## 🌐 Browser Support

Works best on modern browsers:
- Chrome/Edge (Recommended)
- Firefox
- Safari
- Opera

## 📄 License

Free to use and modify for personal and commercial projects.

---

**Enjoy your ambient experience! 🎵✨**
