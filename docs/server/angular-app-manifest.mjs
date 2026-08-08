
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/WONDERWAY/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-QS77NWNY.js",
      "chunk-ZEEZMETG.js"
    ],
    "route": "/WONDERWAY"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QS77NWNY.js",
      "chunk-ZEEZMETG.js"
    ],
    "route": "/WONDERWAY/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-A575FHJM.js",
      "chunk-ZEEZMETG.js"
    ],
    "route": "/WONDERWAY/destinations"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-4GOZ6IRP.js"
    ],
    "route": "/WONDERWAY/destinations/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-NNZM4PIN.js",
      "chunk-A3ZRAD6Q.js",
      "chunk-2CKCRMY4.js",
      "chunk-PNF45WFN.js",
      "chunk-IGTE7NUH.js",
      "chunk-S5HFLVVU.js",
      "chunk-2MIYCHAC.js",
      "chunk-ZEEZMETG.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/booking"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-TD5Y23WO.js",
      "chunk-CDF66QWO.js",
      "chunk-A3ZRAD6Q.js",
      "chunk-S5HFLVVU.js",
      "chunk-2MIYCHAC.js",
      "chunk-ZEEZMETG.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/flights"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BP2A5H5H.js",
      "chunk-CDF66QWO.js",
      "chunk-2CKCRMY4.js",
      "chunk-S5HFLVVU.js",
      "chunk-2MIYCHAC.js",
      "chunk-ZEEZMETG.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/hotels"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-WA7UJPXP.js",
      "chunk-CDF66QWO.js",
      "chunk-PNF45WFN.js",
      "chunk-S5HFLVVU.js",
      "chunk-2MIYCHAC.js",
      "chunk-ZEEZMETG.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/buses"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MGPHEBCO.js",
      "chunk-CDF66QWO.js",
      "chunk-IGTE7NUH.js",
      "chunk-S5HFLVVU.js",
      "chunk-2MIYCHAC.js",
      "chunk-ZEEZMETG.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/cars"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-S72WBZRV.js",
      "chunk-2MIYCHAC.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/my-bookings"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HHP5LVIA.js",
      "chunk-ZEEZMETG.js"
    ],
    "route": "/WONDERWAY/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HRKENUSQ.js",
      "chunk-ZEEZMETG.js"
    ],
    "route": "/WONDERWAY/signup"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-SZZSTSE3.js",
      "chunk-CDF66QWO.js"
    ],
    "route": "/WONDERWAY/about"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-AN66XNIU.js",
      "chunk-CDF66QWO.js",
      "chunk-ZEEZMETG.js"
    ],
    "route": "/WONDERWAY/contact"
  },
  {
    "renderMode": 0,
    "redirectTo": "/WONDERWAY",
    "route": "/WONDERWAY/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2196, hash: '10181a4fac5e6d17c3f8b2c09cac4954dcd2412dab8be006679ecc2f1643d978', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1940, hash: 'ba1c2eace94810cdbe46284c53c77a382f0ea6ec196bff7c3da6ea6dbcf06818', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4WK4OUO.css': {size: 2797, hash: 'QXZvOT55oao', text: () => import('./assets-chunks/styles-O4WK4OUO_css.mjs').then(m => m.default)}
  },
};
