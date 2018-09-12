import 'babel-polyfill';
import React, { Component } from 'react';
import { Form, Button } from 'reactstrap'

import { BASE_URL } from './util'

class IncreaseLikeCount extends Component {

    constructor (props) {
        super(props);
        this.state = {
            id: props.apartmentId,
            isUpdating: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isUpdating: true
        });

        // const accessToken = await this.props.auth.getAccessToken();
        const response = await fetch(BASE_URL + '/apartments/' + this.state.id + '/count', {
            method: 'POST',
        });
        const data = await response.json();

        this.setState({
            isUpdating: false
        });

        if (! data.errors) {
            this.props.likeIncrease(data, this.state.id);
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Button type='submit' loading={this.state.isUpdating}> Like </Button>
            </Form>
        )
    }
}

export default IncreaseLikeCount;