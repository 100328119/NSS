create database NSS;

use NSS;

create table admin
(
  id int not null auto_increment primary key,
  type varchar(255) not null
) ENGINE=INNODB;

create table users
(
  id int not null auto_increment primary key,
  email varchar(50) not null,
  admin_id int not null,
  password text not null,
  FOREIGN KEY (admin_id)
     REFERENCES admin(id)
) ENGINE=INNODB;

create table Category
(
  id int  not null auto_increment primary key,
  Category varchar(50) not null
) ENGINE=INNODB;

create table network
(
  id int not null auto_increment primary key,
  user_id int not null,
  N_Name varchar(50) not null,
  N_Number varchar(50),
  address varchar(255),
  Postal_Code varchar(50),
  Phone varchar(50),
  Fax varchar(50),
  Circuit_ID varchar(50),
  Category_id int,
  FOREIGN KEY (user_id)
     REFERENCES users(id),
  FOREIGN KEY (Category_id)
     REFERENCES Category(id)
) ENGINE=INNODB;

create table Net_device
(
   id int  not null auto_increment primary key,
   net_id int not null,
   type varchar(50),
   name varchar(50),
   Loopback varchar(50),
   Make varchar(50),
   Model varchar(50),
   Serial_Number varchar(50),
   FOREIGN KEY (Net_id)
      REFERENCES network(id)
) ENGINE=INNODB;

create table Vlan
(
  id int  not null auto_increment primary key,
  vlan_number varchar(50) not null,
  Description varchar(50) not null
) ENGINE=INNODB;

create table End_Device
(
  id int not null auto_increment primary key,
  net_id int not null,
  ip varchar(50),
  name varchar(50),
  VLAN_ID int,
  Port varchar(50),
  Active varchar(50),
  Description varchar(50),
  Type varchar(50),
  Make varchar(50),
  Model varchar(50),
  NetDevice varchar(50),
  FOREIGN KEY (net_id)
     REFERENCES network(id)
) ENGINE=INNODB;


create table VlanNetwork
(
  id int  not null auto_increment primary key,
  net_id int not null,
  vlan_id int not null,
  Gateway varchar(50),
  Submusk varchar(50),
  FOREIGN KEY (net_id)
     REFERENCES network(id),
  FOREIGN KEY (vlan_id)
    REFERENCES Vlan(id)
) ENGINE=INNODB;

create table WAN
(
  id int  not null auto_increment primary key,
  net_id int not null,
  Provider varchar(50),
  WAN_Type varchar(50),
  Upload varchar(50),
  DownLoad varchar(50),
  UploadShaping varchar(50),
  WAN_Network varchar(50),
  WAN_IP varchar(50),
  ADSL_OOB varchar(50),
  LOC_ID varchar(50),
  ASSET_TAG varchar(50),
  CSID varchar(50),
  FOREIGN KEY (net_id)
     REFERENCES network(id)
) ENGINE=INNODB;

create table Update_history
(
  id int  not null auto_increment primary key,
  net_id int not null,
  user_id int not null,
  Update_date date not null,
  Description varchar(250),
  FOREIGN KEY (net_id)
     REFERENCES network(id),
  FOREIGN KEY (user_id)
     REFERENCES users(id)
) ENGINE=INNODB;

//admin table
INSERT INTO `admin`(`type`) VALUES ('admin');
INSERT INTO `admin`(`type`) VALUES ('super_admin');


//Category table
INSERT INTO `category`(`Category`) VALUES ('Class A signature');
INSERT INTO `category`(`Category`) VALUES ('Class A');
INSERT INTO `category`(`Category`) VALUES ('Class B');
INSERT INTO `category`(`Category`) VALUES ('Class C');
INSERT INTO `category`(`Category`) VALUES ('Unassigned');
INSERT INTO `category`(`Category`) VALUES ('Office');
INSERT INTO `category`(`Category`) VALUES ('Test Lab');
INSERT INTO `category`(`Category`) VALUES ('Wine Festival');
INSERT INTO `category`(`Category`) VALUES ('Closed');

//Vlan table
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('20','Retail Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('40','Retail Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('50','Area Manager');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('110','HVAC/Fridge');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('150','Management Vlan');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('410','External Tablet');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('420','External Workstation');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('430','Public WiFi');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('500','Retail Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('501','Retail Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('502','Retail Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('503','Retail Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('506','Retail Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('530','MFD');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('550','Pinpad');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('551','Pinpad Bordeaux');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('552','Pinpad Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('553','Pinpad Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('552','Pinpad Test Store');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('620','DVR');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('621','DVR Test');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('630','Alarm Panel');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('640','Wholesale Customer Centre');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('670','Loss Prevention');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('710','Internet Only');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('721','Wireless Sw Test');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('730','Wireless Mgmt and WIPS');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('731','Wireless Sw Test');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('740','Wireless Mobile Unit');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('750','WIPS');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('751','WIPS Test');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('888','Management');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('889','Management Test');
INSERT INTO `vlan`(`vlan_number`, `Description`) VALUES ('WLAN','Wireless mobile units');
