import React, {Component} from 'react';
import {
    Navbar,
    NavbarBrand,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Card,
    CardTitle,
    CardText
} from 'reactstrap';
import $ from "jquery";
import spinner from "./spinner.svg";

class ZForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            visible: false,
            username: false,
            link: "",
            errorText: ""
        }
        this.checkUsername = this
            .checkUsername
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.onDismiss = this
            .onDismiss
            .bind(this);
    }

    checkUsername() {
        let username = $("#uname").val();
        $.ajax({
            method: "POST",
            url: "https://app.cuttingly99.hasura-app.io/check",
            "crossDomain": true,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"uname": username})
        }).done(res => {
            let val = res.username;
            this.setState({username: val})
        }).catch(err => {
            this.setState({errorText:"Something went wrong, try again.",visible: true})
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = $("#name").val();
        let uname = $("#uname").val();
        let password = $("#password").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let age = $("#age").val();
        let data = JSON.stringify({
            "name": name,
            "uname": uname,
            "password": password,
            "email": email,
            "phone": phone,
            "age": age
        })
        if (!this.setState.username && uname.length > 0) {
            this.setState({isLoading:true})
            $.ajax({
                method: "POST",
                url: "https://app.cuttingly99.hasura-app.io/",
                "crossDomain": true,
                headers: {
                    "Content-Type": "application/json"
                },
                data: data
            }).done(res => {
                let link = res.link;
                console.log(data)
                this.setState({link: link,isLoading:false});
                this.props.passLink(this.state.link);
            }).catch(err => {
                this.setState({errorText:"Please enter valid details.",isLoading:false,visible:true})
            })
        } else {
            console.log(this.state.username)
            this.setState({errorText:"Please enter username.",visible:true})
        }
    }

    onDismiss() {
        this.setState({visible: false});
    }

    render() {
        
        {
            this.state.isLoading
                ? ($("#spinnerdiv").removeClass("div-hidden").addClass("spinnerdiv-visible").css("height", $("html").height()))
                : ($("#spinnerdiv").removeClass("spinnerdiv-visible").addClass("div-hidden"));
            this.state.visible
                ? ($("#erroralertdiv").removeClass("div-hidden").addClass("erroralert-visible").css("height", $("html").height()))
                : ($("#erroralertdiv").removeClass("erroralert-visible").addClass("div-hidden"));
            this.state.username
                ?($("input#uname").css({"border":"2px solid red","box-shadow":"2px 2px 10px red, -2px -2px 10px red"})):
                ($("input#uname").css({"border":"2px solid green","box-shadow":"2px 2px 10px green, -2px -2px 10px green"}))
        }
        return (
            <div className="container-fluid">
                <div className="div-hidden" id="spinnerdiv">
                    <img src={spinner} className="spinner" alt="spinner"/>
                </div>
                <div id="erroralertdiv" className="div-hidden">
                    <Card id="erroralert">
                        <CardTitle id="errortitle">Error</CardTitle>
                        <CardText id="errortext">
                            {this.state.errorText}
                        </CardText>
                        <Button onClick={this.onDismiss} outline id="errorback-btn">
                            close
                        </Button>
                    </Card>
                </div>
                <Navbar id="navbar">
                    <NavbarBrand href="/" className="mr-auto" id="navbrand">Zappier</NavbarBrand>
                </Navbar>
                <div className="row">
                    <div className="col-6 offset-3" id="registerform">
                        <Form>
                            <Label id="formtitle">Registration Form</Label>
                            <FormGroup row>
                                <Label for="name" className="formlabels" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name" placeholder="Enter your Name"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" className="formlabels" sm={2}>Username</Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        onKeyUp={this.checkUsername}
                                        name="username"
                                        id="uname"
                                        placeholder="Enter Username"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" className="formlabels" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter Password"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" className="formlabels" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your e-mail address"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone" className="formlabels" sm={2}>Phone</Label>
                                <Col sm={10}>
                                    <Input
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter your Phone number"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="age" className="formlabels" sm={2}>Age</Label>
                                <Col sm={10}>
                                    <Input
                                        type="number"
                                        min="15"
                                        max="80"
                                        name="age"
                                        id="age"
                                        placeholder="Enter your Age"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col
                                    sm={{
                                    size: 7,
                                    offset: 3
                                }}>
                                    <Button id="submitbtn" onClick={this.handleSubmit}>Submit</Button>
                                </Col>
                                <Col
                                    sm={{
                                    size: 7,
                                    offset: 3
                                }}>
                                    <Button id="clearbtn" type="reset">Clear</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div id="footer">
                    <p>Developed by team Zappy, powered by &copy;
                        <a href="https://hasura.io/">Hasura</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default ZForm;