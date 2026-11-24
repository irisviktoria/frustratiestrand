/* Knuffels van Nore: geïllustreerde, licht geanimeerde versies van de gehaakte knuffels.
   Gebruik: <div data-k="kwalli" data-vorm="peek|volledig" data-pose="zwaai|slaap"></div>
   Padje komt erbij zodra er foto's zijn. */
(function (root) {
  'use strict';

  const NAMEN = { kwalli: 'Kwalli', walli: 'Walli', gekki: 'Gekki', nilli: 'Nilli' };

  const DEFS = `<defs>
  <radialGradient id="kg-kwalli" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#FBD6D6"/><stop offset=".55" stop-color="#EFADB2"/><stop offset="1" stop-color="#D98B93"/></radialGradient>
  <radialGradient id="kg-walli" cx=".38" cy=".28" r=".9"><stop offset="0" stop-color="#86A8E4"/><stop offset=".55" stop-color="#5C7DC0"/><stop offset="1" stop-color="#3F5C9B"/></radialGradient>
  <radialGradient id="kg-gekki" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="#A9B4C6"/><stop offset=".55" stop-color="#7C899E"/><stop offset="1" stop-color="#5A667A"/></radialGradient>
  <radialGradient id="kg-nilli" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#F9CDC9"/><stop offset=".6" stop-color="#EDA9A6"/><stop offset="1" stop-color="#D88988"/></radialGradient>
  <radialGradient id="kg-snuit" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#FBDAD6"/><stop offset="1" stop-color="#EFB5B1"/></radialGradient>
  <radialGradient id="kg-oor" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#FCF1DD"/><stop offset="1" stop-color="#E6CDA8"/></radialGradient>
  <pattern id="kg-steek" width="8" height="6" patternUnits="userSpaceOnUse">
    <path d="M1 1.2 L4 5 L7 1.2" fill="none" stroke="#000" stroke-opacity=".13" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1 -0.3 L4 3.5 L7 -0.3" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
  </pattern>
</defs>`;

  const CSS = `
.k{display:block;width:100%;height:auto;overflow:hidden}
.k *{transform-box:fill-box}
.k .zweef{animation:kZweef 3.6s ease-in-out infinite}
@keyframes kZweef{50%{transform:translateY(-5px)}}
.k .tent{transform-origin:50% 0;animation:kSwing 3.4s ease-in-out infinite}
@keyframes kSwing{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
.k .oog{transform-origin:50% 50%;animation:kKnip 5.5s infinite}
@keyframes kKnip{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}
.k .vin{transform-origin:50% 0;animation:kVin 3s ease-in-out infinite}
@keyframes kVin{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(7deg)}}
.k .oor{transform-origin:50% 100%;animation:kOor 4.5s ease-in-out infinite}
@keyframes kOor{0%,84%,100%{transform:rotate(0)}89%{transform:rotate(-9deg)}94%{transform:rotate(6deg)}}
.k .adem{transform-origin:50% 100%;animation:kAdem 3.8s ease-in-out infinite}
@keyframes kAdem{50%{transform:scale(1.02,1.04)}}
.k .zz{opacity:0;animation:kZz 3.6s ease-in infinite}
@keyframes kZz{0%{opacity:0;transform:translate(0,6px)}30%{opacity:.85}100%{opacity:0;transform:translate(8px,-14px)}}
.k .zwaai{transform-origin:50% 8%;animation:kZwaai 1.1s ease-in-out infinite}
@keyframes kZwaai{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(24deg)}}
.av .k{width:100%;height:100%}
@media (prefers-reduced-motion:reduce){.k *{animation:none!important}}`;

  /* ---------- hulpjes ---------- */
  const laag = (shape, grad) => `${shape.replace('/>', ` fill="url(#${grad})"/>`)}${shape.replace('/>', ' fill="url(#kg-steek)"/>')}`;
  const kraal = (cx, cy, r, extra) =>
    `<g class="oog"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#16161b"/><circle cx="${cx - r * .32}" cy="${cy - r * .36}" r="${r * .32}" fill="#fff" opacity=".85"/></g>`;
  const dicht = (cx, cy, w) =>
    `<path d="M${cx - w} ${cy} Q${cx} ${cy + w * .8} ${cx + w} ${cy}" fill="none" stroke="#16161b" stroke-width="2.6" stroke-linecap="round"/>`;
  const schaduw = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="8" fill="#2E5E6B" opacity=".13"/>`;
  const wrap = (inner, o) => (o.volledig ? `<g class="zweef">${inner}</g>` : inner);

  /* ---------- Kwalli: roze octopus ---------- */
  function kwalli(o) {
    const T = [
      ['M62 100 C40 118 52 138 36 150 C24 158 14 148 22 140', '#E59AA2', 0, 0],
      ['M138 100 C160 118 148 138 164 150 C176 158 186 148 178 140', '#E59AA2', .4, 1],
      ['M76 112 C66 134 84 150 70 168 C62 178 48 172 52 162', '#EDA8AE', .8, 0],
      ['M124 112 C134 134 116 150 130 168 C138 178 152 172 148 162', '#EDA8AE', 1.2, 0],
      ['M92 116 C90 140 104 156 96 176 C92 186 80 184 82 176', '#F2B5BA', 1.6, 0],
      ['M108 116 C110 140 96 156 104 176 C108 186 120 184 118 176', '#F2B5BA', 2, 0]
    ];
    const tent = T.map(([d, c, del, w]) =>
      `<g class="tent${o.zwaai && w ? ' zwaai' : ''}" style="animation-delay:-${del}s">` +
      `<path d="${d}" fill="none" stroke="${c}" stroke-width="15" stroke-linecap="round"/>` +
      `<path d="${d}" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="10" stroke-linecap="round" stroke-dasharray="0.1 7.2"/></g>`).join('');
    const kop = laag('<ellipse cx="100" cy="68" rx="50" ry="48"/>', 'kg-kwalli') +
      `<ellipse cx="80" cy="42" rx="22" ry="11" fill="#fff" opacity=".24" transform="rotate(-25 80 42)"/>`;
    const gezicht = `<ellipse cx="72" cy="88" rx="8" ry="4.5" fill="#F0838F" opacity=".35"/><ellipse cx="128" cy="88" rx="8" ry="4.5" fill="#F0838F" opacity=".35"/>` +
      (o.slaap
        ? dicht(82, 74, 6) + dicht(118, 74, 6)
        : `<g class="oog"><circle cx="82" cy="74" r="3.6" fill="#16161b"/><circle cx="118" cy="74" r="3.6" fill="#16161b"/></g>`) +
      `<path d="M84 90 Q100 104 116 90" fill="none" stroke="#16161b" stroke-width="2.8" stroke-linecap="round"/>`;
    return schaduw(100, 186, 52) + wrap(tent + kop + gezicht, o);
  }

  /* ---------- Walli: blauwe walvis ---------- */
  function walli(o) {
    const body = 'M100 30 C138 30 158 66 156 108 C154 146 132 170 100 170 C68 170 46 146 44 108 C42 66 62 30 100 30 Z';
    const vinL = 'M52 126 C30 122 18 140 28 154 C38 166 56 154 60 140 Z';
    const vinR = 'M148 126 C170 122 182 140 172 154 C162 166 144 154 140 140 Z';
    const staart = 'M140 158 C168 168 192 150 188 118 C180 132 170 132 162 126 C170 140 158 150 138 146 Z';
    const vinnen = `<path d="${staart}" fill="#4B6FB5"/><path d="${staart}" fill="url(#kg-steek)"/>` + `<g class="vin"><path d="${vinL}" fill="#4B6FB5"/><path d="${vinL}" fill="url(#kg-steek)"/></g>` +
      `<g class="vin${o.zwaai ? ' zwaai' : ''}"><path d="${vinR}" fill="#4B6FB5"/><path d="${vinR}" fill="url(#kg-steek)"/></g>`;
    const romp = laag(`<path d="${body}"/>`, 'kg-walli') +
      `<ellipse cx="100" cy="140" rx="34" ry="24" fill="#A9C2EE" opacity=".3"/>` +
      `<ellipse cx="80" cy="52" rx="20" ry="11" fill="#fff" opacity=".22" transform="rotate(-22 80 52)"/>`;
    const gezicht = `<path d="M64 94 Q100 102 136 94" fill="none" stroke="#1d2338" stroke-width="3.2" stroke-linecap="round"/>` +
      (o.slaap ? dicht(76, 78, 6) + dicht(124, 78, 6) : kraal(76, 78, 4.8) + kraal(124, 78, 4.8));
    return schaduw(100, 176, 56) + wrap(vinnen + romp + gezicht, o);
  }

  /* ---------- Gekki: grijs gehaakte gekko ---------- */
  function gekki(o) {
    const poot = (x1, y1, x2, y2, c) =>
      `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="15" stroke-linecap="round" fill="none"/>` +
      `<circle cx="${x2}" cy="${y2 + 2}" r="9" fill="${c}"/><circle cx="${x2}" cy="${y2 + 2}" r="9" fill="url(#kg-steek)"/>`;
    const staart = 'M148 112 C176 110 190 88 174 74 C164 66 150 76 158 86';
    const kleurStaart = `<path d="${staart}" fill="none" stroke="#6D7A8F" stroke-width="22" stroke-linecap="round"/>` +
      `<path d="${staart}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="16" stroke-linecap="round" stroke-dasharray="0.1 8"/>`;
    const romp = laag('<path d="M70 94 C100 90 130 92 152 98 C166 103 166 122 152 127 C130 133 100 134 70 130 Z"/>', 'kg-gekki') +
      `<ellipse cx="108" cy="100" rx="30" ry="6" fill="#fff" opacity=".2"/>`;
    const kop = laag('<circle cx="52" cy="104" r="26"/>', 'kg-gekki') + laag('<ellipse cx="34" cy="112" rx="15" ry="12"/>', 'kg-gekki');
    const ogen = o.slaap
      ? laag('<circle cx="46" cy="86" r="11"/>', 'kg-gekki') + laag('<circle cx="68" cy="83" r="10"/>', 'kg-gekki') +
        dicht(46, 86, 6) + dicht(68, 83, 6)
      : laag('<circle cx="46" cy="86" r="11"/>', 'kg-gekki') + laag('<circle cx="68" cy="83" r="10"/>', 'kg-gekki') +
        kraal(46, 86, 8.5) + kraal(68, 83, 7.8);
    const zzz = o.slaap
      ? [[88, 62, 16, 0], [102, 46, 20, 1.2], [118, 28, 25, 2.4]].map(([x, y, s, d]) =>
        `<text class="zz" x="${x}" y="${y}" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="${s}" fill="#2E5E6B" style="animation-delay:-${d}s">z</text>`).join('')
      : '';
    const lijf = poot(64, 122, 56, 142, '#5C687C') + poot(122, 128, 120, 146, '#5C687C') +
      kleurStaart + `<g class="adem">${romp}</g>` +
      poot(86, 126, 78, 146, '#76839A') + poot(140, 128, 148, 148, '#76839A') + kop + ogen;
    return schaduw(104, 158, 70) + wrap(lijf, o) + zzz;
  }

  /* ---------- Nilli: roze neushoorn die denkt dat hij een nijlpaard is ---------- */
  function nilli(o) {
    const oor = (cx) => `<g class="oor"><circle cx="${cx}" cy="56" r="19" fill="url(#kg-oor)"/><circle cx="${cx}" cy="57" r="10" fill="#E2C59C" opacity=".7"/><circle cx="${cx}" cy="57" r="6" fill="#F3DFC0"/></g>`;
    const lijf = `<ellipse cx="72" cy="184" rx="17" ry="10" fill="#DF9795"/><ellipse cx="128" cy="184" rx="17" ry="10" fill="#DF9795"/>` +
      `<ellipse cx="100" cy="156" rx="50" ry="34" fill="url(#kg-nilli)"/>`;
    const kop = oor(52) + oor(148) +
      `<ellipse cx="100" cy="96" rx="64" ry="52" fill="url(#kg-nilli)"/>` +
      `<ellipse cx="72" cy="66" rx="16" ry="9" fill="#D88988" opacity=".14"/><ellipse cx="132" cy="108" rx="14" ry="8" fill="#D88988" opacity=".12"/>` +
      `<ellipse cx="82" cy="58" rx="22" ry="10" fill="#fff" opacity=".22" transform="rotate(-18 82 58)"/>` +
      `<ellipse cx="100" cy="118" rx="42" ry="28" fill="url(#kg-snuit)"/>` +
      `<path d="M91 100 Q100 70 109 100 Z" fill="url(#kg-oor)"/>` +
      `<ellipse cx="86" cy="113" rx="3.2" ry="4.6" fill="#B86C6C"/><ellipse cx="114" cy="113" rx="3.2" ry="4.6" fill="#B86C6C"/>` +
      `<path d="M84 128 Q100 137 116 128" fill="none" stroke="#B86C6C" stroke-width="2.4" stroke-linecap="round"/>` +
      (o.slaap ? dicht(74, 82, 6) + dicht(126, 82, 6) : kraal(74, 82, 4.4) + kraal(126, 82, 4.4));
    return schaduw(100, 192, 56) + wrap(lijf + kop, o);
  }

  const MAKERS = { kwalli, walli, gekki, nilli };
  const VORM = {
    avatar: { kwalli: '40 14 120 120', walli: '46 26 108 108', gekki: '6 50 116 116', nilli: '32 34 136 136' },
    peek: { kwalli: '28 12 144 112', walli: '22 22 170 124', gekki: '4 14 196 146', nilli: '28 30 144 114' },
    volledig: { kwalli: '0 0 200 196', walli: '8 12 190 172', gekki: '0 14 200 150', nilli: '20 28 160 176' }
  };

  function svg(id, vorm, pose) {
    const o = { slaap: pose === 'slaap', zwaai: pose === 'zwaai', volledig: vorm === 'volledig' };
    return `<svg class="k k-${id}" viewBox="${VORM[vorm][id]}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${NAMEN[id]}">${MAKERS[id](o)}</svg>`;
  }

  const K = {
    heeft: id => !!MAKERS[id],
    avatar: id => svg(id, 'avatar', ''),
    peek: (id, pose) => svg(id, 'peek', pose || ''),
    volledig: (id, pose) => svg(id, 'volledig', pose || ''),
    DEFS, NAMEN,
    init() {
      if (!document.getElementById('kg-defs')) {
        document.body.insertAdjacentHTML('afterbegin',
          `<svg id="kg-defs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${DEFS}</svg>`);
        const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      }
      document.querySelectorAll('[data-k]').forEach(el => {
        const id = el.dataset.k; if (!MAKERS[id]) return;
        el.innerHTML = el.dataset.vorm === 'volledig' ? K.volledig(id, el.dataset.pose) : K.peek(id, el.dataset.pose);
      });
    }
  };

  if (typeof module !== 'undefined' && module.exports) { module.exports = K; }
  else { root.KNUFFEL = K; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', K.init); else K.init(); }
})(typeof window !== 'undefined' ? window : this);
