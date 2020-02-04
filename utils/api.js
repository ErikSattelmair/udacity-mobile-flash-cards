import { AsyncStorage } from "react-native";

const DECKS_STORAGE_KEY = 'UdaciMobileFlashCards:Decks'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse)
}

export function getDeck(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks => {return JSON.parse(decks[key])})
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,  JSON.stringify({[title]: {title: title, cards: []}}))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        const decks = JSON.parse(results);
        const updatedDecks = {
            ...decks,
            [title]: {
                ...decks[title],
                ...decks[title].cards.push(card)
                }
            }
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks));
    });
}
