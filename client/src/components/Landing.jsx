import React from "react";
import { Link } from "react-router-dom";
import './Landing.css';

export default function landingPage(){
    return(
        <div className="landing">
            <h1 className="title">Henry pokedex</h1>
            <Link to ="/home">
                <button>Enter</button>
            </Link>


        </div>
    );
};