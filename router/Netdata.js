const express = require('express');
const Netdata = express.Router();
const network = require('../model/network');
const db = require('../model/db');
const dateFormat = require('dateformat');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/store_image' });
const fs = require('fs');


//Restful Netdata
//-----------------------newtork data minipuplate-------------------------//
Netdata.get('/all',function(req,response,nex){
  //get all newtork information
   db.get_connection(qb=>{
     qb.select("*").get("network",(err,res)=>{
       qb.release();
      if(err) return console.error(err);
      return response.send(res);
    });
  });
});

Netdata.get('/networkinfor', function(req, response, nex){
   db.get_connection(qb=>{
      qb.select(['n.id','n.N_Name','n.N_Number','n.address','n.Postal_Code','n.Phone','n.Fax','n.Circuit_ID','c.Category']).from('network n').join('Category c','c.id=n.Category_id ','left').get((err,res)=>{
          qb.release();
          if(err) return console.error(err);
          return response.send(res);
      });
   })
});

Netdata.get('/Site/:id', function(req,response,nex){
  //get specific newtork data
  let Net_id = req.params.id;
  let Network = {};
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
    qb.select(['h.*',"u.email","u.admin_id"]).from('Update_history h').where({'h.net_id':Net_id}).join('users u','u.id=h.user_id','left').order_by('h.Update_date', 'desc').get((err,res)=>{
      qb.release();
      if(err) return console.error(err);
      Network.Update_history = res;
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
  if(req.isAuthenticated()){
    network_info.user_id = req.user.user_id;
    // req.body.update_info.user_id = req.user.user_id;
    // console.log(network_info);
  db.get_connection(qb => {
    qb.insert("network", network_info, (err, res)=>{
       if(err) return console.error(err);
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
       if (!(Net_Devices === undefined || Net_Devices == 0)) {
       qb.insert_batch("Net_device",Net_Devices, (err, res)=>{
          if(err) return console.error(err);
       })};
       if (!(End_Devices === undefined || End_Devices == 0)) {
       qb.insert_batch("End_Device",End_Devices, (err, res)=>{
          if(err) return console.error(err);
       })};
       if (!(WANs === undefined || WANs == 0)) {
       qb.insert_batch("WAN",WANs,(err, res)=>{
         if(err) return console.error(err);
       })};
       if (!(VLANs === undefined || VLANs == 0)) {
         qb.insert_batch("VlanNetwork",VLANs,(err, res)=>{
           if(err) return console.error(err);
       })};
       if(!(req.body.Update_history === undefined)){
         qb.insert('update_history',req.body.update_info,(err, res)=>{
           qb.release();
           if(err) return console.error(err);

         })
       }else{
         qb.release();
         return response.send(res);
       };
    })
  });
  }
});

Netdata.put('/networkinfo/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.update('network',req.body,{id:req.body.id}, (err, res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      qb.select('*').where({'id':req.params.net_id}).get('network',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res[0]);
      });
    })
  })
})

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
            qb.release();
            if (err){
              console.error(err);
              return response.sendStatus(400);
            }
            return response.sendStatus(200);
          });
        });
     })
  })
});

//---------------------Update history CURD------------------------------//
Netdata.get('/update_history/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.select(["h.*","u.email","u.admin_id"]).from('update_history h').where({'h.net_id':req.params.net_id}).join('users u', 'u.id=h.user_id', 'left').order_by('h.Update_date', 'desc').get((err, res)=>{
      qb.release();
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      return response.send(res);
    })
  })
})

Netdata.post('/update_history/:net_id', function(req, response, nex){
  if(req.isAuthenticated()){
    req.body.user_id = req.user.user_id;
    db.get_connection(qb=>{
      qb.insert('update_history', req.body, (err, res)=>{
        if(err){
          console.log(err);
          return response.sendStatus(400);
        }
        qb.select(["h.*","u.email","u.admin_id"]).from('update_history h').where({'h.net_id':req.params.net_id}).join('users u', 'u.id=h.user_id', 'left').order_by('h.Update_date', 'desc').get((err, res)=>{
          qb.release();
          if(err){
            console.log(err);
            return response.sendStatus(400);
          }
          return response.send(res);
        })
      })
    })
  }
})

Netdata.put('/update_history/:net_id', function(req, response, nex){
  if(req.isAuthenticated()){
    req.body.user_id = req.user.user_id;
    db.get_connection(qb=>{
      qb.update('update_history', req.body, {id:req.body.id}, (err, res)=>{
        if(err){
          console.log(err);
          return response.sendStatus(400);
        }
        qb.select(["h.*","u.email","u.admin_id"]).from('update_history h').where({'h.net_id':req.params.net_id}).join('users u', 'u.id=h.user_id', 'left').order_by('h.Update_date', 'desc').get((err, res)=>{
          qb.release();
          if(err){
            console.log(err);
            return response.sendStatus(400);
          }
          return response.send(res);
        })
      })
    })
  }
})

Netdata.delete('/update_history/:net_id/:update_id', function(req, response, nex){
  console.log(req.params.update_id);
  console.log(req.params.net_id);
    // if(req.isAuthenticated()){
      db.get_connection(qb=>{
        qb.delete('update_history',{id:req.params.update_id}, (err, res)=>{
          if(err){
            console.log(err);
            return response.sendStatus(400);
          }
          qb.select(["h.*","u.email","u.admin_id"]).where({'h.net_id':req.params.net_id}).join('users u', 'u.id=h.user_id', 'left').order_by('h.Update_date', 'desc').get('update_history h',(err, res)=>{
            qb.release();
            if(err){
              console.log(err);
              return response.sendStatus(400);
            }
            return response.send(res);
          })
        })
      })
    // }
  })

//--------------------end device CRUD------------------------------//
Netdata.get('/end_device/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.select('*').where({'net_id':req.params.net_id}).get('End_Device',(err,res)=>{
      qb.release();
      if(err){
        console.error(err)
        return response.sendStatus(400);
      };
      return response.send(res);
    });
  })
})

Netdata.post('/end_device/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.insert('End_Device',req.body,(err, res)=>{
      if(err) {
        console.error(err);
        return response.sendStatus(400);
      };
        qb.select('*').where({'net_id':req.params.net_id}).get('End_Device',(err,res)=>{
          qb.release();
          if(err){
            console.error(err)
            return response.sendStatus(400);
          };
          return response.send(res);
        });
    })
  })
})

Netdata.put('/end_device/:net_id', function(req, response, nex){
   db.get_connection(qb=>{
     qb.update('End_Device',req.body,{id:req.body.id}, (err, res)=>{
       if(err){
         console.error(err);
         return response.sendStatus(400);
       }
       qb.select('*').where({'net_id':req.params.net_id}).get('End_Device',(err,res)=>{
         qb.release();
         if(err){
           console.error(err)
           return response.sendStatus(400);
         };
         return response.send(res);
       });
     })
   })
})

Netdata.delete('/end_device/:net_id/:end_device_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.delete('End_Device',{id:req.params.end_device_id}, (err, res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      };
      qb.select('*').where({'net_id':req.params.net_id}).get('End_Device',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

//------------------------ network device CRUD------------------------//
Netdata.get('/net_device/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.select('*').where({'net_id':req.params.net_id}).get('net_device',(err, res)=>{
      qb.release();
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      return response.send(res);
    })
  })
})

Netdata.post('/net_device/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.insert('net_device',req.body, (err, res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
    })
    qb.select('*').where({'net_id':req.params.net_id}).get('net_device',(err, res)=>{
      qb.release();
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      return response.send(res);
    })
  })
})

Netdata.put('/net_device/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.update('net_device',req.body,{id:req.body.id}, (err, res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      qb.select('*').where({'net_id':req.params.net_id}).get('net_device',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

Netdata.delete('/net_device/:net_id/:net_device_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.delete('net_device',{id:req.params.net_device_id}, (err, res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      };
      qb.select('*').where({'net_id':req.params.net_id}).get('net_device',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

//--------------------WAN CRUD-----------------------------------//
Netdata.get('/WAN/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
      qb.select('*').where({'net_id':req.params.net_id}).get('WAN',(err, res)=>{
          qb.release();
          if(err){
            console.log(err);
            return response.sendStatus(400);
        }
       return response.send(res);
    })
  })
})

Netdata.post('/WAN/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.insert('WAN',req.body,(err, res)=>{
      if(err) {
        console.error(err);
        return response.sendStatus(400);
      };
      qb.select('*').where({'net_id':req.params.net_id}).get('WAN',(err, res)=>{
        qb.release();
        if(err){
          console.log(err);
          return response.sendStatus(400);
        }
        return response.send(res);
      })
    })
  })
})

Netdata.put('/WAN/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.update('WAN',req.body,{id:req.body.id}, (err, res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      qb.select('*').where({'net_id':req.params.net_id}).get('WAN',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

Netdata.delete('/WAN/:net_id/:wan_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.delete('WAN',{id:req.params.wan_id}, (err, res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      };
      qb.select('*').where({'net_id':req.params.net_id}).get('WAN',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

//--------------------VlanNetwork CRUD-----------------------------------//
Netdata.get('/VlanNetwork/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
      qb.select('*').where({'net_id':req.params.net_id}).get('VlanNetwork',(err, res)=>{
          qb.release();
          if(err){
            console.log(err);
            return response.sendStatus(400);
        }
       return response.send(res);
    })
  })
})

Netdata.post('/VlanNetwork/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.insert('VlanNetwork',req.body,(err, res)=>{
      if(err) {
        console.error(err);
        return response.sendStatus(400);
      };
      qb.select('*').where({'net_id':req.params.net_id}).get('VlanNetwork',(err, res)=>{
        qb.release();
        if(err){
          console.log(err);
          return response.sendStatus(400);
        }
        return response.send(res);
      })
    })
  })
})

Netdata.put('/VlanNetwork/:net_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.update('VlanNetwork',req.body,{id:req.body.id}, (err, res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      qb.select('*').where({'net_id':req.params.net_id}).get('VlanNetwork',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

Netdata.delete('/VlanNetwork/:net_id/:NetDevice_id', function(req, response, nex){
  db.get_connection(qb=>{
    qb.delete('VlanNetwork',{id:req.params.NetDevice_id}, (err, res)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      };
      qb.select('*').where({'net_id':req.params.net_id}).get('VlanNetwork',(err,res)=>{
        qb.release();
        if(err){
          console.error(err)
          return response.sendStatus(400);
        };
        return response.send(res);
      });
    })
  })
})

//-------------------category CRUD------------------------------//
Netdata.get('/category',(req,response,nex)=>{
   db.get_connection(qb=>{
     qb.select('*').get('Category',(err,res)=>{
       qb.release();
        if(err) return console.error(err);
        return response.send(res);
     })
   })
});

Netdata.get('/NetCategoryGroup', (req, response, nex)=>{
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

//---------------------- vlan CRUD--------------------------//
Netdata.get('/Vlan', (req, response, nex)=>{
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

//---------Store image CRUD---------------------------------//
Netdata.get('/store_image/:net_id', (req, response,nex)=>{
  db.get_connection(qb=>{
    qb.select('*').where({net_id:req.params.net_id}).get('store_image',(err,res)=>{
      qb.release();
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      response.send(res);
    })
  })
})

Netdata.post('/store_image/:net_id',upload.single('file'),(req, response, next)=>{
   if(req.isAuthenticated()){
     let new_image = req.file;
     let oldpath = new_image.path;
     let newpath = "public/uploads/store_image/" + new_image.originalname;
     var image = {};
     image.image_name =  new_image.originalname;
     image.net_id = req.params.net_id;
     var now = new Date();
     image.image_date = dateFormat(now, "yyyy-mm-dd");
     image.image_path = "/uploads/store_image/"+ new_image.originalname;
     if(!fs.existsSync(newpath)){
       db.get_connection(qb=>{
              qb.insert("store_image",image, (err,res)=>{
               if(err) {
                 console.log(err);
                 return  response.sendStatus(400);
               }
               fs.rename(oldpath, newpath, function (err) {
                if (err){
                  console.log(err);
                  return response.sendStatus(400);
                }
                qb.select('*').where({net_id:req.params.net_id}).get('store_image', (err, result)=>{
                  qb.release();
                  if(err){
                    console.log(err);
                    return response.sendStatus(400);
                  }
                  return response.send(result);
                })
               });
             });
          });
     }else{
       // uplink or remove the existing image
       fs.unlink(oldpath, function (err) {
         if (err){
           console.error(err);
           return response.sendStatus(400);
         }
         return response.sendStatus(400);
       })
     }
    }
})

Netdata.put('/delete_store_image/:image_id', (req, response, next)=>{
  db.get_connection(qb=>{
    qb.delete('store_image',{id:req.body.id},(err,resp)=>{
      if(err){
        console.log(err);
        return response.sendStatus(400);
      }
      fs.unlink('public/'+req.body.image_path, function (err) {
        if (err){
          console.error(err);
          return response.sendStatus(400);
        }
        qb.select("*").where({net_id:req.body.net_id}).get('store_image', (err, res)=>{
          qb.release();
          if(err){
            console.log(err);
            return response.sendStatus(400);
          }
          return response.send(res);
        })
      })
    })
  })
})

module.exports = Netdata;
