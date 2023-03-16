import "./App.css";
import CoinList from "./components/CoinList";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <h2>Digital Coins</h2>
        <CoinList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
