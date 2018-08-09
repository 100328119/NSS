const db = require('../model/db');

class network {
  constructor(){}

  // addNewNetwork(NewSite){
  //   let network_info = NewSite.network_info;
  //   // let update_infor = NewSite.update_info;
  //   // let end_device = NewSite.End_Device;
  //   // let wan = NewSite.WAN;
  //   let Net_Device = NewSite.Net_Device;
  //   // let VLANs = NewSite.VLANs;
  //   db.get_connection(qb=>{
  //     qb.insert("network", network_info, (err, res)=>{
  //        if(err) return console.error(err);
  //        this.newId = res.insertId;
  //        return this.newId;
  //     })
  //   });
  // }

  clearEndDevice(end_devices){
    let End_delete = [];
    let End_update = [];
    let End_Add =[];
    let End_Device_sorted = {};
    for(let i = 0; i<end_devices.length; i++){
        let status = end_devices[i].Status;
        switch(status){
          case -1 :
            delete end_devices[i].Status;
            End_delete.push(end_devices[i]);
          break;
          case 0 :
            delete end_devices[i].Status;
            End_update.push(end_devices[i]);
          break;
          case 1 :
            delete end_devices[i].Status;
            End_Add.push(end_devices[i]);
          break;
        };
    };
    End_Device_sorted.End_delete = End_delete;
    End_Device_sorted.End_update = End_update;
    End_Device_sorted.End_Add = End_Add;
    return End_Device_sorted;
  }

  clearNetDevice(Net_devices){
    let Net_delete = [];
    let Net_update = [];
    let Net_Add =[];
    let Net_Device_sorted = {};
    for(let i = 0; i<Net_devices.length; i++){
        let status = Net_devices[i].Status;
        switch(status){
          case -1 :
            delete Net_devices[i].Status;
            Net_delete.push(Net_devices[i]);
          break;
          case 0 :
            delete Net_devices[i].Status;
            Net_update.push(Net_devices[i]);
          break;
          case 1 :
            delete Net_devices[i].Status;
            Net_Add.push(Net_devices[i]);
          break;
        };
    };
    Net_Device_sorted.Net_delete = Net_delete;
    Net_Device_sorted.Net_update = Net_update;
    Net_Device_sorted.Net_Add = Net_Add;
    return Net_Device_sorted;
  }

  clearWAN(WANs){
    let WANs_delete = [];
    let WANs_update = [];
    let WANs_Add =[];
    let WANs_sorted = {};
    for(let i = 0; i<WANs.length; i++){
        let status = WANs[i].Status;
        switch(status){
          case -1 :
            delete WANs[i].Status;
            WANs_delete.push(WANs[i]);
          break;
          case 0 :
            delete WANs[i].Status;
            WANs_update.push(WANs[i]);
          break;
          case 1 :
            delete WANs[i].Status;
            WANs_Add.push(WANs[i]);
          break;
        };
    };
    WANs_sorted.WANs_delete = WANs_delete;
    WANs_sorted.WANs_update = WANs_update;
    WANs_sorted.WANs_Add = WANs_Add;
    return WANs_sorted;
  }

  clearVlanWork(VlanNetwork){
    let VlanNetwork_delete = [];
    let VlanNetwork_update = [];
    let VlanNetwork_Add =[];
    let VlanNetwork_sorted = {};
    for(let i = 0; i<VlanNetwork.length; i++){
        let status = VlanNetwork[i].Status;
        switch(status){
          case -1 :
            delete VlanNetwork[i].Status;
            VlanNetwork_delete.push(VlanNetwork[i]);
          break;
          case 0 :
            delete VlanNetwork[i].Status;
            VlanNetwork_update.push(VlanNetwork[i]);
          break;
          case 1 :
            delete VlanNetwork[i].Status;
            VlanNetwork_Add.push(VlanNetwork[i]);
          break;
          default:
           break;
        };
    };
    VlanNetwork_sorted.VlanNetwork_delete = VlanNetwork_delete;
    VlanNetwork_sorted.VlanNetwork_update = VlanNetwork_update;
    VlanNetwork_sorted.VlanNetwork_Add = VlanNetwork_Add;
    return VlanNetwork_sorted;
  }
}

module.exports = network;
