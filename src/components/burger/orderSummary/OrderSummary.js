import React from 'react';
import Aux from '../../../hoc/Auxilary';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return 
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>
        </li>
    });

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the followingf ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
        </Aux>
    );
}