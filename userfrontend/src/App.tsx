import React from "react";
import Deal from "./pages/Deal";
import TabBar from "./layouts/tabBar";

function App() {
  return (
    <div className="App container mx-auto px-0 h-screen overflow-y-auto border-8 border-black relative">
      {/* <Deal /> */}
      <TabBar/>
    </div>
  );
}

export default App;
