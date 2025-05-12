import React from "react"
import "./SolarSystemLoader.css"

const SolarSystemLoader = () => {
    return (
        <div className="loader-container">
        <div className="sun"></div>

        <div className="orbit orbit1">
            <div className="planet planet1"></div>
        </div>
        <div className="orbit orbit2">
            <div className="planet planet2"></div>
        </div>
        <div className="orbit orbit3">
            <div className="planet planet3"></div>
        </div>
        <div className="orbit orbit4">
            <div className="planet planet4"></div>
        </div>
        </div>
    )
}

export default SolarSystemLoader