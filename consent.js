const CONSENT_KEY = "myitguy_cookie_consent_v1";

function getSavedConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); }
  catch { return null; }
}

function saveConsent(state) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ state, savedAt: Date.now() }));
}

function showBanner() {
  document.getElementById("consent-banner")?.classList.remove("hidden");
}

function hideBanner() {
  document.getElementById("consent-banner")?.classList.add("hidden");
}

function applyConsent(state) {
  const granted = state === "granted";
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }

  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = getSavedConsent();

  if (!saved?.state) {
    showBanner();
  } else {
    applyConsent(saved.state);
    hideBanner();
  }

  document.getElementById("consent-accept")?.addEventListener("click", () => {
    saveConsent("granted");
    applyConsent("granted");
    hideBanner();
  });

  document.getElementById("consent-deny")?.addEventListener("click", () => {
    saveConsent("denied");
    applyConsent("denied");
    hideBanner();
  });
});
