'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _yup = require('yup');

var yup = _interopRequireWildcard(_yup);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = new _Logger2.default({ component: "SnapPuller" });

var schema = yup.object({
  snapshotId: yup.string().required("SnapPuller missing snapshotId")
});

var BASE_URL = "https://buidlhub-snapshots.s3.amazonaws.com/snap_";

var SnapPuller = function () {
  function SnapPuller(props) {
    var _this = this;

    _classCallCheck(this, SnapPuller);

    schema.validateSync(props);
    this.url = BASE_URL + props.snapshotId;
    ['download'].forEach(function (fn) {
      return _this[fn] = _this[fn].bind(_this);
    });
  }

  _createClass(SnapPuller, [{
    key: 'download',
    value: function download() {
      return (0, _axios2.default)({
        url: this.url,
        method: "GET",
        responseType: "stream"
      }).then(function (resp) {
        var stream = new stream.PassThrough();
        resp.data.pipe(stream);
        return stream;
      }).catch(function (e) {
        log.error("Problem download snapshot", e);
        return null;
      });
    }
  }]);

  return SnapPuller;
}();

exports.default = SnapPuller;
//# sourceMappingURL=SnapPuller.js.map