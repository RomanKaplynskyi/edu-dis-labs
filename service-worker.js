/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "02_01.jpg",
    "revision": "ab5a1945af3a58100cf087364ed84ad9"
  },
  {
    "url": "02_02.jpg",
    "revision": "80d204735ea3f010cc0e08c72fa13919"
  },
  {
    "url": "02_03.jpg",
    "revision": "f2c985fcff1a0a0b67c79b5dd19e99a8"
  },
  {
    "url": "02_04.jpg",
    "revision": "335f379fde82f7504d906d47a6c0f3b2"
  },
  {
    "url": "02_05.jpg",
    "revision": "8de476d772acf2b73151e5d5e9db2478"
  },
  {
    "url": "02_06.jpg",
    "revision": "5e234b80bf1f6a84eed177e0e7c8c637"
  },
  {
    "url": "02_07.jpg",
    "revision": "00059846ffe7a123464dfb4bdd642ada"
  },
  {
    "url": "02_08.jpg",
    "revision": "842021cd10be0e417cae96ce4aaa24da"
  },
  {
    "url": "02_09.jpg",
    "revision": "f0ce4b89338711d438b5499dbdb57abd"
  },
  {
    "url": "02_10.jpg",
    "revision": "95f05560e3abd7595bd2c5251e459c91"
  },
  {
    "url": "1.jpg",
    "revision": "156417c6ab82dc30b9cbb3085513c8cf"
  },
  {
    "url": "2.jpg",
    "revision": "392accfbfa678991bbb3ef8975bbedb4"
  },
  {
    "url": "3.jpg",
    "revision": "fda5dd7abc20fda207559f3f1748cb10"
  },
  {
    "url": "4.jpg",
    "revision": "eb7256751737e14f644e540e8e7ff079"
  },
  {
    "url": "404.html",
    "revision": "c6be90d3ea70f46cdfb608d18e309748"
  },
  {
    "url": "5.jpg",
    "revision": "1349137911dca5319e6a68c4ef10d76b"
  },
  {
    "url": "api/index.html",
    "revision": "c83b4773f991a500eedaeda2ed2d43b8"
  },
  {
    "url": "assets/css/0.styles.178e1a70.css",
    "revision": "2c9328e614d8d7c9621e1df4c32d8546"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5d5296ab.js",
    "revision": "5057569dc9815077ee7d2239c288f873"
  },
  {
    "url": "assets/js/11.7227b195.js",
    "revision": "7da992d204bda4cc463737d90c32fab0"
  },
  {
    "url": "assets/js/12.d9af3753.js",
    "revision": "82ae2832a81ab95ad8a57eaee51dbbac"
  },
  {
    "url": "assets/js/13.b8dd9aae.js",
    "revision": "66acaad5a75aadc7c40d2732d6b34b55"
  },
  {
    "url": "assets/js/14.f76bc3b8.js",
    "revision": "4310b95ff07aa30cdc6b9b0997122ace"
  },
  {
    "url": "assets/js/15.5d41688e.js",
    "revision": "97f90ca1df8e43cab20d1c4aead5a83e"
  },
  {
    "url": "assets/js/16.62288e0a.js",
    "revision": "b479a747332d3c132018c6392177a252"
  },
  {
    "url": "assets/js/17.49b85c6e.js",
    "revision": "619895115fc8ea86a2d804f9d65160b5"
  },
  {
    "url": "assets/js/18.f99339da.js",
    "revision": "e836b6d1d120e385108a4de09958bb0c"
  },
  {
    "url": "assets/js/19.81b795fc.js",
    "revision": "2aed9a027de84fbacc5693bf8c6093be"
  },
  {
    "url": "assets/js/2.d2c00dab.js",
    "revision": "d2f5f24249ac8ddd7ff685d95196f4b8"
  },
  {
    "url": "assets/js/20.2fc292c0.js",
    "revision": "d1bddf96552f90e542a96a93d66e800e"
  },
  {
    "url": "assets/js/21.3b6655ea.js",
    "revision": "bc2bf236f30d2168ed9d92a981cfa208"
  },
  {
    "url": "assets/js/22.726d843f.js",
    "revision": "43627b61255ced1d141a62444c4f5be6"
  },
  {
    "url": "assets/js/23.df4ecd71.js",
    "revision": "2d5175efe342210a2970ec39df554e7a"
  },
  {
    "url": "assets/js/24.9cf4e97c.js",
    "revision": "77257f2e01169636a46efbe89cd6c8ff"
  },
  {
    "url": "assets/js/26.87ff770b.js",
    "revision": "78f4e8b74647795453feb067e07475f5"
  },
  {
    "url": "assets/js/3.2c27ece5.js",
    "revision": "17124352913d5e75858d752c264f9b4f"
  },
  {
    "url": "assets/js/4.5042fbeb.js",
    "revision": "90773e0bf4d6aedee55e1e07f94825f3"
  },
  {
    "url": "assets/js/5.8b0efd2b.js",
    "revision": "c9beef560d0921ec782fc523cb380eac"
  },
  {
    "url": "assets/js/6.aeddef27.js",
    "revision": "f0306f9ae855a5709fc912bdfb73d3e8"
  },
  {
    "url": "assets/js/7.4bdd093e.js",
    "revision": "092f44f9b407c40b73864c16ea45c86b"
  },
  {
    "url": "assets/js/8.e2d1a40b.js",
    "revision": "66bf12cafa81a9fa5719be210656ce33"
  },
  {
    "url": "assets/js/9.cce8dc66.js",
    "revision": "216a81c2270a5b232cdc9ed63a7ba71c"
  },
  {
    "url": "assets/js/app.3700a9c6.js",
    "revision": "d9a8c55a1cd93a7863ec7904666ee1e1"
  },
  {
    "url": "conclusion/index.html",
    "revision": "50cd8d9553ffee93fd34cc8bf943008c"
  },
  {
    "url": "design/index.html",
    "revision": "b2d032b48d5d29a47fa56876dbb9f092"
  },
  {
    "url": "index.html",
    "revision": "121cc7cb9ffd789022f9e3d98bdfc7de"
  },
  {
    "url": "intro/index.html",
    "revision": "3b2790860ef6503edbac1a7b4f49aeca"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "e516ca3f992888a70f1f17d90ab193c1"
  },
  {
    "url": "software/index.html",
    "revision": "3d1ac094130058f2e7e4b6bde11964fe"
  },
  {
    "url": "software/koa-server.html",
    "revision": "5bfc0de5825d470f3bf25c2616af948e"
  },
  {
    "url": "software/restfull-services.html",
    "revision": "11f81cae4609eaa3499f6fb060ae88c8"
  },
  {
    "url": "test/index.html",
    "revision": "e094594976b6eb2dd06d558d6bff5e4f"
  },
  {
    "url": "testPass.jpg",
    "revision": "c60dd8d28aea6689924e8d71058657ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
