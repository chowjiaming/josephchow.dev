const select = document.querySelector('[data-locale-switcher]');
if (select instanceof HTMLSelectElement) {
  select.addEventListener('change', () => {
    const selected = select.selectedOptions[0];
    const href = selected?.dataset.href;
    const path = select.value;
    const cookieName = select.dataset.cookieName ?? 'locale';
    if (!href) {
      return;
    }
    // Cookie Store API is not universal enough for this Netlify Edge handshake.
    // biome-ignore lint/suspicious/noDocumentCookie: sync cookie for edge locale redirect
    document.cookie = `${cookieName}=${encodeURIComponent(path)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    window.location.assign(href);
  });
}
