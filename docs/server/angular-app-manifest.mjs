
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
      "chunk-TFP3M6WA.js",
      "chunk-AUTGUEE3.js"
    ],
    "route": "/WONDERWAY/destinations"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-H5OSIPFU.js"
    ],
    "route": "/WONDERWAY/destinations/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MNGBSHG6.js",
      "chunk-ZPTHX7BJ.js",
      "chunk-7B44O3WN.js",
      "chunk-D2IDKKYR.js",
      "chunk-KTZENVUF.js",
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
      "chunk-2USBO3CT.js",
      "chunk-46JTSNG5.js",
      "chunk-ZPTHX7BJ.js",
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
      "chunk-GW2G3XMS.js",
      "chunk-46JTSNG5.js",
      "chunk-7B44O3WN.js",
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
      "chunk-G5NARQYF.js",
      "chunk-46JTSNG5.js",
      "chunk-D2IDKKYR.js",
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
      "chunk-KXBT5WRT.js",
      "chunk-46JTSNG5.js",
      "chunk-KTZENVUF.js",
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
      "chunk-ZUYAFG3I.js",
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
    'index.csr.html': {size: 2196, hash: 'debfa32eed75186a20e2a3bdb1135d4c6dfc0bf781f6d0fec4561216ebfffe00', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1940, hash: '25d08957f678d80d00e2291f228152e23fe335a929829b9a28afcad0232dacbc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4WK4OUO.css': {size: 2797, hash: 'QXZvOT55oao', text: () => import('./assets-chunks/styles-O4WK4OUO_css.mjs').then(m => m.default)}
  },
};
