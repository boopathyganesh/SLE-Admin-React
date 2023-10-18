import "./styles/globals.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import React, { useState } from 'react';

import { SidebarProvider } from './context/SidebarContext';
import Products from "./pages/Products";


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <SidebarProvider>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <Router>
          <div className="App">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              {/* <Route path="/contact" element={<About />} />
              <Route path="/resume" element={<Resume />} /> */}
              <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
          </div>
        </Router>
      </div>
    </SidebarProvider>
  );
}

export default App;
