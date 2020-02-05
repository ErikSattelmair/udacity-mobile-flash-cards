import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {black, gray, green, red, white} from "../utils/colors";

class QuizCard extends Component {

    state = {
        currentCardIndex: 0,
        showAnswer: false,
        correctAnswers: 0,
        incorrectAnswers: 0,
    }

    toggleShowAnswer = () => {
        this.setState({
            showAnswer: !this.state.showAnswer
        })
    }

    updateCorrectAnswers = () => {
        this.setState({
            currentCardIndex: ++this.state.currentCardIndex,
            showAnswer: false,
            correctAnswers: ++this.state.correctAnswers,
        })
    }

    updateIncorrectAnswers = () => {
        this.setState({
            currentCardIndex: ++this.state.currentCardIndex,
            showAnswer: false,
            incorrectAnswers: ++this.state.incorrectAnswers
        })
    }

    goBackToDeck = () => {
        this.setState({
            currentCardIndex: 0,
            showAnswer: false,
            correctAnswers: 0,
            incorrectAnswers: 0,
        })

        this.props.navigation.goBack()
    }

    restartQuiz = () => {
        this.setState({
            currentCardIndex: 0,
            showAnswer: false,
            correctAnswers: 0,
            incorrectAnswers: 0,
        })
    }

    render() {
        const { relevantDeck } = this.props
        const relevantCards = relevantDeck.cards
        const numberOfRelevantCards = relevantCards.length

        if(this.state.currentCardIndex >= numberOfRelevantCards) {
            return  <View style={[styles.container, {justifyContent: 'center'}]}>
                        <Text style={styles.quiz_finished_heading}>Congratulations, you have completed the quiz!</Text>
                        <Text style={styles.quiz_finished_text}>You answered {this.state.correctAnswers} of {numberOfRelevantCards} {numberOfRelevantCards === 1 ? 'answer' : 'answers'} correctly.</Text>
                        <TouchableOpacity style={styles.submit_go_back_to_deck} onPress={this.goBackToDeck}>
                            <Text style={styles.submit_go_back_to_deck_text}>Go back to deck</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submit_restart_quiz} onPress={this.restartQuiz}>
                            <Text style={styles.submit_restart_quiz_text}>Restart quiz</Text>
                        </TouchableOpacity>
                    </View>
        }

        const currentCard = relevantCards[this.state.currentCardIndex]

        return (
            <View style={styles.container}>
                <Text style={styles.counter}>{this.state.currentCardIndex + 1} / {numberOfRelevantCards}</Text>

                {this.state.showAnswer
                    ?   <View>
                            <Text style={styles.question_answer}>{currentCard.answer}</Text>
                            <TouchableOpacity onPress={this.toggleShowAnswer}>
                                <Text style={styles.flip}>Question</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submit_correct} onPress={this.updateCorrectAnswers}>
                                <Text style={styles.submit_text}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submit_incorrect} onPress={this.updateIncorrectAnswers}>
                                <Text style={styles.submit_text}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    :   <View>
                            <Text style={styles.question_answer}>{currentCard.question}</Text>
                            <TouchableOpacity onPress={this.toggleShowAnswer}>
                                <Text style={styles.flip}>Answer</Text>
                            </TouchableOpacity>
                        </View>
                }
                <View/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    counter: {
        fontSize: 20,
        marginLeft: 10,
    },
    question_answer: {
        fontSize: 50,
        marginBottom: 10,
        textAlign: 'center'
    },
    flip: {
        fontSize: 20,
        marginBottom: 80,
        textAlign: 'center',
        color: red,
        fontWeight: 'bold'
    },
    submit_correct: {
        backgroundColor: green,
        marginRight: 90,
        marginLeft: 90,
        borderRadius: 10,
        marginBottom: 10
    },
    submit_incorrect: {
        backgroundColor: red,
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
    quiz_finished_heading: {
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center'
    },
    quiz_finished_text: {
        fontSize: 20,
        marginBottom: 80,
        textAlign: 'center',
        color: gray
    },
    submit_go_back_to_deck: {
        marginRight: 90,
        marginLeft: 90,
        borderRadius: 10,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    submit_restart_quiz: {
        backgroundColor: black,
        marginRight: 90,
        marginLeft: 90,
        borderRadius: 10,
    },
    submit_go_back_to_deck_text: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 24,
        textAlign: 'center'
    },
    submit_restart_quiz_text: {
        color: white,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 24,
        textAlign: 'center'
    }
})

function mapStateToProps(decks, { navigation }) {
    const relevantDeck = decks[navigation.state.params.deck]

    return {
        relevantDeck
    }
}

export default connect(mapStateToProps)(QuizCard)
