let customAudio = new Audio();
let audioLoaded = false;
let endingActive = false;
let endingStartTime = 0;
let endingEndTime = 0;
let isExtensionEnabled = true;
let lastUrl = location.href;
const ENDING_DURATION_SECONDS = 90;

function updateExtensionState() {
    try {
        if (chrome.runtime && chrome.runtime.id) {
            chrome.storage.local.get(['isEnabled'], (data) => {
                isExtensionEnabled = data.isEnabled !== false;
            });
        }
    } catch (e) {}
}

updateExtensionState();
try {
    if (chrome.runtime && chrome.runtime.id) {
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === 'local' && changes.isEnabled) {
                isExtensionEnabled = changes.isEnabled.newValue !== false;
            }
        });
    }
} catch (e) {}

function initAudio() {
    try {
        const audioUrl = chrome.runtime.getURL('ending.mp3');
        customAudio.src = audioUrl;
        customAudio.preload = 'auto';
        customAudio.load();
        audioLoaded = true;
    } catch (e) {
        console.error("[SBR Fixer] Error:", e);
    }
}

initAudio();

function isSteelBallRun() {
    const currentUrl = window.location.href;
    const sbrPattern = /\/watch\/821322\d{2}/;

    return sbrPattern.test(currentUrl);
}

const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        restoreOriginalAudio();
    }

    if (!isExtensionEnabled) return;
    if (!isSteelBallRun()) return;
    if (!audioLoaded) return;

    const video = document.querySelector('video');
    const skipCreditsButton = document.querySelector('button[data-uia="watch-credits-seamless-button"]') ||
                              Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('créditos'));

    if (skipCreditsButton && video && !endingActive) {
        endingActive = true;
        endingStartTime = video.currentTime;
        endingEndTime = endingStartTime + ENDING_DURATION_SECONDS;

        video.muted = true;
        customAudio.currentTime = 0;
        customAudio.play()
            .then()
            .catch(e => console.log("[SBR Fixer] Error:", e));
    }
});

observer.observe(document.body, { childList: true, subtree: true });

setInterval(() => {
    if (!endingActive) return;

    const video = document.querySelector('video');
    if (!video) return;

    if (video.currentTime >= endingEndTime || video.ended || video.paused || video.currentTime < endingStartTime) {
        restoreOriginalAudio();
    }
}, 500);

function restoreOriginalAudio() {
    const video = document.querySelector('video');
    if (video) {
        video.muted = false;
    }
    customAudio.pause();
    customAudio.currentTime = 0;
    endingActive = false;
}