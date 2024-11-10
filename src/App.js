
import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Temanızın ayarlarını buraya ekleyin
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
