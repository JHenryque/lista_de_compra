import "./App.css";
import Header from "./components/Header";
import Home from "./views/Home";
import { TodosProvider } from "./service/TodosContext";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <TodosProvider>
        <Header />
        <Home />
        <Footer />
      </TodosProvider>
    </>
  );
}

export default App;
