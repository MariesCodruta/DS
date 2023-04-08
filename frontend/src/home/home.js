import React from 'react';

import BackgroundImg from '../commons/images/energy.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "700px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-5" style={textStyle}>Online Energy Utility Platform</h1>
                        <hr className="my-2"/>
                        <p className="lead">
                        </p>
                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
