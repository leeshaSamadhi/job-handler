import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import CreateJob from './Components/CreateJob';
import ViewPendingJobs from './Components/ViewPendingJobs';


 

class App extends React.Component {


  constructor() {
    super();
    this.state = { user: {} };
  
  }
 
  

  render(){
    return (
      <div className="App">
     
      
      <Switch>
          <Route path="/" exact="true" component={CreateJob}/>
          <Route path="/pendingJobs" component={ViewPendingJobs}/>
         


      </Switch>
     
       
        
      </div>



    );
  };
  
  }
  
export default App;
