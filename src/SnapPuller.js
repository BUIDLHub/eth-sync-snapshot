import {FetchStream} from 'fetch';
import * as yup from 'yup';
import stream from 'stream';
import Logger from './Logger';


const log = new Logger({component: "SnapPuller"});

const schema = yup.object({
  snapshotId: yup.string().required("SnapPuller missing snapshotId")
});

const BASE_URL = "https://buidlhub-snapshots.s3.amazonaws.com/snap_";

export default class SnapPuller {
  constructor(props) {
    schema.validateSync(props);
    this.url = BASE_URL + props.snapshotId;
    [
      'download'
    ].forEach(fn=>this[fn]=this[fn].bind(this));
  }

  download() {
    return new Promise((done)=>{
      let fetch = new FetchStream(this.url);
      let s = stream.PassThrough();
      fetch.pipe(s);
      done(s);
    });
  }
}
