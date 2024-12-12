import React, {useState} from "react";
import {Layout} from "antd";
import Onboarding from "../src/pages/Onboarding";
import WordGame from "../src/pages/WordGame";


const {Content} = Layout;

const App = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  return (
    <Layout>
      <Content>
        {!onboardingComplete ? (
          <Onboarding onComplete={handleOnboardingComplete}/>
        ) : (
           <WordGame/>
         )}
      </Content>
    </Layout>
  );
};

export default App;
