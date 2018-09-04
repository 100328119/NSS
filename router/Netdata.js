const express = require('express');
const Netdata = express.Router();
const network = require('../model/network');
const db = require('../model/db');


//Restful Netdata
// newtork data minipuplate
Netdata.get('/all',function(req,response,nex){
  //get all newtork information
   db.get_connection(qb=>{
     qb.select("*").get("network",(err,res)=>{
       qb.release();
      if(err) return console.error(err);
      console.log(res);
      return response.send(res);
    });
  });
});

Netdata.get('/networkinfor', function(req, response, nex){
   db.get_connection(qb=>{
      qb.select(['n.id','n.N_Name','n.N_Number','n.address','n.Postal_Code','n.Phone','n.Fax','n.Circuit_ID','c.Category']).from('network n').join('Category c','c.id=n.Category_id ','left').get((err,res)=>{
          qb.release();
          if(err) return console.error(err);
          console.log(res);
          return response.send(res);
      });
   })
});

Netdata.get('/Site/:id', function(req,response,nex){
  //get specific newtork data
  let Net_id = req.params.id;
  let Network = {};
  console.log(Net_id);
  db.get_connection(qb=>{
    qb.select(['n.*',"c.Category"]).from('network n').where({'n.id':Net_id}).join('Category c','c.id=n.Category_id ','left').get((err,res)=>{
      if(err) return console.error(err);
      Network.network_info =  res[0];
    });
    qb.select('*').where({'net_id':Net_id}).get('Net_device',(err,res)=>{
      if(err) return console.error(err);
      Network.Net_devices =  res;
    });
    qb.select('*').where({'net_id':Net_id}).get('End_Device',(err,res)=>{
      if(err) return console.error(err);
      Network.End_Devices =  res;
    });
    qb.select('*').where({'net_id':Net_id}).get('VlanNetwork',(err,res)=>{
      if(err) return console.error(err);
      Network.VlanNetwork =  res;
    });
    qb.select('*').where({'net_id':Net_id}).get('WAN',(err,res)=>{
      if(err) return console.error(err);
      Network.WANs =  res;
    });
    qb.select('*').where({'net_id':Net_id}).order_by('Update_date', 'desc').get('Update_history',(err,res)=>{
      qb.release();
      if(err) return console.error(err);
      Network.Update_history = res;
      console.log(Network.Update_history);
      return response.send(Network);
    });
  });
});

Netdata.post('/new', function(req,response,nex){
  // add data
  let network_info = req.body.network_info;
  let Net_Devices = req.body.Net_Devices;
  let End_Devices = req.body.End_Devices;
  let WANs = req.body.WANs;
  let VLANs = req.body.VLANs;
  console.log(req.body);
  if(req.isAuthenticated()){
    network_info.user_id = req.user.user_id;
    // req.body.update_info.user_id = req.user.user_id;
    // console.log(network_info);
  db.get_connection(qb => {
    qb.insert("network", network_info, (err, res)=>{
       if(err) return console.error(err);
       console.log('network insert ok');
       let newId = res.insertId;
       for(let i = 0, len = Net_Devices.length; i<len; i++){
          Net_Devices[i].net_id = newId;
       };
       for(let i = 0, len = End_Devices.length; i<len; i++){
         End_Devices[i].net_id = newId;
       };
       for(let i = 0, len = VLANs.length; i<len; i++ ){
          delete VLANs[i].Description;
          VLANs[i].net_id = newId;
       };
       for(let i = 0, len = WANs.length; i<len; i++){
         WANs[i].net_id = newId;
       };
       // req.body.update_info.net_id = newId;
       console.log(Net_Devices);
       if (!(Net_Devices === undefined || Net_Devices == 0)) {
       qb.insert_batch("Net_device",Net_Devices, (err, res)=>{
          if(err) return console.error(err);
          console.log("Netword Device ok");
       })};
       console.log(End_Devices);
       if (!(End_Devices === undefined || End_Devices == 0)) {
       qb.insert_batch("End_Device",End_Devices, (err, res)=>{
          if(err) return console.error(err);
          console.log("End_Device ok ");
       })};
       if (!(WANs === undefined || WANs == 0)) {
       qb.insert_batch("WAN",WANs,(err, res)=>{
         if(err) return console.error(err);
         console.log("WAN ok");
       })};
       if (!(VLANs === undefined || VLANs == 0)) {
         qb.insert_batch("VlanNetwork",VLANs,(err, res)=>{
           // qb.release();
           if(err) return console.error(err);
           console.log("VlanNetwork ok");
       })};
       if(!(req.body.Update_history === undefined)){
         qb.insert('update_history',req.body.update_info,(err, res)=>{
           db.release();
           if(err) return console.error(err);
           console.log("update_history ok");
         })
       }else{
         console.log(res);
         db.release();
         return response.send(res);
       };
    })
  });
  }
});

Netdata.put('/update/:id',function(req,response,nex){
  //update
  let net = new network();
  //sort out data
  let Net_Device_sorted = net.clearNetDevice(req.body.Net_devices);
  let End_Device_sorted = net.clearEndDevice(req.body.End_Devices);
  let WAN_sorted = net.clearWAN(req.body.WANs);
  let VlanNetwork_sorted = net.clearVlanWork(req.body.VlanNetwork);

  db.get_connection(qb=>{
    // update data
    qb.update('network',req.body.network_info,{id:req.params.id},(err,res)=>{
      if(err) return console.error(err);
      console.log(res);
    });
    if (!(End_Device_sorted.End_update === undefined || End_Device_sorted.End_update.length == 0)) {
      for(let i=0; i<End_Device_sorted.End_update.length; i++){
        qb.update('end_device',End_Device_sorted.End_update[i],{id:End_Device_sorted.End_update[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        })
      };
    };
    if (!(Net_Device_sorted.Net_update === undefined || Net_Device_sorted.Net_update.length == 0)) {
      //update net device
      for(let i=0; i<Net_Device_sorted.Net_update.length; i++){
        qb.update('net_device',Net_Device_sorted.Net_update[i],{id:Net_Device_sorted.Net_update[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        })
      };
    };
    if (!(WAN_sorted.WANs_update === undefined || WAN_sorted.WANs_update.length == 0)) {
      //update wan device
      for(let i=0; i<WAN_sorted.WANs_update.length; i++){
        qb.update('wan',WAN_sorted.WANs_update[i],{id:WAN_sorted.WANs_update[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        })
      };
    }
    if (!(VlanNetwork_sorted.VlanNetwork_update === undefined || VlanNetwork_sorted.VlanNetwork_update.length == 0)) {
      //update wan device
      for(let i=0; i<VlanNetwork_sorted.VlanNetwork_update.length; i++){
        qb.update('VlanNetwork',VlanNetwork_sorted.VlanNetwork_update[i],{id:VlanNetwork_sorted.VlanNetwork_update[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        })
      };
    }
    if (!(End_Device_sorted.End_delete === undefined || End_Device_sorted.End_delete.length == 0)) {
      //delete user
      for(let i=0; i<End_Device_sorted.End_delete.length; i++){
        console.log(End_Device_sorted.End_delete[i]);
        qb.delete('end_device',{id:End_Device_sorted.End_delete[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        });
      };
    };
    if (!(Net_Device_sorted.Net_delete === undefined || Net_Device_sorted.Net_delete.length == 0)) {
      for(let i=0; i<Net_Device_sorted.Net_delete.length; i++){
        console.log(Net_Device_sorted.Net_delete[i]);
        qb.delete('net_device',{id:Net_Device_sorted.Net_delete[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        });
      };
    };
    if (!(WAN_sorted.WANs_delete === undefined || WAN_sorted.WANs_delete.length == 0)) {
      for(let i=0; i<WAN_sorted.WANs_delete.length; i++){
        console.log(WAN_sorted.WANs_delete[i]);
        qb.delete('wan',{id:WAN_sorted.WANs_delete[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        });
      };
    };
    if (!(VlanNetwork_sorted.VlanNetwork_delete === undefined || VlanNetwork_sorted.VlanNetwork_delete.length == 0)) {
      for(let i=0; i<VlanNetwork_sorted.VlanNetwork_delete.length; i++){
        console.log(VlanNetwork_sorted.VlanNetwork_delete[i]);
        qb.delete('VlanNetwork',{id:VlanNetwork_sorted.VlanNetwork_delete[i].id}, (err, res)=>{
          if(err) return console.error(err);
          console.log(res);
        })
      };
    };

     //add data
    if (!(Net_Device_sorted.Net_Add === undefined || Net_Device_sorted.Net_Add == 0)) {
      qb.insert_batch("Net_device",Net_Device_sorted.Net_Add, (err, res)=>{
         if(err) return console.error(err);
         console.log("Netword Device ok");
      });
    };
    if (!(End_Device_sorted.End_Add === undefined || End_Device_sorted.End_Add == 0)) {
      qb.insert_batch("End_Device",End_Device_sorted.End_Add, (err, res)=>{
         if(err) return console.error(err);
         console.log("End_Device ok ");
      });
    };
    if (!(WAN_sorted.WANs_Add === undefined || WAN_sorted.WANs_Add == 0)) {
      qb.insert_batch("WAN",WAN_sorted.WANs_Add,(err, res)=>{
        if(err) return console.error(err);
        console.log("WAN ok");
      });
    };
    if (!(VlanNetwork_sorted.VlanNetwork_Add === undefined || VlanNetwork_sorted.VlanNetwork_Add == 0)) {
      qb.insert_batch("VlanNetwork",VlanNetwork_sorted.VlanNetwork_Add,(err, res)=>{
        if(err) return console.error(err);
        console.log("VlanNetwork ok");
      });
    };
    if(!(req.body.Update_history === undefined)){
      req.body.Update_history.user_id = req.user.user_id;
      qb.insert('update_history',req.body.Update_history,(err, res)=>{
          qb.release();
          if(err) return console.error(err);
          console.log("update_history ok");
          return response.sendStatus(200);
      });
    }else{
      return response.sendStatus(200);
    }
  });
});

Netdata.delete('/delete/:id', function(req,response,nex){
  //remove
  db.get_connection(qb => {
     qb.delete('update_history', {Net_id: req.params.id}, (err, res) => {
       if (err) return console.error(err);
       qb.delete('net_device', {Net_id: req.params.id}, (err, res) => {if (err) return console.error(err);});
       qb.delete('wan', {Net_id: req.params.id}, (err, res) => {if (err) return console.error(err);});
       qb.delete('vlannetwork', {Net_id: req.params.id}, (err, res) => {if (err) return console.error(err);});
       qb.delete('end_device', {Net_id: req.params.id}, (err, res) => {
          if (err) return console.error(err);
          qb.delete('network', {id: req.params.id}, (err, res) => {
            if (err) return console.error(err);
            return response.sendStatus(200);
          });
        });
     })
  })
});

//category relate feature.
Netdata.get('/category',(req,response,nex)=>{
   db.get_connection(qb=>{
     qb.select('*').get('Category',(err,res)=>{
       qb.release();
        if(err) return console.error(err);
        console.log(res);
        return response.send(res);
     })
   })
});
Netdata.get('/NetCategoryGroup', (res, response, nex)=>{
  db.get_connection(qb=>{
    qb.select(["c.Category as label",'count(n.id) as value']).from('network n').join('Category c','c.id=n.Category_id ','left').group_by('Category_id').get((err,res)=>{
      qb.release();
       if(err) return console.error(err);
       return response.send(res);
    });
  })
});
Netdata.put('/UpdateCate',(req,response,nex)=>{
  db.get_connection(qb=>{
    qb.update('category',req.body,{id:req.body.id},(err, res)=>{
      if(err){
         console.log(err);
         return response.sendStatus(400);
      }
      qb.select('*').get('Category', (err, res)=>{
        qb.release();
        if(err){
           console.log(err);
           return response.sendStatus(400);
        }
        return response.send(res);
      })
    });
  });
})
Netdata.post('/NewCategory', (req,response, nex)=>{
  db.get_connection(qb=>{
    qb.insert('Category',req.body,(err,res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      qb.select('*').get('Category',(err, res)=>{
         qb.release();
         if(err) {
           console.error(err);
           return response.sendStatus(400);
         }
         return response.send(res);
      })
    })
  })
})

// vlan relate Netdata
Netdata.get('/Vlan', (res, response, nex)=>{
   db.get_connection(qb=>{
     qb.select('*').get('vlan',(err,res)=>{
       qb.release();
       if(err) return console.error(err);
       return response.send(res);
     })
   })
});

Netdata.post('/NewVlan', (req,response, nex)=>{
  console.log(req.body);
  db.get_connection(qb=>{
    qb.insert('vlan',req.body,(err,res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      qb.select('*').get('vlan',(err, res)=>{
         qb.release();
         if(err) {
           console.error(err);
           return response.sendStatus(400);
         }
         return response.send(res);
      })
    })
  })
})

Netdata.put('/UpdataVlan', (req, response, nex)=>{
  db.get_connection(qb=>{
    qb.update('vlan',req.body,{id:req.body.id},(err, res)=>{
       if(err) return console.error(err);
       qb.select('*').get('vlan', (err, res)=>{
          if(err) return console.log(err);
          return response.send(res);
       })
    });
  });
});

//
Netdata.get('/template/:Temp',(req,res,nex)=>{
 // res.send(Template);
});


module.exports = Netdata;
