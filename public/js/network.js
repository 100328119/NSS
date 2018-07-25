class Network extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      network:[],
      EditState:false,
      currentEdit:-1
    };

    this.getNetworkData = this.getNetworkData.bind(this);
    this.OnEdit = this.OnEdit.bind(this);

  }
  getNetworkData(){
    fetch('/Netdata/bcls/1',{
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        network: data
      });
    });
  }
  OnEdit(){
    if(this.state.EditState === false){
      this.setState({
          EditState:true
      })
    }else{
      this.setState({
          EditState:false
      })
    }
  }
  componentDidMount() {
    this.getNetworkData();
  }
  render(){
    console.log(this.state.network.End_Device);
    return(
      <div>
        <h1>{this.state.network.Category} - {this.state.network.ID}</h1>
        <hr/>
        <EndDeviceTable EndDevices={this.state.network.End_Device} EditState={this.state.EditState} OnEdit={this.OnEdit}/>
      </div>
    );
  }
}

class EndDeviceTable extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    // const _EndDevices = JSON.parse(this.props.EndDevices);
    const end =this.props.EndDevices;
    const Sample = [
      {
        'IP':'10.44.2.2',
        'D_Name':'LDR01002',
        'VLAN':20,
        'Port':'F0/3',
        'Active':true,
        'Description':"Register 1",
        'Type':'POS Register',
        'Make':'Zabar',
        'Model':'Register',
        'Connected_Device':'LDBRR002'
      },
      {
        'IP':'10.44.2.17',
        'D_Name':'LDSDC002',
        'VLAN':20,
        'Port':'F0/13',
        'Active':true,
        'Description':"BCLDB RO Domain Controller",
        'Type':'Server',
        'Make':'Zabar',
        'Model':'server',
        'Connected Device':'LDBRR002'
      },
      {
        'IP':'10.44.2.13',
        'D_Name':'LDSDC002',
        'VLAN':20,
        'Port':'F0/13',
        'Active':true,
        'Description':"BCLDB RO Domain Controller",
        'Type':'Server',
        'Make':'Zabar',
        'Model':'server',
        'Connected Device':'LDBRR002'
      }
    ];
    const EditState = this.props.EditState;
    // console.log(_EndDevices);
    // console.log(end);
    console.log(Sample);
    const End_DeviceRow = Sample.map(function(ed){
      return (
        <li>{ed.IP}</li>
      );
    });
    return(
    <div>
    <table>
      <thead>
        <tr>
          <th>IP</th>
          <th>Device Name</th>
          <th>VLAN</th>
          <th>Port</th>
          <th>Description</th>
          <th>Type</th>
          <th>Make</th>
          <th>Model</th>
          <th>Connected Device</th>
          <th>Action</th>
        </tr>
      </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
  }
}


ReactDOM.render(<Network />, document.getElementById('network'))
