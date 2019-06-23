import React, {Component} from 'react'; 

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary'; 


const INGREDIENDT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    //More modern syntax:  
    state= {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseState(){
        const ingredients ={
            ...this.state.ingredients
        };
        const sum = Object.keys(ingredients)
        .map(igKey=> {
            return ingredients[igKey]
        })
        .reduce((sum, el) =>{
            return sum + el; 
        }, 0);
        this.setState({purchasable: sum > 0});
    }

addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount; 
    const priceAddition = INGREDIENDT_PRICES[type];
    const oldPrice = this.state.totalPrice; 
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState();
}

removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
        return; 
    }
    const updatedCount = oldCount -1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount; 
    const priceDeduction = INGREDIENDT_PRICES[type];
    const oldPrice = this.state.totalPrice; 
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState();
}



    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }; 
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <= 0
            }
        return(
          
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchaseable}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder; 