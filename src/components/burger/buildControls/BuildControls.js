import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './buildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
<div className={classes.BuildControls}>
    <p>Current Price: <string>{props.price.toFixed(2)}</string></p>
    {controls.map(ctrl =>(
        <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    ))}
    <button 
    className={classes.OrderButton}
    disabled={!props.purchasable}>ORDER NOW</button>
</div>

); 

export default buildControls; 