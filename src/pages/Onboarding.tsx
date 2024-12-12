import React, {useState, FC} from "react";
import {Steps, Button, Typography, Space, Row, Col} from "antd";
import {BookOutlined, PlusCircleOutlined, RocketOutlined} from "@ant-design/icons";
import "../styles/onboarding.css";


const {Step} = Steps;
const {Title, Paragraph, Text} = Typography;


interface OnboardingProps {
  onComplete: () => void;
}


const MODERN_PALETTE = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  primaryColor: "#5f27cd",
  secondaryColor: "#10ac84",
  textColor: "#2f3542",
};

const STEPS = [
  {
    title: "Welcome to Edwise",
    description: "Are you excited to embark on a journey to master English vocabulary?",
    icon: <BookOutlined/>,
    details: "Edwise offers a tailored and intelligent learning system that helps you build your English vocabulary effectively and efficiently.",
  },
  {
    title: "Build Your Word Collection",
    description: "Effortlessly compile your personalized word list",
    icon: <PlusCircleOutlined/>,
    details: "Easily add the words you want to learn into the system. Create a custom list that suits your learning needs, and enjoy a seamless vocabulary-building experience.",
  },
  {
    title: "Achieve Your Goals",
    description: "Learn English words in a fun and engaging way",
    icon: <RocketOutlined/>,
    details: "Track your progress, earn points for your achievements, and stay motivated as you improve your vocabulary skills step by step.",
  },
];


const Onboarding: FC<OnboardingProps> = ({onComplete}) => {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => prev + 1);
  const goPrev = () => setCurrent((prev) => prev - 1);
  const finishOnboarding = () => onComplete();

  const currentStep = STEPS[current];

  return (
    <div
      className="onboarding-container"
      style={{
        background: MODERN_PALETTE.background,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Row
        justify="center"
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Col span={24}>
          <Space direction="vertical" size="large" style={{width: "100%", textAlign: "center"}}>
            <div className="step-icon" style={{marginBottom: -15}}>
              {currentStep.icon}
            </div>

            <Title level={2} className="onboarding-title">
              {currentStep.title}
            </Title>

            <Paragraph className="onboarding-paragraph">{currentStep.description}</Paragraph>

            <Text className="onboarding-details">{currentStep.details}</Text>

            <Steps
              current={current}
              size="small"
              direction="horizontal"
              responsive={false}
            >
              {STEPS.map((step, index) => (
                <Step
                  key={index}
                  title={null}
                  icon={
                    <div
                      style={{
                        color: current >= index ? MODERN_PALETTE.primaryColor : "#bdc3c7",
                      }}
                    >
                      {step.icon}
                    </div>
                  }
                />
              ))}
            </Steps>


            <div style={{display: "flex", justifyContent: "center", gap: 20}}>
              {current > 0 && (
                <Button
                  ghost
                  onClick={goPrev}
                  style={{
                    borderColor: MODERN_PALETTE.primaryColor,
                    color: MODERN_PALETTE.primaryColor,
                    padding: "0 30px",
                    height: "45px",
                  }}
                >
                  Back
                </Button>
              )}

              {current < STEPS.length - 1 ? (
                <Button
                  type="primary"
                  onClick={goNext}
                  style={{
                    background: MODERN_PALETTE.primaryColor,
                    borderColor: MODERN_PALETTE.primaryColor,
                    padding: "0 30px",
                    height: "45px",
                  }}
                >
                  Next
                </Button>
              ) : (
                 <Button
                   type="primary"
                   onClick={finishOnboarding}
                   style={{
                     background: MODERN_PALETTE.primaryColor,
                     borderColor: MODERN_PALETTE.primaryColor,
                     padding: "0 30px",
                     height: "45px",
                   }}
                 >
                   Start
                 </Button>
               )}
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Onboarding;
