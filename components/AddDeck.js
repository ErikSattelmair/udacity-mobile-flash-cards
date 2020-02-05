import React, { Component } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, Text, TextInput, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import {black, gray, white} from "../utils/colors";

class AddDeck extends Component {

    state = {
        title: ''
    }

    handleTextChange = (input) => {
        this.setState({
            title: input
        })
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        const { title } = this.state

        saveDeckTitle(title).then(dispatch(addDeck(title)))

        this.setState({
            title: ''
        })

        this.toHome(title)
    }

    toHome = (title) => {
        this.props.navigation.navigate('Deck', {name: title});
    };

    render() {
        const submitButtonDisabled = this.state.title.length === 0

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style = {styles.input}
                    value={this.state.title}
                    onChangeText={this.handleTextChange}
                    placeholder='Enter title...'
                />
                <TouchableOpacity style={styles.submit} onPress={this.handleSubmit} disabled={submitButtonDisabled}>
                    <Text style={submitButtonDisabled ? styles.submit_text_disabled : styles.submit_text}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 50
    },
    input: {
        marginRight: 50,
        marginLeft: 50,
        borderRadius: 10,
        marginBottom: 50,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 40,
        paddingLeft: 10
    },
    submit: {
        backgroundColor: black,
        marginRight: 90,
        marginLeft: 90,
        borderRadius: 10,
    },
    submit_text: {
        color: white,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 24,
        textAlign: 'center'
    },
    submit_text_disabled: {
        color: gray,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 24,
        textAlign: 'center'
    }
})

export default connect()(AddDeck)
