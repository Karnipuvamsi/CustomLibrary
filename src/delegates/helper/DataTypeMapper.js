sap.ui.define([], function () {
  "use strict";

  /**
   * DataTypeMapper
   * ---------------
   * Maps OData V4 Edm types to UI5 data type class names.
   *
   * Example:
   *   Edm.String → sap.ui.model.type.String
   *   Edm.Boolean → sap.ui.model.type.Boolean
   *   Edm.Date → sap.ui.model.type.Date
   *
   * Usage:
   *   const sUI5Type = DataTypeMapper.getUI5Type("Edm.String");
   */
  const mTypeMap = {
    "Edm.String": "sap.ui.model.type.String",
    "Edm.Boolean": "sap.ui.model.type.Boolean",
    "Edm.Int16": "sap.ui.model.type.Integer",
    "Edm.Int32": "sap.ui.model.type.Integer",
    "Edm.Int64": "sap.ui.model.type.Integer",
    "Edm.Decimal": "sap.ui.model.type.Float",
    "Edm.Double": "sap.ui.model.type.Float",
    "Edm.Single": "sap.ui.model.type.Float",
    "Edm.Date": "sap.ui.model.type.Date",
    "Edm.DateTimeOffset": "sap.ui.model.type.DateTime",
    "Edm.TimeOfDay": "sap.ui.model.type.Time",
    "Edm.Guid": "sap.ui.model.type.String",
    "Edm.Binary": "sap.ui.model.type.String"
  };

  const DataTypeMapper = {
    /**
     * Returns the corresponding UI5 model type for a given OData Edm type.
     * Defaults to sap.ui.model.type.String if unknown.
     *
     * @param {string} sEdmType - The OData type (e.g., "Edm.String")
     * @returns {string} The UI5 model type class name
     */
    getUI5Type(sEdmType) {
      return mTypeMap[sEdmType] || "sap.ui.model.type.String";
    }
  };

  return DataTypeMapper;
});