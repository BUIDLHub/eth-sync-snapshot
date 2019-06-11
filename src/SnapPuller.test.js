import Puller from './SnapPuller';

//example for cryptokitties
const SNAP_ID = "9NlPQmsBUKbb9uKfcoy2"
describe("SnapPuller", ()=>{
  it("Should pull snap file", done=>{
    let pull = new Puller({
      snapshotId: SNAP_ID
    });
    let dataSize = 0;
    pull.download().then(stream=>{
      stream.on("data", buff=>{
        dataSize += buff.length;
      });
      stream.on("end", ()=>{
        console.log("Downloaded", dataSize, "bytes");
        if(dataSize === 0) {
          done(new Error("Expected data download"));
        }
        done();
      });
    })
  });
});
