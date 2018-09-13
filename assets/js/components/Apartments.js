import 'babel-polyfill';
import React, { Component } from 'react';
import ApartmentForm from './ApartmentForm';
import { Container, Table, Alert } from 'reactstrap';
import { BASE_URL } from './util'
import IncreaseLikeCount from './IncreaseLikeCount';


class Apartments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apartments: null,
            isLoading: null
        };
        this.addListing = this.addListing.bind(this);
        this.likeIncrease = this.likeIncrease.bind(this);
    }

    likeIncrease(data, id) {
        let apartments = this.state.apartments;
        let apartment = apartments.find(apartment => apartment.id === id);
        apartment.count = data.count;
        this.setState({
            apartments: apartments
        })
    }

    componentDidMount() {
        this.getApartments();
    }

    async getApartments() {
        if (!this.state.apartments) {
            try {
                this.setState({ isLoading: true });
                const response = await fetch(BASE_URL + '/apartments');
                const data = await response.json();
                this.setState({ apartments: data, isLoading: false});
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    addListing(apartment) {
        this.setState({
            apartments: [...this.state.apartments, apartment]
        })
    }

    render() {
        return (
            <div>
                {this.state.isLoading &&  <Alert color="primary">
                    Loading ....
                </Alert>}
                {this.state.apartments &&
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Like Count </th>
                            <th> Image </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.apartments.map(
                            apartment =>
                                <tr id={apartment.id} key={apartment.id}>
                                    <td>{apartment.id}</td>
                                    <td>{apartment.title}</td>
                                    <td>{apartment.description}</td>
                                    <td>{apartment.price}</td>
                                    <td>
                                        <IncreaseLikeCount likeIncrease={this.likeIncrease()} apartmentId={apartment.id} />
                                    </td>
                                    <td>
                                        <img src="" alt=""/>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </Table>

                    <ApartmentForm addListing={this.addListing} />
                </div>
                }
            </div>
        );
    }
}

export default Apartments;

