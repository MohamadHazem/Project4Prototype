import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap"
import { useUserHook } from "../../hooks/useUserHook"
import { useFavHook } from "../../hooks/useFavHook";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const userHook = useUserHook()
    const favHook = useFavHook()
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    function onSearchSubmitHandler(e) {
        e.preventDefault()
        const data = {searchInput: searchInput}
        setSearchInput('')
        navigate('/search', {state: data})
    }

    return (
        <Navbar expand="lg" bg={"dark"} variant={'dark'}>
        <Container>
          <Navbar.Brand href="/" className="fw-medium">MyCarEAM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="/about">About</Nav.Link> */}
            </Nav>
            <Nav>
                <div className="d-flex align-items-center">
                    <Form className="d-flex" style={{height: 30}} onSubmit={onSearchSubmitHandler}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="dark" className="d-flex align-items-center ps-0" type="submit"><SearchIcon /></Button>
                    </Form>
                </div>
                {!userHook.user 
                ? <>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                    <Nav.Link href="/login">Log in</Nav.Link>
                </>
                : <>
                    <NavDropdown title={`Logged in as ${userHook.user.fullName}`}>
                        <NavDropdown.Item href="/fav">Fav</NavDropdown.Item>
                        <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={`/logout/${userHook.user.token}`}>Log out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/fav"><ShoppingCartIcon /> <span style={{fontSize: 12}}>{favHook.fav.length}</span></Nav.Link>
                </>
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}