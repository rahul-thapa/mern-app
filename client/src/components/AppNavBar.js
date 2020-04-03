import React, {Component} from "react"

import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'

class AppNavBar extends Component{

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    constructor(props){
        super(props)

        this.state ={
            isOpen: false
        }

        
    }

    render(){
        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">
                        Shopping List
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        )
    }
}


export default AppNavBar