import React from 'react';
import {Container, Image} from 'semantic-ui-react';
import matrix from '../../assets/png/Matrix.png';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Auth.scss';

export default function Auth() {
    return (
        <Container fluid className="auth">
            <div className="content">
                <Image src={matrix} />

                <div className="container-form" >
                    <LoginForm />
                </div>
            </div>
        </Container>
    )
}
