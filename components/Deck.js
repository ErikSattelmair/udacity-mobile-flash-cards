import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {

    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params;

        return {
            title: `Deck ${name}`
        }
    }

    render() {
        const { relevantDeck } = this.props
        const { title, cards } = relevantDeck
        const numberOfCards = cards ? Object.keys(cards).length : 0

        return (
            <View>
                <Text>{title}</Text>
                <Text>{numberOfCards} cards</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard', {deck: title})}>
                    <Text>Add Card</Text>
                </TouchableOpacity>

                {numberOfCards > 0 &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizCard', {deck: title})}>
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

}

function mapStateToProps(decks, { navigation }) {
    const { name } = navigation.state.params;
    const relevantDeck = decks[name]

    return {
        relevantDeck
    }
}

export default connect(mapStateToProps)(Deck)
