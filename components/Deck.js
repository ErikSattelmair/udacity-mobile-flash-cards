import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {black, gray, white} from "../utils/colors";

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
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cards}>{numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}</Text>
                <TouchableOpacity style={styles.submit_add_card} onPress={() => this.props.navigation.navigate('AddCard', {deck: title})}>
                    <Text style={styles.submit_add_card_text}>Add Card</Text>
                </TouchableOpacity>

                {numberOfCards > 0 &&
                    <TouchableOpacity style={styles.submit_start_quiz} onPress={() => this.props.navigation.navigate('QuizCard', {deck: title})}>
                        <Text style={styles.submit_start_quiz_text}>Start Quiz</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 20
    },
    cards: {
        fontSize: 30,
        textAlign: 'center',
        color: gray,
        marginBottom: 150
    },
    submit_add_card: {
        marginRight: 90,
        marginLeft: 90,
        borderRadius: 10,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    submit_add_card_text: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 30,
        paddingLeft: 30,
        fontSize: 24,
        textAlign: 'center'
    },
    submit_start_quiz: {
        backgroundColor: black,
        marginRight: 90,
        marginLeft: 90,
        borderRadius: 10,
    },
    submit_start_quiz_text: {
        color: white,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 30,
        paddingLeft: 30,
        fontSize: 24,
        textAlign: 'center'
    }
})

export default connect(mapStateToProps)(Deck)
