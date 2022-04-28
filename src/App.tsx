import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

function App() {
  return (
    <div><section className="todoapp">
      <Header></Header>
      <Content></Content>
    </section>
      <Footer></Footer>
    </div>
  );
}

export default App;
