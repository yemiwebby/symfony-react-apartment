import 'babel-polyfill';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { BASE_URL } from "./util";


class ApartmentForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title:"",
            description:'',
            image: '',
            price: '',
            errorMessage:'',
            error: false,
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    async submitForm(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        // const accessToken = await this.props.auth.getAccessToken();
        const response = await fetch(BASE_URL + '/apartments', {
            method: 'POST',
            body: JSON.stringify({
                "title": this.state.title
            })
        });
        const data = await response.json();

        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
        } else {
            this.setState({
                title: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
            this.props.addListing(data);
        }
    }

    render() {
        return (
            <Form onSubmit={this.submitForm}>
                <FormGroup>
                    <label>Title</label>
                    <input placeholder='enter movie title' className={'form-control'} value={this.state.title} onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <label>Description</label>
                    <input placeholder='enter movie title' className={'form-control'} value={this.state.title} onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <label>Price</label>
                    <input placeholder='enter movie title' className={'form-control'} value={this.state.title} onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="exampleFile">Image</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Upload Image
                    </FormText>
                </FormGroup>

                <FormGroup>
                    <label>Image</label>
                    <input placeholder='enter movie title' className={'form-control'} value={this.state.title} onChange={this.handleChange}/>
                </FormGroup>

                { this.state.error &&
                <Alert color="danger">
                    {this.state.errorMessage}
                </Alert>
                }
                <Button type='submit' outline color="success">Add Apartment</Button>{' '}

                {/*<Button  loading={this.state.isLoading}>Add Apartment</Button>*/}
            </Form>
        )
    }
}

export default ApartmentForm;