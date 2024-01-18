import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";
import Loading from "./component/Loading";
import {
  LoadingContextProvider,
  useLoadingContext,
} from "./component/LoadingContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoadingContextProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<DayList />} />
            <Route path="/day/:day" element={<Day />} />
            <Route path="/create_word" element={<CreateWord />} />
            <Route path="/create_day" element={<CreateDay />} />
            <Route path="/*" element={<EmptyPage />} />
          </Routes>
          <LoadingComponent />
        </LoadingContextProvider>
      </div>
    </BrowserRouter>
  );
}

const LoadingComponent = () => {
  const { loading } = useLoadingContext();
  return loading ? <Loading /> : null;
};

export default App;
