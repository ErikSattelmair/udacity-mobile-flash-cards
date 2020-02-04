import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

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
            return  <View>
                        <Text>Congratulations! You have completed the quiz!</Text>
                        <Text>You got {this.state.correctAnswers} answers right and {this.state.incorrectAnswers} wrong</Text>
                        <TouchableOpacity onPress={this.goBackToDeck}>
                            <Text>Go back to deck</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.restartQuiz}>
                            <Text>Restart quiz</Text>
                        </TouchableOpacity>
                    </View>
        }

        const currentCard = relevantCards[this.state.currentCardIndex]

        return (
            <View>
                <Text>{this.state.currentCardIndex + 1} / {numberOfRelevantCards}</Text>

                {this.state.showAnswer
                    ?   <View>
                            <Text>{currentCard.answer}</Text>
                            <TouchableOpacity onPress={this.toggleShowAnswer}>
                                <Text>Question</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.updateCorrectAnswers}>
                                <Text>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.updateIncorrectAnswers}>
                                <Text>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    :   <View>
                            <Text>{currentCard.question}</Text>
                            <TouchableOpacity onPress={this.toggleShowAnswer}>
                                <Text>Answer</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
    const relevantDeck = decks[navigation.state.params.deck]

    return {
        relevantDeck
    }
}

export default connect(mapStateToProps)(QuizCard)
