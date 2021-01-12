import React, { Component } from 'react';
import {Container}from 'react-bootstrap';
import logo from './logo.jpg';
export default class Home extends Component{
    render()
    {
        return(
            <div>
                    <Container>
                        <hr></hr>
                        <h1>Welcome to Cinematics!!!!!</h1>
                        <p>

                            Bringing the World Inside!!!
                     
                        </p>
                    </Container>
                <img src={logo} alt="Logo" />;
            </div>
        )
    }
}
