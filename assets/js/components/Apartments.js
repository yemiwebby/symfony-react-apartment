import 'babel-polyfill';
import React, { Component } from 'react';
import ApartmentForm from './ApartmentForm';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Alert,Row, Col, Badge  } from 'reactstrap';
import { APP } from './util'
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
                const response = await fetch(`${APP.BASE_URL}/${APP.APARTMENTS_URL}`);
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
                                        <CardImg top width="100%" src="https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1536874395/symfony-listing/wtsivfmcgfs1yxrkap7o.jpg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>{apartment.title}</CardTitle>
                                            <Badge color="info" pill>{apartment.price}</Badge>
                                            <CardText>{apartment.description}</CardText>
                                            <IncreaseLikeCount likeIncrease={this.likeIncrease} apartmentId={apartment.id} likeCount={apartment.likeCount}/>
                                        </CardBody>
                                    </Card>
                                </Col>
                        )}
                            </Row>
                        </Col>
                    </Row>
                </div>
                }
            </div>
        );
    }
}

export default Apartments;

