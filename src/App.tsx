
import './App.css'
import {Ingredient} from "./type";
import meatImage from "./assets/meat.jpg";
import cheeseImage from "./assets/cheese.jpg";
import baconImage from "./assets/bacon.jpg";
import saladImage from "./assets/salad.jpg";
import {useState} from "react";



const App = () => {

    const INGREDIENTS: Ingredient[] = [
        {name: 'Meat', price: 80, image: meatImage},
        {name: 'Cheese', price: 50, image: cheeseImage },
        {name: 'Bacon', price: 60, image: baconImage},
        {name: 'Salad', price: 10, image: saladImage},
    ];

    const [ingredients, setIngredients] = useState([
        { name: 'Meat', count: 0 },
        { name: 'Cheese', count: 0 },
        { name: 'Bacon', count: 0 },
        { name: 'Salad', count: 0 },
    ]);

    const[total, setTotal] = useState<number>(30);

    const AddIngredient = (name: string) => {
        console.log(name)
        let newArrayToState = ingredients.map(ingred => {
            if (ingred.name === name) {
                return {
                    ...ingred,
                    count: ingred.count + 1
                };
            }

            return ingred;
        });


        let totalBurger = INGREDIENTS.reduce((acc, ingred) => {
            newArrayToState.forEach(ingre => {
               if (ingred.name === ingre.name && ingre.count > 0) {
                   acc = acc + ingre.count * ingred.price;
               }
           })
            return acc;
        }, 0)

        setTotal(prevState =>  prevState + totalBurger);
        setIngredients(newArrayToState);
    }


    const deleteIngred = (name: string) => {
        let newArrayToState = ingredients.map(ingred => {
            if (ingred.name === name && ingred.count !== 0) {
                return {
                    ...ingred,
                    count: ingred.count - 1
                };
            }

            return ingred;
        });

        let totalBurger = INGREDIENTS.reduce((acc, ingred) => {
            newArrayToState.forEach(ingre => {
                if (ingred.name === ingre.name && ingre.count > 0) {
                    acc = acc + ingre.count * ingred.price;
                }
            })
            return acc;
        }, 30)

        console.log(totalBurger)


        setTotal(totalBurger);

        setIngredients(newArrayToState);
    };

    const getBurgerInner = () => {
        let inredArray: string[] = [];

        ingredients.forEach(ingred => {
            if (ingred.count > 0) {
                for (let i = 0; i < ingred.count; i++) {
                    inredArray.push(ingred.name);
                }
            }
        })


        return (
            <>
                {inredArray.map(inred => (
                    <div key={inred} className={inred}></div>
                ))}
            </>
        )
    }

    return (
      <>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div>
                  {INGREDIENTS.map(ingredient => (
                      <div key={ingredient.name} >
                          <button style={{display: "flex", alignItems: "center"}} onClick={() => AddIngredient(ingredient.name)} type='button'><img width={50} src={ingredient.image} alt={ingredient.name}/>(price {ingredient.price})</button>
                      </div>
                  ))}
              </div>
              <div>
                  {ingredients.map(ingred => (
                      <div key={ingred.name + ingred}  style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                          <p><strong>{ingred.name}</strong>  x{ingred.count}</p>
                          {ingred.count > 0 ?  <button onClick={() => deleteIngred(ingred.name)}>X</button> : null}
                      </div>
                  ))}
              </div>
          </div>


          <div className="Burger">
              <div className="BreadTop">
                  <div className="Seeds1"></div>
                  <div className="Seeds2"></div>
              </div>

              {getBurgerInner()}
              <div className="BreadBottom"></div>

              <hr/>
              <p>total: <strong>{total} som</strong></p>
          </div>

      </>
  )
};

export default App
