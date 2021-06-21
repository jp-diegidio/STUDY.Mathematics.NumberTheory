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

(function ($global, $ko) {
	"use strict";

	$global.app = $global.app || {};

	// requires:
	var $Graph = $global.app.Graph;

	function $Depths(maxDepth) {
		var Depths = new Array(maxDepth);

		for (var i = 0; i < maxDepth; ++i) {
			Depths[i] = i + 1;
		}

		return Depths;
	}

	function GraphView() {
		function ViewBox(depth) {
			return (-depth - 1) +
				" " + (-1) +
				" " + (2 * (depth + 1)) +
				" " + (depth + 1);
		}

		this.viewBox = new $ko.observable();
		this.nodes = new $ko.observable();
		this.labels = new $ko.observable();
		this.edges = new $ko.observable();
		this.rays = new $ko.observable();
		this.options = new $ko.observable();

		this._compute = function (options) {
			var graph = new $Graph(options);

			this.viewBox(ViewBox(options.depth));
			this.nodes(graph.nodes);
			this.labels(graph.labels);
			this.edges(graph.edges);
			this.rays(graph.rays);
			this.options(options);
		};
	}

	function CtrlView(Options, onUpdate) {
		var _busy = new $ko.observable(false);

		this.Depths = $Depths(Options.maxDepth);
		this.depth = new $ko.observable(Options.depth);
		this.reduced = new $ko.observable(Options.reduced);
		this.showNodes = new $ko.observable(Options.showNodes);
		this.showLabels = new $ko.observable(Options.showLabels);
		this.showEdges = new $ko.observable(Options.showEdges);
		this.showRays = new $ko.observable(Options.showRays);
		this.busy = new $ko.pureComputed(_busy);

		this.depth.subscribe(update);
		this.reduced.subscribe(update);
		this.showNodes.subscribe(update);
		this.showLabels.subscribe(update);
		this.showEdges.subscribe(update);
		this.showRays.subscribe(update);

		function update() {
			_busy(true);

			$global.setTimeout(function () {  // desync
				onUpdate();

				$global.setTimeout(function () {  // desync
					_busy(false);

				}, Options.updateDelay);
			}, Options.updateDelay);
		}

		this._depthIdx = function () {
			var depth = this.depth();
			return this.Depths.indexOf(depth);
		};

		this.canIncDepth = function () {
			var idx = this._depthIdx();
			return idx !== -1 && idx < this.Depths.length - 1;
		};

		this.incDepth = function () {
			var idx = this._depthIdx();
			if (idx !== -1 && idx < this.Depths.length - 1) {
				this.depth(this.Depths[++idx]);
			}
		};

		this.canDecDepth = function () {
			var idx = this._depthIdx();
			return idx !== -1 && idx > 0;
		};

		this.decDepth = function () {
			var idx = this._depthIdx();
			if (idx !== -1 && idx > 0) {
				this.depth(this.Depths[--idx]);
			}
		};
	}

	function View(Options) {
		this.graph = new GraphView();

		this.ctrl = new CtrlView(Options, onUpdate);

		var that = this;

		function onUpdate() {
			var options = {
				depth: that.ctrl.depth(),
				reduced: that.ctrl.reduced(),
				showNodes: that.ctrl.showNodes(),
				showLabels: that.ctrl.showLabels(),
				showEdges: that.ctrl.showEdges(),
				showRays: that.ctrl.showRays()
			};

			that.graph._compute(options);
		}

		this._init = function () {
			onUpdate();
		};
	}

	$global.app.View = View;
})(window, ko);
