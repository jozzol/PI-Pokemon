import React from "react";
import { Link } from "react-router-dom";

export default function landingPage(){
    return(
        <div>
            <h1>Henry pokedex</h1>
            <Link to ="/home">
                <button>Enter</button>
            </Link>


        </div>
    );
};