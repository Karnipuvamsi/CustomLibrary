/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library sap.btp.ui5lib.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function () {

		"use strict";

		/**
		 * 
		 *
		 * @namespace
		 * @name sap.btp.ui5lib
		 * @author CSC
		 * @version 0.0.2
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "sap.btp.ui5lib",
			version: "0.0.2",
			dependencies: ["sap.ui.core"],
			noLibraryCSS: true,
			types: [],
			interfaces: [],
			controls: [
				"sap.btp.ui5lib.controls.Reuse"
			],
			elements: [],
		});

		/* eslint-disable */
		return sap.btp.ui5lib;
		/* eslint-enable */

	}, /* bExport= */ false);