// Default required for Consent Mode v2
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

// Show banner if no saved choice
if (!localStorage.getItem('cookieConsent')) {
  document.getElementById("cookie-banner").style.display = "block";
}

document.getElementById("accept-cookies").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "granted");

  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });

  document.getElementById("cookie-banner").style.display = "none";
});

document.getElementById("deny-cookies").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "denied");

  gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  document.getElementById("cookie-banner").style.display = "none";
});
