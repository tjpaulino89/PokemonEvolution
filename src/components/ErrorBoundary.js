import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
    }
    
    render() {
        if (!this.state.hasError) {
            return this.props.children;
        } else {
            return (
                <div>
                    <h1>Ooops, there was an Error!</h1>
                </div>
            );
        }
    }
}

export default ErrorBoundary;