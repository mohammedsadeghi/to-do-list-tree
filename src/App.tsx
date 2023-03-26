import React from "react";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/mainPage";
function App() {
  return (
    <>
      <RecoilRoot>
        <MainPage />
      </RecoilRoot>
    </>
  );
}

export default App;
