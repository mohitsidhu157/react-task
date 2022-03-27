import "./App.css";
import { Header } from "./components";
import { GlobalProvider } from "./context";
import Routes from "./routes";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <Routes />
      </div>
    </GlobalProvider>
  );
}

export default App;
