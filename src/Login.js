import React, {useState, useRef} from 'react'
import { Container, Row, Col, Form, Button, Overlay, Popover } from 'react-bootstrap'
import profile_img from './files/profile.jpg'
import { useDispatch } from 'react-redux'

const ProfilePicture = (props) => {
    const ref = useRef(null);
  
    return (
      <div ref={ref}>

        <Overlay className='black-background'
          show={props.show}
          target={props.target}
          placement="bottom"
          container={ref.current}
          rootClose
          rootCloseEvent='click'
          containerPadding={20}>
          <Popover id="popover-contained">
            <Popover.Title as="h3" className='gray-background'>Hi there!</Popover.Title>
            <Popover.Content className="no-padding">
                <img src={profile_img} alt="Hi there!" width="100%" height="%100" />
            </Popover.Content>
          </Popover>
        </Overlay>

      </div>
    );
}

const Login = () => {

    const [userName, setUserName] = useState()
    const [userPwd, setUserPwd] = useState()
    const [message, setMessage] = useState({message: '', variant:''})
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [linkText, setLinkText] = useState("Click me!")

    const dispatch = useDispatch()

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
        setLinkText(linkText === "Click me!" ? "Click me for close!" : "Click me!")
    };

    const handleChange = event =>{
        if(event.target.id === 'userName')
            setUserName(event.target.value)
        else if (event.target.id === 'userPassword')
            setUserPwd(event.target.value)
    }

    const handleSubmit = event => {

        const formControl = event.currentTarget
        event.preventDefault();
        event.stopPropagation();

        if (formControl.checkValidity() === true){
            if(userName === 'user' && userPwd === 'password'){
                dispatch({type: 'session/login'})
                window.location.replace('/forms')
            }else{
                setMessage({message: 'user or password incorrect', variant:'danger'})
            }
        }
    
    }

    const sleep = (ms) =>{
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    return(
        <div>

            <ProfilePicture target={target} show={show} />

            <Container>

                <Row style={{marginBottom:10}}>
                    <Col className="no-padding">
                        <div className="login-text-left-container">
                            <span className="login-text-left">
                            &#10100;"Personal data":
                                &#10100;<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;"Profile picture":
                                <Button className="button-link" onClick={handleClick}>{linkText}</Button> <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;"Name": "Ricardo Lómez",<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;"Birth date": "13/08/88",<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;"Age": 32,<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;"Real passion": "Software development"<br/> 
                                &#10101;&#10101;
                            </span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Container className="">
                            <Row>
                                <Col className="no-padding">
                                <div className="login-login-text">
                                    Login
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="no-padding">
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
                                
                                <Col className="no-padding">
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
        </div>
    )
}

export default Login