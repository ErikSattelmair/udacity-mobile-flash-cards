import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions/index'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS: {
            return action.decks
        }
        case ADD_DECK: {
            const { title } = action

            return {
                ...state,
                [title]: {
                    title: title,
                    cards: []
                }
            }
        }
        case ADD_CARD_TO_DECK: {
            const { card, deck } = action
            const updatedCards = state[deck].cards
            updatedCards.push(card)

            return {
                ...state,
                [deck]: {
                    ...state[deck],
                    updatedCards
                }
            }
        }
        default: {
            return state
        }
    }
}
