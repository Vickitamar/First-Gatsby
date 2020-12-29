import path from 'path';
import fetch from 'isomorphic-fetch';


async function turnPizzasIntoPages({ graphql, actions}) {
    // 1. get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current
            }

        });
    });


} 

async function turnToppingsIntoPages({ graphql, actions }) {
    // 1. get the template
    const toppingTemplate = path.resolve('./src/pages/pizza.js');
    // 2. query all the toppings
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                  name
                  id
                }
            }
        }
    `);
    // 3. createPAge for that topping
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
            }

        });
    });
    // 4. Pass topping data to pizza,js

}

async function fetchBeerAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
        // 1. fetch a list of beers
        const res = await fetch('https://sampleapis.com/beers/api/ale');
        const beers = await res.json();
        // 2. loop over each one
        for (const beer of beers) {
            // create a node for each beer
            const nodeMeta = {
                id: createNodeId(`beer-${beer.name}`),
                parent: null,
                children: [],
                internal: {
                    type: 'Beer',
                    mediaType: 'application/json',
                    contentDigest: createContentDigest(beer),
                }
            };
            // 3. create a node for that beer
            actions.createNode({
                ...beer,
                ...nodeMeta,
            })
        }

}

export async function sourceNodes(params) {
    // fetch a olist of beers and source them into our gatsby api
    await Promise.all([
        fetchBeerAndTurnIntoNodes(params)
    ]);
}

export async function createPages(params) {
    // create pages dynamically
    // 1. wait for all promises to be resolved before finishing this function
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
    ])
    //2. toppings
    //3. slicemasters

}

