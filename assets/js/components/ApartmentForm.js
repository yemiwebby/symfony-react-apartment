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
            errorMessage:'',
            error: false,
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    async submitForm(event) {
        event.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        })
    }
}

export default ApartmentForm;