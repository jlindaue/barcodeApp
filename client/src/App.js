import ScanPage from './pages/ScanPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <LoginPage />
        <RegisterPage />
        <Navbar />
        <ScanPage />
      </RecoilRoot>
    </div>
  );
}

export default App;
