import React, {Component} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

class RedditNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="./">Reddit Cash</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.props.selectMode}>Hot</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.selectMode}>Top</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.selectMode}>New</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.selectMode}>Portfolio</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.submitPost}>Submit Post</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export {RedditNavBar};
