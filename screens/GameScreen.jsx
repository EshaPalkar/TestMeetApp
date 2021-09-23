import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
const names = Object.keys(nameToPic);


export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  
  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);
  const [timerOn, setTimerOn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [choice, setChoice] = useState("");
  const [score, setScore] = useState(0);

  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left
      // TODO: update appropriate state variables
      if(!timerOn) {
        getNextRound();
      }
      setTimerOn(true);
      setTimeLeft(timeLeft-10);
      
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setTimerOn(false);
      setTimeLeft(0);
      getNextRound();
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.
    setUserInfo(nameToPic[correct]);
    setChoice(nameOptions);

    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    if(choice[index] == userInfo[0]) {
      setScore(score + 1);
    }
    setTimeLeft(0);
  };

  useEffect(() => {
    /* TODO: Call the countDown() method every 10 milliseconds */
    const interval = setTimeout(() => countDown(), 10);
    return () => clearInterval(interval);
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // TODO: Implement a Button/Pressable type that shows a name choice, and implement the functionality when a user press on it
      // Hint: Most functionality is already taken care of by one of the functions already defined
      <TouchableOpacity
        key={i}
        style={styles.button}
        onPress={() => selectedNameChoice(i)}
      >
        <Text style={styles.buttonText}>{choice[i]}</Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
  return (
    <View>
      {/* TODO: Build out your UI using Text and Image components. */}
      <Image
        source={userInfo[1]}
	style={styles.image}
      />
      <Text style={styles.timerText}>Time: {timeRemainingStr}</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      {/* Hint: What does the nameButtons list above hold? 
          What types of objects is this list storing?
          Try to get a sense of what's going on in the for loop above. */}
      <Text style={styles.heading}>{userInfo[0]}</Text>
      {nameButtons}
    </View>
  );
}
