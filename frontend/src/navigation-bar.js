import React from 'react'
import logo from './commons/images/search.jpg';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

function handleSubmit(){
    localStorage.removeItem("role");
    // localStorage.removeItem("idUser");
}

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Meniu
                    </DropdownToggle>
                    <DropdownMenu right >

                        {/* <DropdownItem>
                            <NavLink href="/person">Persons</NavLink>
                        </DropdownItem> */}
                          <DropdownItem>
                            <NavLink href="/">Home</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/user">Users</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/device">Devices</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/measurement">Measurements</NavLink>
                        </DropdownItem>
                        {/* <DropdownItem>
                            <NavLink href="/logout">Log out</NavLink>
                        </DropdownItem> */}
                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>

            <Nav>

            {localStorage.getItem("role") === null ? <NavLink style={{ color: 'info', textDecoration: 'none' }} href='/login'> Login
                </NavLink> : <NavLink style={{ color: 'info', textDecoration: 'none' }} href='/' onClick = {handleSubmit} > Log out
                </NavLink> }
            </Nav>

        </Navbar>
    </div>
);

export default NavigationBar
