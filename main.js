import { UI } from './UI.js'



const ui = new UI()


//Close Nav Bar 
$('.nav-section').animate({
    left: -$('.nav-content-part').outerWidth()
}, 0)


//Show Default Meals
ui.showRandomFirstMeals(ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)

// ui.showRandomFirstMeals(()=>{
//     ui.getMealId(ui.getMealDetailById)
// })

//NavBar Toggling
ui.toggleNavBar()


//Change HTMLSections 
$('li').on('click', (e) => {

    //Show Categories

    if (e.target.textContent == 'Categories') {
        $('.home-section').addClass('hidden')
        $('.area-section').addClass('hidden')
        $('.ingredients-section').addClass('hidden')
        $('.contact-section').addClass('hidden')
        $('.search-section').addClass('hidden')
        $('.meal-details').addClass('hidden')

        $('.category-section').removeClass('hidden')
        ui.showCategories(() => {
            ui.getAllMealsOfCategory(ui.getMealsByCategoryName, ui.getMealsOfCaregoryHTML, ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)

        })
    }
    //Show Areas 

    else if (e.target.textContent == 'Area') {
        $('.home-section').addClass('hidden')
        $('.category-section').addClass('hidden')
        $('.ingredients-section').addClass('hidden')
        $('.contact-section').addClass('hidden')
        $('.search-section').addClass('hidden')
        $('.meal-details').addClass('hidden')


        $('.area-section').removeClass('hidden')
        ui.showAreas(ui.getAreaMeals,ui.showMealDetails,ui.getMealById,ui.getMealDetailsHTML)
    }

    //Show ingredients
    else if (e.target.textContent == 'Ingredients') {
        $('.home-section').addClass('hidden')
        $('.category-section').addClass('hidden')
        $('.area-section').addClass('hidden')
        $('.contact-section').addClass('hidden')
        $('.search-section').addClass('hidden')
        $('.meal-details').addClass('hidden')


        $('.ingredients-section').removeClass('hidden')
        ui.showIngredients(ui.getIngredientMeals,ui.showMealDetails,ui.getMealById,ui.getMealDetailsHTML)
    }

    //Show Search

    else if (e.target.textContent == 'Search') {
        $('.home-section').addClass('hidden')
        $('.area-section').addClass('hidden')
        $('.ingredients-section').addClass('hidden')
        $('.category-section').addClass('hidden')
        $('.contact-section').addClass('hidden')
        $('.meal-details').addClass('hidden')

        $('.search-section').removeClass('hidden')
    }

    else {
        $('.home-section').addClass('hidden')
        $('.area-section').addClass('hidden')
        $('.ingredients-section').addClass('hidden')
        $('.category-section').addClass('hidden')
        $('.search-section').addClass('hidden')
        $('.meal-details').addClass('hidden')

        $('.contact-section').removeClass('hidden')
    }
})





// ui.getMealsByCategoryName('Beef')
