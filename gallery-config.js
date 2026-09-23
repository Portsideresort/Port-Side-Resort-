(function () {
  "use strict";
  const localPreview = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname) || window.location.protocol === "file:";
  window.PORTSIDE_GALLERY_API = localPreview
    ? "http://127.0.0.1:8782"
    : "https://port-side-guest-gallery.cream-melon-9853.chatgpt.site";
})();
