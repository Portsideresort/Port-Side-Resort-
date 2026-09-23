/* Raster-only frame renderer. Preview and export use this exact composition. */
(() => {
  "use strict";
  const assetBase = new URL("gallery-assets/", document.baseURI);
  const defaults = { aperture: [0.10, 0.09, 0.80, 0.71], logo: [0.25, 0.825, 0.50, 0.145] };
  let manifest, atlas, logo;
  let loading;
  const readImage = src => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("ASSETS_UNAVAILABLE"));
    image.src = src;
  });
  const load = () => {
    if (!loading) loading = Promise.all([
      fetch(new URL("frames-manifest.json", assetBase), { cache: "no-cache" }).then(r => {
        if (!r.ok) throw new Error("ASSETS_UNAVAILABLE");
        return r.json();
      }),
      readImage(new URL("hotel-logo-gold.png", document.baseURI).href)
    ]).then(async ([data, originalLogo]) => {
      if (!Array.isArray(data.frames) || data.frames.length !== 10 || data.frames.some(frame => !frame.id || !Array.isArray(frame.sourceRect) || !Array.isArray(frame.aperture))) throw new Error("ASSETS_UNAVAILABLE");
      const art = await readImage(new URL(data.atlas, assetBase).href);
      manifest = data;
      atlas = art;
      logo = originalLogo;
      return data.frames;
    }).catch(error => { loading = null; throw error; });
    return loading;
  };
  const geometry = (width, height, frame, orientation) => {
    const layout = frame?.[orientation] || manifest?.[orientation] || {};
    const aperture = layout.aperture || frame?.aperture || manifest?.aperture || defaults.aperture;
    const logoBox = layout.logo || frame?.logo || manifest?.logo || defaults.logo;
    return {
      photo: { x: aperture[0] * width, y: aperture[1] * height, w: aperture[2] * width, h: aperture[3] * height },
      logo: { x: logoBox[0] * width, y: logoBox[1] * height, w: logoBox[2] * width, h: logoBox[3] * height }
    };
  };
  const crop = (image, box, edit) => {
    const base = (edit.fit === "contain" ? Math.min : Math.max)(box.w / image.width, box.h / image.height);
    const scale = base * edit.zoom;
    const w = image.width * scale, h = image.height * scale;
    const maxX = Math.abs(w - box.w) / 2, maxY = Math.abs(h - box.h) / 2;
    return { x: box.x + (box.w - w) / 2 + edit.panX * maxX, y: box.y + (box.h - h) / 2 + edit.panY * maxY, w, h, maxX, maxY };
  };
  const paint = (canvas, edit, image, emptyLabel = "") => {
    const ctx = canvas.getContext("2d", { alpha: false });
    const width = canvas.width, height = canvas.height;
    const frame = manifest?.frames.find(item => item.id === edit.frameId) || manifest?.frames[0];
    const boxes = geometry(width, height, frame, edit.orientation);
    ctx.fillStyle = frame?.matte || "#0b1b2b";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = frame?.matte || "#0b1b2b";
    ctx.fillRect(boxes.photo.x, boxes.photo.y, boxes.photo.w, boxes.photo.h);
    if (image) {
      const drawn = crop(image, boxes.photo, edit);
      ctx.save();
      ctx.beginPath();
      // Extend two source-art pixels beneath the raster border to hide seams.
      const bleed = frame?.sourceRect ? 2 * width / frame.sourceRect[2] : 2;
      ctx.rect(boxes.photo.x - bleed, boxes.photo.y - bleed, boxes.photo.w + bleed * 2, boxes.photo.h + bleed * 2);
      ctx.clip();
      ctx.drawImage(image, drawn.x, drawn.y, drawn.w, drawn.h);
      ctx.restore();
    } else {
      ctx.fillStyle = "#e7c46f";
      ctx.font = `${Math.round(width * 0.026)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(emptyLabel, width / 2, boxes.photo.y + boxes.photo.h / 2, boxes.photo.w * 0.85);
    }
    if (atlas && frame) {
      const [sx, sy, sw, sh] = frame.sourceRect;
      ctx.drawImage(atlas, sx, sy, sw, sh, 0, 0, width, height);
    }
    if (logo) {
      const scale = Math.min(boxes.logo.w / logo.naturalWidth, boxes.logo.h / logo.naturalHeight);
      const lw = logo.naturalWidth * scale, lh = logo.naturalHeight * scale;
      // Always the original, unmodified logo, outside the crop and above artwork.
      ctx.drawImage(logo, boxes.logo.x + (boxes.logo.w - lw) / 2, boxes.logo.y + (boxes.logo.h - lh) / 2, lw, lh);
    }
    return { boxes, crop: image ? crop(image, boxes.photo, edit) : null };
  };
  const exportJpeg = async (edit, image) => {
    await load();
    const canvas = document.createElement("canvas");
    canvas.width = edit.orientation === "portrait" ? 1200 : 1600;
    canvas.height = edit.orientation === "portrait" ? 1600 : 1200;
    paint(canvas, edit, image);
    for (const quality of [0.91, 0.85, 0.77, 0.66, 0.55]) {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= 3 * 1024 * 1024) return blob;
    }
    throw new Error("BAD_IMAGE");
  };
  const exportOriginalJpeg = async image => {
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 1600 / Math.max(image.width, image.height));
    canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d", { alpha: false });
    context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.91, 0.85, 0.77, 0.66, 0.55]) {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= 3 * 1024 * 1024) return blob;
    }
    throw new Error("BAD_IMAGE");
  };
  window.PortSideGalleryFrames = { load, paint, exportJpeg, exportOriginalJpeg };
})();
