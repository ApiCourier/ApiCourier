const contactCards = [
  {
    title: 'Support Email',
    description: 'Private support for licensing, account questions, or anything that needs a direct reply.',
    iconClass: 'bg-emerald-500/10 text-emerald-400',
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z',
    linkText: 'support@apicourier.dev',
    linkHref: 'mailto:support@apicourier.dev',
    linkClass: 'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-apired to-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-apired/40 transition-all',
    linkIcon: {
      viewBox: '0 0 24 24',
      fill: 'none',
      path: 'M13 7l5 5m0 0l-5 5m5-5H6'
    }
  },
  {
    title: 'Bug Reports',
    description: 'Found something broken? File it on GitHub with reproduction steps and logs.',
    iconClass: 'bg-sky-500/10 text-sky-400',
    iconPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    linkText: 'Open an Issue',
    linkHref: 'https://github.com/apicourier/apicourier/issues',
    linkClass: 'inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all',
    linkIcon: {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      path: 'M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.395 7.865 10.923.575.11.785-.25.785-.556 0-.275-.01-1.007-.015-1.978-3.2.696-3.878-1.543-3.878-1.543-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.079-.699.079-.699 1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.691 1.251 3.347.958.103-.744.402-1.252.732-1.54-2.554-.29-5.236-1.277-5.236-5.683 0-1.255.448-2.28 1.183-3.084-.119-.29-.513-1.459.112-3.04 0 0 .965-.309 3.162 1.178a10.98 10.98 0 0 1 2.879-.387c.977.004 1.962.132 2.88.387 2.196-1.487 3.16-1.178 3.16-1.178.626 1.581.232 2.75.114 3.04.737.804 1.182 1.829 1.182 3.084 0 4.418-2.687 5.389-5.25 5.673.414.357.783 1.06.783 2.137 0 1.543-.014 2.784-.014 3.164 0 .309.207.672.79.556C20.21 21.39 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5Z'
    },
    external: true
  },
  {
    title: 'Community + Knowledge',
    description: 'Ask questions, share workflows, and trade tips with other ApiCourier users.',
    iconClass: 'bg-indigo-500/10 text-indigo-400',
    iconPath: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v-4H7v4H5a2 2 0 01-2-2v-6a2 2 0 012-2h2V6a4 4 0 014-4h2a4 4 0 014 4v2z',
    linkText: 'Join Discord',
    linkHref: 'https://discord.gg/PCAjVpaJGu',
    linkClass: 'inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all',
    linkIcon: {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      path: 'M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z'
    },
    external: true
  }
];

function renderLinkIcon(icon) {
  return `
    <svg class="h-4 w-4" viewBox="${icon.viewBox}" fill="${icon.fill}" stroke="${icon.fill === 'none' ? 'currentColor' : 'none'}">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="${icon.fill === 'none' ? '2.5' : '0'}" d="${icon.path}" />
    </svg>
  `;
}

function renderCard(card) {
  const target = card.external ? ' target="_blank" rel="noopener noreferrer"' : '';
  const linkIcon = renderLinkIcon(card.linkIcon);

  return `
    <div class="glass feature-card rounded-2xl p-6 border border-slate-700/50">
      <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl ${card.iconClass} mb-4">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${card.iconPath}" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-50 mb-2">${card.title}</h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-4">
        ${card.description}
      </p>
      <a href="${card.linkHref}" class="${card.linkClass}"${target}>
        ${card.linkText}
        ${linkIcon}
      </a>
    </div>
  `;
}

const container = document.getElementById('contact-cards');
if (container) {
  container.innerHTML = contactCards.map((card) => renderCard(card)).join('');
}
