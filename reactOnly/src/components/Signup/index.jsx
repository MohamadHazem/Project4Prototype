import { useState, useEffect, useRef } from "react"
import project4BackendAxios from "../../configs/project4BackendConfig"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

export default function Signup() {

    const navigate = useNavigate()
    const userHook = useUserHook()
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
        fullName: '',
        contactNo: '',
        address: '',
        email: '',
        admin: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
        if (userHook.user) {
            navigate('/')
        }
    }, [userHook.user])

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        }, (err, result) => {
            if (result.event === 'success') {
                setFormInput((prevState) => ({...prevState, profilePic: result.info.secure_url,}))
            }   
        })
    }, [])

    function onFormChangeHandler(e) {
        let value
        if (e.target.name === 'admin') {
            value = !!e.target.checked
        } else {
            value = e.target.value
        }
        setFormInput((prevState) => ({...prevState, [e.target.name]: value,}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        setErrorMessage('')
        try {
            const res = await project4BackendAxios.post('/user', formInput)
            if (res.status === 200) {
                userHook.storeUser(res.data.user)
                navigate('/')
            }
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'Username or email is duplicate') {
                setErrorMessage('Username or email is already taken')
            }
        }
    }

    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                    <h1>Create an account</h1>
                </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
                <Col xs={6} className="text-center justify-content-center">
                    <Form className="border border-dark-subtle pt-5 pb-4 ps-4 pe-4" onSubmit={onFormSubmitHandler}>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="border border-dark-subtle bg-primary d-flex align-items-center justify-content-center" style={{width: 60, height: 60, borderRadius: '100%'}}>
                                <AppRegistrationIcon sx={{ fontSize: 40 }}/>
                            </div>
                        </div>
                        {errorMessage !== '' 
                        ? <div>
                            <p className="text-danger fw-bold">{errorMessage}</p>
                        </div>
                        : ''}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control type="text" placeholder="Username" name="username" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Control type="text" placeholder="Full Name" name="fullName" onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicContactNo">
                            <Form.Control type="text" placeholder="Contact Number" name="contactNo" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Control type="text" placeholder="Address" name="address" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" name="email" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <div className="mb-3 d-flex justify-content-start">
                            <div className="me-3">
                                <Button variant="secondary" type="button" onClick={() => widgetRef.current.open()}>Upload Profile Picture</Button>
                            </div>
                            
                            {formInput?.profilePic && <div>
                                    <img src={formInput.profilePic} style={{width: 200, height: 200}} alt={'Profile pic'}/>
                                </div>}
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicAdmin">
                            <div className="d-flex justify-content-center">
                                <Form.Check type="checkbox" className="me-3" name="admin" onChange={onFormChangeHandler} id="admin"/>
                                <Form.Label>I am an admin</Form.Label>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="fw-medium mb-3">
                            Sign up
                        </Button>
                        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}