import React, { useEffect } from "react";
import { Card, Input, Button, Progress, Typography } from "antd";
import { PlayCircleOutlined, BookOutlined, TranslationOutlined } from "@ant-design/icons";
import { WordSet, GameState } from "../constants/types";

const { Title } = Typography;

interface PlayViewProps {
  currentSet: WordSet;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<"sets" | "manage" | "play" | "results">>;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

const PlayView: React.FC<PlayViewProps> = ({ currentSet, gameState, setGameState, setCurrentStep }) => {
  useEffect(() => {
    if (currentSet?.words?.length) {
      const shuffledWords = shuffleArray([...currentSet.words]);
      setGameState((prevState) => ({
        ...prevState,
        currentWordIndex: 0,
        results: [],
        shuffledWords,
      }));
    }
  }, [currentSet, setGameState]);

  if (!gameState.shuffledWords || gameState.shuffledWords.length === 0) {
    return <div>No words available in this set. Please add words to start the game.</div>;
  }

  const currentWord = gameState.shuffledWords[gameState.currentWordIndex];

  const submitGuess = () => {
    const isCorrect = gameState.userGuess.trim().toLowerCase() === currentWord.turkish.toLowerCase();
    const updatedResults = [
      ...gameState.results,
      { word: currentWord, correct: isCorrect },
    ];

    const nextWordIndex = gameState.currentWordIndex + 1;

    if (nextWordIndex >= gameState.shuffledWords.length) {
      setGameState({ ...gameState, results: updatedResults });
      setCurrentStep("results");
    } else {
      setGameState({
        ...gameState,
        currentWordIndex: nextWordIndex,
        userGuess: "",
        results: updatedResults,
      });
    }
  };

  return (
    <Card>
      <div style={{ textAlign: "center" }}>
        <Title level={2} style={{ color: "#1890ff" }}>
          <TranslationOutlined /> Translate the Word
        </Title>
        <Progress
          percent={
            gameState.shuffledWords.length > 0
              ? Math.round(((gameState.currentWordIndex + 1) / gameState.shuffledWords.length) * 100)
              : 0
          }
          status="active"
          style={{ marginBottom: 20 }}
        />

        <Card
          style={{
            width: 300,
            margin: "0 auto",
            marginBottom: 20,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={3} style={{ color: "#1890ff", textAlign: "center" }}>
            {currentWord.english}
          </Title>
        </Card>
        <Input
          size="large"
          placeholder="Type the Turkish translation"
          value={gameState.userGuess}
          onChange={(e) => setGameState({ ...gameState, userGuess: e.target.value })}
          style={{ width: 300, margin: "0 12px 20px" }}
          prefix={<BookOutlined />}
        />
        <Button
          type="primary"
          size="large"
          icon={<PlayCircleOutlined />}
          onClick={submitGuess}
        >
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default PlayView;
