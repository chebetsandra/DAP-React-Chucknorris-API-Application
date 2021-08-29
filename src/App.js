import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from "react";





function App() {




  const ChucknorrisURLcat = "https://api.chucknorris.io/jokes/categories";

  const PlusIcon = () => {
    return (
        <span className="panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,7H9V2A1,1,0,0,0,7,2V7H2A1,1,0,0,0,2,9H7v5a1,1,0,0,0,2,0V9h5a1,1,0,0,0,0-2Z"/>
            </svg>
        </span>
    )
  }
  
  const MinusIcon = () => {
    return (
        <span className="panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z"/>
            </svg>
        </span>
    )    
  }
  
  const PanelHeader = props => {
    return (
        <button
            className="panel__header"
            onClick={() => {
            
          if(getinfoWithFetch(props.children)){props.handleToggle();
          }
            }}
            id={props.children}
          

            onKeyDown={props.handleKeyDown}
         aria-hidden={props.isExpanded}
        >
            {props.children}   
           
            {props.isExpanded ?<p className="panel__header-loading">Loading...</p> : <PlusIcon/>}
        </button>
    )
  }
  
  const PanelBody = props => {
const body=props.children;
   
    return (
        <div className="panel__body" aria-hidden={props.isExpanded}>
            {props.children}
            {PanelHeader.title}
        </div>
    )
  }
  
  const PanelGroup = props => {
    return (
        <div className="panel-group" role="group">
            {props.children}
        </div>
    )
  }
   
  class Panel extends React.Component {
 
    constructor(props) {
        super(props)
        
        this.state = {
            isExpanded: props.openDefault
        }
  
        this.handleToggle = this.handleToggle.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }
    
    handleToggle() {
        this.setState({

            isExpanded: !this.state.isExpanded 

        })
    }
  
  
    handleKeyDown(event) {
        if(event.keyCode === 40) {
            event.preventDefault();
            this.setState({
                isExpanded: true,
           
            })
        }
        
        if(event.keyCode === 38) {
            event.preventDefault();
            this.setState({
                isExpanded: false
            })
        }
    }
    
    render() {

        return (
            <div className="panel">
                <PanelHeader
                    handleToggle={this.handleToggle}
                    handleKeyDown={this.handleKeyDown}
                    isExpanded={this.state.isExpanded}
                >
                    {this.props.title}
                </PanelHeader>
                <PanelBody  
                 isExpanded={this.state.isExpanded}>

               {(infoData.categories==this.props.title)?this.props.title+'-'+infoData.value:null}

                </PanelBody>
            </div>
        )
    }
  }

  useEffect(() => {
    getcatWithFetch();
  }, []);


  const [infoData, setinfoData] = useState({});

  const [catData, setcatData] = useState({});

  const getcatWithFetch = async () => {
    const response = await fetch(ChucknorrisURLcat);
    const jsonData = await response.json();
    setcatData(jsonData);
  };
  const getinfoWithFetch  = async(param) => {
    const response = await fetch( "https://api.chucknorris.io/jokes/random?category="+param);
    const jsonData = await response.json();
    setinfoData(jsonData);
};
  const generate_elements = () => {
    const row = [];
    for (var i = 0; i < catData.length; i++) {
      row.push(
        <Panel   
        key={i} title={catData[i]} >       
        {catData[i]+'-'+infoData.value}
        </Panel>    
     );
    }
    return row;
  };

  return (
    <React.Fragment>
      <header className="App-header">
        <h1>
        <img src={logo} className="App-logo" alt="logo" /> 
          DAP React Chucknorris API Application
        <img src={logo} className="App-logo" alt="logo" /> 
          </h1>
          <h2>Categories</h2>
            <p className="lead">Click on a category to Load Chucknorris.io content</p>
      </header>
      <div  className="App-body">
      <div className="wrapper">      
      <PanelGroup>
      {generate_elements()}  
      </PanelGroup>
        </div>
        </div>
<footer>

<div className="footer">
    <h3 className='dapfooterright'>© Chebet Langat </h3>
    <h3 className='dapfooterleft'>DAP 2021 Coding Challenge</h3>
  </div>
</footer>

        </React.Fragment>
  );
}

export default App;
