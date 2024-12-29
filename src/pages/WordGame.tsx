import {useState} from "react";
import {Card, ConfigProvider} from "antd";
import SetsList from "../components/SetsList";
import ManageSet from "../components/ManageSet";
import PlayView from "../components/PlayView";
import ResultsView from "../components/ResultsView";
import {WordSet, GameState} from "../constants/types";

const WordGame: React.FC = () => {
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [currentStep, setCurrentStep] = useState<"sets" | "manage" | "play" | "results">("sets");
  const [currentSet, setCurrentSet] = useState<WordSet | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    userGuess: "",
    results: [],
    shuffledWords: []
  });

  const getCardWidth = () => {
    switch (currentStep) {
      case "results":
        return {
          width: "100%",
          maxWidth: "1000px", 
          minHeight: "700px",  
        };
      case "play":
        return {
          width: "100%",
          maxWidth: "650px",
          minHeight: "400px",
        };
      default:
        return {
          width: "100%",
          maxWidth: "800px",
          minHeight: "200px",
        };
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            paddingLG: 24,
            borderRadiusLG: 16,
          },
        },
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", 
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: {
            xs: "10px",
            sm: "20px",
            md: "30px",
            lg: "40px",
          } as any,
        }}
      >
        <Card
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)", 
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)", 
            borderRadius: 16,
            margin: "20px auto",
            transition: "all 0.3s ease",
            ...getCardWidth(),
          }}
          bodyStyle={{
            padding: currentStep === "results" ? "32px" : "24px", 
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "auto", 
              maxHeight: currentStep === "results" ? "80vh" : "auto", 
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
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default WordGame;
