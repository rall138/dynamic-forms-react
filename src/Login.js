import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import profile_img from './files/profile.jpg'

const Login = () => {


    const handleChange = event =>{

    }

    const handleSubmit = event => {

    }
    return(
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Container className="">
                        <Row style={{marginBottom:10}}>
                            <Col>
                                <div className="login-header-container">
                                    <img className="rounded-image" src={profile_img} alt="My profile picture" width="80" height="90" />
                                </div>
                            </Col>
                            <Col>
                                <div className="login-text-left-container">
                                    <span className="login-text-left">
                                        Name: Ricardo Lómez<br/>
                                        Birth date: 13/08/88<br/>
                                        Age: 32<br/><br/>
                                        [ Passionate developer ]
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className="login-login-text">
                                Login
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form className="form-login" 
                                    key="form_control" 
                                    id="form_login" 
                                    onSubmit={handleSubmit}>
                                    
                                    <Form.Group>
                                        <Form.Label>User name</Form.Label>
                                        <Form.Control key={'user_name'} onChange={handleChange}
                                            name="user_name"
                                            id="userName"
                                            required
                                            placeholder="Type user name or email"
                                            type="text">
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>User password</Form.Label>
                                        <Form.Control key={'user_password'} onChange={handleChange}
                                            name="user_password"
                                            id="userPassword"
                                            required 
                                            type="password">
                                        </Form.Control>
                                    </Form.Group>

                                    <Button className="button-link" type="submit" variant="success">Log in</Button>
                                </Form>
                            </Col>
                            
                            <Col>
                                <div className="login-text-container">
                                    
                                    <span className="login-text">
                                        Welcome to my personal project.
                                        Dynamic froms was created to demonstrate the interaction 
                                        between react and Ruby on rails. <br/>Hope you like it!
                                    </span><br/><br/>

                                    <span className="login-text red">
                                        By the way, user name is [user] and password is [password]
                                    </span>

                                </div>
                            </Col>
                        </Row>
                    </Container>

                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    )
}

export default Login