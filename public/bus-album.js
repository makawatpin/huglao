(() => {
  if (window.huglaoAlbumReady) return;
  window.huglaoAlbumReady = true;
  let photos = [], index = 0, opener;
  const dialog = document.createElement('dialog');
  dialog.className = 'bus-lightbox';
  dialog.setAttribute('aria-label', 'อัลบั้มภาพรถพาร์ตเนอร์');
  dialog.innerHTML = '<div class="bus-lightbox-bar"><span data-count></span><button type="button" data-close aria-label="ปิดอัลบั้ม">ปิด ×</button></div><div class="bus-lightbox-stage"><button type="button" data-prev aria-label="ภาพก่อนหน้า">‹</button><img alt=""><button type="button" data-next aria-label="ภาพถัดไป">›</button></div><p data-caption aria-live="polite"></p><div class="bus-lightbox-thumbs"></div>';
  document.body.append(dialog);
  function show(next) {
    index = (next + photos.length) % photos.length;
    const photo = photos[index];
    dialog.querySelector('img').src = photo.href;
    dialog.querySelector('img').alt = photo.querySelector('img').alt;
    dialog.querySelector('[data-caption]').textContent = photo.dataset.caption;
    dialog.querySelector('[data-count]').textContent = `${index + 1} / ${photos.length}`;
    dialog.querySelectorAll('[data-thumb]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  document.addEventListener('click', event => {
    const photo = event.target.closest('[data-bus-photo]');
    if (!photo || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = photo;
    photos = [...photo.closest('[data-bus-album]').querySelectorAll('[data-bus-photo]')];
    const thumbs = dialog.querySelector('.bus-lightbox-thumbs');
    thumbs.replaceChildren(...photos.map((item, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.dataset.thumb = String(i);
      button.setAttribute('aria-label', `ดูภาพที่ ${i + 1}`);
      const image = item.querySelector('img').cloneNode();
      image.removeAttribute('class'); image.removeAttribute('style'); image.removeAttribute('sizes'); image.removeAttribute('srcset'); image.loading = 'eager'; image.src = item.href;
      button.append(image); button.onclick = () => show(i); return button;
    }));
    show(photos.indexOf(photo)); dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  });
  dialog.querySelector('[data-prev]').onclick = () => show(index - 1);
  dialog.querySelector('[data-next]').onclick = () => show(index + 1);
  dialog.querySelector('[data-close]').onclick = () => dialog.close();
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
  });
  let touchX, touchY;
  dialog.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; touchY = event.changedTouches[0].clientY; }, { passive: true });
  dialog.addEventListener('touchend', event => { const delta = event.changedTouches[0].clientX - touchX; const vertical = event.changedTouches[0].clientY - touchY; if (Math.abs(delta) > 60 && Math.abs(delta) > Math.abs(vertical)) show(index + (delta < 0 ? 1 : -1)); }, { passive: true });
  dialog.addEventListener('close', () => { document.documentElement.style.overflow = ''; opener?.focus(); });
})();
