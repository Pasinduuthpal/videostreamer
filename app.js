// ============================================
// CONFIGURATION - Edit these values
// ============================================

// Cute cat videos downloaded from YouTube (copyright-free) - all with audio!
const VIDEO_PLAYLIST = [
    'videos/cat-00001.mp4',
    'videos/cat-00002-new.mp4',
    'videos/cat-00003.mp4',
    'videos/cat-00004.mp4',
    'videos/cat-00005.mp4',
];

// YouTube Playlist ID or Video ID
// To get playlist ID: Open YouTube playlist URL and copy the part after "list="
// Example: https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
// Playlist ID would be: PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
const YOUTUBE_PLAYLIST_ID = 'PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf'; // Example: Lofi playlist

// Or use a single video ID instead (comment out YOUTUBE_PLAYLIST_ID if using this)
// const YOUTUBE_VIDEO_ID = 'jfKfPfyJRdk'; // Example video

// Auto-advance to next video when current ends?
const AUTO_ADVANCE_VIDEO = true;

// Initial music volume (0-100)
const INITIAL_MUSIC_VOLUME = 50;

// ============================================
// Application Code
// ============================================

let currentVideoIndex = 0;
let player = null;
let isPlayerReady = false;

// DOM Elements
const introOverlay = document.getElementById('introOverlay');
const mainVideo = document.getElementById('mainVideo');
const controlPanel = document.getElementById('controlPanel');
const togglePanelBtn = document.getElementById('togglePanelBtn');
const minimizeBtn = document.getElementById('minimizeBtn');
const prevVideoBtn = document.getElementById('prevVideo');
const nextVideoBtn = document.getElementById('nextVideo');
const playMusicBtn = document.getElementById('playMusic');
const pauseMusicBtn = document.getElementById('pauseMusic');
const musicVolume = document.getElementById('musicVolume');
const volumeValue = document.getElementById('volumeValue');
const videoVolume = document.getElementById('videoVolume');
const videoVolumeValue = document.getElementById('videoVolumeValue');
const videoCount = document.getElementById('videoCount');
const currentVideoDisplay = document.getElementById('currentVideo');
const statusIndicator = document.getElementById('statusIndicator');

// Initialize
function init() {
    updateStatus('Initializing...', 'loading');

    // Set initial values
    videoCount.textContent = VIDEO_PLAYLIST.length;
    musicVolume.value = INITIAL_MUSIC_VOLUME;
    volumeValue.textContent = INITIAL_MUSIC_VOLUME + '%';
    videoVolume.value = 100;
    videoVolumeValue.textContent = '100%';
    mainVideo.volume = 1.0;

    // Load first video
    if (VIDEO_PLAYLIST.length > 0) {
        loadVideo(0);
    } else {
        updateStatus('No videos configured', 'error');
    }

    // Event Listeners
    togglePanelBtn.addEventListener('click', togglePanel);
    minimizeBtn.addEventListener('click', hidePanel);
    prevVideoBtn.addEventListener('click', previousVideo);
    nextVideoBtn.addEventListener('click', nextVideo);
    playMusicBtn.addEventListener('click', playMusic);
    pauseMusicBtn.addEventListener('click', pauseMusic);
    musicVolume.addEventListener('input', updateMusicVolume);
    videoVolume.addEventListener('input', updateVideoVolume);

    // Video events
    mainVideo.addEventListener('ended', handleVideoEnded);
    mainVideo.addEventListener('error', handleVideoError);
    mainVideo.addEventListener('loadeddata', handleVideoLoaded);

    // Start in fullscreen mode
    requestFullscreen();

    // Hide intro after 4.5 seconds
    setTimeout(() => {
        introOverlay.classList.add('hidden');
    }, 4500);
}

// Video Management
function loadVideo(index) {
    if (index < 0 || index >= VIDEO_PLAYLIST.length) return;

    currentVideoIndex = index;
    mainVideo.src = VIDEO_PLAYLIST[index];
    mainVideo.load();

    updateCurrentVideoDisplay();
    updateStatus('Loading video...', 'loading');
}

function nextVideo() {
    const nextIndex = (currentVideoIndex + 1) % VIDEO_PLAYLIST.length;
    loadVideo(nextIndex);
}

function previousVideo() {
    const prevIndex = (currentVideoIndex - 1 + VIDEO_PLAYLIST.length) % VIDEO_PLAYLIST.length;
    loadVideo(prevIndex);
}

function handleVideoEnded() {
    if (AUTO_ADVANCE_VIDEO) {
        nextVideo();
    }
}

function handleVideoError(e) {
    console.error('Video error:', e);
    updateStatus('Video failed to load', 'error');

    // Try next video after error
    if (AUTO_ADVANCE_VIDEO && VIDEO_PLAYLIST.length > 1) {
        setTimeout(nextVideo, 2000);
    }
}

function handleVideoLoaded() {
    mainVideo.play().catch(err => {
        console.error('Autoplay failed:', err);
        updateStatus('Click to play', 'error');
    });
}

function updateCurrentVideoDisplay() {
    const videoUrl = VIDEO_PLAYLIST[currentVideoIndex];
    const videoName = videoUrl.split('/').pop().split('?')[0];
    currentVideoDisplay.textContent = `${currentVideoIndex + 1}/${VIDEO_PLAYLIST.length}`;
}

// YouTube Player Management
function onYouTubeIframeAPIReady() {
    const config = {
        height: '0',
        width: '0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        },
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playsinline': 1,
            'enablejsapi': 1,
            'origin': window.location.origin
        }
    };

    // Check if we're using playlist or single video
    if (typeof YOUTUBE_PLAYLIST_ID !== 'undefined' && YOUTUBE_PLAYLIST_ID) {
        config.playerVars.listType = 'playlist';
        config.playerVars.list = YOUTUBE_PLAYLIST_ID;
    } else if (typeof YOUTUBE_VIDEO_ID !== 'undefined' && YOUTUBE_VIDEO_ID) {
        config.videoId = YOUTUBE_VIDEO_ID;
        config.playerVars.playlist = YOUTUBE_VIDEO_ID; // Loop single video
    } else {
        updateStatus('No YouTube playlist configured', 'error');
        return;
    }

    player = new YT.Player('youtube-player', config);
}

function onPlayerReady(event) {
    isPlayerReady = true;
    player.setVolume(INITIAL_MUSIC_VOLUME);
    updateStatus('Ready - Music and Video', 'ready');

    // Auto-start music if desired
    // event.target.playVideo();
}

function onPlayerStateChange(event) {
    // Auto-replay if ended
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    updateStatus('Music player error', 'error');
}

// Music Controls
function playMusic() {
    if (isPlayerReady) {
        player.playVideo();
        updateStatus('Playing...', 'ready');
    } else {
        updateStatus('Music player not ready', 'error');
    }
}

function pauseMusic() {
    if (isPlayerReady) {
        player.pauseVideo();
        updateStatus('Music paused', 'loading');
    }
}

function updateMusicVolume() {
    const volume = musicVolume.value;
    volumeValue.textContent = volume + '%';

    if (isPlayerReady) {
        player.setVolume(volume);
    }
}

function updateVideoVolume() {
    const volume = videoVolume.value;
    videoVolumeValue.textContent = volume + '%';
    mainVideo.volume = volume / 100;
}

// UI Controls
function togglePanel() {
    const isHidden = controlPanel.classList.contains('hidden');

    if (isHidden) {
        showPanel();
    } else {
        hidePanel();
    }
}

function showPanel() {
    controlPanel.classList.remove('hidden');
    togglePanelBtn.classList.add('panel-open');
}

function hidePanel() {
    controlPanel.classList.add('hidden');
    togglePanelBtn.classList.remove('panel-open');
}

function updateStatus(message, type) {
    const statusText = statusIndicator.querySelector('span');
    statusText.textContent = message;

    statusIndicator.classList.remove('ready', 'error', 'loading');
    statusIndicator.classList.add(type);

    // Auto-hide success messages
    if (type === 'ready') {
        setTimeout(() => {
            statusIndicator.classList.add('hidden');
        }, 3000);
    } else {
        statusIndicator.classList.remove('hidden');
    }
}

// Fullscreen
function requestFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            nextVideo();
            break;
        case 'ArrowLeft':
            previousVideo();
            break;
        case 'f':
        case 'F':
            requestFullscreen();
            break;
        case ' ':
            e.preventDefault();
            if (isPlayerReady) {
                const state = player.getPlayerState();
                if (state === YT.PlayerState.PLAYING) {
                    pauseMusic();
                } else {
                    playMusic();
                }
            }
            break;
        case 'c':
        case 'C':
            togglePanel();
            break;
    }
});

// Click on video to play (for autoplay restrictions)
mainVideo.addEventListener('click', () => {
    if (mainVideo.paused) {
        mainVideo.play();
        if (isPlayerReady && player.getPlayerState() !== YT.PlayerState.PLAYING) {
            playMusic();
        }
    }
});

// Make YouTube API callback global
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// Start the app
init();
