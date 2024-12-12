import React from "react";
import {Card, Button, List, Typography, Progress} from "antd";
import {TrophyOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {GameState, WordSet} from "../constants/types";


const {Title, Text} = Typography;


interface ResultsViewProps {
  gameState: GameState;
  setCurrentStep: React.Dispatch<React.SetStateAction<"sets" | "manage" | "play" | "results">>;
  currentSet: WordSet | null;
}


const ResultsView: React.FC<ResultsViewProps> = ({gameState, setCurrentStep, currentSet}) => {
  const correctCount = gameState.results.filter((result) => result.correct).length;
  const totalWords = gameState.results.length;
  const scorePercentage = (correctCount / totalWords) * 100;

  return (
    <Card>
      <div style={{textAlign: "center"}}>
        <Title level={2} style={{color: "#52c41a"}}>
          <TrophyOutlined/> Game Results
        </Title>
        <Progress
          type="circle"
          percent={scorePercentage}
          format={() => `${correctCount}/${totalWords}`}
          status={scorePercentage > 70 ? "success" : "exception"}
          style={{marginBottom: 20}}
        />

        <List
          bordered
          dataSource={gameState.results}
          renderItem={(result) => (
            <List.Item>
              <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <Text>
                  {result.word.english} - {result.word.turkish}
                </Text>
                <Text type={result.correct ? "success" : "danger"}>
                  {result.correct ? "Correct" : "Incorrect"}
                </Text>
              </div>
            </List.Item>
          )}
        />

        <div style={{marginTop: 20}}>
          <Button
            type="default"
            style={{marginRight: 10}}
            onClick={() => {
              setCurrentStep("sets");
            }}
          >
            Back to Sets
          </Button>
          <Button
            type="primary"
            icon={<PlayCircleOutlined/>}
            onClick={() => {
              if (currentSet) {
                setCurrentStep("play");
              }
            }}
          >
            Play Again
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResultsView;
