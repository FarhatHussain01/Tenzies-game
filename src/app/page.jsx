'use client'
import React, { useEffect, useState } from 'react';
import Dies from '@/app/components/Dies';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"


const Page = () => {

  const allNewDice = () => {
    let newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return newDice;
  };
 
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)

  //`tenzies`, default to false. It
  //represents whether the user has won the game yet or not.


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true)
    const allDiceSameValue = dice.every(die => dice[0].value === die.value) // if everyVlue is equal to first value
    if (allHeld && allDiceSameValue) {
      setTenzies(true)
      console.log("Congratulations You won the Game");
    } else {
      setTenzies(false)
    }

  }, [dice])


  const rollDice = () => {
    if (!tenzies) { // if tenzies is true and game is not over
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      }
      ))
    } else {
      setTenzies(false) // if game is over  and the wins
      setDice(allNewDice()) // again set the dice to start game again 
    }
  }

  // const rollDice = () => {
  //   setDice(prevDice => prevDice.map(die => {
  //     return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
  //   }
  //   ))
  // }

  const holdDice = (id) => {
    setDice(prevDice => prevDice.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }


  const diceElement = dice.map((die) => {
    return <Dies values={die.value} id={die.id} isHeld={die.isHeld} holdDice={holdDice}
    />;
  });

  return (
    <main className='bg-white h-[400px] rounded-md max-w-[800px] p-5 flex flex-col justify-center items-center'>
      {/* if tenzies is true means you won the game confetti is rendered */}
      {tenzies && <Confetti />}
      <h1 className="m-0 text-4xl">Tenzies</h1>
      <p className="font-bold mt-0 text-center ">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className='grid grid-cols-5 gap-6 mb-10 mt-5'>
        {diceElement}
      </div>
      <button onClick={rollDice}
        className="h-[50px] w-[150px] border-none rounded-md bg-blue-600 text-white text-lg font-medium cursor-pointer">
        {tenzies ? "New Game" : "Roll the Dice"}
      </button>
    </main>
  );
};

export default Page;

