sap.ui.define([
  "sap/ui/mdc/ValueHelpDelegate",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (
  ValueHelpDelegate,
  Filter,
  FilterOperator
) {
  "use strict";

  const _tokenizeByLength = function (sText, maxLen = 10) {
    if (!sText || maxLen <= 0) return [];
    // \S = any non-whitespace; {1,maxLen} = chunk size; g = global
    const re = new RegExp(`\\S{1,${maxLen}}`, "g");
    return sText.match(re) || [];
  }

  const SearchValueHelpDelegate = Object.assign({}, ValueHelpDelegate);

  SearchValueHelpDelegate.isSearchSupported = function (oValueHelp) {
    return !!oValueHelp.getPayload()?.searchKeys;
  };

  SearchValueHelpDelegate.getFilters = function (oValueHelp, oContent) {
    const aFilters = ValueHelpDelegate.getFilters.call(this, oValueHelp, oContent) || [];
    const oPayload = oValueHelp.getPayload && oValueHelp.getPayload();
    const sQuery = oContent.getSearch && oContent.getSearch();

    // Tokenize for multi-word search: e.g., "the emerald corp" → ["the", "emerald", "corp"]
    const aTokens = _tokenizeByLength(sQuery);

    if (!aTokens.length) {
      return aFilters;
    }

    // Build OR across fields for each token
    const aPerTokenDisjunctions = aTokens.map(function (token) {
      const aFieldFilters = oPayload.searchKeys.map(function (sPath) {
        return new Filter({ path: sPath, operator: FilterOperator.Contains, value1: token });
      });
      // OR across fields for this token

      return new Filter(aFieldFilters, false);
    });

    // AND across all tokens (all words must match)
    const oCombined = aPerTokenDisjunctions && aPerTokenDisjunctions.length && new Filter(aPerTokenDisjunctions, true);
    if (oCombined) {
      aFilters.push(oCombined);
    }
    return aFilters;
  };

  return SearchValueHelpDelegate;
});