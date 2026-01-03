

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // Consent Mode v2 defaults (DENIED) — must run BEFORE GTM loads Default: deny | everything until user chooses. Default required for Consent Mode v2.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

 // ---- Google Tag Manager ----
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.
    src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MB82N5TC');


// ---- Config | Google Tag Manager Script ----
// const CONSENT_KEY = "https://www.googletagmanager.com/gtm.js?id=G-5X9KFMCNEF"; // bump version if you change policy
// Below optional if using gtag.js config here 
// const MEASUREMENT_ID = "G-5X9KFMCNEF"; 

// ---- Helpers ----
 function getSavedConsent() {
   try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
 }

// function saveConsent(state) {
   localStorage.setItem(CONSENT_KEY, JSON.stringify({
    state,               // "granted" or "denied"
    savedAt: Date.now()
  }));
}

function showBanner() {
  document.getElementById("consent-banner")?.classList.remove("hidden");
}

function hideBanner() {
  document.getElementById("consent-banner")?.classList.add("hidden");
}
// ---- Consent Mode (must run before GA/GTM sends hits) ----
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

// (Optional but recommended) Wait a bit for user choice before firing tags
gtag("consent", "default", { wait_for_update: 500 });

// ---- Initialize GA (optional) ----
// If you load GA via GTM, remove this section.
// If you load GA via gtag.js, keep it and ensure gtag.js is loaded.
function initGAIfNeeded() {
  // Only call config after consent default is set.
  // If you're not using direct gtag.js, skip.
  // gtag("js", new Date());
  // gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
}

// ---- Apply user choice ----
function applyConsent(choice) {
  if (choice === "granted") {
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted"
    });
  } else {
    gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });



  }
}

// ---- UI wiring ----
document.addEventListener("DOMContentLoaded", () => {
  // initGAIfNeeded(); // uncomment if you’re initializing GA here

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