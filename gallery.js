(() => {
  "use strict";
  const root = document.getElementById("gallery");
  const frames = window.PortSideGalleryFrames;
  if (!root || !frames) return;
  const isLoopback = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(location.hostname);
  const configuredApi = typeof window.PORTSIDE_GALLERY_API === "string" ? window.PORTSIDE_GALLERY_API.trim() : "";
  const apiBase = (configuredApi || (isLoopback ? "http://127.0.0.1:8782" : "")).replace(/\/$/, "");
  const VOTER_STORAGE_KEY = "ps-photo-like-v1";
  const validVoterToken = value => typeof value === "string" && /^[A-Za-z0-9._~-]{20,160}$/.test(value);
  const createVoterToken = () => {
    const bytes = new Uint8Array(24);
    if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
    else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256); });
    return `v1.${Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("")}`;
  };
  const voterToken = (() => {
    try {
      const saved = localStorage.getItem(VOTER_STORAGE_KEY);
      if (validVoterToken(saved)) return saved;
      const created = createVoterToken();
      localStorage.setItem(VOTER_STORAGE_KEY, created);
      return created;
    } catch {
      return createVoterToken();
    }
  })();
  const voterHeaders = headers => ({ ...(headers || {}), "X-Gallery-Voter": voterToken });
  const strings = {
    de: {
      adminSetup: "Der Administratorzugang ist für diese Live-Website noch nicht eingerichtet. Der lokale Demo-Zugang kann hier nicht verwendet werden.",
      manage: "Meine Fotos verwalten", manageTitle: "Meine Fotos", login: "Anmelden", loggingIn: "Wird geprüft…", logout: "Abmelden", adminActive: "Administrator-Löschrechte aktiv", guestActive: "Du kannst deine eigenen Fotos bearbeiten oder löschen.", accessHelp: "Vor- und Nachname und Zimmernummer werden gemeinsam als einfache Zugangsdaten verwendet. Wer beide kennt, kann auf diese Fotos zugreifen.", unauthorized: "Zugriff nicht bestätigt. Bitte melde dich erneut mit Vor- und Nachname und Zimmernummer an.", sessionExpired: "Deine Berechtigung ist abgelaufen. Bitte erneut anmelden.", deletePhoto: "Löschen", deleteTitle: "Dieses Foto löschen?", deleteQuestion: "Nur dieses Foto wird aus der öffentlichen Galerie entfernt. Das lässt sich nicht rückgängig machen.", cancel: "Abbrechen", confirmDelete: "Ja, dieses Foto löschen", deleting: "Wird gelöscht…", deleted: "Dieses Foto wurde entfernt.", deleteFailed: "Die Löschung konnte nicht bestätigt werden. Bitte prüfe die Galerie, bevor du es erneut versuchst.", logoutFailed: "Du bist hier abgemeldet. Die serverseitige Abmeldung konnte nicht bestätigt werden.", editPhoto: "Bearbeiten", editTitle: "Dein Foto bearbeiten", saveEdit: "Änderungen speichern", savingEdit: "Wird gespeichert…", editSaved: "Dein Foto wurde aktualisiert.", myPhotos: "Meine Fotos", mineEmpty: "Für diesen Namen und dieses Zimmer sind noch keine Fotos vorhanden.", legacyOriginal: "Für dieses ältere Foto fehlt das Original. Wähle bitte das ursprüngliche Foto. Die veröffentlichte Version bleibt bis zum Speichern unverändert.", originalRequired: "Bitte wähle das ursprüngliche Foto, bevor du speicherst.", editLoading: "Foto wird zum Bearbeiten geladen…", uploadAccessFailed: "Dein Foto wurde veröffentlicht. Melde dich an, um es zu verwalten; bitte lade es nicht erneut hoch.", newPhoto: "Neues Foto teilen",
      previewNotice: "Vorschau · Diese Beiträge erscheinen nicht auf der Live-Website.", removed: "Dieser Beitrag wurde von der Administration entfernt. Der erneute Sendeversuch wurde beendet.",
      kicker: "UNSERE URLAUBSMOMENTE", title: "Gästegalerie", intro: "Eure schönsten Momente im Port Side.", share: "Foto teilen", all: "Alle Fotos ansehen →", loading: "Fotos werden geladen…", empty: "Noch keine Fotos – teile den ersten Urlaubsmoment!", unavailable: "Die Galerie ist gerade nicht erreichbar. Bitte versuche es später erneut.", close: "Schließen", editorTitle: "Dein Port-Side-Moment", choose: "Foto auswählen", replace: "Foto wechseln", fileHelp: "JPG, PNG oder WebP · maximal 20 MB. Das fertige Bild wird verkleinert; Standort- und Kameradaten werden entfernt.", photoPrompt: "Wähle dein Urlaubsfoto", portrait: "Hochformat 3:4", landscape: "Querformat 4:3", cover: "Rahmen ausfüllen", contain: "Ganzes Foto zeigen", moveHelp: "Foto ziehen oder mit zwei Fingern vergrößern. Mit den Pfeiltasten verschieben; + / − zum Zoomen.", zoomOut: "Verkleinern", zoomIn: "Vergrößern", reset: "Zurücksetzen", left: "Nach links", right: "Nach rechts", up: "Nach oben", down: "Nach unten", name: "Dein Name *", room: "Zimmernummer *", private: "Dein Name ist öffentlich. Die Zimmernummer sehen nur die zuständigen Administratoren – nie die Galerie.", caption: "Dein Kommentar", placeholder: "Schreib hier etwas…", frame: "Wähle deinen Rahmen", frameLoading: "Bilderrahmen werden geladen…", frameError: "Bilderrahmen konnten nicht geladen werden. Schließe den Editor und versuche es erneut.", consent: "Ich stimme zu, dass mein Foto, mein Name und mein Kommentar sofort öffentlich sichtbar werden. Ich habe die nötigen Rechte und die Zustimmung aller abgebildeten Personen (bei Minderjährigen der Erziehungsberechtigten). Ich teile keine unangemessenen Inhalte. Die Administration darf Beiträge entfernen.", publish: "Öffentlich teilen", publishing: "Wird veröffentlicht…", success: "Dein Foto ist jetzt öffentlich in der Galerie!", needPhoto: "Bitte wähle ein Foto aus.", badFile: "Bitte wähle eine gültige JPG-, PNG- oder WebP-Datei. SVG und andere Dateitypen sind nicht erlaubt.", tooLarge: "Dieses Foto ist größer als 20 MB. Bitte wähle eine kleinere Datei.", imageError: "Dieses Foto konnte nicht geöffnet werden. Dein bisheriger Entwurf bleibt erhalten.", invalid: "Bitte prüfe Name, Zimmernummer und Kommentar.", consentError: "Bitte bestätige die öffentliche Veröffentlichung und die Einwilligungen.", rateLimit: "Zu viele Versuche. Bitte warte etwas und versuche es erneut.", uncertain: "Die Bestätigung fehlt noch. Dein Entwurf bleibt unverändert. Versuche denselben Beitrag erneut; er wird nicht doppelt angelegt.", retry: "Diesen Beitrag erneut senden", more: "Weitere Fotos laden", openPhoto: "Foto von", allTitle: "Momente unserer Gäste", imageUnavailable: "Foto derzeit nicht verfügbar", likePhoto: "Foto mit Gefällt mir markieren", unlikePhoto: "Gefällt mir entfernen", likes: "Gefällt mir", likeFailed: "Dein Gefällt mir konnte gerade nicht gespeichert werden. Bitte versuche es erneut.", likeRateLimit: "Zu viele Gefällt-mir-Aktionen. Bitte warte kurz und versuche es erneut."
    },
    en: {
      adminSetup: "Administrator access has not been configured for this live website. The local demo sign-in cannot be used here.",
      manage: "Manage my photos", manageTitle: "My photos", login: "Sign in", loggingIn: "Checking…", logout: "Sign out", adminActive: "Administrator deletion access is on", guestActive: "You can edit or delete your own photos.", accessHelp: "Your full name and room number are used together as simple sign-in details. Anyone who knows both can access these photos.", unauthorized: "Access could not be verified. Please sign in again with your full name and room number.", sessionExpired: "Your access has expired. Please sign in again.", deletePhoto: "Delete", deleteTitle: "Delete this photo?", deleteQuestion: "Only this photo will be removed from the public gallery. This cannot be undone.", cancel: "Cancel", confirmDelete: "Yes, delete this photo", deleting: "Deleting…", deleted: "This photo has been removed.", deleteFailed: "Deletion could not be confirmed. Check the gallery before trying again.", logoutFailed: "You are signed out here. Server-side sign-out could not be confirmed.", editPhoto: "Edit", editTitle: "Edit your photo", saveEdit: "Save changes", savingEdit: "Saving…", editSaved: "Your photo has been updated.", myPhotos: "My photos", mineEmpty: "There are no photos for this full name and room yet.", legacyOriginal: "The original is missing for this older photo. Please choose the original photo. The published version stays unchanged until you save.", originalRequired: "Please choose the original photo before saving.", editLoading: "Loading your photo for editing…", uploadAccessFailed: "Your photo was published. Sign in to manage it; please do not upload it again.", newPhoto: "Share a new photo",
      previewNotice: "Preview · These posts do not appear on the live website.", removed: "This post was removed by an administrator. Retrying this submission has stopped.",
      kicker: "HOLIDAY MOMENTS", title: "Guest gallery", intro: "Your favourite moments at Port Side.", share: "Share a photo", all: "See all photos →", loading: "Loading photos…", empty: "No photos yet – share the first holiday moment!", unavailable: "The gallery is unavailable right now. Please try again later.", close: "Close", editorTitle: "Your Port Side moment", choose: "Choose a photo", replace: "Change photo", fileHelp: "JPG, PNG or WebP · up to 20 MB. The finished image is compressed; location and camera metadata are removed.", photoPrompt: "Choose your holiday photo", portrait: "Portrait 3:4", landscape: "Landscape 4:3", cover: "Fill the frame", contain: "Show entire photo", moveHelp: "Drag the photo or pinch to zoom. Use arrow keys to move; + / − to zoom.", zoomOut: "Zoom out", zoomIn: "Zoom in", reset: "Reset", left: "Move left", right: "Move right", up: "Move up", down: "Move down", name: "Your name *", room: "Room number *", private: "Your name is public. Only authorised administrators can see your room number – never the gallery.", caption: "Your comment", placeholder: "Write something here…", frame: "Choose your frame", frameLoading: "Loading photo frames…", frameError: "Photo frames could not be loaded. Close the editor and try again.", consent: "I agree that my photo, name and comment will be publicly visible immediately. I have the necessary rights and consent from everyone pictured (including guardian consent for minors). I will not share inappropriate content. Administrators may remove posts.", publish: "Share publicly", publishing: "Publishing…", success: "Your photo is now public in the gallery!", needPhoto: "Please choose a photo.", badFile: "Please choose a valid JPG, PNG or WebP file. SVG and other file types are not allowed.", tooLarge: "This photo is larger than 20 MB. Please choose a smaller file.", imageError: "This photo could not be opened. Your previous draft has been kept.", invalid: "Please check your name, room number and comment.", consentError: "Please confirm public sharing and the required permissions.", rateLimit: "Too many attempts. Please wait a little before trying again.", uncertain: "Confirmation has not arrived. Your draft is unchanged. Retry this same post; it will not be created twice.", retry: "Retry this same post", more: "Load more photos", openPhoto: "Photo by", allTitle: "Our guests’ moments", imageUnavailable: "Photo temporarily unavailable", likePhoto: "Like photo", unlikePhoto: "Remove like", likes: "likes", likeFailed: "Your like could not be saved right now. Please try again.", likeRateLimit: "Too many like actions. Please wait a moment and try again."
    },
    tr: {
      adminSetup: "Yönetici erişimi bu canlı site için henüz yapılandırılmadı. Yerel demo girişi burada kullanılamaz.",
      manage: "Fotoğraflarımı yönet", manageTitle: "Fotoğraflarım", login: "Giriş yap", loggingIn: "Kontrol ediliyor…", logout: "Çıkış yap", adminActive: "Yönetici silme yetkisi açık", guestActive: "Kendi fotoğraflarını düzenleyebilir veya silebilirsin.", accessHelp: "Ad soyad ve oda numarası birlikte basit giriş bilgisi olarak kullanılır. İkisini bilen kişiler bu fotoğraflara erişebilir.", unauthorized: "Yetki doğrulanamadı. Lütfen ad soyad ve oda numaranla yeniden giriş yap.", sessionExpired: "Yetki süren doldu. Lütfen yeniden giriş yap.", deletePhoto: "Sil", deleteTitle: "Bu fotoğraf silinsin mi?", deleteQuestion: "Yalnızca bu fotoğraf herkese açık galeriden kaldırılacak. Bu işlem geri alınamaz.", cancel: "Vazgeç", confirmDelete: "Evet, bu fotoğrafı sil", deleting: "Siliniyor…", deleted: "Bu fotoğraf kaldırıldı.", deleteFailed: "Silme işlemi doğrulanamadı. Yeniden denemeden önce galeriyi kontrol et.", logoutFailed: "Bu cihazda çıkış yapıldı. Sunucudaki çıkış işlemi doğrulanamadı.", editPhoto: "Düzenle", editTitle: "Fotoğrafını düzenle", saveEdit: "Değişiklikleri kaydet", savingEdit: "Kaydediliyor…", editSaved: "Fotoğrafın güncellendi.", myPhotos: "Fotoğraflarım", mineEmpty: "Bu ad soyad ve oda için henüz fotoğraf yok.", legacyOriginal: "Bu eski paylaşımın orijinal fotoğrafı yok. Lütfen orijinal fotoğrafı seç. Kaydetmeden önce yayımlanmış fotoğraf değişmez.", originalRequired: "Kaydetmek için lütfen orijinal fotoğrafı seç.", editLoading: "Fotoğraf düzenlemek için yükleniyor…", uploadAccessFailed: "Fotoğrafın yayımlandı. Yönetmek için giriş yap; lütfen yeniden yükleme.", newPhoto: "Yeni fotoğraf paylaş",
      previewNotice: "Önizleme · Bu paylaşımlar canlı sitede görünmez.", removed: "Bu paylaşım yönetici tarafından kaldırıldı. Aynı paylaşımı yeniden gönderme denemesi sonlandırıldı.",
      kicker: "TATİLDEN HATIRALAR", title: "Misafir galerisi", intro: "Port Side’daki en güzel anlarınız.", share: "Fotoğraf paylaş", all: "Tüm fotoğrafları gör →", loading: "Fotoğraflar yükleniyor…", empty: "Henüz fotoğraf yok – ilk tatil anısını sen paylaş!", unavailable: "Galeriye şu anda ulaşılamıyor. Lütfen daha sonra yeniden dene.", close: "Kapat", editorTitle: "Senin Port Side anın", choose: "Fotoğraf seç", replace: "Fotoğrafı değiştir", fileHelp: "JPG, PNG veya WebP · en fazla 20 MB. Son görsel sıkıştırılır; konum ve kamera bilgileri kaldırılır.", photoPrompt: "Tatil fotoğrafını seç", portrait: "Dikey 3:4", landscape: "Yatay 4:3", cover: "Çerçeveyi doldur", contain: "Fotoğrafın tamamını göster", moveHelp: "Fotoğrafı sürükle veya iki parmakla yakınlaştır. Ok tuşlarıyla kaydır; + / − ile yakınlaştır.", zoomOut: "Uzaklaştır", zoomIn: "Yakınlaştır", reset: "Sıfırla", left: "Sola kaydır", right: "Sağa kaydır", up: "Yukarı kaydır", down: "Aşağı kaydır", name: "Adın *", room: "Oda numarası *", private: "Adın herkese açıktır. Oda numaranı yalnızca yetkili yöneticiler görebilir; galeride asla gösterilmez.", caption: "Yorumun", placeholder: "Buraya yazı yaz…", frame: "Çerçeveni seç", frameLoading: "Fotoğraf çerçeveleri yükleniyor…", frameError: "Fotoğraf çerçeveleri yüklenemedi. Düzenleyiciyi kapatıp tekrar dene.", consent: "Fotoğrafımın, adımın ve yorumumun hemen herkese açık yayımlanmasını kabul ediyorum. Gerekli haklara ve fotoğraftaki herkesin iznine (çocuklar için veli/vasi iznine) sahibim. Uygunsuz içerik paylaşmayacağım. Yöneticiler paylaşımları kaldırabilir.", publish: "Herkese açık paylaş", publishing: "Yayımlanıyor…", success: "Fotoğrafın artık galeride herkese açık!", needPhoto: "Lütfen bir fotoğraf seç.", badFile: "Lütfen geçerli bir JPG, PNG veya WebP dosyası seç. SVG ve diğer dosya türleri kabul edilmez.", tooLarge: "Bu fotoğraf 20 MB’tan büyük. Lütfen daha küçük bir dosya seç.", imageError: "Bu fotoğraf açılamadı. Önceki taslağın korundu.", invalid: "Lütfen adını, oda numaranı ve yorumunu kontrol et.", consentError: "Lütfen herkese açık paylaşımı ve gerekli izinleri onayla.", rateLimit: "Çok fazla deneme yapıldı. Biraz bekleyip yeniden dene.", uncertain: "Paylaşımın sonucu henüz doğrulanamadı. Taslağın değişmeden korunuyor. Aynı paylaşımı yeniden dene; iki kez oluşturulmaz.", retry: "Aynı paylaşımı yeniden dene", more: "Daha fazla fotoğraf yükle", openPhoto: "Fotoğraf sahibi:", allTitle: "Misafirlerimizin anıları", imageUnavailable: "Fotoğraf şu anda görüntülenemiyor", likePhoto: "Fotoğrafı beğen", unlikePhoto: "Beğeniyi kaldır", likes: "beğeni", likeFailed: "Beğenin şu anda kaydedilemedi. Lütfen yeniden dene.", likeRateLimit: "Çok fazla beğeni işlemi yapıldı. Biraz bekleyip yeniden dene."
    },
    ru: {
      adminSetup: "Доступ администратора для действующего сайта ещё не настроен. Локальный демонстрационный вход здесь не работает.",
      manage: "Управлять моими фото", manageTitle: "Мои фотографии", login: "Войти", loggingIn: "Проверка…", logout: "Выйти", adminActive: "Удаление от имени администратора включено", guestActive: "Вы можете редактировать и удалять свои фотографии.", accessHelp: "Полное имя и номер комнаты вместе используются для простого входа. Любой, кто знает оба значения, может получить доступ к этим фото.", unauthorized: "Доступ не подтверждён. Войдите снова с полным именем и номером комнаты.", sessionExpired: "Срок доступа истёк. Войдите снова.", deletePhoto: "Удалить", deleteTitle: "Удалить это фото?", deleteQuestion: "Только эта фотография будет удалена из публичной галереи. Отменить действие нельзя.", cancel: "Отмена", confirmDelete: "Да, удалить это фото", deleting: "Удаление…", deleted: "Эта фотография удалена.", deleteFailed: "Не удалось подтвердить удаление. Проверьте галерею перед повторной попыткой.", logoutFailed: "На этом устройстве выполнен выход. Выход на сервере не удалось подтвердить.", editPhoto: "Изменить", editTitle: "Редактировать фото", saveEdit: "Сохранить изменения", savingEdit: "Сохранение…", editSaved: "Фото обновлено.", myPhotos: "Мои фотографии", mineEmpty: "Для этого полного имени и номера комнаты фотографий пока нет.", legacyOriginal: "У этой старой публикации нет исходного фото. Выберите оригинал. Опубликованное фото не изменится до сохранения.", originalRequired: "Перед сохранением выберите исходное фото.", editLoading: "Загрузка фото для редактирования…", uploadAccessFailed: "Фото опубликовано. Войдите, чтобы управлять им; не загружайте его повторно.", newPhoto: "Поделиться новым фото",
      previewNotice: "Предпросмотр · Эти публикации не появятся на действующем сайте.", removed: "Эта публикация удалена администратором. Повторная отправка этой публикации прекращена.",
      kicker: "ВОСПОМИНАНИЯ ОБ ОТДЫХЕ", title: "Галерея гостей", intro: "Ваши любимые моменты в Port Side.", share: "Поделиться фото", all: "Смотреть все фото →", loading: "Загрузка фотографий…", empty: "Фотографий пока нет — поделитесь первым моментом отдыха!", unavailable: "Галерея сейчас недоступна. Попробуйте позже.", close: "Закрыть", editorTitle: "Ваш момент в Port Side", choose: "Выбрать фото", replace: "Заменить фото", fileHelp: "JPG, PNG или WebP · до 20 МБ. Готовое изображение сжимается; данные о местоположении и камере удаляются.", photoPrompt: "Выберите фото с отдыха", portrait: "Вертикально 3:4", landscape: "Горизонтально 4:3", cover: "Заполнить рамку", contain: "Показать фото целиком", moveHelp: "Перетаскивайте фото или меняйте масштаб двумя пальцами. Стрелки перемещают; + / − меняют масштаб.", zoomOut: "Уменьшить", zoomIn: "Увеличить", reset: "Сбросить", left: "Влево", right: "Вправо", up: "Вверх", down: "Вниз", name: "Ваше имя *", room: "Номер комнаты *", private: "Ваше имя будет видно всем. Номер комнаты доступен только уполномоченным администраторам и никогда не показывается в галерее.", caption: "Ваш комментарий", placeholder: "Напишите здесь…", frame: "Выберите рамку", frameLoading: "Загрузка фоторамок…", frameError: "Не удалось загрузить рамки. Закройте редактор и попробуйте снова.", consent: "Я согласен с немедленной публичной публикацией моего фото, имени и комментария. У меня есть необходимые права и согласие всех изображённых людей (для несовершеннолетних — согласие родителей или опекунов). Я не буду публиковать недопустимый контент. Администраторы могут удалять публикации.", publish: "Опубликовать для всех", publishing: "Публикация…", success: "Ваше фото опубликовано в галерее!", needPhoto: "Выберите фотографию.", badFile: "Выберите корректный файл JPG, PNG или WebP. SVG и другие типы файлов не поддерживаются.", tooLarge: "Размер фото превышает 20 МБ. Выберите файл поменьше.", imageError: "Не удалось открыть фото. Предыдущий черновик сохранён.", invalid: "Проверьте имя, номер комнаты и комментарий.", consentError: "Подтвердите публичную публикацию и необходимые разрешения.", rateLimit: "Слишком много попыток. Подождите немного и попробуйте снова.", uncertain: "Подтверждение ещё не получено. Черновик сохранён без изменений. Отправьте эту же публикацию снова — дубликат не появится.", retry: "Повторить эту публикацию", more: "Загрузить ещё фото", openPhoto: "Фото от", allTitle: "Моменты наших гостей", imageUnavailable: "Фото временно недоступно", likePhoto: "Поставить отметку «Нравится»", unlikePhoto: "Убрать отметку «Нравится»", likes: "отметок «Нравится»", likeFailed: "Не удалось сохранить отметку «Нравится». Попробуйте снова.", likeRateLimit: "Слишком много действий. Немного подождите и попробуйте снова."
    }
  };
  for (const [locale, name] of Object.entries({ de: "Vor- und Nachname *", en: "Full name *", tr: "Ad Soyad *", ru: "Имя и фамилия *" })) strings[locale].name = name;
  for (const [locale, message] of Object.entries({ de: "Dieses Foto wurde inzwischen geändert. Dein Entwurf bleibt erhalten. Schließe den Editor und öffne das Foto erneut, bevor du speicherst.", en: "This photo has changed. Your draft is preserved. Close the editor and reopen the photo before saving.", tr: "Bu fotoğraf değişmiş. Taslağın korunuyor. Kaydetmeden önce düzenleyiciyi kapatıp fotoğrafı yeniden aç.", ru: "Это фото уже изменено. Черновик сохранён. Закройте редактор и откройте фото заново перед сохранением." })) strings[locale].editConflict = message;
  let language = strings[document.documentElement.lang] ? document.documentElement.lang : "de";
  const t = key => strings[language][key] || strings.de[key] || key;
  const $ = id => document.getElementById(id);
  const edit = { frameId: null, orientation: "portrait", fit: "cover", zoom: 1, panX: 0, panY: 0 };
  let photo = null, frameList = [], assetsReady = false, busy = false, decoding = false, pendingSubmission = null;
  let latestItems = [], allItems = [], nextCursor = null, publicLoading = false, allLoading = false;
  let galleryVisible = true, decodeSequence = 0;
  let editingItem = null, originalChanged = false, requiresOriginal = false, editLoading = false, editConflict = false;
  let mineItems = [], mineCursor = null, mineLoading = false;
  let accessSession = null, accessBusy = false, deleting = false, deleteTarget = null, expiryTimer = null, viewedItem = null;
  const likeBusyIds = new Set();
  const dialogMarkup = `
    <dialog id="galleryEditor" class="gallery-dialog" aria-labelledby="galleryEditorTitle">
      <div class="gallery-dialog-header"><h2 id="galleryEditorTitle" data-gallery-i18n="editorTitle"></h2><button type="button" class="gallery-icon-button" data-gallery-close data-gallery-label="close">×</button></div>
      <form id="galleryForm" class="gallery-dialog-content">
        <p class="gallery-preview-notice" data-gallery-preview data-gallery-i18n="previewNotice" hidden></p>
        <div class="gallery-editor-layout">
          <div>
            <div class="gallery-preview-wrap"><canvas id="galleryPreview" class="gallery-preview" width="600" height="800" tabindex="0" data-orientation="portrait" data-gallery-label="moveHelp"></canvas></div>
            <p id="galleryPreviewCaption" class="gallery-preview-caption"></p>
            <div class="gallery-control-row"><button type="button" id="galleryChoose" class="gallery-button gallery-draft-control" data-gallery-i18n="choose"></button><input id="galleryFile" type="file" accept="image/jpeg,image/png,image/webp" hidden class="gallery-draft-control"></div>
            <p class="gallery-help" data-gallery-i18n="fileHelp"></p>
            <div class="gallery-segment" role="group" aria-label="Orientation"><button class="gallery-button gallery-draft-control" type="button" data-orientation="portrait" aria-pressed="true" data-gallery-i18n="portrait"></button><button class="gallery-button gallery-draft-control" type="button" data-orientation="landscape" aria-pressed="false" data-gallery-i18n="landscape"></button></div>
            <div class="gallery-segment" role="group" aria-label="Photo fit"><button class="gallery-button gallery-draft-control" type="button" data-fit="cover" aria-pressed="true" data-gallery-i18n="cover"></button><button class="gallery-button gallery-draft-control" type="button" data-fit="contain" aria-pressed="false" data-gallery-i18n="contain"></button></div>
            <div class="gallery-pan-controls"><button type="button" class="gallery-icon-button gallery-draft-control" data-edit="zoomOut" data-gallery-label="zoomOut">−</button><button type="button" class="gallery-button gallery-button-secondary gallery-draft-control" data-edit="reset" data-gallery-i18n="reset"></button><button type="button" class="gallery-icon-button gallery-draft-control" data-edit="zoomIn" data-gallery-label="zoomIn">+</button></div>
            <div class="gallery-pan-controls"><button type="button" class="gallery-icon-button gallery-draft-control" data-edit="left" data-gallery-label="left">←</button><button type="button" class="gallery-icon-button gallery-draft-control" data-edit="up" data-gallery-label="up">↑</button><button type="button" class="gallery-icon-button gallery-draft-control" data-edit="down" data-gallery-label="down">↓</button><button type="button" class="gallery-icon-button gallery-draft-control" data-edit="right" data-gallery-label="right">→</button></div>
            <p class="gallery-help" data-gallery-i18n="moveHelp"></p>
          </div>
          <div class="gallery-editor-fields">
            <div class="gallery-name-room"><div class="gallery-field"><label for="galleryName" data-gallery-i18n="name"></label><input id="galleryName" name="name" required maxlength="60" autocomplete="name" class="gallery-draft-control"></div><div class="gallery-field"><label for="galleryRoom" data-gallery-i18n="room"></label><input id="galleryRoom" name="room" required maxlength="12" pattern="[A-Za-z0-9]{1,12}" autocomplete="off" class="gallery-draft-control"></div></div>
            <p class="gallery-private-note" data-gallery-i18n="private"></p>
            <button type="button" id="galleryEditorManage" class="gallery-text-button gallery-editor-manage" data-gallery-i18n="manage"></button>
            <div class="gallery-field"><label for="galleryCaption" data-gallery-i18n="caption"></label><textarea id="galleryCaption" name="caption" maxlength="240" rows="3" class="gallery-draft-control"></textarea><span class="gallery-caption-counter" id="galleryCaptionCount">0 / 240</span></div>
            <p class="gallery-frame-heading" data-gallery-i18n="frame"></p><div class="gallery-frame-list" id="galleryFrames"></div><p class="gallery-help" id="galleryFrameStatus" role="status"></p>
            <label class="gallery-consent" id="galleryConsentWrap"><input type="checkbox" id="galleryConsent" required class="gallery-draft-control"><span data-gallery-i18n="consent"></span></label>
            <button type="submit" id="galleryPublish" class="gallery-button gallery-submit" data-gallery-i18n="publish" disabled></button>
            <p class="gallery-status gallery-editor-status" id="galleryEditorStatus" role="status" aria-live="polite"></p>
          </div>
        </div>
      </form>
    </dialog>
    <dialog id="galleryBrowse" class="gallery-dialog" aria-labelledby="galleryBrowseTitle"><div class="gallery-dialog-header"><h2 id="galleryBrowseTitle" data-gallery-i18n="allTitle"></h2><button type="button" class="gallery-icon-button" data-gallery-close data-gallery-label="close">×</button></div><div class="gallery-dialog-content"><div id="galleryAllGrid" class="gallery-all-grid"></div><p class="gallery-status" id="galleryBrowseStatus" role="status"></p><button type="button" id="galleryMore" class="gallery-button gallery-button-secondary gallery-more" data-gallery-i18n="more" hidden></button></div></dialog>
    <dialog id="galleryViewer" class="gallery-dialog gallery-viewer" aria-labelledby="galleryViewerName"><div class="gallery-dialog-header"><h2 id="galleryViewerName"></h2><button type="button" class="gallery-icon-button" data-gallery-close data-gallery-label="close">×</button></div><div class="gallery-dialog-content"><img id="galleryViewerPhoto" class="gallery-viewer-photo" alt=""><p id="galleryViewerCaption" class="gallery-viewer-caption"></p><div id="galleryViewerActions" class="gallery-viewer-actions"></div></div></dialog>
    <dialog id="galleryAccess" class="gallery-dialog gallery-access-dialog" aria-labelledby="galleryAccessTitle"><div class="gallery-dialog-header"><h2 id="galleryAccessTitle" data-gallery-i18n="manageTitle"></h2><button type="button" class="gallery-icon-button" data-gallery-close data-gallery-label="close">×</button></div><div class="gallery-dialog-content gallery-editor-fields"><form id="galleryAccessForm"><div class="gallery-name-room"><div class="gallery-field"><label for="galleryAccessName" data-gallery-i18n="name"></label><input id="galleryAccessName" required maxlength="60" autocomplete="name"></div><div class="gallery-field"><label for="galleryAccessRoom" data-gallery-i18n="room"></label><input id="galleryAccessRoom" required maxlength="12" pattern="[A-Za-z0-9]{1,12}" autocomplete="off"></div></div><p class="gallery-help" data-gallery-i18n="accessHelp"></p><button id="galleryAccessSubmit" type="submit" class="gallery-button gallery-submit" data-gallery-i18n="login"></button></form><p id="galleryAccessStatus" class="gallery-status" role="status"></p><button type="button" id="galleryAccessLogout" class="gallery-text-button" data-gallery-i18n="logout" hidden></button><section id="galleryMine" class="gallery-mine" hidden><h3 id="galleryMineTitle" data-gallery-i18n="myPhotos"></h3><div id="galleryMineGrid" class="gallery-mine-grid"></div><p id="galleryMineStatus" class="gallery-status" role="status"></p><button id="galleryMineMore" type="button" class="gallery-button gallery-button-secondary gallery-more" data-gallery-i18n="more" hidden></button></section></div></dialog>
    <dialog id="galleryDeleteConfirm" class="gallery-dialog gallery-access-dialog" aria-labelledby="galleryDeleteTitle"><div class="gallery-dialog-header"><h2 id="galleryDeleteTitle" data-gallery-i18n="deleteTitle"></h2><button type="button" class="gallery-icon-button" data-gallery-close data-gallery-label="close">×</button></div><div class="gallery-dialog-content"><img id="galleryDeletePreview" class="gallery-delete-preview" alt=""><p id="galleryDeleteName"></p><p class="gallery-help" data-gallery-i18n="deleteQuestion"></p><p id="galleryDeleteStatus" class="gallery-status" role="status"></p><div class="gallery-control-row"><button type="button" id="galleryDeleteCancel" class="gallery-button gallery-button-secondary" data-gallery-i18n="cancel"></button><button type="button" id="galleryDeleteYes" class="gallery-button gallery-button-danger" data-gallery-i18n="confirmDelete"></button></div></div></dialog>`;
  document.body.insertAdjacentHTML("beforeend", dialogMarkup);
  root.querySelector(".guest-gallery-intro").insertAdjacentHTML("afterend", '<div class="gallery-access-bar"><button type="button" id="galleryManage" class="gallery-text-button" data-gallery-i18n="manage"></button><button type="button" id="galleryLogout" class="gallery-text-button" data-gallery-i18n="logout" hidden></button><p id="galleryAccessSummary" class="gallery-status" role="status"></p></div>');
  root.insertAdjacentHTML("beforeend", '<p id="galleryLikeStatus" class="gallery-like-announcer" role="status" aria-live="polite"></p>');
  if (isLoopback) {
    const notice = document.createElement("p");
    notice.className = "gallery-preview-notice";
    notice.dataset.galleryI18n = "previewNotice";
    root.querySelector(".guest-gallery-intro").after(notice);
    document.querySelectorAll("[data-gallery-preview]").forEach(element => { element.hidden = false; });
  }
  const canvas = $("galleryPreview");
  const setStatus = (element, key) => { element.dataset.statusKey = key || ""; element.textContent = key ? t(key) : ""; };
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const resetCrop = () => { edit.zoom = 1; edit.panX = 0; edit.panY = 0; };
  const draw = () => {
    canvas.width = edit.orientation === "portrait" ? 600 : 800;
    canvas.height = edit.orientation === "portrait" ? 800 : 600;
    canvas.dataset.orientation = edit.orientation;
    frames.paint(canvas, edit, photo, t("photoPrompt"));
    $("galleryEditor").querySelectorAll("button[data-orientation]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.orientation === edit.orientation)));
    $("galleryEditor").querySelectorAll("button[data-fit]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.fit === edit.fit)));
    $("galleryFrames").querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.frame === edit.frameId)));
  };
  const updateControls = () => {
    const locked = busy || Boolean(pendingSubmission);
    $("galleryEditor").querySelectorAll(".gallery-draft-control").forEach(input => { input.disabled = locked; });
    $("galleryPublish").disabled = busy || decoding || editLoading || editConflict || !assetsReady || !photo || (Boolean(editingItem) && !canEdit(editingItem));
    $("galleryPublish").textContent = t(busy ? editingItem ? "savingEdit" : "publishing" : pendingSubmission ? "retry" : editingItem ? "saveEdit" : "publish");
    $("galleryChoose").textContent = t(photo ? "replace" : "choose");
    $("galleryEditorManage").disabled = busy;
    $("galleryEditorManage").textContent = t("login");
    $("galleryName").disabled = locked || Boolean(editingItem);
    $("galleryRoom").disabled = locked || Boolean(editingItem);
    $("galleryConsentWrap").hidden = Boolean(editingItem);
    $("galleryConsent").required = !editingItem;
    $("galleryEditorTitle").textContent = t(editingItem ? "editTitle" : "editorTitle");
    canvas.setAttribute("aria-disabled", String(locked));
  };
  const applyLanguage = () => {
    document.querySelectorAll("[data-gallery-i18n]").forEach(element => { element.textContent = t(element.dataset.galleryI18n); });
    document.querySelectorAll("[data-gallery-label]").forEach(element => { element.setAttribute("aria-label", t(element.dataset.galleryLabel)); });
    [$("galleryStatus"), $("galleryEditorStatus"), $("galleryFrameStatus"), $("galleryBrowseStatus"), $("galleryAccessStatus"), $("galleryAccessSummary"), $("galleryMineStatus"), $("galleryDeleteStatus"), $("galleryLikeStatus")].forEach(element => setStatus(element, element.dataset.statusKey));
    $("galleryCaption").placeholder = t("placeholder");
    renderFrameChoices();
    renderCards($("galleryLatest"), latestItems.slice(0, 2));
    renderCards($("galleryAllGrid"), allItems);
    updateControls();
    updateAccessUI();
    draw();
  };
  function renderFrameChoices() {
    $("galleryFrames").replaceChildren();
    frameList.forEach(frame => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-frame-option gallery-draft-control";
      button.dataset.frame = frame.id;
      button.setAttribute("aria-pressed", String(frame.id === edit.frameId));
      const preview = document.createElement("canvas");
      preview.width = 120; preview.height = 160;
      preview.setAttribute("aria-hidden", "true");
      frames.paint(preview, { ...edit, frameId: frame.id, orientation: "portrait", fit: "cover", zoom: 1, panX: 0, panY: 0 }, null);
      const label = document.createElement("span");
      label.textContent = typeof frame.label === "object" ? frame.label[language] || frame.label.de : frame.label || frame.id;
      button.append(preview, label);
      button.addEventListener("click", () => { if (!busy && !pendingSubmission) { edit.frameId = frame.id; draw(); } });
      $("galleryFrames").append(button);
    });
  }
  const safeImageUrl = value => {
    try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; }
  };
  const validItems = items => Array.isArray(items) ? items.filter(item => item && typeof item.id === "string" && typeof item.name === "string" && safeImageUrl(item.imageUrl)).map(item => ({ id: item.id, name: item.name, caption: typeof item.caption === "string" ? item.caption : "", imageUrl: safeImageUrl(item.imageUrl), frameId: item.frameId, orientation: item.orientation, revision: Number.isInteger(item.revision) && item.revision >= 0 ? item.revision : 0, likeCount: Number.isFinite(Number(item.likeCount)) ? Math.max(0, Math.floor(Number(item.likeCount))) : 0, liked: item.liked === true, createdAt: item.createdAt, updatedAt: item.updatedAt })) : [];
  const findLikeItem = id => [...latestItems, ...allItems, ...mineItems].find(item => item.id === id) || (viewedItem?.id === id ? viewedItem : null);
  const likeLabel = item => `${t(item.liked ? "unlikePhoto" : "likePhoto")}: ${item.name} · ${new Intl.NumberFormat(language).format(item.likeCount)} ${t("likes")}`;
  function updateLikeButton(button, item) {
    button.disabled = likeBusyIds.has(item.id);
    button.setAttribute("aria-pressed", String(item.liked));
    button.setAttribute("aria-label", likeLabel(item));
    button.title = likeLabel(item);
    const heart = document.createElement("span");
    heart.className = "gallery-like-heart";
    heart.setAttribute("aria-hidden", "true");
    heart.textContent = "♥";
    const count = document.createElement("span");
    count.className = "gallery-like-count";
    count.textContent = new Intl.NumberFormat(language).format(item.likeCount);
    button.replaceChildren(heart, count);
  }
  function refreshLikeButtons(id) {
    const item = findLikeItem(id);
    if (!item) return;
    document.querySelectorAll("[data-gallery-like-id]").forEach(button => {
      if (button.dataset.galleryLikeId === id) updateLikeButton(button, item);
    });
  }
  function syncLikeState(id, likeCount, liked) {
    const apply = item => {
      if (item?.id === id) {
        item.likeCount = likeCount;
        item.liked = liked;
      }
    };
    latestItems.forEach(apply);
    allItems.forEach(apply);
    mineItems.forEach(apply);
    apply(viewedItem);
    refreshLikeButtons(id);
  }
  async function toggleLike(id) {
    const item = findLikeItem(id);
    if (!item || likeBusyIds.has(id)) return;
    const shouldLike = !item.liked;
    likeBusyIds.add(id);
    refreshLikeButtons(id);
    setStatus($("galleryLikeStatus"), "");
    try {
      const result = await request(`/api/gallery/photos/${encodeURIComponent(id)}/like`, {
        method: shouldLike ? "POST" : "DELETE",
        headers: voterHeaders()
      });
      const likeCount = Number(result.likeCount);
      if (result.id !== id || !Number.isFinite(likeCount) || likeCount < 0 || typeof result.liked !== "boolean") throw new Error("UNAVAILABLE");
      syncLikeState(id, Math.floor(likeCount), result.liked);
    } catch (error) {
      setStatus($("galleryLikeStatus"), error.message === "RATE_LIMITED" || error.status === 429 ? "likeRateLimit" : "likeFailed");
    } finally {
      likeBusyIds.delete(id);
      refreshLikeButtons(id);
    }
  }
  function likeButton(item, viewer = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallery-like-button${viewer ? " gallery-like-button-viewer" : ""}`;
    button.dataset.galleryLikeId = item.id;
    updateLikeButton(button, item);
    button.addEventListener("click", () => toggleLike(item.id));
    return button;
  }
  function renderCards(container, items) {
    container.replaceChildren();
    items.forEach(item => {
      const card = document.createElement("article"); card.className = "gallery-photo-card";
      const open = document.createElement("button"); open.type = "button"; open.className = "gallery-photo-open";
      open.setAttribute("aria-label", `${t("openPhoto")} ${item.name}`);
      const image = document.createElement("img"); image.src = item.imageUrl; image.alt = `${t("openPhoto")} ${item.name}`; image.loading = "lazy"; image.decoding = "async";
      image.addEventListener("error", () => { image.alt = t("imageUnavailable"); });
      open.append(image); open.addEventListener("click", () => openViewer(item));
      const copy = document.createElement("div"); copy.className = "gallery-photo-copy";
      const name = document.createElement("strong"); name.textContent = item.name;
      const caption = document.createElement("p"); caption.textContent = item.caption;
      copy.append(name, caption, likeButton(item)); card.append(open, copy); container.append(card);
      if (canEdit(item)) copy.append(editButton(item));
      if (canDelete(item)) copy.append(deleteButton(item));
    });
  }
  const openViewer = item => {
    viewedItem = item;
    $("galleryViewerName").textContent = item.name;
    $("galleryViewerPhoto").src = item.imageUrl;
    $("galleryViewerPhoto").alt = `${t("openPhoto")} ${item.name}`;
    $("galleryViewerCaption").textContent = item.caption;
    renderViewerActions();
    $("galleryViewer").showModal();
  };
  function sessionLive() { return accessSession && (!accessSession.expiresAt || accessSession.expiresAt > Date.now()); }
  function canDelete(item) { return Boolean(sessionLive() && (accessSession.role === "admin" || (accessSession.role === "guest" && accessSession.photoIds.has(item.id)))); }
  function canEdit(item) { return Boolean(sessionLive() && accessSession.role === "guest" && accessSession.photoIds.has(item.id)); }
  function editButton(item) {
    const button = document.createElement("button"); button.type = "button"; button.className = "gallery-button gallery-button-secondary gallery-edit-button";
    button.textContent = t("editPhoto"); button.dataset.photoId = item.id;
    button.addEventListener("click", () => openEdit(item));
    return button;
  }
  function deleteButton(item) {
    const button = document.createElement("button");
    button.type = "button"; button.className = "gallery-button gallery-button-danger gallery-delete-button";
    button.textContent = t("deletePhoto"); button.dataset.photoId = item.id;
    button.setAttribute("aria-label", `${t("deletePhoto")}: ${item.name}`);
    button.addEventListener("click", () => {
      if (!canDelete(item)) { clearAccess("sessionExpired"); return; }
      deleteTarget = item;
      $("galleryDeletePreview").src = item.imageUrl;
      $("galleryDeletePreview").alt = `${t("openPhoto")} ${item.name}`;
      $("galleryDeleteName").textContent = item.name;
      setStatus($("galleryDeleteStatus"), "");
      $("galleryDeleteYes").disabled = deleting;
      $("galleryDeleteConfirm").showModal();
      $("galleryDeleteCancel").focus();
    });
    return button;
  }
  function renderViewerActions() {
    $("galleryViewerActions").replaceChildren();
    if (viewedItem) $("galleryViewerActions").append(likeButton(viewedItem, true));
    if (viewedItem && canEdit(viewedItem)) $("galleryViewerActions").append(editButton(viewedItem));
    if (viewedItem && canDelete(viewedItem)) $("galleryViewerActions").append(deleteButton(viewedItem));
  }
  function updateAccessUI() {
    $("galleryLogout").hidden = !accessSession;
    $("galleryAccessLogout").hidden = !accessSession;
    $("galleryMine").hidden = !accessSession;
    $("galleryManage").textContent = t(accessSession ? "manage" : "login");
    $("galleryMineTitle").textContent = t(accessSession?.role === "admin" ? "allTitle" : "myPhotos");
    if (accessSession) setStatus($("galleryAccessSummary"), accessSession.role === "admin" ? "adminActive" : "guestActive");
    $("galleryAccessForm").querySelectorAll("input,button").forEach(input => { input.disabled = accessBusy; });
    $("galleryAccessSubmit").textContent = t(accessBusy ? "loggingIn" : "login");
    $("galleryDeleteYes").disabled = deleting || !deleteTarget || !canDelete(deleteTarget);
    $("galleryDeleteYes").textContent = t(deleting ? "deleting" : "confirmDelete");
    renderCards($("galleryLatest"), latestItems.slice(0, 2));
    renderCards($("galleryAllGrid"), allItems);
    renderCards($("galleryMineGrid"), mineItems);
    renderViewerActions();
    updateControls();
  }
  function clearAccess(message = "") {
    accessSession = null;
    clearTimeout(expiryTimer); expiryTimer = null;
    mineItems = []; mineCursor = null;
    setStatus($("galleryAccessSummary"), message);
    updateAccessUI();
  }
  function setAccess(session) {
    clearTimeout(expiryTimer);
    accessSession = session;
    if (session.expiresAt) expiryTimer = setTimeout(() => { clearAccess("sessionExpired"); setStatus($("galleryAccessStatus"), "sessionExpired"); }, Math.max(0, Math.min(2147483647, session.expiresAt - Date.now())));
    $("galleryAccessName").value = session.name; $("galleryAccessRoom").value = session.room;
    updateAccessUI();
  }
  function openAccess(fromEditor = false) {
    if (fromEditor) { $("galleryAccessName").value = $("galleryName").value; $("galleryAccessRoom").value = $("galleryRoom").value; }
    else if (accessSession) { $("galleryAccessName").value = accessSession.name; $("galleryAccessRoom").value = accessSession.room; }
    setStatus($("galleryAccessStatus"), accessSession ? accessSession.role === "admin" ? "adminActive" : "guestActive" : "");
    $("galleryAccess").showModal();
  }
  async function logOut() {
    const session = accessSession;
    clearAccess();
    $("galleryAccessName").value = "";
    $("galleryAccessRoom").value = "";
    if (!busy && !pendingSubmission) { $("galleryName").value = ""; $("galleryRoom").value = ""; }
    setStatus($("galleryAccessStatus"), "");
    if (session) {
      try { await request("/api/gallery/access", { method: "DELETE", headers: { Authorization: `Bearer ${session.token}` } }); }
      catch (error) { if (error.status !== 401) setStatus($("galleryAccessSummary"), "logoutFailed"); }
    }
  }
  async function authenticate(name, room) {
    const previous = accessSession;
    clearAccess();
    if (previous) {
      try { await request("/api/gallery/access", { method: "DELETE", headers: { Authorization: `Bearer ${previous.token}` } }); }
      catch (error) { if (error.status !== 401) throw error; }
    }
    const result = await request("/api/gallery/access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, room }) });
    const expiresAt = typeof result.expiresAt === "number" && Number.isFinite(result.expiresAt) ? (result.expiresAt < 1e12 ? result.expiresAt * 1000 : result.expiresAt) : null;
    if (!["admin", "guest"].includes(result.role) || !/^[a-f0-9]{64}$/.test(result.token || "") || !Array.isArray(result.photoIds) || !expiresAt || expiresAt <= Date.now()) throw new Error("UNAUTHORIZED");
    mineItems = validItems(result.items);
    mineCursor = typeof result.nextCursor === "string" && result.nextCursor ? result.nextCursor : null;
    setAccess({ role: result.role, token: result.token, name, room, expiresAt, photoIds: new Set([...result.photoIds.filter(id => typeof id === "string"), ...mineItems.map(item => item.id)]) });
    $("galleryMineMore").hidden = !mineCursor;
    setStatus($("galleryMineStatus"), mineItems.length ? "" : result.role === "admin" ? "empty" : "mineEmpty");
    if (result.role === "admin") await loadMine(true);
    return result.role;
  }
  async function request(path, options = {}, binary = false) {
    if (!apiBase) throw new Error("UNAVAILABLE");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.method === "POST" ? 45000 : 15000);
    try {
      const response = await fetch(apiBase + path, { ...options, signal: controller.signal, cache: "no-store", credentials: "omit" });
      if (!response.ok) {
        let result = {}; try { result = await response.json(); } catch { /* Keep a generic, non-sensitive error. */ }
        const error = new Error(result.error || "UNAVAILABLE"); error.confirmed = true; error.status = response.status;
        if (response.status === 401) clearAccess("unauthorized");
        throw error;
      }
      if (binary) {
        const blob = await response.blob();
        if (blob.type.split(";")[0] !== "image/jpeg" || blob.size > 3 * 1024 * 1024) throw new Error("BAD_IMAGE");
        return blob;
      }
      return await response.json();
    } finally { clearTimeout(timeout); }
  }
  async function refreshLatest() {
    if (publicLoading) return;
    publicLoading = true;
    try {
      const result = await request("/api/gallery", { headers: voterHeaders() });
      latestItems = validItems(result.items);
      renderCards($("galleryLatest"), latestItems.slice(0, 2));
      setStatus($("galleryStatus"), latestItems.length ? "" : "empty");
    } catch { setStatus($("galleryStatus"), "unavailable"); }
    finally { publicLoading = false; }
  }
  async function loadAll(reset = false) {
    if (allLoading) return;
    allLoading = true;
    $("galleryMore").disabled = true;
    setStatus($("galleryBrowseStatus"), "loading");
    try {
      const result = await request("/api/gallery" + (!reset && nextCursor ? `?cursor=${encodeURIComponent(nextCursor)}` : ""), { headers: voterHeaders() });
      const items = validItems(result.items);
      allItems = reset ? items : [...allItems, ...items.filter(item => !allItems.some(old => old.id === item.id))];
      nextCursor = typeof result.nextCursor === "string" && result.nextCursor ? result.nextCursor : null;
      renderCards($("galleryAllGrid"), allItems);
      $("galleryMore").hidden = !nextCursor;
      setStatus($("galleryBrowseStatus"), allItems.length ? "" : "empty");
    } catch { setStatus($("galleryBrowseStatus"), "unavailable"); }
    finally { allLoading = false; $("galleryMore").disabled = false; }
  }
  async function loadMine(reset = false) {
    if (mineLoading || !sessionLive()) return;
    const session = accessSession;
    mineLoading = true; $("galleryMineMore").disabled = true;
    setStatus($("galleryMineStatus"), "loading");
    try {
      const admin = session.role === "admin";
      const result = await request((admin ? "/api/gallery" : "/api/gallery/mine") + (!reset && mineCursor ? `?cursor=${encodeURIComponent(mineCursor)}` : ""), { headers: voterHeaders(admin ? undefined : { Authorization: `Bearer ${session.token}` }) });
      if (accessSession !== session) return;
      const items = validItems(result.items);
      mineItems = reset ? items : [...mineItems, ...items.filter(item => !mineItems.some(old => old.id === item.id))];
      items.forEach(item => session.photoIds.add(item.id));
      mineCursor = typeof result.nextCursor === "string" && result.nextCursor ? result.nextCursor : null;
      $("galleryMineMore").hidden = !mineCursor;
      setStatus($("galleryMineStatus"), mineItems.length ? "" : session.role === "admin" ? "empty" : "mineEmpty");
      updateAccessUI();
    } catch (error) { setStatus($("galleryMineStatus"), error.status === 401 ? "unauthorized" : "unavailable"); }
    finally { mineLoading = false; $("galleryMineMore").disabled = false; }
  }
  async function ensureFrames() {
    if (assetsReady) return;
    setStatus($("galleryFrameStatus"), "frameLoading");
    frameList = await frames.load(); assetsReady = true;
    if (!edit.frameId) edit.frameId = frameList[0].id;
    renderFrameChoices(); setStatus($("galleryFrameStatus"), "");
  }
  async function decodePhotoBlob(blob) {
    const bitmap = await createImageBitmap(blob, { imageOrientation: "from-image" });
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 80000000) { bitmap.close(); throw new Error("BAD_IMAGE"); }
    const decoded = document.createElement("canvas");
    const ratio = Math.min(1, 4096 / Math.max(bitmap.width, bitmap.height));
    decoded.width = Math.round(bitmap.width * ratio); decoded.height = Math.round(bitmap.height * ratio);
    const context = decoded.getContext("2d", { alpha: false }); context.fillStyle = "#ffffff"; context.fillRect(0, 0, decoded.width, decoded.height); context.drawImage(bitmap, 0, 0, decoded.width, decoded.height); bitmap.close();
    return decoded;
  }
  async function openEdit(item) {
    if (busy || pendingSubmission) { if (!$("galleryEditor").open) $("galleryEditor").showModal(); return; }
    if (editLoading || !canEdit(item)) return;
    const session = accessSession;
    editLoading = true; updateControls(); setStatus($("galleryAccessStatus"), "editLoading");
    try {
      const result = await request(`/api/gallery/photos/${encodeURIComponent(item.id)}/edit`, { headers: { Authorization: `Bearer ${session.token}` } });
      const [current] = validItems([result.item]);
      if (!current || current.id !== item.id) throw new Error("UNAVAILABLE");
      const original = result.hasOriginal ? await decodePhotoBlob(await request(`/api/gallery/photos/${encodeURIComponent(item.id)}/source`, { headers: { Authorization: `Bearer ${session.token}` } }, true)) : null;
      await ensureFrames();
      if (accessSession !== session || !canEdit(current)) throw new Error("UNAUTHORIZED");
      editingItem = current; photo = original; originalChanged = false; requiresOriginal = !original; editConflict = false;
      const settings = result.editSettings || {};
      Object.assign(edit, { frameId: frameList.some(frame => frame.id === current.frameId) ? current.frameId : frameList[0].id, orientation: current.orientation === "landscape" ? "landscape" : "portrait", fit: settings.fit === "contain" ? "contain" : "cover", zoom: clamp(Number(settings.zoom) || 1, 1, 4), panX: clamp(Number(settings.panX) || 0, -1, 1), panY: clamp(Number(settings.panY) || 0, -1, 1) });
      $("galleryName").value = current.name; $("galleryRoom").value = session.room; $("galleryCaption").value = current.caption;
      $("galleryCaptionCount").textContent = `${current.caption.length} / 240`; $("galleryPreviewCaption").textContent = current.caption;
      $("galleryConsent").checked = false;
      setStatus($("galleryEditorStatus"), requiresOriginal ? "legacyOriginal" : "");
      setStatus($("galleryAccessStatus"), "");
      if ($("galleryViewer").open) $("galleryViewer").close();
      if ($("galleryAccess").open) $("galleryAccess").close();
      if (!$("galleryEditor").open) $("galleryEditor").showModal();
      draw();
    } catch (error) { setStatus($("galleryAccessStatus"), error.status === 401 || error.message === "UNAUTHORIZED" ? "unauthorized" : "unavailable"); }
    finally { editLoading = false; updateControls(); }
  }
  const changeEdit = action => {
    if (busy || pendingSubmission) return;
    if (action === "zoomIn") edit.zoom = clamp(edit.zoom * 1.12, 1, 4);
    if (action === "zoomOut") edit.zoom = clamp(edit.zoom / 1.12, 1, 4);
    if (action === "reset") resetCrop();
    if (action === "left") edit.panX = clamp(edit.panX - 0.15, -1, 1);
    if (action === "right") edit.panX = clamp(edit.panX + 0.15, -1, 1);
    if (action === "up") edit.panY = clamp(edit.panY - 0.15, -1, 1);
    if (action === "down") edit.panY = clamp(edit.panY + 0.15, -1, 1);
    draw();
  };
  document.querySelectorAll("[data-gallery-close]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
  $("galleryManage").addEventListener("click", () => openAccess());
  $("galleryEditorManage").addEventListener("click", () => openAccess(true));
  $("galleryLogout").addEventListener("click", logOut);
  $("galleryAccessLogout").addEventListener("click", logOut);
  $("galleryAccessForm").addEventListener("submit", async event => {
    event.preventDefault();
    if (accessBusy) return;
    const name = $("galleryAccessName").value.trim(), room = $("galleryAccessRoom").value.trim();
    if (!name || !room) { setStatus($("galleryAccessStatus"), "invalid"); return; }
    accessBusy = true; updateAccessUI(); setStatus($("galleryAccessStatus"), "loggingIn");
    try {
      const role = await authenticate(name, room);
      setStatus($("galleryAccessStatus"), role === "admin" ? "adminActive" : "guestActive");
      if (!busy && !pendingSubmission && !editingItem && role === "guest") { $("galleryName").value = name; $("galleryRoom").value = room; }
    } catch (error) { clearAccess(); setStatus($("galleryAccessStatus"), error.message === "ADMIN_SETUP_REQUIRED" ? "adminSetup" : error.message === "UNAUTHORIZED" || error.status === 401 ? "unauthorized" : error.message === "RATE_LIMITED" ? "rateLimit" : "unavailable"); }
    finally { accessBusy = false; updateAccessUI(); }
  });
  $("galleryMineMore").addEventListener("click", () => loadMine(false));
  $("galleryDeleteCancel").addEventListener("click", () => $("galleryDeleteConfirm").close());
  $("galleryDeleteConfirm").addEventListener("close", () => { deleteTarget = null; });
  $("galleryDeleteYes").addEventListener("click", async () => {
    if (deleting || !deleteTarget) return;
    if (!canDelete(deleteTarget)) { clearAccess("sessionExpired"); setStatus($("galleryDeleteStatus"), "sessionExpired"); return; }
    const item = deleteTarget, session = accessSession;
    deleting = true; updateAccessUI(); setStatus($("galleryDeleteStatus"), "deleting");
    try {
      const result = await request(`/api/gallery/photos/${encodeURIComponent(item.id)}`, { method: "DELETE", headers: { Authorization: `Bearer ${session.token}`, "Content-Type": "application/json" }, body: JSON.stringify({ name: session.name, room: session.room }) });
      if (result.removed !== true) throw new Error("UNAVAILABLE");
      latestItems = latestItems.filter(old => old.id !== item.id); allItems = allItems.filter(old => old.id !== item.id); mineItems = mineItems.filter(old => old.id !== item.id);
      accessSession?.photoIds.delete(item.id);
      if (viewedItem?.id === item.id) { viewedItem = null; $("galleryViewer").close(); }
      $("galleryDeleteConfirm").close();
      setStatus($("galleryStatus"), "deleted");
      refreshLatest();
    } catch (error) { setStatus($("galleryDeleteStatus"), error.status === 401 || error.message === "UNAUTHORIZED" ? "unauthorized" : error.message === "ITEM_REMOVED" ? "removed" : "deleteFailed"); }
    finally { deleting = false; updateAccessUI(); }
  });
  $("galleryChoose").addEventListener("click", () => $("galleryFile").click());
  $("galleryShare").addEventListener("click", async () => {
    if (editingItem && !busy && !pendingSubmission) {
      editingItem = null; photo = null; originalChanged = false; requiresOriginal = false; editConflict = false;
      $("galleryCaption").value = ""; $("galleryPreviewCaption").textContent = ""; $("galleryCaptionCount").textContent = "0 / 240";
      $("galleryConsent").checked = false; resetCrop(); setStatus($("galleryEditorStatus"), "");
    }
    if (!$("galleryEditor").open) $("galleryEditor").showModal();
    draw(); updateControls();
    try { await ensureFrames(); draw(); }
    catch { setStatus($("galleryFrameStatus"), "frameError"); }
    updateControls();
  });
  $("galleryAll").addEventListener("click", () => { $("galleryBrowse").showModal(); loadAll(true); });
  $("galleryMore").addEventListener("click", () => loadAll(false));
  $("galleryCaption").addEventListener("input", () => { $("galleryCaptionCount").textContent = `${$("galleryCaption").value.length} / 240`; $("galleryPreviewCaption").textContent = $("galleryCaption").value; });
  $("galleryEditor").querySelectorAll("button[data-orientation]").forEach(button => button.addEventListener("click", () => { edit.orientation = button.dataset.orientation; resetCrop(); draw(); }));
  $("galleryEditor").querySelectorAll("button[data-fit]").forEach(button => button.addEventListener("click", () => { edit.fit = button.dataset.fit; resetCrop(); draw(); }));
  $("galleryEditor").querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => changeEdit(button.dataset.edit)));
  canvas.addEventListener("keydown", event => {
    const action = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", "+": "zoomIn", "=": "zoomIn", "-": "zoomOut" }[event.key];
    if (action) { event.preventDefault(); changeEdit(action); }
  });
  const pointers = new Map();
  let gesture = null;
  const pointerPosition = event => {
    const rect = canvas.getBoundingClientRect();
    // Account for object-fit:contain when a max-height constrains the canvas.
    const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
    return { x: (event.clientX - rect.left - (rect.width - canvas.width * scale) / 2) / scale, y: (event.clientY - rect.top - (rect.height - canvas.height * scale) / 2) / scale };
  };
  const beginGesture = () => {
    const positions = [...pointers.values()];
    if (!positions.length) { gesture = null; return; }
    const centre = positions.length > 1 ? { x: (positions[0].x + positions[1].x) / 2, y: (positions[0].y + positions[1].y) / 2 } : positions[0];
    gesture = { centre, distance: positions.length > 1 ? Math.hypot(positions[1].x - positions[0].x, positions[1].y - positions[0].y) : 0, zoom: edit.zoom, panX: edit.panX, panY: edit.panY };
  };
  canvas.addEventListener("pointerdown", event => {
    if (!photo || busy || pendingSubmission) return;
    canvas.setPointerCapture(event.pointerId); pointers.set(event.pointerId, pointerPosition(event)); beginGesture();
  });
  canvas.addEventListener("pointermove", event => {
    if (!pointers.has(event.pointerId) || !gesture || busy || pendingSubmission) return;
    pointers.set(event.pointerId, pointerPosition(event));
    const positions = [...pointers.values()];
    const centre = positions.length > 1 ? { x: (positions[0].x + positions[1].x) / 2, y: (positions[0].y + positions[1].y) / 2 } : positions[0];
    if (positions.length > 1 && gesture.distance) edit.zoom = clamp(gesture.zoom * Math.hypot(positions[1].x - positions[0].x, positions[1].y - positions[0].y) / gesture.distance, 1, 4);
    const result = frames.paint(canvas, edit, photo);
    edit.panX = result.crop.maxX ? clamp(gesture.panX + (centre.x - gesture.centre.x) / result.crop.maxX, -1, 1) : 0;
    edit.panY = result.crop.maxY ? clamp(gesture.panY + (centre.y - gesture.centre.y) / result.crop.maxY, -1, 1) : 0;
    draw();
  });
  const endPointer = event => { pointers.delete(event.pointerId); beginGesture(); };
  canvas.addEventListener("pointerup", endPointer); canvas.addEventListener("pointercancel", endPointer); canvas.addEventListener("lostpointercapture", endPointer);
  $("galleryEditor").addEventListener("close", () => { pointers.clear(); gesture = null; });
  $("galleryFile").addEventListener("change", async event => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file || busy || pendingSubmission) return;
    const sequence = ++decodeSequence;
    if (file.size > 20 * 1024 * 1024) { decoding = false; updateControls(); setStatus($("galleryEditorStatus"), "tooLarge"); return; }
    decoding = true; updateControls();
    try {
      const signature = new Uint8Array(await file.slice(0, 16).arrayBuffer());
      const jpeg = signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff;
      const png = [137,80,78,71,13,10,26,10].every((byte, index) => signature[index] === byte);
      const webp = String.fromCharCode(...signature.slice(0,4)) === "RIFF" && String.fromCharCode(...signature.slice(8,12)) === "WEBP";
      if (!jpeg && !png && !webp) throw new Error("badFile");
      const decoded = await decodePhotoBlob(file);
      if (sequence !== decodeSequence) return;
      photo = decoded; originalChanged = true; requiresOriginal = false;
      if (!editingItem) edit.orientation = decoded.width > decoded.height ? "landscape" : "portrait";
      resetCrop(); draw(); setStatus($("galleryEditorStatus"), "");
    } catch (error) { if (sequence === decodeSequence) setStatus($("galleryEditorStatus"), error.message === "badFile" ? "badFile" : "imageError"); }
    finally { if (sequence === decodeSequence) { decoding = false; updateControls(); } }
  });
  const submissionId = () => {
    if (crypto.randomUUID) return crypto.randomUUID();
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, value => (Number(value) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(value) / 4).toString(16));
  };
  $("galleryForm").addEventListener("submit", async event => {
    event.preventDefault();
    if (busy || decoding || editLoading || editConflict) return;
    if (!apiBase) { setStatus($("galleryEditorStatus"), "unavailable"); return; }
    if (!photo || requiresOriginal) { setStatus($("galleryEditorStatus"), editingItem ? "originalRequired" : "needPhoto"); return; }
    if (editingItem && !canEdit(editingItem)) { setStatus($("galleryEditorStatus"), "unauthorized"); return; }
    if (!pendingSubmission) {
      if ($("galleryCaption").value.length > 240 || (!editingItem && (!$("galleryName").value.trim() || !$("galleryRoom").value.trim()))) { setStatus($("galleryEditorStatus"), "invalid"); return; }
      if (!editingItem && !$("galleryConsent").checked) { setStatus($("galleryEditorStatus"), "consentError"); return; }
    }
    busy = true; updateControls(); setStatus($("galleryEditorStatus"), editingItem ? "savingEdit" : "publishing");
    let submitted = false, createdCredentials = null;
    try {
      if (!pendingSubmission) {
        const image = await frames.exportJpeg({ ...edit }, photo);
        const payload = new FormData();
        payload.set("caption", $("galleryCaption").value.trim());
        payload.set("frameId", edit.frameId); payload.set("orientation", edit.orientation);
        payload.set("editSettings", JSON.stringify({ fit: edit.fit, zoom: edit.zoom, panX: edit.panX, panY: edit.panY }));
        payload.set("image", image, "port-side-moment.jpg");
        if (!editingItem || originalChanged) payload.set("originalImage", await frames.exportOriginalJpeg(photo), "port-side-original.jpg");
        if (editingItem) {
          payload.set("editId", submissionId()); payload.set("expectedRevision", String(editingItem.revision));
          pendingSubmission = { payload, path: `/api/gallery/photos/${encodeURIComponent(editingItem.id)}`, token: accessSession.token, kind: "edit", id: editingItem.id };
        } else {
          const name = $("galleryName").value.trim(), room = $("galleryRoom").value.trim();
          payload.set("name", name); payload.set("room", room);
          payload.set("consent", "yes"); payload.set("consentVersion", "2026-09-23"); payload.set("submissionId", submissionId());
          pendingSubmission = { payload, path: "/api/gallery", kind: "new", name, room };
        }
        // The bytes, settings and id are reused unchanged after an uncertain response.
      }
      const job = pendingSubmission;
      submitted = true;
      const result = await request(job.path, { method: "POST", body: job.payload, ...(job.token ? { headers: { Authorization: `Bearer ${job.token}` } } : {}) });
      const [item] = validItems([result.item]);
      if (!item || (job.kind === "edit" && item.id !== job.id)) throw new Error("UNAVAILABLE");
      // Creation is confirmed. Sign-in below is a separate operation, never a retry of this upload.
      pendingSubmission = null;
      if (job.kind === "edit") {
        const replace = items => items.map(old => old.id === item.id ? item : old);
        latestItems = replace(latestItems); allItems = replace(allItems); mineItems = replace(mineItems);
        if (viewedItem?.id === item.id) viewedItem = item;
        setStatus($("galleryStatus"), "editSaved");
      } else {
        latestItems = [item, ...latestItems.filter(old => old.id !== item.id)];
        setStatus($("galleryStatus"), "success");
        createdCredentials = { name: job.name, room: job.room };
      }
      const keepName = createdCredentials?.name || accessSession?.name || "";
      const keepRoom = createdCredentials?.room || accessSession?.room || "";
      $("galleryForm").reset(); photo = null; editingItem = null; originalChanged = false; requiresOriginal = false; editConflict = false; resetCrop();
      $("galleryCaptionCount").textContent = "0 / 240"; $("galleryPreviewCaption").textContent = "";
      $("galleryName").value = keepName; $("galleryRoom").value = keepRoom;
      setStatus($("galleryEditorStatus"), ""); $("galleryEditor").close();
      draw(); updateAccessUI();
      if (job.kind === "edit") openAccess();
      refreshLatest();
    } catch (error) {
      const errorKeys = { BAD_INPUT: "invalid", BAD_IMAGE: "imageError", CONSENT_REQUIRED: "consentError", RATE_LIMITED: "rateLimit", ASSETS_UNAVAILABLE: "frameError", ITEM_REMOVED: "removed", UNAUTHORIZED: "unauthorized", EDIT_CONFLICT: "editConflict" };
      const definitive = error.confirmed && errorKeys[error.message];
      if (definitive || !submitted) pendingSubmission = null;
      if (error.message === "EDIT_CONFLICT" && error.confirmed) editConflict = true;
      setStatus($("galleryEditorStatus"), pendingSubmission ? "uncertain" : errorKeys[error.message] || "unavailable");
    } finally { busy = false; updateControls(); }
    if (createdCredentials) {
      accessBusy = true; updateAccessUI();
      let granted = false;
      try { await authenticate(createdCredentials.name, createdCredentials.room); granted = true; }
      catch { clearAccess(); }
      finally { accessBusy = false; updateAccessUI(); }
      $("galleryAccessName").value = createdCredentials.name; $("galleryAccessRoom").value = createdCredentials.room;
      openAccess();
      if (!granted) setStatus($("galleryAccessStatus"), "uploadAccessFailed");
    }
  });
  window.addEventListener("portside:languagechange", event => { const next = event.detail?.language; if (strings[next]) { language = next; applyLanguage(); } });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && accessSession && !sessionLive()) { clearAccess("sessionExpired"); setStatus($("galleryAccessStatus"), "sessionExpired"); } });
  if ("IntersectionObserver" in window) new IntersectionObserver(entries => { galleryVisible = entries[0].isIntersecting; }, { rootMargin: "150px" }).observe(root);
  setInterval(() => {
    if (!document.hidden && (galleryVisible || $("galleryBrowse").open)) {
      refreshLatest();
      if ($("galleryBrowse").open && !nextCursor) loadAll(true);
    }
  }, 60000);
  applyLanguage();
  setStatus($("galleryStatus"), "loading");
  refreshLatest();
})();
