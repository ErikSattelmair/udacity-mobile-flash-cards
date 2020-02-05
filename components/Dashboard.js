import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {getDecks} from "../utils/api";
import { receiveDecks } from "../actions";
import Loading from "./Loading";
import {gray} from "../utils/colors";

class Dashboard extends Component {
    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props;

        getDecks()
            .then(decks => dispatch(receiveDecks(decks)))
            .then(() => {this.setState({ ready: true })})
    }

    renderDeck({ item }) {
        const numberOfCards = item.cards ? Object.keys(item.cards).length : 0

        return <View style={styles.deck}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {name: item.title})}>
                <Text style={styles.deck_title}>{item.title}</Text>
                <Text style={styles.deck_cards}>{numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparatorView = () => {
        return (
            <View style={styles.list_item_separator} />
        );
    };

    render() {
        const { decks } = this.props

        if(!this.state.ready) {
            return <Loading />
        }

        return (
            <View style={styles.container}>
                {decks
                    ?   <View>
                            <Text style={styles.heading}>Your current decks</Text>
                            <FlatList
                                data={Object.values(decks)}
                                renderItem={(item) => this.renderDeck(item)}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderSeparatorView} />
                        </View>
                    : <Text>No decks available. Add a deck via the tab bar.</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    heading: {
        fontSize: 30,
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    list_item_separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#CEDCCE",
    },
    deck: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    deck_title: {
        fontSize: 24,
    },
    deck_cards: {
        fontSize: 16,
        color: gray,
        textAlign: 'center'
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Dashboard)
