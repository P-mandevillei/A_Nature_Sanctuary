import { useContext, useEffect, useState } from "react"
import WidthContext from "../../contexts/widthContext"
import { Card } from "react-bootstrap";

export default function ArticlePic(props) {

    const screenW = useContext(WidthContext);
    
    return <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} className="center">
        <img 
            src={props?.src} 
            alt={props.alt} 
            className={`articlePic ${props?.className??''}`} 
            style={{ width: (screenW*0.85)>550? 550:(screenW*0.85)}}
        />
        <p className="picExplain"> 
            {props?.children}
        </p>
    </div>
}