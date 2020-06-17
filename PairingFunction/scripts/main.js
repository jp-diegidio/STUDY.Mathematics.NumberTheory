/*
PairingFunction version 1.0.0-alpha
STUDY.Mathematics.NumberTheory/PairingFunction
Mathematical Studies: Number Theory: Pairing Function

Copyright (C) 2020 Julio P. Di Egidio (http://julio.diegidio.name)
PairingFunction is part of the STUDY.Mathematics.NumberTheory collection
(see https://github.com/jp-diegidio/STUDY.Mathematics.NumberTheory).
PairingFunction is released under the terms of the GNU-GPLv3 license.
As usual, NO WARRANTY OF ANY KIND is implied.
*/

(function ($global, $ko) {
	"use strict";
	
	// requires:
	var $View = $global.app.View;
	
	var DEPTH = 16,
		REDUCED = true,
		LABELED = true;
	
	var _view = new $View(DEPTH, REDUCED, LABELED);
	
	$ko.options.deferUpdates = true;
	
	$global.addEventListener("load", function () {
		$ko.applyBindings(_view);
	});
	
})(window, ko);
