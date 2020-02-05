import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const DECKS_STORAGE_KEY = 'UdaciMobileFlashCards:Decks'
const NOTIFICATION_KEY = 'UdaciMobileFlashCards:Notifications'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse)
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

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: "day"
                        });

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}

function createNotification() {
    return {
        title: "Complete a quiz!",
        body: "Don't forget to complete a quiz for today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
}
