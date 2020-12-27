import path from 'path';


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

export async function createPages(params) {
    // create pages dynamically
    // 1. pizzas
    await turnPizzasIntoPages(params);
    //2. toppings
    //3. slicemasters

}