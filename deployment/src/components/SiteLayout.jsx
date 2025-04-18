import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router";

export default function SiteLayout(props) {
    return <div>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand as={Link} to='/'>
                <img
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to='aquarium_calculator'>Aquarium Calculator</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <div style={{ margin: "1em" }}>
            <Outlet />
        </div>
    </div>

}