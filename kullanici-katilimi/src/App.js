// import logo from './logo.svg';
// import './App.css';
// import Form from './components/Form';


// function App() {
//   return (
//     <div className="App">
//      <h1>Hello World</h1>
//      <hr/>
//      <Form/>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import Form from './components/Form'; // Form.js dosyasını import ediyoruz
import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";


const App = () => {
 
  return (
    <div className="container mx-auto p-10 bg-gray-100">
      
      <h1 className="text-center text-blue-700 font-bold text-3xl">Yeni Kullanıcı Formu</h1>
      <Form /> 
      </div>
  );
};


export default App;
