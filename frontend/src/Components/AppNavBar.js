import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import { Link} from 'react-router-dom';

class AppNavBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render(){
        return(
      <Navbar color="danger" className="navbar"dark expand="md">
      <NavbarBrand tag={Link} to="/">Hiring Portal - The Job Handler</NavbarBrand>
      <NavbarToggler/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
         
          
        </Nav>
      </Collapse>
    </Navbar>



        );


    };
      
}


export default AppNavBar;
