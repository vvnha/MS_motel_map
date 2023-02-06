/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

module.exports = class ReturnResult {
  constructor(value, values, message, errorMessage, pagination) {
    // set local properties
    this.value = value != null ? value : {};
    this.values = values != null && values ? values : [];
    this.total = values != null ? values.length : this.value != null ? 1 : 0;
    this.success = errorMessage == null;

    // set message
    this.message = message || errorMessage;

    this.pagination =
      values != null
        ? { ...pagination }
        : this.value != null
        ? {
            _page: 1,
            _limit: 1,
            _totalRows: 1,
          }
        : {
            _page: 1,
            _limit: 0,
            _totalRows: 0,
          };

    // date created
    this.created_date = new Date();
  }
};
