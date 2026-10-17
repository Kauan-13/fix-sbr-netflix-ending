document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('enabledToggle');
    const statusMsg = document.getElementById('statusMsg');

    chrome.storage.local.get(['isEnabled'], (data) => {
        toggle.checked = data.isEnabled !== false;
    });

    toggle.addEventListener('change', () => {
        chrome.storage.local.set({ isEnabled: toggle.checked }, () => {
            statusMsg.textContent = toggle.checked ? 'Extensão ativada!' : 'Extensão desativada.';
            setTimeout(() => statusMsg.textContent = '', 2000);
        });
    });
});