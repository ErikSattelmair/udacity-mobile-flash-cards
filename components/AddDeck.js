import React, { Component } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

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
        return (
            <KeyboardAvoidingView behavior='padding'>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    value={this.state.title}
                    onChangeText={this.handleTextChange}
                    placeholder='Enter title...'
                />
                <TouchableOpacity onPress={this.handleSubmit} disabled={this.state.title.length === 0}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect()(AddDeck)
