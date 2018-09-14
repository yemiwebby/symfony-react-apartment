import React, { Component } from 'react';
import ApartmentForm from './ApartmentForm';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Container, Button, Alert,Row, Col, Badge  } from 'reactstrap';
import { APP } from './util'
import IncreaseLikeCount from './IncreaseLikeCount';
import axios from 'axios';


class Apartments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apartments: null,
            isLoading: null
        };
        this.addListing = this.addListing.bind(this);
        this.likeIncrease = this.likeIncrease.bind(this);
        this.getApartments = this.getApartments.bind(this);
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

    getApartments() {
        if (!this.state.apartments) {
            this.setState({ isLoading: true });
            axios.get(`${APP.BASE_URL}/${APP.APARTMENTS_URL}`).then(response => {
                this.setState({ apartments: response.data, isLoading: false });
            }).catch(err => { this.setState({ isLoading: false}); console.log(err) })
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
                    <Container>
                        <Row>
                            <Col xs="3">
                                <ApartmentForm addListing={this.addListing} />
                            </Col>
                            <Col xl="9">
                                <Row>
                                    {this.state.apartments.map(
                                        apartment =>
                                            <Col xs="4" id={apartment.id} key={apartment.id}>
                                                <Card>
                                                    <CardImg top width="100%"
                                                             src={apartment.image}
                                                             alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{apartment.title}</CardTitle>
                                                        <h4><Badge color="info" pill>{apartment.price}</Badge></h4>
                                                        <CardText>{apartment.description}</CardText>

                                                        <IncreaseLikeCount likeIncrease={this.likeIncrease} apartmentId={apartment.id} likeCount={apartment.likeCount}/>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                }
            </div>
        );
    }
}

export default Apartments;

