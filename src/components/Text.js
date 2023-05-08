import image from "../images/wknd-logo-dk.svg"
import React, { useState } from "react";
import aemHeadlessClient from "../api/aemHeadlessClient";

export default function Text(props){
    const [text, setText] = useState(()=>{

        
        async function fetchData() {
          const persistentQuery = "tenant-a-com/TextByPath";
         
          const response = await aemHeadlessClient.runPersistedQuery("tenant-a-com/TextByPath;fragmentPath="+props.textPath);
        
          // The GraphQL data is stored on the response's data field
           setText(response?.data);
          
          
          }
          fetchData();
          
        }
        
      );
      console.log(text)

      const editorProps = {
        itemID: "urn:aemconnection:" + props?.textPath + "/jcr:content/data/master",
        itemType: "reference",
        itemfilter: "cf"
    };
    return (<div itemScope {...editorProps}><h1 itemProp="text" itemType="text"><hr />{text?.textByPath?.item?.text}</h1></div>)
}