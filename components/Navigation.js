import React from 'react'
import { Platform } from 'react-native'
import {createAppContainer} from "react-navigation";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { white, purple } from "../utils/colors";
import AddCard from "./AddCard";
import Dashboard from "./Dashboard";
import QuizCard from "./QuizCard";
import AddDeck from "./AddDeck";
import Deck from "./Deck";

const _TabNavigator = Platform.OS === "ios" ? createBottomTabNavigator : createMaterialTopTabNavigator;

const TabNavigator = _TabNavigator(
    {
        Dashboard: {
            screen: Dashboard,
            navigationOptions: {
                tabBarLabel: "Decks",
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
                )
            }
        },

        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: "New Deck",
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="plus-square" size={30} color={tintColor} />
                )
            }
        }
    },
    {
        navigationOptions: {
            headerShown: false
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === "ios" ? purple : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);

const MainNavigation = createStackNavigator({
    Home: {
        screen: TabNavigator,
        navigationOptions: {
            headerShown: false
        }
    },
    QuizCard: {
        screen: QuizCard,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            title: 'Quiz',
            headerStyle: {
                backgroundColor: purple
            }
        })
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            title: 'Add card to deck',
            headerStyle: {
                backgroundColor: purple
            }
        })
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        })
    }
});

const Navigation = createAppContainer(MainNavigation);
export default Navigation
