import React, { Component } from 'react'
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native'
import { connect } from "react-redux";
import { addCardToDeck } from "../actions";

class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    handleQuestionTextChange = (input) => {
        this.setState({
            question: input
        })
    }

    handleAnswerTextChange = (input) => {
        this.setState({
            answer: input
        })
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        const { dispatch, navigation } = this.props

        dispatch(addCardToDeck({question, answer}, navigation.state.params.deck))

        this.setState({
            question: '',
            answer: ''
        })

        this.props.navigation.goBack()
    }

    render() {
        const submitDisabled = this.state.question.length === 0 || this.state.question.length === 0

        return (
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    value={this.state.question}
                    onChangeText={this.handleQuestionTextChange}
                    placeholder='Enter question...'
                />
                <TextInput
                    value={this.state.answer}
                    onChangeText={this.handleAnswerTextChange}
                    placeholder='Enter answer...'
                />
                <TouchableOpacity onPress={this.handleSubmit} disabled={submitDisabled}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        )
    }
}

export default connect()(AddCard)
