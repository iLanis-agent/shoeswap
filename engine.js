(function (root) {
  'use strict';
  var CM_PER_IN = 2.54, ALLOW_CM = 2.0; // EU sizes count the last, which runs about 2 cm longer than the foot (tests: sizefit.org chart implies 2.0 to 2.2 cm)
  // Wikipedia Shoe size (adult, size from FOOT length in inches L): US men = 3L - 22, US women = 3L - 21, UK = 3L - 23. EU: Paris point = 2/3 cm, so size = last length (cm) x 1.5.
  var SYSTEMS = [{ id: 'usm', name: 'US men' }, { id: 'usw', name: 'US women' }, { id: 'uk', name: 'UK' }, { id: 'eu', name: 'EU' }];
  function sizeFromCm(sys, cm) {
    var L = cm / CM_PER_IN;
    if (sys === 'usm') return 3 * L - 22; if (sys === 'usw') return 3 * L - 21; if (sys === 'uk') return 3 * L - 23;
    if (sys === 'eu') return (cm + ALLOW_CM) * 1.5; throw new Error('system');
  }
  function cmFromSize(sys, size) {
    if (sys === 'usm') return (size + 22) / 3 * CM_PER_IN; if (sys === 'usw') return (size + 21) / 3 * CM_PER_IN; if (sys === 'uk') return (size + 23) / 3 * CM_PER_IN;
    if (sys === 'eu') return size / 1.5 - ALLOW_CM; throw new Error('system');
  }
  function roundTo(v, step) { return Math.round(v / step) * step; }
  // US/UK sell in half sizes; EU in half sizes of 2/3 cm steps are common, we show the nearest 0.5
  function label(sys, v) { var r = roundTo(v, 0.5); return (Math.round(r * 10) / 10).toString(); }
  function convert(sys, size) { var cm = cmFromSize(sys, size), out = { cm: cm, inches: cm / CM_PER_IN, mondo: Math.ceil(cm * 10 / 5 - 1e-9) * 5 }; SYSTEMS.forEach(function (s) { out[s.id] = sizeFromCm(s.id, cm); }); return out; }
  var api = { SYSTEMS: SYSTEMS, sizeFromCm: sizeFromCm, cmFromSize: cmFromSize, convert: convert, label: label, roundTo: roundTo, CM_PER_IN: CM_PER_IN };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Shoe = api;
})(typeof window !== 'undefined' ? window : this);
