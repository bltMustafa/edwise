import {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
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
    <Router>
      <Layout>
        <Content>
          <Routes>
            <Route
              path="/"
              element={
                !onboardingComplete ? (
                  <Onboarding onComplete={handleOnboardingComplete}/>
                ) : (
                  <Navigate to="/wordgame" replace/>
                )
              }
            />

            <Route path="/wordgame" element={<WordGame/>}/>

            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
