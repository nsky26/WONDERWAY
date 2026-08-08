export default `<!doctype html>
<html lang="en" data-beasties-container="">
<head>
  <meta charset="utf-8">
  <title>WonderWay - Your Travel Companion</title>
  <base href="/WONDERWAY/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="WonderWay - Discover amazing destinations and create unforgettable travel memories with our comprehensive booking platform.">
  <script type="text/javascript">
    (function() {
      var redirect = sessionStorage.getItem('gh_pages_redirect');
      if (redirect) {
        sessionStorage.removeItem('gh_pages_redirect');
        var basePath = '/WONDERWAY/';
        if (redirect.startsWith(basePath)) {
          var targetPath = redirect.substring(basePath.length);
          if (targetPath) {
            window.history.replaceState(null, null, basePath + targetPath);
          }
        }
      }
    })();
  </script>
<style>*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;-webkit-overflow-scrolling:touch}*{scroll-behavior:smooth}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#fff;background:linear-gradient(135deg,#0a192f,#112240,#0a192f);background-attachment:fixed;line-height:1.6;min-height:100vh}@media(max-width:768px){body{font-size:14px}}body{transition:background .3s ease,color .3s ease}body *{transition:background-color .3s ease,color .3s ease,border-color .3s ease}</style><link rel="stylesheet" href="styles-O4WK4OUO.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles-O4WK4OUO.css"></noscript></head>
<body ngcm="">
  <app-root></app-root>
<link rel="modulepreload" href="chunk-W7EWJRGV.js"><link rel="modulepreload" href="chunk-SVHOOMYT.js"><link rel="modulepreload" href="chunk-E62G6SY4.js"><link rel="modulepreload" href="chunk-JKPOOQOI.js"><link rel="modulepreload" href="chunk-EVWWTTG3.js"><link rel="modulepreload" href="chunk-HS6P6E6U.js"><link rel="modulepreload" href="chunk-Y75VIMH6.js"><link rel="modulepreload" href="chunk-KAT7YFEL.js"><script src="main-OFI2CX5T.js" type="module"></script></body>
</html>
`;