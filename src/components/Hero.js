import image from "../images/wknd-logo-dk.svg"
import React, { useState } from "react";
import aemHeadlessClient from "../api/aemHeadlessClient";

export default function Hero(props){

    const [hero, setHero] = useState(()=>{

        
        async function fetchData() {
          const persistentQuery = "tenant-a-com/HeroByPath"
          const response = await aemHeadlessClient.runPersistedQuery("tenant-a-com/HeroByPath;fragmentPath="+props.heroPath);
        
          // The GraphQL data is stored on the response's data field
           setHero(response?.data);
          
          
          }
          fetchData();
        }
      );
console.log(hero)

const editorProps = {
    itemID: "urn:aemconnection:" + props?.heroPath + "/jcr:content/data/master",
    itemType: "reference",
    itemfilter: "cf"
};
    return (
    <div class='container' itemscope {...editorProps} >
        <div class="text">
            <h1 class="nb-h1 main-heading">{hero?.heroByPath?.item?.headline}</h1>
            <p class="nb-paragraph main-content">{hero?.heroByPath?.item?.description?.plaintext}</p>
        </div>
        <div class="image">
         <img src={image}/>
      </div>
      
    </div>
    
    
    )
}