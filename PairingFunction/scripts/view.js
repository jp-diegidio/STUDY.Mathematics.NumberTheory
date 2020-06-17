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

	$global.app = $global.app || {};
	
	// requires:
	var $Calc = $global.app.Calc;
	
	function CtrlView(Depth, Reduced, Labeled, onPreUpdate, onUpdate) {
		var _busy = new $ko.observable(false);
		
		this.depth = new $ko.observable(Depth);
		this.reduced = new $ko.observable(Reduced);
		this.labeled = new $ko.observable(Labeled);
		this.busy = new $ko.pureComputed(_busy);
		
		this.depth.subscribe(update);
		this.reduced.subscribe(update);
		this.labeled.subscribe(update);
		
		this._init = function () {
			update();
		};
		
		var that = this;
		
		function update() {
			_busy(true);
			
			$global.setTimeout(function () {
				onPreUpdate();
				
				var depth = that.depth(),
					reduced = that.reduced(),
					labeled = that.labeled();
				
				var calc = new $Calc(depth, reduced, labeled);
				
				onUpdate(calc);
				
				_busy(false);
			}, 0);
		}
	}
	
	function GraphView() {
		function ViewBox(Depth) {
			return (-Depth-1) + " " + (-1) + " " + (2*Depth+2) + " " + (Depth+1);
		}
		
		this.labeled = new $ko.observable();
		this.viewBox = new $ko.observable();
		
		this.edges = new $ko.observable();
		this.nodes = new $ko.observable();
		this.labels = new $ko.observable();
		
		this._preUpdate = function () {
			this.edges([]);
			this.nodes([]);
			this.labels([]);
		};
		
		this._update = function (ctrl, calc) {
			this.labeled(ctrl.labeled());
			this.viewBox(ViewBox(ctrl.depth()));
			
			this.edges(calc.edges);
			this.nodes(calc.nodes);
			this.labels(calc.labels);
		};
	}
	
	function View(Depth, Reduced, Labeled) {
		this.ctrl = new CtrlView(Depth, Reduced, Labeled, onPreUpdate, onUpdate);
		this.graph = new GraphView();
		
		var that = this;
		
		function onPreUpdate(calc) {
			that.graph._preUpdate();
		}
		
		function onUpdate(calc) {
			that.graph._update(that.ctrl, calc);
		}
		
		this.ctrl._init();
	}
	
	$global.app.View = View;
})(window, ko);
