import React from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'

export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            links:null
        }
    }

    async componentDidMount(){
        let links= await fetch ("./Navs.json",{
                                    "headers" : { 
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'}
                                    });
        links= await links.json();
        this.setState({
            links:links.navs
        })
        
    }


    render(){
        const {links} = this.state;
        if(links===null){
            return(
                <div>Hello World</div>
            )
        }
        else
        return(
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="#home">Algorithms</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {
                        Object.values(links).map((item,ind)=>(
                            <NavDropdown title={item.name} id={ind} key={ind}>
                                {
                                    item.values.map((elem,index)=>(
                                        <NavDropdown.Item key={index} href={elem.link}>{elem.name}</NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                        ))
                    }
                    
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}