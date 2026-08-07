
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/WONDERWAY/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-DYN6LD4U.js",
      "chunk-AUTGUEE3.js"
    ],
    "route": "/WONDERWAY"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-DYN6LD4U.js",
      "chunk-AUTGUEE3.js"
    ],
    "route": "/WONDERWAY/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-GQSCD2J2.js",
      "chunk-AUTGUEE3.js"
    ],
    "route": "/WONDERWAY/destinations"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-HLXW7UUI.js"
    ],
    "route": "/WONDERWAY/destinations/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-JZOND4H6.js",
      "chunk-O3G746KC.js",
      "chunk-GW2W4EDV.js",
      "chunk-KE5R6TNZ.js",
      "chunk-T3PZXGFY.js",
      "chunk-HVHSU7I6.js",
      "chunk-PW6IALES.js",
      "chunk-AUTGUEE3.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/booking"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QPCPJOAI.js",
      "chunk-46JTSNG5.js",
      "chunk-O3G746KC.js",
      "chunk-HVHSU7I6.js",
      "chunk-PW6IALES.js",
      "chunk-AUTGUEE3.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/flights"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-KPQ7D2GQ.js",
      "chunk-46JTSNG5.js",
      "chunk-GW2W4EDV.js",
      "chunk-HVHSU7I6.js",
      "chunk-PW6IALES.js",
      "chunk-AUTGUEE3.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/hotels"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BKPOHF6D.js",
      "chunk-46JTSNG5.js",
      "chunk-KE5R6TNZ.js",
      "chunk-HVHSU7I6.js",
      "chunk-PW6IALES.js",
      "chunk-AUTGUEE3.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/buses"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-KHIH5DKD.js",
      "chunk-46JTSNG5.js",
      "chunk-T3PZXGFY.js",
      "chunk-HVHSU7I6.js",
      "chunk-PW6IALES.js",
      "chunk-AUTGUEE3.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/cars"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-5FYMXWNC.js",
      "chunk-PW6IALES.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/my-bookings"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MRTV25Z7.js",
      "chunk-AUTGUEE3.js"
    ],
    "route": "/WONDERWAY/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-DU3LUOWR.js",
      "chunk-AUTGUEE3.js"
    ],
    "route": "/WONDERWAY/signup"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-V5DOBB2H.js",
      "chunk-46JTSNG5.js"
    ],
    "route": "/WONDERWAY/about"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-4UWZX43U.js",
      "chunk-46JTSNG5.js",
      "chunk-AUTGUEE3.js"
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
    'index.csr.html': {size: 2176, hash: 'e208a8282a84ce37d15b0c3af40bc0c55be3c93fe53bc60614a580e9a350d4a6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1920, hash: '3040fbb40ab7cc4a9068ebd8b342c8a03b16f050d542013245ff0da3df0a079d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4WK4OUO.css': {size: 2797, hash: 'QXZvOT55oao', text: () => import('./assets-chunks/styles-O4WK4OUO_css.mjs').then(m => m.default)}
  },
};
