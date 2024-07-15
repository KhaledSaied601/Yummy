import { UI } from './UI.js'



const ui = new UI()


//Close Nav Bar 
$('.nav-section').animate({
    left: -$('.nav-content-part').outerWidth()
}, 300)


//Show Default Meals
ui.showMealsByName('', '.home-content', ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)




//NavBar Toggling
ui.toggleNavBar()





//Change HTMLSections 
$('li').on('click', (e) => {


    $('.loading-page').fadeIn(300)
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
        ui.showAreas(ui.getAreaMeals, ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)
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
        ui.showIngredients(ui.getIngredientMeals, ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)
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

    $('.loading-page').fadeOut(300)
})







//Search 
$('#ByName').on('change', () => {

    if ($('#ByName').val() !== '') {
        ui.showMealsByName($('#ByName').val(), '.search-meals-content', ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)

    }
    else {
        $('.search-meals-content').html('')
    }


})
$('#ByFirstLetter').on('input', () => {
    if ($('#ByFirstLetter').val() !== '') {
        ui.showMealsByLetter($('#ByFirstLetter').val(), '.search-meals-content', ui.showMealDetails, ui.getMealById, ui.getMealDetailsHTML)

    }
    else {
        $('.search-meals-content').html('')
    }

})










//Regex

$('#contact-name').on('input', function () {
    if (nameValidation()) {
        $('.nameAlert').addClass('hidden')

    }
    else {
        $('.nameAlert').removeClass('hidden')
    }
})
$('#contact-email').on('input', function () {
    if (emailValidation()) {
        $('.emailAlert').addClass('hidden')
    }
    else {
        $('.emailAlert').removeClass('hidden')
    }
})
$('#contact-phone').on('input', function () {
    if (phoneValidation()) {
        $('.phoneAlert').addClass('hidden')
    }
    else {
        $('.phoneAlert').removeClass('hidden')
    }
})
$('#contact-age').on('input', function () {
    if (ageValidation()) {
        $('.ageAlert').addClass('hidden')
    }
    else {
        $('.ageAlert').removeClass('hidden')
    }
})
$('#contact-password').on('input', function () {
    if (passwordValidation()) {
        $('.passwordAlert').addClass('hidden')
    }
    else {
        $('.passwordAlert').removeClass('hidden')
    }
})
$('#contact-repassword').on('input', function () {
    if (repasswordValidation()) {
        $('.repasswordAlert').addClass('hidden')
    }
    else {
        $('.repasswordAlert').removeClass('hidden')
    }
})

$('form').on('input', () => {
    if (areAllInputsValid()) {
        $('.submit').prop('disabled', false)
    } else {
        $('.submit').prop('disabled', true)
    }
})

function areAllInputsValid() {
    return nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()
}

function nameValidation() {
    return /^[a-zA-Z ]+$/.test($('#contact-name').val())
}

function emailValidation() {
    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/.test($('#contact-email').val())
}

function phoneValidation() {
    return /^(\+|002){0,1}01[0125][0-9]{8}$/.test($('#contact-phone').val())
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|100)$/.test($('#contact-age').val())
}

function passwordValidation() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('#contact-password').val())
}

function repasswordValidation() {
    return $('#contact-password').val() == $('#contact-repassword').val();
}