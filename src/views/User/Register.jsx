import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Form, FormGroup, Label, Input, Button } from "reactstrap";
import swal from 'sweetalert';
import ApiHandler from '../../ApiHandler';

class RegisterUser extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password : '',
        }
    }
    
    handleRegister (e) {
        e.preventDefault();
        e.stopPropagation();

        var state = this.state;

        var payload={
            email : state.email,
            password : state.password,
        };
        ApiHandler.signUp(payload, function (response){
            if(response.status === 200){
              swal("Success!", response.data+"!", "success")
              .then(()=>{
                window.location = '/';
              })
            }
            else {
              swal('Oops',response.response.data.message,'error')
            }
        })
    }

    // Input field value
    handleInputValue=(event)  => {
        this.setState({[event.target.name] : event.target.value})
    }

    render() {
        return(
            <>
            <Container>
            <Jumbotron>
                <Row>
                    <Col>
                        <h1>Register</h1>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="12">
                    <Form method="POST" onSubmit={(e)=>this.handleRegister(e)}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter email"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Create a password"
                            minLength="8"
                            required
                            />
                        </FormGroup>
                        <FormGroup check row>
                            <Col>
                            <Button className="float-right">Submit</Button>
                            </Col>
                        </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Jumbotron>
            </Container>
            </>
        )
    }
}
export default RegisterUser;