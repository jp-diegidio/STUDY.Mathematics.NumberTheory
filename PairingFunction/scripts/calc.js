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

(function ($global) {
	"use strict";

	$global.app = $global.app || {};
	
	function gcd(a, b) {
		return b === 0 ? a : gcd(b, a % b);
	}
	
	function Edge(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	
	function Node(x, y) {
		this.x = x;
		this.y = y;
	}
	
	function Label(x, y, n, m) {
		this.x = x;
		this.y = y;
		this.t = n + "/" + m;
	}
	
	function Calc(Depth, Reduced, Labeled) {
		this.edges = [];
		this.nodes = [];
		this.labels = [];
		
		for (var s = 0; s < Depth; ++s) {
			for (var n = 0; n <= s; ++n) {
				var m = s - n;
				
				if (!Reduced || gcd(n, m) === 1) {
					var x = -s + 2 * n,
						y = s;
					
					if (n > 0) {
						if (!Reduced || gcd(n - 1, m) === 1) {
							this.edges.push(new Edge(x - 1, y - 1, x, y));
						}
					}
					
					if (n < s) {
						if (!Reduced || gcd(n, m - 1) === 1) {
							this.edges.push(new Edge(x + 1, y - 1, x, y));
						}
					}
					
					this.nodes.push(new Node(x, y));
					
					if (Labeled) {
						this.labels.push(new Label(x, y, n, m));
					}
				}
			}
		}
	}
	
	$global.app.Calc = Calc;
})(window);
