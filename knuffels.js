/* Knuffels van Nore: geïllustreerde, licht geanimeerde versies van de gehaakte knuffels.
   Gebruik: <div data-k="kwalli" data-vorm="peek|volledig" data-pose="zwaai|slaap"></div> */
(function (root) {
  'use strict';

  const NAMEN = { kwalli: 'Kwalli', walli: 'Walli', gekki: 'Gekki', nilli: 'Nilli', padje: 'Padje' };

  const DEFS = `<defs>
  <radialGradient id="kg-kwalli" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#FBD6D6"/><stop offset=".55" stop-color="#EFADB2"/><stop offset="1" stop-color="#D98B93"/></radialGradient>
  <radialGradient id="kg-walli" cx=".38" cy=".28" r=".9"><stop offset="0" stop-color="#86A8E4"/><stop offset=".55" stop-color="#5C7DC0"/><stop offset="1" stop-color="#3F5C9B"/></radialGradient>
  <radialGradient id="kg-gekki" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="#A9B4C6"/><stop offset=".55" stop-color="#7C899E"/><stop offset="1" stop-color="#5A667A"/></radialGradient>
  <radialGradient id="kg-nilli" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#F9CDC9"/><stop offset=".6" stop-color="#EDA9A6"/><stop offset="1" stop-color="#D88988"/></radialGradient>
  <radialGradient id="kg-snuit" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#F8C3C0"/><stop offset="1" stop-color="#E9A3A1"/></radialGradient>
  <radialGradient id="kg-oor" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#FCF1DD"/><stop offset="1" stop-color="#E6CDA8"/></radialGradient>
  <radialGradient id="kg-padje" cx=".38" cy=".25" r=".9"><stop offset="0" stop-color="#86CB7E"/><stop offset=".55" stop-color="#53A360"/><stop offset="1" stop-color="#357A47"/></radialGradient>
  <radialGradient id="kg-padjelijf" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#D2EBA6"/><stop offset=".6" stop-color="#A3D17E"/><stop offset="1" stop-color="#7FB562"/></radialGradient>
  <pattern id="kg-steek" width="8" height="6" patternUnits="userSpaceOnUse">
    <path d="M1 1.2 L4 5 L7 1.2" fill="none" stroke="#000" stroke-opacity=".13" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1 -0.3 L4 3.5 L7 -0.3" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
  </pattern>
</defs>`;

  const CSS = `
.k{display:block;width:100%;height:auto;overflow:hidden}
.k .zweef,.k .tent,.k .swish,.k .oog,.k .vin,.k .oor,.k .adem,.k .staart,.k .knik,.k .zz,.k .zwaai{transform-box:fill-box}
.k .zweef{animation:kZweef 3.6s ease-in-out infinite}
@keyframes kZweef{50%{transform:translateY(-5px)}}
.k .tent{transform-origin:50% 0;animation:kSwing 3.4s ease-in-out infinite}
@keyframes kSwing{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
.k .swish{transform-origin:50% 0;animation:kSwish 3s ease-in-out infinite}
@keyframes kSwish{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
.k .oog{transform-origin:50% 50%;animation:kKnip 5.5s infinite}
@keyframes kKnip{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}
.k .vin{animation:kVin 3s ease-in-out infinite}
.k .vin-l{transform-origin:100% 25%}
.k .vin-r{transform-origin:0% 25%}
@keyframes kVin{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(7deg)}}
.k .oor{transform-origin:50% 100%;animation:kOor 4.5s ease-in-out infinite}
@keyframes kOor{0%,84%,100%{transform:rotate(0)}89%{transform:rotate(-9deg)}94%{transform:rotate(6deg)}}
.k .adem{transform-origin:50% 100%;animation:kAdem 3.8s ease-in-out infinite}
@keyframes kAdem{50%{transform:scale(1.02,1.04)}}
.k .staart{transform-origin:0% 50%;animation:kStaart 2.6s ease-in-out infinite}
@keyframes kStaart{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
.k .knik{transform-origin:100% 60%;animation:kKnik2 4s ease-in-out infinite}
@keyframes kKnik2{0%,100%{transform:rotate(0)}50%{transform:rotate(-5deg)}}
.k .zz{opacity:0;animation:kZz 3.6s ease-in infinite}
@keyframes kZz{0%{opacity:0;transform:translate(0,6px)}30%{opacity:.85}100%{opacity:0;transform:translate(8px,-14px)}}
.k .zwaai{transform-origin:50% 8%;animation:kZwaai 1.1s ease-in-out infinite}
@keyframes kZwaai{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(24deg)}}
.k .vin-r.zwaai{transform-origin:0% 25%;animation:kZwaaiR 1.1s ease-in-out infinite}
@keyframes kZwaaiR{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(-38deg)}}
.av .k{width:100%;height:100%}
@media (prefers-reduced-motion:reduce){.k *{animation:none!important}}`;

  /* ---------- hulpjes ---------- */
  const laag = (shape, grad) => `${shape.replace('/>', ` fill="url(#${grad})"/>`)}${shape.replace('/>', ' fill="url(#kg-steek)"/>')}`;
  const kraal = (cx, cy, r) =>
    `<g class="oog"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#16161b"/><circle cx="${cx - r * .32}" cy="${cy - r * .36}" r="${r * .32}" fill="#fff" opacity=".85"/></g>`;
  const dicht = (cx, cy, w) =>
    `<path d="M${cx - w} ${cy} Q${cx} ${cy + w * .8} ${cx + w} ${cy}" fill="none" stroke="#16161b" stroke-width="2.6" stroke-linecap="round"/>`;
  const schaduw = (cx, cy, rx, op) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="8" fill="#2E5E6B" opacity="${op || .13}"/>`;
  const wrap = (inner, o) => (o.volledig ? `<g class="zweef">${inner}</g>` : inner);
  const poot = (x1, y1, x2, y2, c, w) =>
    `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${w || 15}" stroke-linecap="round" fill="none"/>` +
    `<circle cx="${x2}" cy="${y2 + 2}" r="${(w || 15) * .6}" fill="${c}"/><circle cx="${x2}" cy="${y2 + 2}" r="${(w || 15) * .6}" fill="url(#kg-steek)"/>`;

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

  /* ---------- Walli: blauwe walvis, zwevend, lijf loopt af naar een staart ---------- */
  function walli(o) {
    const body = 'M100 28 C140 28 160 64 158 102 C157 142 134 168 126 196 L98 196 C74 168 43 142 42 102 C40 64 60 28 100 28 Z';
    const vinL = 'M52 100 C32 96 14 110 16 128 C18 142 38 142 54 126 Z';
    const vinR = 'M148 100 C168 96 186 110 184 128 C182 142 162 142 146 126 Z';
    const arm = (d, kl) => `<g class="vin ${kl}"><path d="${d}" fill="#4B6FB5"/><path d="${d}" fill="url(#kg-steek)"/></g>`;
    const stam = 'M98 178 L128 178 C126 192 128 200 132 207 L106 207 C102 198 100 190 98 178 Z';
    const vleugel = 'M118 202 C102 196 84 198 76 208 C88 220 106 220 118 212 C130 220 148 220 160 208 C152 198 134 196 118 202 Z';
    const staart = `<g class="swish"><path d="${stam}" fill="#4E70B4"/><path d="${stam}" fill="url(#kg-steek)"/>` +
      `<path d="${vleugel}" fill="#4B6FB5"/><path d="${vleugel}" fill="url(#kg-steek)"/></g>`;
    const romp = laag(`<path d="${body}"/>`, 'kg-walli') +
      `<ellipse cx="100" cy="126" rx="30" ry="22" fill="#A9C2EE" opacity=".3"/>` +
      `<ellipse cx="80" cy="52" rx="20" ry="11" fill="#fff" opacity=".22" transform="rotate(-22 80 52)"/>`;
    const gezicht = `<path d="M64 94 Q100 102 136 94" fill="none" stroke="#1d2338" stroke-width="3.2" stroke-linecap="round"/>` +
      (o.slaap ? dicht(76, 78, 6) + dicht(124, 78, 6) : kraal(76, 78, 4.8) + kraal(124, 78, 4.8));
    return schaduw(112, 238, 34, .09) + wrap(staart + arm(vinL, 'vin-l') + arm(vinR, 'vin-r' + (o.zwaai ? ' zwaai' : '')) + romp + gezicht, o);
  }

  /* ---------- Gekki: grijs gehaakte gekko met rechte staart ---------- */
  function gekki(o) {
    const staart = 'M146 98 C166 100 184 106 196 112 C184 118 166 124 146 128 Z';
    const kleurStaart = `<g class="staart">` +
      `<path d="${staart}" fill="#6D7A8F" stroke="#6D7A8F" stroke-width="6" stroke-linejoin="round"/>` +
      `<path d="${staart}" fill="url(#kg-steek)" stroke="url(#kg-steek)" stroke-width="6" stroke-linejoin="round"/></g>`;
    const romp = laag('<path d="M70 94 C100 90 130 92 152 98 C166 103 166 122 152 127 C130 133 100 134 70 130 Z"/>', 'kg-gekki') +
      `<ellipse cx="108" cy="100" rx="30" ry="6" fill="#fff" opacity=".2"/>`;
    const kop = laag('<circle cx="52" cy="104" r="26"/>', 'kg-gekki') + laag('<ellipse cx="34" cy="112" rx="15" ry="12"/>', 'kg-gekki');
    const ogen = laag('<circle cx="46" cy="86" r="11"/>', 'kg-gekki') + laag('<circle cx="68" cy="83" r="10"/>', 'kg-gekki') +
      (o.slaap ? dicht(46, 86, 6) + dicht(68, 83, 6) : kraal(46, 86, 8.5) + kraal(68, 83, 7.8));
    const zzz = o.slaap
      ? [[88, 62, 16, 0], [102, 46, 20, 1.2], [118, 28, 25, 2.4]].map(([x, y, s, d]) =>
        `<text class="zz" x="${x}" y="${y}" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="${s}" fill="#2E5E6B" style="animation-delay:-${d}s">z</text>`).join('')
      : '';
    const lijf = poot(64, 122, 56, 142, '#5C687C') + poot(122, 128, 120, 146, '#5C687C') +
      kleurStaart + `<g class="adem">${romp}</g>` +
      poot(86, 126, 78, 146, '#76839A') + poot(140, 128, 148, 148, '#76839A') + kop + ogen;
    return schaduw(104, 158, 70) + wrap(lijf, o) + zzz;
  }

  /* ---------- Nilli: roze neushoorn (denkt dat hij een nijlpaard is), zijaanzicht ---------- */
  function nilli(o) {
    const oor = (cx, cy, r, af) => `<g class="oor"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#kg-nilli)" stroke="#D88988" stroke-opacity=".5" stroke-width="1.5"${af ? ' opacity=".9"' : ''}/>` +
      `<circle cx="${cx}" cy="${cy + 1}" r="${r * .62}" fill="url(#kg-oor)"/><circle cx="${cx}" cy="${cy + 1.5}" r="${r * .32}" fill="#E2C59C" opacity=".8"/></g>`;
    const been = (x, c) => `<path d="M${x} 136 L${x} 154" stroke="${c}" stroke-width="24" stroke-linecap="round"/><ellipse cx="${x}" cy="156" rx="14" ry="7" fill="${c}"/>`;
    const lijf = `<ellipse cx="112" cy="116" rx="64" ry="42" fill="url(#kg-nilli)"/>` +
      `<ellipse cx="124" cy="92" rx="32" ry="10" fill="#fff" opacity=".2" transform="rotate(-8 124 92)"/>` +
      `<ellipse cx="132" cy="130" rx="20" ry="9" fill="#D88988" opacity=".12"/>` +
      `<path d="M86 79 C116 74 152 82 174 102" fill="none" stroke="#C9737C" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="3 2.4" stroke-linecap="round"/>`;
    const kop = `<ellipse cx="56" cy="108" rx="36" ry="32" fill="url(#kg-nilli)"/>` +
      `<ellipse cx="30" cy="118" rx="23" ry="19" fill="url(#kg-snuit)"/>` +
      `<path d="M9 111 Q7 101 12 95 Q21 98 27 105 Z" fill="url(#kg-snuit)" stroke="#DC8F8D" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<ellipse cx="14" cy="118" rx="2.6" ry="3.6" fill="#B86C6C"/>` +
      `<path d="M14 128 Q30 137 46 129" fill="none" stroke="#B86C6C" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="58" cy="116" rx="8" ry="5" fill="#E88A8E" opacity=".3"/>` +
      oor(84, 80, 13, true) + oor(68, 76, 16, false) +
      (o.slaap ? dicht(50, 98, 5) : kraal(50, 98, 4.6));
    const ver = '#D58584', dicht2 = '#E3A09E';
    const staart = `<g class="staart"><path d="M168 103 Q181 95 192 92 Q188 108 172 120 Z" fill="#E39795" stroke="#E39795" stroke-width="3" stroke-linejoin="round"/></g>`;
    const lijfje = been(94, ver) + been(154, ver) + staart +
      `<g class="adem">${lijf}</g>` + been(76, dicht2) + been(138, dicht2) + kop;
    return schaduw(112, 164, 70) + wrap(lijfje, o);
  }

  /* ---------- Padje: groene schildpad ---------- */
  function padje(o) {
    const koepel = 'M50 126 C50 80 80 54 114 54 C148 54 178 80 178 126 Z';
    const lijnen = [[100, 74, 86, 60], [128, 74, 142, 60], [142, 92, 166, 88], [128, 110, 146, 126], [100, 110, 82, 126], [86, 92, 62, 90]]
      .map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="#2F6F43" stroke-width="3" stroke-linecap="round" fill="none"/>`).join('');
    const schild = `<ellipse cx="114" cy="127" rx="66" ry="10" fill="#6DAA5A"/>` +
      `<g class="adem">` + laag(`<path d="${koepel}"/>`, 'kg-padje') +
      `<path d="M100 74 L128 74 L142 92 L128 110 L100 110 L86 92 Z" fill="#8BD083" opacity=".5" stroke="#2F6F43" stroke-width="3" stroke-linejoin="round"/>` +
      lijnen + `<ellipse cx="88" cy="70" rx="22" ry="9" fill="#fff" opacity=".22" transform="rotate(-25 88 70)"/></g>`;
    const kop = `<g class="knik"><ellipse cx="58" cy="116" rx="24" ry="17" fill="url(#kg-padjelijf)"/>` +
      laag('<ellipse cx="38" cy="104" rx="23" ry="21"/>', 'kg-padjelijf') +
      `<ellipse cx="46" cy="111" rx="6" ry="3.5" fill="#F08A8A" opacity=".4"/>` +
      `<path d="M22 112 Q34 122 46 114" fill="none" stroke="#16161b" stroke-width="2.6" stroke-linecap="round"/>` +
      (o.slaap ? dicht(31, 98, 5) : kraal(31, 98, 4.6)) + `</g>`;
    const lijf = poot(70, 128, 66, 152, '#6E9E55', 17) + poot(150, 128, 152, 152, '#6E9E55', 17) +
      `<path d="M168 130 L192 142 L166 146 Z" fill="#8FC06B" stroke="#8FC06B" stroke-width="4" stroke-linejoin="round"/>` +
      `<ellipse cx="116" cy="130" rx="62" ry="13" fill="url(#kg-padjelijf)"/>` + schild +
      poot(88, 130, 84, 154, '#8FC06B', 17) + poot(138, 130, 140, 154, '#8FC06B', 17) + kop;
    return schaduw(112, 162, 70) + wrap(lijf, o);
  }

  const MAKERS = { kwalli, walli, gekki, nilli, padje };
  const VORM = {
    avatar: { kwalli: '40 14 120 120', walli: '46 26 108 108', gekki: '6 50 116 116', nilli: '2 60 106 106', padje: '2 66 104 104' },
    peek: { kwalli: '28 12 144 112', walli: '22 22 156 128', gekki: '4 14 196 146', nilli: '0 62 196 102', padje: '8 46 190 120' },
    volledig: { kwalli: '0 0 200 196', walli: '4 12 192 236', gekki: '0 14 200 150', nilli: '0 56 200 116', padje: '0 40 200 132' }
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
