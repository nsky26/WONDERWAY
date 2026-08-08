
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/WONDERWAY/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-5F45HJH2.js"
    ],
    "route": "/WONDERWAY"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-5F45HJH2.js"
    ],
    "route": "/WONDERWAY/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-CQXBEZXP.js"
    ],
    "route": "/WONDERWAY/destinations"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-JFFXN6EG.js"
    ],
    "route": "/WONDERWAY/destinations/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6ED433GW.js",
      "chunk-RDRRSV3G.js",
      "chunk-TONKJTXU.js",
      "chunk-QND5IPE6.js",
      "chunk-WVEKA5GK.js",
      "chunk-5PQOWIVJ.js",
      "chunk-MDEEA76O.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/booking"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-TFNXDR4F.js",
      "chunk-UYTMN2ED.js",
      "chunk-RDRRSV3G.js",
      "chunk-5PQOWIVJ.js",
      "chunk-MDEEA76O.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/flights"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MAXLFJBI.js",
      "chunk-UYTMN2ED.js",
      "chunk-TONKJTXU.js",
      "chunk-5PQOWIVJ.js",
      "chunk-MDEEA76O.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/hotels"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-IMXSMCEN.js",
      "chunk-UYTMN2ED.js",
      "chunk-QND5IPE6.js",
      "chunk-5PQOWIVJ.js",
      "chunk-MDEEA76O.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/buses"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-LWCD6GTU.js",
      "chunk-UYTMN2ED.js",
      "chunk-WVEKA5GK.js",
      "chunk-5PQOWIVJ.js",
      "chunk-MDEEA76O.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/cars"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-7SHGNAGJ.js",
      "chunk-MDEEA76O.js",
      "chunk-FK6H3RFT.js"
    ],
    "route": "/WONDERWAY/my-bookings"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-P5NFMFM5.js"
    ],
    "route": "/WONDERWAY/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-JWX4YRR3.js"
    ],
    "route": "/WONDERWAY/signup"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-J4IKYK2M.js",
      "chunk-UYTMN2ED.js"
    ],
    "route": "/WONDERWAY/about"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UZPQCZVO.js",
      "chunk-UYTMN2ED.js"
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
    'index.csr.html': {size: 2247, hash: '02d0bed9311f9a03d918f453b0392e9aee206a4b6c629653b50344db398e5356', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1991, hash: 'b858d144c2ee1f9e60c593d58a3a3ae3d1662457a95430ecacdbefde09e6a82f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4WK4OUO.css': {size: 2797, hash: 'QXZvOT55oao', text: () => import('./assets-chunks/styles-O4WK4OUO_css.mjs').then(m => m.default)}
  },
};
