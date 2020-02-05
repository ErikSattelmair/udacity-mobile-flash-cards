# Mobile Flash Cards

## Introduction

Mobile Flash Cards is the third and final milestone project of Udactiy's React nanodegree program.

The application is about managing decks and flash cards for learning or other purposes.

Following actions can be performed:
- **Add a new deck**
- **Add cards to a new deck**
- **Provide question and answers for each new card**
- **Quiz all cards of a deck**
- **See the number of correct answers after each quiz**

## Run it

### yarn

yarn is very similar to npm and and easy and fast way to get started.

To start the app, navigate to the "/mobile-flashcards" directory via command line interface and execute the following commands. 

```sh
# install all needed packages that are described in package.json
$ yarn install
# start expo-cli via yarn
$ yarn start
# chose a mobile device simulator
$ a (Android), i (iOS)  
```

If everything went well, the simulator will launch the app.

To stop the app, press CTRL + C in the command line.

## What will you get? ##

The project structure looks as follows:
```bash
|── actions
    ├── index.js # actions, regarding the data of the decks in store
├── assets
│   ├── icon.png # flash picture
│   └── splash.png # flash picture
├── components
    ├── AddCard.js # view for adding a new card to a deck
    ├── AddDeck.js # view for adding a new deck
    ├── Dashboard.js # view for displaying all decks
    ├── Deck.js # view for a specific deck
    ├── FlashCardStatusBar.js # phone specific status bar
    ├── Loading.js # loading spinner displayed while app is loading
    ├── Navigation.js # app navigation
    ├── QuizCard.js # view for currently quizzed card 
├── middleware
    ├── index.js # combined logger middleware
    ├── logger.js # logger middleware to log all dispatched store actions
├── reducers
    ├── inex # combined deck reducer 
├── utils
    ├── api.js # AsynchStore calls
    ├── colors.js # colors used in the app 
├── .gitignore # git ignore file
├── App.js # app root
├── app.json # expo descriptor
├── babel.config.js # babel config file
├── package.json # yarn package manager
├── README.md # This file. 
├── yarn.lock # yarn package manager 
```
