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
        <EndDeviceTable End_ID={this.state.network.ID} EditState={this.state.EditState} OnEdit={this.OnEdit}/>
      </div>
    );
  }
}

class EndDeviceTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      EndDevices:[],
      EditState: false,
      CurrentEdit:-1
    }
    this.getEndDevice = this.getEndDevice.bind(this);
    this.OnEdit = this.OnEdit.bind(this);
  }

  getEndDevice(){
    fetch('/EndDevice/'+this.props.End_ID,{
      method:'GET'
    }).then(response=>{
      return response.json();
    }).then(data=>{
      this.setState({
        EndDevices:data
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

  componentDidMount(){
    this.getEndDevice();
  }

  render(){
    // console.log(Sample);
    const End_DeviceRow = this.state.EndDevices.map((endDeice, index) =>
      <tr key={index}>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.IP}/>):(endDeice.IP)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.D_Name}/>):(endDeice.D_Name)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.VLAN}/>):(endDeice.VLAN)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Port}/>):(endDeice.Port)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Active}/>):(endDeice.Active)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Description}/>):(endDeice.Description)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Type}/>):(endDeice.Type)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Make}/>):(endDeice.Make)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Model}/>):(endDeice.Model)}</td>
          <td>{this.state.EditState ? (<input defaultValue={endDeice.Connected_Device}/>):(endDeice.Connected_Device)}</td>
          <td>
          <button onClick={this.OnEdit}>{this.state.EditState ? "Save" : "Edit" }</button>
          <button> Delete </button>
          </td>
      </tr>
    );
    return(
    <div>
      <table>
        <thead>
          <tr>
            <th>IP</th>
            <th>Device Name</th>
            <th>VLAN</th>
            <th>Port</th>
            <th>Active</th>
            <th>Description</th>
            <th>Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Connected Device</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
            {End_DeviceRow}
          </tbody>
        </table>
    </div>
  );
  }
}


ReactDOM.render(<Network />, document.getElementById('network'))
