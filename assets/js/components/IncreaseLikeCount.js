import 'babel-polyfill';
import React, { Component } from 'react';
import { Form, Button } from 'reactstrap'

import { APP } from './util'

class IncreaseLikeCount extends Component {

    constructor (props) {
        super(props);
        this.state = {
            id: props.apartmentId,
            count: props.likeCount,
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
        const response = await fetch(`${APP.BASE_URL}/${APP.APARTMENTS_URL}/${this.state.id}/count`, {
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
                <Button type='submit'> Like { this.state.count }</Button>
            </Form>
        )
    }
}

export default IncreaseLikeCount;