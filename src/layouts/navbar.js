import * as React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function NavBar() {
  return (
    <Navbar bg='transparent' expand='lg' variant='light'>
      <Container>
        <Navbar.Brand href='/' className='text-dark fw-bold condensed-font'> 文字 </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='text-dark condensed-font' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/' className='text-dark condensed-font'> <FontAwesomeIcon icon={faHome} /> </Nav.Link>
            <Nav.Link href='/lookup' className='text-dark condensed-font'> Tra thông thường </Nav.Link>
            <Nav.Link href='/bothu' className='text-dark condensed-font'> Bộ thủ </Nav.Link>
            <Nav.Link href='/about' className='text-dark condensed-font'> Giới thiệu </Nav.Link>
            <Nav.Link href='/collection' className='text-dark condensed-font'> Tác phẩm </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}