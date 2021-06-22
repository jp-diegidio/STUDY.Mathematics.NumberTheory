/*
PairingFunction version 1.1.1-alpha
STUDY.Mathematics.NumberTheory/PairingFunction
Mathematical Studies: Number Theory: Pairing Function

Copyright (C) 2020-2021 Julio P. Di Egidio (http://julio.diegidio.name)
PairingFunction is part of the STUDY.Mathematics.NumberTheory collection
(see https://github.com/jp-diegidio/STUDY.Mathematics.NumberTheory).
PairingFunction is released under the terms of the GNU-GPLv3 license.
As usual, NO WARRANTY OF ANY KIND is implied.
*/

(function ($global, $ko) {
	"use strict";

	// requires:
	var $View = $global.app.View;

	var $ViewOptions = {
		maxDepth: 128,
		depth: 16,
		reduced: true,
		showNodes: true,
		showLabels: true,
		showEdges: true,
		showRays: false,
		showMaths: false,
		updateDelay: 20  // let the UI breath
	};

	$global.MathJax = {
		tex: {
			inlineMath: [["\\$", "\\$"]],
			displayMath: [["\\$$", "\\$$"]],
			tags: 'none',
		},
		svg: {
			displayAlign: "left",
			unknownFamily: '"Noto Sans", "Arial", sans',
		},
		options: {
			menuOptions: {
				settings: {
					renderer: "SVG",
					assistiveMml: false,
				}
			}
		}
	};

	$ko.options.deferUpdates = false;  // we handle it!

	var view = new $View($ViewOptions);

	$global.addEventListener("load", function () {
		view._init();

		$ko.applyBindings(view);
	});
})(window, ko);
