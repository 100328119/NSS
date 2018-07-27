class EndDeviceTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      EndDevices:[],
      Err:{'err':'err'},
      EditState: false,
      CurrentEdit:-1
    };
    this.getEndDevice = this.getEndDevice.bind(this);
    this.OnEdit = this.OnEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  OnEdit(index){
    if(this.state.EditState === false){
      this.setState({
          EditState:true,
          CurrentEdit:index
      })
    }else{
      this.setState({
          EditState:false,
          CurrentEdit:-1
      });
    }
  }

  handleChange(e,name,i){
    const { value } = e.target;
    this.setState(state => ({
      EndDevices: state.EndDevices.map(
        (row, j) => (j === i ? {...row, [name]:value }:row)
      )
    }));
  }

  componentDidMount(){
    this.getEndDevice();
  }

  render(){
    // console.log(Sample);
    const End_DeviceRow = this.state.EndDevices.map((endDeice, index) =>
      <tr key={index}>
          {Object.keys(endDeice).map((key) => {
              return (
                <td key={key}>{this.state.CurrentEdit === index  ? (<input className="form-control" name={key} onChange={(e)=> this.handleChange(e,key,index)} defaultValue={endDeice[key]}/>):(endDeice[key])}</td>
              )
          })}
          <td>
          <button onClick={()=>this.OnEdit(index)}>{this.state.CurrentEdit === index ? "Save" : "Edit" }</button>
          <button> Delete </button>
          </td>
      </tr>
    );
    // const Column = (this.state.EndDevices[0] === null) ? this.state.Err: this.state.EndDevices[0];
    // console.log(Column);
    // const table_Column = Object.keys(Column).map((key,index)=>{
    //   return(
    //     <th key={index}>{key}</th>
    //   )
    // });
    return(
    <div className="panel panel-primary">
      <table className="table table-striped table-bordered table-hover" >
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
ReactDOM.render(<EndDeviceTable />, document.getElementById('EndDevicetable'))
