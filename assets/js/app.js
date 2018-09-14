import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Apartments from './components/Apartments';


class App extends React.Component {
    render() {
        return (
                <div>
                     <Navbar/>
                    <Container >
                        <Apartments/>
                    </Container>
                </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
