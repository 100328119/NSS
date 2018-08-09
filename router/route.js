//import infrastructure package
const express = require('express');
const fs = require('fs');
const router = express.Router();

//page redirection
router.get('/dashboard', function (req, res, next) {
  // render dashborad page
  res.render('dashboard');
});

router.get('/newtork/:type/:id', function (req, res, nex) {
  //render newtork network info page
  res.render('network');
});

router.get('/network/new', function (req, res, nex) {
  //render create new newtork page
  res.render('newNetwork');
});

router.get('/report/:id', function (req, res, next) {
  //render Operation report page
  res.render('report');
});

router.get('/newreport', function (req, res, nex) {
  //render create new report page
  res.render('newreport');
});

//- Upload files and save them on the server file system
router.post('/fileupload', function (req, res) {
  //- Use a module called formidable to upload file to server
  const formidable = require('formidable');

  //- Parse a file upload
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = "./uploads";
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024; // Max fields size = 10MB
  form.multiples = true;

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Cannot upload files. Error is ${err}`
      });
    }
    console.log(files);
    if (files.filetoupload.length > 0) {
      let fileNames = [];
      files.filetoupload.forEach((file) => {
        fileNames.push(file.name);

        let oldpath = file.path;
        let newpath = './uploads/' + file.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
      });
      res.json({
        result: "ok",
        data: fileNames,
        numberOfFiles: fileNames.length,
        message: "Files uploaded successfully"
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        numberOfFiles: 0,
        message: "No files uploaded"
      });
    }
  });
});

router.get('/tool', function (req, res, nex) {
  //render common support tool page
  res.render('tool');
});

router.get('/support', function (req, res, nex) {
  // render support page
  res.render('support');
})

//Restful api
// newtork data minipuplate
router.get('/Netdata/all', function (req, res, nex) {
  //get all newtork information
  let stores = [
    {
      'type': 'BCLS',
      'S_ID': '001'
    },
    {
      'type': 'BCLS',
      'S_ID': '002'
    },
    {
      'type': 'BCCS',
      'S_ID': '001'
    },
    {
      'type': 'BCCS',
      'S_ID': '002'
    }
  ];
  let storeObj = JSON.stringify(stores)
  let storeJSON = JSON.parse(storeObj);
  res.send(storeJSON);
});
router.get('/Netdata/:storetype/:id', function (req, res, nex) {
  //get specific newtork data
  let network = {
    'ID': '002',
    'Circuit_ID': '1137330',
    'Category': 'BCLS',
    'N_name': 'Ashcroft',
    'address': "PO Box 368, 301 - 3rd Street Ashcroft , BC",
    'Postal_Code': 'V0K 1A0',
    'Phone': '(250) 453-2542',
    'Fax': '(250) 453-9507',
    'Class': 'Class A',
    'Date_Modified': '07-16-2012',
    'Modified_By': 'Kun',
    'Comment': 'Testing purpose',
    'End_Device': [
      {
        'IP': '10.44.2.2',
        'D_Name': 'LDR01002',
        'VLAN': 20,
        'Port': 'F0/3',
        'Active': true,
        'Description': "Register 1",
        'Type': 'POS Register',
        'Make': 'Zabar',
        'Model': 'Register',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.2.17',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.2.13',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.2.56',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.2.78',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      }
    ],
    'WAN': [
      {
        'Provider': 'Telus',
        'WAN_Type': 'ADSL',
        'Upload': '6M',
        'Download': '100m',
        'UploadShaping': 395000,
        'WAN_Network': '10.46.0.0/29',
        'WAN_IP': '10.46.0.2',
        'ADSL_OOB': '604-261-0410',
        'LOC_ID': 'ASH130-00',
        'ASSET_TAG': 1137346,
        'CSID': 1433915
      },
      {
        'Provider': 'SHAW',
        'WAN_Type': 'Cable',
        'Upload': '150M',
        'Download': '170m',
        'UploadShaping': 395000,
        'WAN_Network': '184.71.40.192/30',
        'WAN_IP': '184.71.40.194',
        'ADSL_OOB': '',
        'LOC_ID': '',
        'ASSET_TAG': '',
        'CSID': 1881148784
      }
    ],
    'Net_Device': [
      {
        'type': 'Switch',
        'Name': 'LDBRR017',
        'Loopback': '10.44.17.250',
        'Make': 'Cisco',
        'Model': '2911',
        'Serial': 'FHK1439F2TT'
      },
      {
        'type': 'Router',
        'Name': 'LDBRS017',
        'Loopback': '10.44.17.254',
        'Make': 'Cisco',
        'Model': '2960-24LC-S',
        'Serial': 'FHK1439F2TT'
      }
    ],
    'VLANs': [
      {
        'VLAN': '20',
        'Description': 'Retail Store',
        'Gateway': '10.44.2.1',
        'Subnet': '255.255.255.192'
      },
      {
        'VLAN': '410',
        'Description': 'External Tablet',
        'Gateway': '10.44.2.1',
        'Subnet': '255.255.255.240'
      }
    ]
  }
  res.send(network);
});

//api/ will standard setup
router.get('/EndDevice/:netid', (req, res, nex) => {
  let ed = [
    {
      'IP': '10.44.2.2',
      'D_Name': 'LDR01002',
      'VLAN': '20',
      'Port': 'F0/3',
      'Active': 'true',
      'Description': "Register 1",
      'Type': 'POS Register',
      'Make': 'Zabar',
      'Model': 'Register',
      'Connected Device': 'LDBRR002'
    },
    {
      'IP': '10.44.2.17',
      'D_Name': 'LDSDC002',
      'VLAN': '20',
      'Port': 'F0/13',
      'Active': 'true',
      'Description': "BCLDB RO Domain Controller",
      'Type': 'Server',
      'Make': 'Zabar',
      'Model': 'server',
      'Connected Device': 'LDBRR002'
    },
    {
      'IP': '10.44.2.13',
      'D_Name': 'LDSDC002',
      'VLAN': '20',
      'Port': 'F0/13',
      'Active': 'true',
      'Description': "BCLDB RO Domain Controller",
      'Type': 'Server',
      'Make': 'Zabar',
      'Model': 'server',
      'Connected Device': 'LDBRR002'
    }
  ];
  res.send(ed);
});

router.get('/api/Netdata/template/:Temp', (req, res, nex) => {
  let Template = {
    'End_Device': [
      {
        'IP': '10.44.xxx.2',
        'D_Name': 'LDR01002',
        'VLAN': 20,
        'Port': 'F0/3',
        'Active': true,
        'Description': "Register 1",
        'Type': 'POS Register',
        'Make': 'Zabar',
        'Model': 'Register',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.xxx.17',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.xxx.13',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.xxx.56',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      },
      {
        'IP': '10.44.xxx.78',
        'D_Name': 'LDSDC002',
        'VLAN': 20,
        'Port': 'F0/13',
        'Active': true,
        'Description': "BCLDB RO Domain Controller",
        'Type': 'Server',
        'Make': 'Zabar',
        'Model': 'server',
        'Connected_Device': 'LDBRR002'
      }
    ],
    'WAN': [
      {
        'Provider': 'Telus',
        'WAN_Type': 'ADSL',
        'Upload': '6M',
        'Download': '100m',
        'UploadShaping': 395000,
        'WAN_Network': '10.46.0.0/29',
        'WAN_IP': '10.46.0.2',
        'ADSL_OOB': '604-261-0410',
        'LOC_ID': 'ASH130-00',
        'ASSET_TAG': 1137346,
        'CSID': 1433915
      },
      {
        'Provider': 'SHAW',
        'WAN_Type': 'Cable',
        'Upload': '150M',
        'Download': '170m',
        'UploadShaping': 395000,
        'WAN_Network': '184.71.40.192/30',
        'WAN_IP': '184.71.40.194',
        'ADSL_OOB': '',
        'LOC_ID': '',
        'ASSET_TAG': '',
        'CSID': 1881148784
      }
    ],
    'Net_Device': [
      {
        'type': 'Switch',
        'Name': 'LDBRR017',
        'Loopback': '10.44.xxx.250',
        'Make': 'Cisco',
        'Model': '2911',
        'Serial': 'FHK1439F2TT'
      },
      {
        'type': 'Router',
        'Name': 'LDBRS017',
        'Loopback': '10.44.xxx.254',
        'Make': 'Cisco',
        'Model': '2960-24LC-S',
        'Serial': 'FHK1439F2TT'
      }
    ],
    'VLANs': [
      {
        'VLAN': '20',
        'Description': 'Retail Store',
        'Gateway': '10.44.xxx.1',
        'Subnet': '255.255.255.192'
      },
      {
        'VLAN': '410',
        'Description': 'External Tablet',
        'Gateway': '10.44.xxx.1',
        'Subnet': '255.255.255.240'
      }
    ]
  };
  res.send(Template);
});

router.post('/api/Netdata/new', function (req, res, nex) {
  // add data
  console.log(req.body);
  res.sendStatus(200);
});

router.put('/Netdata/update/:id', function (req, res, nex) {
  //update
  console.log(req.body);
  res.sendStatus(200);
});

router.delete('/Netdata/delete/:id', function (req, res, nex) {
  //remove
});

//report data minipuplate
router.get('/reportdata/:id', function (req, res, nex) {

});

router.post('/reportdata/new', function (req, res, nex) {

});

router.put('/reportdata/update/:id', function (req, res, nex) {

});

router.delete('/reportdata/delete/:id', function (req, res, nex) {

});

//tool data minipuplate
router.get('/tooldata/:id', function (req, res, nex) {

});

router.post('/tooldata/new', function (req, res, nex) {

});

router.put('/tooldata/update/:id', function (req, res, nex) {

});

router.delete('/tooldata/delete/:id', function (req, res, nex) {

});

module.exports = router;
