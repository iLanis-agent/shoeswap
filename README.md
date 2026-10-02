# ShoeSwap

Convert adult shoe sizes between US men, US women, UK and EU (plus Mondopoint), starting from a size or from foot length in cm.

Formulas (https://en.wikipedia.org/wiki/Shoe_size): with foot length L in inches, US men = 3L - 22, US women = 3L - 21, UK = 3L - 23 (barleycorn = 1/3 inch); EU uses the Paris point, 2/3 cm per size, counted on the last, taken as foot length + 2 cm.
Tests: 36 checks. Formula values for a 10 in foot, Paris point and barleycorn steps, US women = US men + 1, US men = UK + 1, round trips, and four rows of the sizefit.org foot-length chart (25.5, 26.3, 26.7, 27.6 cm) within half a size (US), one size (UK) and 0.7 (EU).
Deviations: brands and countries differ by up to a full size; the sizefit chart uses UK = US men - 0.5 while Wikipedia gives a 1 size gap, so UK is the least certain column. The 2 cm last allowance is an average. Adult sizes only.

Static client-side. `node test-engine.js` runs the tests.
