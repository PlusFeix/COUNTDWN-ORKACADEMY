// Configurazione Analytics per Mr. ORK Trading Academy
// IMPORTANTE: Sostituisci i placeholder con i tuoi ID reali prima del deploy

const ANALYTICS_CONFIG = {
  // Google Analytics 4
  google: {
    measurementId: 'GA_MEASUREMENT_ID', // Sostituisci con il tuo GA4 ID
    events: {
      page_view: 'page_view',
      croc_clicked: 'croc_clicked',
      modal_opened: 'modal_opened',
      form_started: 'form_started',
      form_submitted: 'form_submitted',
      conversion: 'conversion'
    }
  },

  // Facebook Pixel
  facebook: {
    pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // Sostituisci con il tuo Pixel ID
    events: {
      pageView: 'PageView',
      lead: 'Lead',
      viewContent: 'ViewContent',
      initCheckout: 'InitiateCheckout'
    }
  },

  // Google Ads Conversion
  googleAds: {
    conversionId: 'AW-CONVERSION_ID', // Sostituisci con il tuo Conversion ID
    conversionLabel: 'CONVERSION_LABEL' // Sostituisci con la tua Label
  },

  // Microsoft Clarity (Heatmaps)
  clarity: {
    projectId: 'YOUR_CLARITY_PROJECT_ID' // Sostituisci con il tuo Project ID
  },

  // Hotjar (Alternative heatmaps)
  hotjar: {
    hjid: 'YOUR_HOTJAR_ID', // Sostituisci con il tuo Hotjar ID
    hjsv: 6
  }
};

// Funzioni helper per tracking
const AnalyticsHelper = {
  // Google Analytics tracking
  trackGA(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'engagement',
        event_label: window.location.pathname,
        ...parameters
      });
    }
  },

  // Facebook Pixel tracking
  trackFB(eventName, parameters = {}) {
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, parameters);
    }
  },

  // Track conversions
  trackConversion(value = 0, currency = 'EUR') {
    // Google Analytics conversion
    this.trackGA('conversion', {
      value: value,
      currency: currency
    });

    // Facebook Pixel conversion
    this.trackFB('Lead', {
      value: value,
      currency: currency
    });

    // Google Ads conversion
    if (typeof gtag !== 'undefined' && ANALYTICS_CONFIG.googleAds.conversionId) {
      gtag('event', 'conversion', {
        'send_to': `${ANALYTICS_CONFIG.googleAds.conversionId}/${ANALYTICS_CONFIG.googleAds.conversionLabel}`,
        'value': value,
        'currency': currency
      });
    }
  },

  // Track form events
  trackFormEvent(eventType, fieldName = '', errorMessage = '') {
    const parameters = {
      form_name: 'waitlist_form',
      field_name: fieldName,
      error_message: errorMessage
    };

    this.trackGA(`form_${eventType}`, parameters);
  },

  // Track scroll depth
  trackScrollDepth(depth) {
    this.trackGA('scroll', {
      scroll_depth: depth,
      page_title: document.title
    });
  },

  // Track time on page
  trackTimeOnPage(seconds) {
    this.trackGA('timing_complete', {
      name: 'time_on_page',
      value: seconds
    });
  }
};

// Configurazione per implementazione nel sito
const IMPLEMENTATION_CODE = {
  // Google Analytics (inserire nel <head>)
  googleAnalytics: `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.google.measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${ANALYTICS_CONFIG.google.measurementId}');
</script>`,

  // Facebook Pixel (inserire nel <head>)
  facebookPixel: `
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${ANALYTICS_CONFIG.facebook.pixelId}');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${ANALYTICS_CONFIG.facebook.pixelId}&ev=PageView&noscript=1"
/></noscript>`,

  // Microsoft Clarity (inserire nel <head>)
  microsoftClarity: `
<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.clarity.projectId}");
</script>`,

  // Hotjar (inserire nel <head>)
  hotjar: `
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${ANALYTICS_CONFIG.hotjar.hjid},hjsv:${ANALYTICS_CONFIG.hotjar.hjsv}};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
};

// Esporta configurazione (se usi moduli)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ANALYTICS_CONFIG, AnalyticsHelper, IMPLEMENTATION_CODE };
}

// Esempio di utilizzo nel sito
/*
// Nel tuo JavaScript principale:

// Track click coccodrillo
crocContainer.addEventListener('click', () => {
  AnalyticsHelper.trackGA('croc_clicked', {
    timestamp: new Date().toISOString(),
    remaining_spots: remainingSpots
  });
  AnalyticsHelper.trackFB('ViewContent', {
    content_name: 'Croc Clicked',
    content_category: 'engagement'
  });
});

// Track form submission
form.addEventListener('submit', async (e) => {
  AnalyticsHelper.trackFormEvent('submitted');
  
  // Dopo il successo
  AnalyticsHelper.trackConversion(0, 'EUR'); // Valore 0 per lead gratuito
});

// Track errori form
if (!isValid) {
  AnalyticsHelper.trackFormEvent('error', fieldName, errorMessage);
}
*/
