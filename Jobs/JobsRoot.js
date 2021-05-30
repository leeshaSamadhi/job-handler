import React from 'react';
import { Route, Switch } from "react-router-dom";
import '../../../App.css';
import CreateJob from './CreateJob';
import ViewPendingJobs from './ViewPendingJobs';


 

class JobsRoot extends React.Component {


  constructor() {
    super();
    this.state = { user: {} };
  
  }
 
  

  render(){
    return (
      <div className="App width-95" >
       
     
      
      <Switch>
          <Route path="/hr/jobs" exact="true" component={CreateJob}/>
          <Route path="/hr/jobs/pendingJobs" component={ViewPendingJobs}/>
         


      </Switch>
     
       
        
      </div>



    );
  };
  
  }
  
export default JobsRoot;
