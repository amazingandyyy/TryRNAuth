import React, {
    Component
} from 'react';
import firebase from 'firebase';
import {
    View
} from 'react-native';

import {
    Header,
    Button,
    Spinner
} from './components/common';

import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null
    };
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyA9K-Hb_TCGcFrQXAnBSkptLoYuK1FVzfg',
            authDomain: 'tryrnauth.firebaseapp.com',
            databaseURL: 'https://tryrnauth.firebaseio.com',
            storageBucket: 'tryrnauth.appspot.com',
            messagingSenderId: '687773569990'
        });
        firebase.auth().onAuthStateChanged((user) => {
            console.log('user: ', user);
            if (user) {
                this.setState({
                    loggedIn: true
                });
            } else {
                this.setState({
                    loggedIn: false
                });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header title={'Entrance'} />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
