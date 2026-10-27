import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent";

/**
 * Runs in <head> before gtag or ad tags. Defaults Consent Mode to denied.
 * A stored allow can grant before the first Google request on a return visit.
 */
export function ConsentDefaultsScript() {
  return (
    <script
      id="bc-consent-defaults"
      dangerouslySetInnerHTML={{
        __html: `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  var denied = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  };
  try {
    var raw = localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
    var s = raw ? JSON.parse(raw) : null;
    if (s && s.version === ${CONSENT_VERSION} && s.decided === true) {
      gtag("consent", "default", {
        analytics_storage: s.analytics === true ? "granted" : "denied",
        ad_storage: s.advertising === true ? "granted" : "denied",
        ad_user_data: s.advertising === true ? "granted" : "denied",
        ad_personalization: s.advertising === true ? "granted" : "denied"
      });
    } else {
      gtag("consent", "default", denied);
    }
  } catch (e) {
    gtag("consent", "default", denied);
  }
})();`,
      }}
    />
  );
}
