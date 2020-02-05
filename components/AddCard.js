import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from "react-redux";
import { addCardToDeck } from "../actions";
import { addCardToDeck as saveCardAsynch } from '../utils/api'
import {black, gray, white} from "../utils/colors";

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
        const deck = navigation.state.params.deck
        const card = {
            question,
            answer
        }

        saveCardAsynch(deck, card).then(dispatch(addCardToDeck({question, answer}, deck)))

        this.setState({
            question: '',
            answer: ''
        })

        this.props.navigation.goBack()
    }

    render() {
        const submitDisabled = this.state.question.length === 0 || this.state.answer.length === 0

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TextInput
                    style={styles.input_question}
                    value={this.state.question}
                    onChangeText={this.handleQuestionTextChange}
                    placeholder='Enter question...'
                />
                <TextInput
                    style={styles.input_answer}
                    value={this.state.answer}
                    onChangeText={this.handleAnswerTextChange}
                    placeholder='Enter answer...'
                />
                <TouchableOpacity style={styles.submit} onPress={this.handleSubmit} disabled={submitDisabled}>
                    <Text style={submitDisabled ? styles.submit_text_disabled : styles.submit_text}>Submit</Text>
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
    input_question: {
        marginRight: 50,
        marginLeft: 50,
        borderRadius: 10,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 40,
        paddingLeft: 10
    },
    input_answer: {
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

export default connect()(AddCard)
