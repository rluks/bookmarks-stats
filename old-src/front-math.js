"use strict";

/* find minimum and maximum in array */
function arrMin(array) { return Math.min.apply(Math, array); }
function arrMax(array) { return Math.max.apply(Math, array); }

/* rounding */
function toInt(n) { return Math.round(Number(n)); }