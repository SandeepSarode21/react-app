/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import logo from "./images/humana-logo.svg";
import Home from "./components/Home";
import AdventureDetail from "./components/AdventureDetail";
import { Link } from "react-router-dom";
import "./App.scss";
//import pq from "../src/api/fetchPQ";
import aemHeadlessClient from "../src/api/aemHeadlessClient";
import Hero from "../src/components/Hero"
import Text from "../src/components/Text"
//import React, { useState } from 'react';



function App() {
  const [data, setData] = useState(()=>{

  
    async function fetchData() {
      const persistentQuery = "tenant-a-com/PageList"
      const response = await aemHeadlessClient.runPersistedQuery("tenant-a-com/PageList");
    
      // The GraphQL data is stored on the response's data field
       setData(response?.data);
      
      
      }
      fetchData();
    }
  );
  

  console.log(data)

  const editorProps = {
    itemID: "urn:aemconnection:" + data?.pageList?.items[0]._path + "/jcr:content/data/master",
    itemType: "reference",
    itemfilter: "cf"
};
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header>
        <Link to={"/"}>
          <img src={logo} className="logo" alt="WKND Logo"/>
        </Link>        
        <hr />
        </header>
    
        <div itemScope {...editorProps}>
        {
          
          data?.pageList?.items[0].components.map(
            (val)=>{
              if(val.__typename==='HeroModel'){
                return <Hero heroPath={val._path}></Hero>
              }
              else{
                console.log(val._path)
                return <Text textPath={val._path}></Text>
              }
            }
           
          )
        }
        </div>
        {/* <Routes>
          <Route path='/adventure/:slug' element={<AdventureDetail />}/>
          <Route path="/" element={<Home/>}/>
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
