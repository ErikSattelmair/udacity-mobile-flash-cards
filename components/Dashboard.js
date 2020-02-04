import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {getDecks} from "../utils/api";
import { receiveDecks } from "../actions";
import Loading from "./Loading";

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
        return <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {name: item.title})}>
                <Text>{item.title}</Text>
                <Text>{item.cards ? Object.keys(item.cards).length : 0} cards</Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        const { decks } = this.props

        if(!this.state.ready) {
            return <Loading />
        }

        return (
            <View>
                {decks
                    ? <FlatList
                        data={Object.values(decks)}
                        renderItem={(item) => this.renderDeck(item)}
                        keyExtractor={(item, index) => index.toString()} />
                    : <Text>No decks available. Add a deck via the tab bar.</Text>}
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Dashboard)
