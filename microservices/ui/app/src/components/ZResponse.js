import React, { Component } from 'react';
import { Navbar,NavbarBrand,Container,Jumbotron, Button } from 'reactstrap';

class ZResponse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link:""
        }
    }

    componentDidMount() {
        this.setState({link:this.props.passedLink})
    }

    render() {
        return (
            <div className="container-fluid">
                 <Navbar id="navbar">
                    <NavbarBrand href="/" className="mr-auto" id="navbrand">Zappier</NavbarBrand>
                </Navbar>
                <Jumbotron id="jumbotron">
                    <Container fluid>
                        <h2>Success!</h2>   
                        <p>You have been successfully registered. Click <a href={this.state.link}>here</a> to view your details.</p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default ZResponse;