import React from "react";
import {
  Card,
  Button,
  List,
  Typography,
  Progress,
  Alert,
  Space,
  Statistic,
  Row,
  Col,
  Divider,
  Tag,
} from "antd";
import {
  TrophyOutlined,
  PlayCircleOutlined,
  RollbackOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FireOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {GameState, WordSet} from "../constants/types";


const {Title, Text, Paragraph} = Typography;


interface ResultsViewProps {
  gameState: GameState;
  setCurrentStep: React.Dispatch<React.SetStateAction<"sets" | "manage" | "play" | "results">>;
  currentSet: WordSet | null;
}


const ResultsView: React.FC<ResultsViewProps> = ({gameState, setCurrentStep, currentSet}) => {
  const correctCount = gameState.results.filter((result) => result.correct).length;
  const totalWords = gameState.results.length;
  const scorePercentage = Math.round((correctCount / totalWords) * 100);

  const getScoreInfo = () => {
    if (scorePercentage > 90) {
      return {
        text: "Excellent! You are a master! 🎉",
        description: "You should be proud of this performance!",
        icon: <TrophyOutlined style={{fontSize: "36px", color: "#52c41a"}}/>,
        color: "#52c41a",
        type: "success",
        tag: "Expert",
      };
    } else if (scorePercentage >= 70) {
      return {
        text: "Good job! Keep improving! 😊",
        description: "With a little more practice, you can get even better!",
        icon: <FireOutlined style={{fontSize: "36px", color: "#faad14"}}/>,
        color: "#faad14",
        type: "warning",
        tag: "Good",
      };
    } else {
      return {
        text: "Don't give up, try again! 💪",
        description: "Every mistake is a new learning opportunity!",
        icon: <LineChartOutlined style={{fontSize: "36px", color: "#ff4d4f"}}/>,
        color: "#ff4d4f",
        type: "error",
        tag: "Improving",
      };
    }
  };

  const scoreInfo = getScoreInfo();

  return (
    <Card>
      <Space direction="vertical" size="large" style={{width: "100%"}}>
        <div style={{textAlign: "center"}}>
          <Space direction="vertical" size="small" style={{marginBottom: 24}}>
            {scoreInfo.icon}
            <Title level={2} style={{margin: "8px 0", color: scoreInfo.color}}>
              {scoreInfo.text}
            </Title>
            <Paragraph type="secondary">{scoreInfo.description}</Paragraph>
          </Space>

          <Alert
            message={
              <Space>
                <span>Level:</span>
                <Tag color={scoreInfo.color}>{scoreInfo.tag}</Tag>
              </Space>
            }
            // @ts-ignore 
            type={scoreInfo.type}
            showIcon
            style={{marginBottom: 24}}
          />
        </div>

        <Row gutter={16} justify="center">
          <Col>
            <Statistic
              title="Total Words"
              value={totalWords}
              prefix={<FireOutlined/>}
            />
          </Col>
          <Col>
            <Statistic
              title="Correct Answers"
              value={correctCount}
              valueStyle={{color: "#3f8600"}}
              prefix={<CheckCircleOutlined/>}
            />
          </Col>
          <Col>
            <Statistic
              title="Wrong Answers"
              value={totalWords - correctCount}
              valueStyle={{color: "#cf1322"}}
              prefix={<CloseCircleOutlined/>}
            />
          </Col>
        </Row>

        <div style={{textAlign: "center", padding: "24px 0"}}>
          <Progress
            type="circle"
            percent={scorePercentage}
            size={160}
            strokeColor={scoreInfo.color}
            format={(percent) => (
              <div style={{color: scoreInfo.color}}>
                <div style={{fontSize: "24px", fontWeight: "bold"}}>{percent}%</div>
                <div style={{fontSize: "14px"}}>Success</div>
              </div>
            )}
          />
        </div>

        <Divider>Results</Divider>

        <List
          dataSource={gameState.results}
          renderItem={(result) => (
            <List.Item
              style={{
                backgroundColor: result.correct ? "#f6ffed" : "#fff1f0",
                padding: "12px 24px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <Row style={{width: "100%"}} justify="space-between" align="middle">
                <Col>
                  <Space>
                    {result.correct ? (
                      <CheckCircleOutlined style={{color: "#52c41a", fontSize: "20px"}}/>
                    ) : (
                       <CloseCircleOutlined style={{color: "#ff4d4f", fontSize: "20px"}}/>
                     )}
                    <div>
                      <Text strong>{result.word.english}</Text>
                      <br/>
                      <Text type="secondary">{result.word.turkish}</Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Tag color={result.correct ? "success" : "error"}>
                    {result.correct ? "Correct" : "Incorrect"}
                  </Tag>
                </Col>
              </Row>
            </List.Item>
          )}
        />

        <div style={{textAlign: "center", marginTop: 24}}>
          <Space size="middle">
            <Button
              icon={<RollbackOutlined/>}
              size="large"
              onClick={() => setCurrentStep("sets")}
            >
              Back to Sets
            </Button>
            <Button
              type="primary"
              icon={<PlayCircleOutlined/>}
              size="large"
              onClick={() => currentSet && setCurrentStep("play")}
            >
              Play Again
            </Button>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default ResultsView;
