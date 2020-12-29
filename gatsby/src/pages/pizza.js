import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzaPage({ data, pageContext }) {
    const pizzas = data.pizzas.nodes;
    return (
        <>
          <ToppingsFilter activeTopping={pageContext.topping}/>
          <PizzaList pizzas={pizzas}/>
        </>
    )
}

// graphQl playground ///
// query {
//     allSanityPizza(filter: {  // filter the pizzas to look for the elem in array and return
//       toppings: {             // name of pizzas with all toppings, not only the filtered ones
//         elemMatch: {
//           name: {
//             regex: "/pep/i"
//           }
//         }
//       }
//     }) {
//       nodes {
//         name
//         toppings {
//           name
//         }
//       }
//     }
//   }

export const query = graphql`
    query PizzaQuery($topping: [String]) {
        pizzas: allSanityPizza(filter: {
            toppings: {
                elemMatch: {
                    name: {
                        in: $topping
                    }
                }
            }
        }

        ) {
            nodes {
                name
                id
                price
                slug {
                  current
                }
                toppings {
                  id
                  name
                }
                image {
                    asset {
                        fixed(width: 200, height: 200) {
                            ...GatsbySanityImageFixed
                        }
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
