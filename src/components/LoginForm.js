import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: null,
        loading: false
    };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(err => {
                        this.onLoginFail.bind(this, err)();
                    });
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: null,
            loading: false
        });
    }

    onLoginFail(err) {
        this.setState({
            password: '',
            error: err.message,
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <Spinner size="small" />
            );
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'sample@email.com'}
                        value={this.state.email.toLowerCase()}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label={'Password'}
                        placeholder={'password'}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
