
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/WONDERWAY/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-52K5ADOQ.js"
    ],
    "route": "/WONDERWAY"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-52K5ADOQ.js"
    ],
    "route": "/WONDERWAY/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-66FZ6PLY.js"
    ],
    "route": "/WONDERWAY/destinations"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BRUIT76R.js"
    ],
    "route": "/WONDERWAY/destinations/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-T5RXSTX4.js",
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
    'index.csr.html': {size: 2247, hash: '6dd478569dd9f87c0abca6e79f55cf888833feab3abf141ae5ef7fe073cfdc1f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1991, hash: '094f6a20d529053ab804c976cf3fae2bbf643b37e97149abc2d08e994a7c4475', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4WK4OUO.css': {size: 2797, hash: 'QXZvOT55oao', text: () => import('./assets-chunks/styles-O4WK4OUO_css.mjs').then(m => m.default)}
  },
};
