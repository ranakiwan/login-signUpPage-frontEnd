import React from 'react';
import Cookies from 'js-cookie'; 

function HomePage() {
    return (
        <div>
            <h1>Welcome {Cookies.get("FirstTime") === "false" ? "back" : ""}, {Cookies.get("FirstName")}</h1>
        </div>
    );
}

export default HomePage;
