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
    return(
      <div>
        <h1>{this.state.network.Category} - {this.state.network.ID}</h1>
        <hr/>
        <table>
          <thead>
            <tr>
              <th>type</th>
              <th>Network_id</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
              <tr key = "1">
                <td>{this.state.EditState ? (
                  <input
                    defaultValue={this.state.network.Category}
                  />):(
                    this.state.network.Category
                  )}</td>
                  <td>{this.state.EditState ? (
                    <input
                      defaultValue={this.state.network.ID}
                    />):(
                      this.state.network.ID
                    )}</td>
                <td>
                  <button onClick={this.OnEdit}>{this.state.EditState ? "Save" : "Edit" }</button>
                  <button> Delete </button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
}

ReactDOM.render(<Network />, document.getElementById('network'))
