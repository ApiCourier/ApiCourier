const LICENSE_DATA_PATH = 'files/third-party-licenses.json';
const PREVIEW_LIMIT = 220;

const loadingEl = document.getElementById('license-loading');
const errorEl = document.getElementById('license-error');
const emptyEl = document.getElementById('license-empty');
const tableWrapEl = document.getElementById('license-table-wrap');
const tableHeadEl = document.getElementById('license-table-head');
const tableBodyEl = document.getElementById('license-table-body');
const metaEl = document.getElementById('license-meta');
const searchEl = document.getElementById('license-search');
const matchCountEl = document.getElementById('license-match-count');

const columnLabels = {
  package: 'Package',
  version: 'Version',
  origin: 'Origin',
  licenseExpression: 'License',
  licenseUrl: 'License URL',
  copyright: 'Copyright',
  authors: 'Authors',
  projectUrl: 'Project URL'
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function maybeLink(url) {
  if (!url) {
    return '';
  }

  const safeValue = escapeHtml(url);
  if (/^https?:\/\//i.test(url)) {
    return `<a class="license-link" href="${safeValue}" target="_blank" rel="noopener noreferrer">${safeValue}</a>`;
  }

  return safeValue;
}

function renderLongTextCell(value) {
  const cleaned = (value || '').trim();
  if (!cleaned) {
    return '';
  }

  const safe = escapeHtml(cleaned);
  if (cleaned.length <= PREVIEW_LIMIT) {
    return `<div>${safe.replaceAll('\n', '<br>')}</div>`;
  }

  const preview = escapeHtml(`${cleaned.slice(0, PREVIEW_LIMIT)}...`).replaceAll('\n', '<br>');
  return [
    `<div class="license-text-preview">${preview}</div>`,
    '<details class="license-text-details">',
    '<summary>View full text</summary>',
    `<pre class="license-text-block">${safe}</pre>`,
    '</details>'
  ].join('');
}

function renderTable(rows) {
  tableHeadEl.innerHTML = `
    <tr>
      <th>${columnLabels.package}</th>
      <th>${columnLabels.version}</th>
      <th>${columnLabels.origin}</th>
      <th>${columnLabels.licenseExpression}</th>
      <th>${columnLabels.licenseUrl}</th>
      <th>${columnLabels.copyright}</th>
      <th>${columnLabels.authors}</th>
      <th>${columnLabels.projectUrl}</th>
    </tr>
  `;

  tableBodyEl.innerHTML = rows
    .map((row) => {
      const search = escapeHtml(
        [
          row.package,
          row.version,
          row.origin,
          row.licenseExpression,
          row.copyright,
          row.authors,
          row.projectUrl
        ].join(' ').toLowerCase()
      );

      return [
        `<tr data-search="${search}">`,
        `<td><strong class="text-slate-100">${escapeHtml(row.package || '')}</strong></td>`,
        `<td>${escapeHtml(row.version || '')}</td>`,
        `<td>${escapeHtml(row.origin || '')}</td>`,
        `<td>${renderLongTextCell(row.licenseExpression || '')}</td>`,
        `<td>${maybeLink(row.licenseUrl || '')}</td>`,
        `<td>${renderLongTextCell(row.copyright || '')}</td>`,
        `<td>${escapeHtml(row.authors || '')}</td>`,
        `<td>${maybeLink(row.projectUrl || '')}</td>`,
        '</tr>'
      ].join('');
    })
    .join('');
}

function renderMeta(rows) {
  const packageCount = rows.filter((row) => row.package).length;
  const uniqueLicenses = new Set(
    rows
      .map((row) => (row.licenseExpression || '').split(/\n+/)[0].trim())
      .filter((value) => value)
  ).size;

  const cards = [
    { label: 'Packages', value: packageCount.toLocaleString() },
    { label: 'Rows', value: rows.length.toLocaleString() },
    { label: 'Distinct License Entries', value: uniqueLicenses.toLocaleString() }
  ];

  metaEl.innerHTML = cards
    .map(
      (card) => `
        <div class="license-meta-card">
          <div class="license-meta-label">${escapeHtml(card.label)}</div>
          <div class="license-meta-value">${escapeHtml(card.value)}</div>
        </div>
      `
    )
    .join('');
}

function applyFilter() {
  const query = (searchEl.value || '').trim().toLowerCase();
  const rows = tableBodyEl.querySelectorAll('tr');

  let visibleCount = 0;
  rows.forEach((row) => {
    if (!query || row.dataset.search.includes(query)) {
      row.classList.remove('is-hidden');
      visibleCount += 1;
      return;
    }

    row.classList.add('is-hidden');
  });

  matchCountEl.textContent = query
    ? `${visibleCount.toLocaleString()} matching rows`
    : `${rows.length.toLocaleString()} total rows`;
}

async function loadThirdPartyNotices() {
  try {
    const response = await fetch(LICENSE_DATA_PATH, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error('Failed to load third-party license data.');
    }

    const rows = await response.json();

    loadingEl.classList.add('is-hidden');

    if (!Array.isArray(rows) || !rows.length) {
      emptyEl.classList.remove('is-hidden');
      return;
    }

    renderMeta(rows);
    renderTable(rows);

    tableWrapEl.classList.remove('is-hidden');
    applyFilter();

    searchEl.addEventListener('input', applyFilter);
  } catch {
    loadingEl.classList.add('is-hidden');
    errorEl.classList.remove('is-hidden');
    errorEl.textContent = 'Unable to render third-party notices at this time.';
  }
}

void loadThirdPartyNotices();
