/* Conteúdo editorial em /data/community.json. Sem cadastro ou transmissão de dados. */
const officialInstagram = 'https://www.instagram.com/fazedoresdoreino/';
const node = (tag, text, className) => {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
};
function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch { return null; }
}
function photoUrl(value) {
  if (typeof value !== 'string') return null;
  if (/^\/assets\/[a-zA-Z0-9._/-]+$/.test(value) && !value.includes('..')) return value;
  return safeUrl(value);
}
function link(text, url, className = 'text-link') {
  const element = node('a', text, className);
  element.href = safeUrl(url) || officialInstagram;
  element.target = '_blank';
  element.rel = 'noopener noreferrer';
  return element;
}
function picture(url, description) {
  const image = node('img');
  image.src = url;
  image.alt = description;
  image.loading = 'lazy';
  return image;
}
function embedMap(target, value, title) {
  const valid = safeUrl(value);
  if (!valid) return;
  const url = new URL(valid);
  const allowed = ['www.google.com', 'maps.google.com', 'www.openstreetmap.org'];
  if (!allowed.includes(url.hostname)) return;
  const frame = node('iframe');
  frame.src = valid;
  frame.title = title;
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer';
  frame.allowFullscreen = true;
  target.replaceChildren(frame);
}
function renderPastors(pastors) {
  const approved = pastors.filter(pastor => pastor.name && (photoUrl(pastor.photo) || (safeUrl(pastor.videoUrl) && new URL(pastor.videoUrl).hostname === 'www.youtube.com')));
  if (!approved.length) return;
  const grid = document.querySelector('#pastor-grid');
  grid.replaceChildren();
  approved.forEach(pastor => {
    const card = node('article', null, 'pastor-card');
    if (photoUrl(pastor.photo)) card.append(picture(photoUrl(pastor.photo), pastor.alt || `Retrato oficial de ${pastor.name}`));
    else {
      const frame = node('iframe');
      frame.src = safeUrl(pastor.videoUrl);
      frame.title = 'Testemunho dos pastores sêniores — Fazedores Cast';
      frame.loading = 'lazy';
      frame.allowFullscreen = true;
      card.append(frame);
    }
    const copy = node('div');
    copy.append(node('span', pastor.role || 'Liderança', 'eyebrow'), node('h3', pastor.name), node('p', pastor.bio || ''));
    if (safeUrl(pastor.url)) copy.append(link('ASSISTIR AO TESTEMUNHO ↗', pastor.url));
    card.append(copy);
    grid.append(card);
  });
}
function renderAnnouncements(items) {
  if (!items.length) return;
  const target = document.querySelector('#announcement-list');
  target.replaceChildren();
  items.filter(item => item.title).forEach(item => {
    const article = node('article', null, 'announcement');
    const copy = node('div');
    copy.append(node('h3', item.title), node('p', item.text || ''));
    if (safeUrl(item.url)) copy.append(link('SAIBA MAIS ↗', item.url));
    article.append(node('span', '↗', 'bulletin-icon'), copy);
    target.append(article);
  });
}
function renderEvents(events) {
  if (!events.length) return;
  const target = document.querySelector('#event-list');
  target.replaceChildren();
  events.filter(event => event.title).forEach(event => {
    const card = node('article', null, 'event-card');
    if (photoUrl(event.photo)) card.append(picture(photoUrl(event.photo), event.alt || event.title));
    const copy = node('div', null, 'event-copy');
    const time = node('time', event.dateLabel || 'Data a confirmar', 'eyebrow');
    if (event.date && /^\d{4}-\d{2}-\d{2}$/.test(event.date)) time.dateTime = event.date;
    copy.append(time, node('h3', event.title), node('p', event.description || ''));
    if (event.location) copy.append(node('p', event.location, 'event-place'));
    if (safeUrl(event.url)) copy.append(link('VER DETALHES ↗', event.url));
    card.append(copy);
    target.append(card);
  });
}
function renderCells(cells) {
  const search = document.querySelector('#cell-search');
  const target = document.querySelector('#cell-list');
  const counter = document.querySelector('#cell-count');
  const list = cells.filter(cell => cell.name && cell.neighborhood);
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const render = () => {
    const query = normalize(search.value);
    const matches = list.filter(cell => normalize(`${cell.name} ${cell.neighborhood}`).includes(query));
    target.replaceChildren();
    if (!list.length) {
      counter.textContent = 'Cadastro de células em preparação.';
      return;
    }
    counter.textContent = `${matches.length} ${matches.length === 1 ? 'célula encontrada' : 'células encontradas'}.`;
    if (!matches.length) target.append(node('p', 'Nenhuma célula encontrada para esta busca.'));
    matches.forEach(cell => {
      const card = node('article', null, 'cell-card');
      card.append(node('span', cell.neighborhood, 'eyebrow'), node('h3', cell.name));
      if (cell.schedule) card.append(node('p', cell.schedule));
      if (cell.address) card.append(node('p', cell.address));
      if (safeUrl(cell.url)) card.append(link('QUERO PARTICIPAR ↗', cell.url));
      target.append(card);
    });
  };
  search.addEventListener('input', render);
  render();
}
async function loadCommunity() {
  try {
    const response = await fetch('/data/community.json');
    if (!response.ok) throw new Error('Conteúdo indisponível');
    const data = await response.json();
    renderPastors(Array.isArray(data.pastors) ? data.pastors : []);
    renderAnnouncements(Array.isArray(data.announcements) ? data.announcements : []);
    renderEvents(Array.isArray(data.events) ? data.events : []);
    renderCells(Array.isArray(data.cells) ? data.cells : []);
    const location = data.location || {};
    if (location.address) document.querySelector('#church-address').textContent = location.address;
    if (safeUrl(location.mapsUrl)) {
      const route = document.querySelector('#church-route');
      route.href = safeUrl(location.mapsUrl);
      route.textContent = 'COMO CHEGAR ↗';
    }
    if (photoUrl(location.photo)) {
      const model = document.querySelector('.church-model');
      model.replaceWith(picture(photoUrl(location.photo), 'Foto oficial do espaço da igreja'));
      document.querySelector('.model-label').textContent = 'NOSSO ESPAÇO';
    }
    embedMap(document.querySelector('#location-map'), location.embedUrl, 'Localização da igreja');
    embedMap(document.querySelector('#cells-map'), data.cellsMapEmbedUrl, 'Mapa de células em Caxias do Sul');
    const introducers = data.ministries?.introdutores;
    if (photoUrl(introducers?.photo)) {
      const media = document.querySelector('#introdutores-media');
      media.querySelector('.welcome-art').replaceWith(picture(photoUrl(introducers.photo), 'Foto oficial da equipe de introdutores'));
      const text = media.parentElement.querySelector('.ministry-content p');
      text.textContent = introducers.caption || 'Nossa equipe de acolhimento.';
    }
    const worship = data.ministries?.louvor;
    if (photoUrl(worship?.photo)) document.querySelector('#louvor-photo').src = photoUrl(worship.photo);
    if (safeUrl(worship?.source)) document.querySelector('#louvor-source').href = safeUrl(worship.source);
    if (safeUrl(data.contactFormUrl)) {
      const area = document.querySelector('#contact-form-area');
      area.replaceChildren(node('h3', 'Vamos conversar.'), node('p', 'Preencha o formulário oficial da igreja.'), link('ABRIR FORMULÁRIO ↗', data.contactFormUrl, 'button red-button'));
    }
  } catch {
    document.querySelector('#cell-count').textContent = 'Não foi possível carregar o cadastro. Converse com a igreja pelo Instagram.';
  }
}
loadCommunity();
