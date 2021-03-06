import xhr from 'xhr';
import * as qs from 'querystring';

export const API_BASE = '/api';
export const API_PATH_RATES_CSV = '/rates/csv';
export const API_PATH_RATES = '/rates';
export const API_PATH_SEARCH = '/search';

export default class API {
  constructor(basePath = API_BASE) {
    this.basePath = basePath;
  }

  get({ uri, data }, callback) {
    let path = this.basePath + uri;
    if (data) {
      path += `?${qs.stringify(data)}`;
    }
    return xhr(path, {
      json: true,
    }, (err, res) => {
      if (err) {
        callback(`Error: Internal XMLHttpRequest Error: ${err.toString()}`);
      } else if (res.statusCode >= 400) {
        callback(res.rawRequest.statusText);
      } else {
        callback(null, res.body);
      }
    });
  }
}
