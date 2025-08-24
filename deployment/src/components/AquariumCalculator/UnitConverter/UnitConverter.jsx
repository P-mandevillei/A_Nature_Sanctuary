import { useState } from "react"
import AddRules from "./AddRules"
import CalculatorBlock from "./CalculatorBlock"
import useLocalStorage from "../../../hooks/UseLocalStorage";

export default function UnitConverter() {

    const [rules, setRules] = useLocalStorage('unitConversionRules', []);
    
    
    return <div className="pad">
        <AddRules rules={rules} setRules={setRules} />
        {rules.map((cur, index) => <CalculatorBlock key={index} rules={cur} />)}
    </div>
}