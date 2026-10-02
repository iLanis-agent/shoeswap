var E = require('./engine.js'), n = 0, bad = 0;
function near(a, b, tol, m) { n++; if (!(Math.abs(a - b) <= tol)) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// Wikipedia Shoe size formulas for a foot length of 10 in (25.4 cm): US men 8, US women 9, UK 7
near(E.sizeFromCm('usm', 25.4), 8, 1e-9, 'US men 10 in'); near(E.sizeFromCm('usw', 25.4), 9, 1e-9, 'US women 10 in'); near(E.sizeFromCm('uk', 25.4), 7, 1e-9, 'UK 10 in');
// Paris point is 2/3 cm: one EU size = 2/3 cm of foot length
near(E.cmFromSize('eu', 43) - E.cmFromSize('eu', 42), 2 / 3, 1e-9, 'Paris point'); near(E.cmFromSize('eu', 42), 26, 1e-9, 'EU 42 = 26 cm foot');
// one US or UK size is a barleycorn, 1/3 inch = 0.8467 cm
near(E.cmFromSize('usm', 9) - E.cmFromSize('usm', 8), 2.54 / 3, 1e-9, 'barleycorn'); near(E.cmFromSize('uk', 9) - E.cmFromSize('uk', 8), 2.54 / 3, 1e-9, 'barleycorn uk');
// US women's sizes are one size above US men's for the same US size scale shifts: same foot = women's size is men's + 1
near(E.sizeFromCm('usw', 27) - E.sizeFromCm('usm', 27), 1, 1e-9, 'women = men + 1'); near(E.sizeFromCm('usm', 27) - E.sizeFromCm('uk', 27), 1, 1e-9, 'US men = UK + 1');
// sizefit.org chart (foot cm -> US men, UK, EU): 25.5 -> 8, 7.5, 41 1/3; 26.3 -> 9, 8.5, 42 2/3; 26.7 -> 9.5, 9, 43 1/3; 27.6 -> 10.5, 10, 44 2/3 (tolerance: half size US, one size UK, 0.7 EU)
var chart = [[25.5, 8, 7.5, 41.33], [26.3, 9, 8.5, 42.67], [26.7, 9.5, 9, 43.33], [27.6, 10.5, 10, 44.67]];
chart.forEach(function (c) { near(E.sizeFromCm('usm', c[0]), c[1], 0.5, 'US ' + c[0]); near(E.sizeFromCm('uk', c[0]), c[2], 1, 'UK ' + c[0]); near(E.sizeFromCm('eu', c[0]), c[3], 0.7, 'EU ' + c[0]); });
// round trips
['usm', 'usw', 'uk', 'eu'].forEach(function (s) { near(E.sizeFromCm(s, E.cmFromSize(s, 9)), 9, 1e-9, 'roundtrip ' + s); });
// convert: US men 9 foot length about 26.1 cm, mondopoint rounds up to the next 5 mm
var c = E.convert('usm', 9); near(c.cm, 26.247, 0.01, 'US 9 cm'); is(c.mondo, 265, 'mondo'); near(c.usm, 9, 1e-9, 'self'); near(c.uk, 8, 1e-9, 'UK 8'); near(c.usw, 10, 1e-9, 'W 10');
is(E.convert('eu', 42).mondo, 260, 'EU 42 mondo exact 260'); near(E.convert('eu', 42).cm, 26, 1e-9, 'EU 42 cm');
// labels round to half sizes
is(E.label('usm', 8.3), '8.5', 'label 8.3'); is(E.label('usm', 8.2), '8', 'label 8.2'); is(E.label('eu', 41.8), '42', 'label 41.8');
near(E.convert('usm', 10).inches, (10 + 22) / 3, 1e-9, 'inches');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
