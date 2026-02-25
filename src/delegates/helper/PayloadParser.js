sap.ui.define([], function () {
  "use strict";

  /**
   * PayloadParser
   * ----------------
   * Utility to parse and normalize the payload object used in dynamic delegates.
   *
   * Features:
   *  - Extracts modelName and entitySet from combined "modelName>/EntitySet" or separate properties
   *  - Returns a structured JSON with collectionPath, entitySet, modelName, and all other payload keys
   *
   * Example:
   * Input Payload:
   * {
   *   collectionPath: "mainModel>/VHCustomerSet",
   *   abc: "something"
   * }
   *
   * Output:
   * {
   *   collectionPath: "mainModel>/VHCustomerSet",
   *   entitySet: "VHCustomerSet",
   *   modelName: "mainModel",
   *   abc: "something"
   * }
   */
  const PayloadParser = {
    parse: function (oControl) {
      const oPayload = oControl?.getPayload?.() || {};
      let sModelName = "";
      let sEntityName = "";
      let sCollectionPath = oPayload?.collectionPath || "";

      // 🔹 Handle combined "modelName>/EntitySet" syntax
      if (sCollectionPath?.includes(">")) {
        const parts = sCollectionPath.split(">");
        sModelName = parts[0].trim();
        const sPath = parts[1].trim().replace(/^\/+/, ""); // remove leading '/'
        sEntityName = sPath.split("?")[0]; // ignore query params
      } else {

        // 🔹 Separate syntax
        sEntityName = sCollectionPath?.replace(/^\/+/, "") || "";
        sModelName = oPayload?.modelName || "";
      }

      oPayload.modelName=sModelName;
      oPayload.entityName=sEntityName;
      return oPayload;

    }
  };

  return PayloadParser;
});