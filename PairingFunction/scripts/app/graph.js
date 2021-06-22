/*
PairingFunction version 1.1.0-alpha
STUDY.Mathematics.NumberTheory/PairingFunction
Mathematical Studies: Number Theory: Pairing Function

Copyright (C) 2020-2021 Julio P. Di Egidio (http://julio.diegidio.name)
PairingFunction is part of the STUDY.Mathematics.NumberTheory collection
(see https://github.com/jp-diegidio/STUDY.Mathematics.NumberTheory).
PairingFunction is released under the terms of the GNU-GPLv3 license.
As usual, NO WARRANTY OF ANY KIND is implied.
*/

(function ($global) {
	"use strict";

	$global.app = $global.app || {};

	function gcd(a, b) {
		// Euclid's GCD on non-negative integers.
		// NOTE: gcd(0, 0) = 0.
		return b === 0 ? a : gcd(b, a % b);
	}

	function coprime(a, b) {
		//return gcd(a, b) === 1;
		return gcd(a, b) <= 1;  // allow for 0/0
	}

	function Node(x, y) {
		this.x = x;
		this.y = y;
	}

	function Edge(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	function Label(x, y, n, m) {
		this.x = x;
		this.y = y;
		this.t = n + "/" + m;
	}

	function Graph(config) {
		this.nodes = [];
		this.labels = [];
		this.edges = [];
		this.rays = [];

		for (var s = 0; s < config.depth; ++s) {  // lev : s in [0,D[
			for (var n = 0; n <= s; ++n) {  // num : n in [0,s]
				var m = s - n;              // den : m = s-n in [s,0]

				if (!config.reduced || coprime(n, m)) {
					var x = -s + 2 * n,  // x in [-s,s]
						y = s;           // y = s

					this.nodes.push(new Node(x, y));

					if (config.showLabels) {
						this.labels.push(new Label(x, y, n, m));
					}

					if (config.showEdges) {
						if (n > 0) {  // not the leftmost sibling
							// left parent:
							if (!config.reduced || coprime(n - 1, m)) {
								this.edges.push(new Edge(x - 1, y - 1, x, y));
							}
						}

						if (n < s) {  // not the rightmost sibling
							// right parent:
							if (!config.reduced || coprime(n, m - 1)) {
								this.edges.push(new Edge(x + 1, y - 1, x, y));
							}
						}
					}

					if (config.showRays) {
						this.rays.push(new Edge(0, 0, x, y));
					}
				}
			}
		}
	}

	$global.app.Graph = Graph;
})(window);
