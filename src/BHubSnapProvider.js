import Puller from './SnapPuller';

export default class BHubSnapProvider {
  constructor(props) {
    this.puller = new Puller(props);
    [
      'getLatest'
    ].forEach(fn=>this[fn]=this[fn].bind(this));
  }

  getLatest() {
    return puller.download();
  }
}
