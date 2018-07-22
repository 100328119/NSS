class Store extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      store:[],
    };
  }
  getStoreData(){
    fetch('/')
  }
  render(){
    return(
      <div>
        <h1>store name</h1>
        <hr/>
      </div>
    );
  }
}

ReactDOM.render(<Store />, document.getElementById('store'))
