import React, {useState} from "react";
import {Card} from "antd";
import SetsList from "../components/SetsList";
import ManageSet from "../components/ManageSet";
import PlayView from "../components/PlayView";
import ResultsView from "../components/ResultsView";


const WordGame: React.FC = () => {
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [currentStep, setCurrentStep] = useState<"sets" | "manage" | "play" | "results">("sets");
  const [currentSet, setCurrentSet] = useState<WordSet | null>(null);
  const [gameState, setGameState] = useState({
    currentWordIndex: 0,
    userGuess: "",
    results: [] as {word: Word; correct: boolean}[],
  });

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: 15,
        }}
      >
        {currentStep === "sets" && (
          <SetsList
            wordSets={wordSets}
            setWordSets={setWordSets}
            setCurrentSet={setCurrentSet}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === "manage" && currentSet && (
          <ManageSet
            currentSet={currentSet}
            wordSets={wordSets}
            setWordSets={setWordSets}
            setCurrentSet={setCurrentSet}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === "play" && currentSet && (
          <PlayView
            currentSet={currentSet}
            gameState={gameState}
            setGameState={setGameState}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === "results" && (
          <ResultsView
            gameState={gameState}
            setCurrentStep={setCurrentStep}
            currentSet={currentSet}
          />
        )}
      </Card>
    </div>
  );
};

export default WordGame;
