import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import "babel-preset-react";
import Items from './components/Items';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Apartments from './components/Apartments';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts/')
        //     .then(response => response.json())
        //     .then(entries => {
        //         this.setState({
        //             entries
        //         });
        //     });
    }

    render() {
        return (
                <div>
                     <Navbar/>
                    <Container >
                        <Apartments/>
                    </Container>
                </div>
            // </Router>
            // <div className="row">
            //
            //     {this.state.entries.map(
            //         ({ id, title, body }) => (
            //             <Items
            //                 key={id}
            //                 title={title}
            //                 body={body}
            //             >
            //             </Items>
            //         )
            //     )}
            // </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
