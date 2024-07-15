import { APIs } from "./APIs.js";

export class UI extends APIs {

    constructor() {

        super()
    }

    toggleNavBar() {

        let isClose = true

        $('.icon').on('click', () => {
            if (isClose) {
                $('.nav-section').animate({
                    left: 0
                }, 300, () => {

                    $('ul').children().first().animate({
                        top: 0,
                        opacity: 1
                    }, 120, () => {
                        $('ul').children().first().next().animate({

                            top: 0,
                            opacity: 1
                        }, 120, () => {
                            $('ul').children().first().next().next().animate({
                                top: 0,
                                opacity: 1
                            }, 120, () => {
                                $('ul').children().first().next().next().next().animate({
                                    top: 0,
                                    opacity: 1
                                }, 120, () => {
                                    $('ul').children().first().next().next().next().next().animate({
                                        top: 0,
                                        opacity: 1
                                    }, 120)
                                })
                            })
                        })
                    })


                })
                $('#openIcon').toggleClass('hidden')
                $('#closeIcon').toggle('hidden')
                isClose = false
            }
            else {

                $('.nav-section').animate({
                    left: -$('.nav-content-part').outerWidth(true)
                }, 300, () => {

                    $('ul').children().first().animate({
                        top: '100%',
                        opacity: 0
                    }, 0, () => {
                        $('ul').children().first().next().animate({

                            top: '100%',
                            opacity: 0
                        }, 0, () => {
                            $('ul').children().first().next().next().animate({
                                top: '100%',
                                opacity: 0
                            }, 0, () => {
                                $('ul').children().first().next().next().next().animate({
                                    top: '100%',
                                    opacity: 0
                                }, 0, () => {
                                    $('ul').children().first().next().next().next().next().animate({
                                        top: '100%',
                                        opacity: 0
                                    }, 0)
                                })
                            })
                        })
                    })


                })





                $('#closeIcon').toggle('hidden', () => {
                    $('#openIcon').toggleClass('hidden')

                })
                isClose = true
            }

        })




    }


    getMealsHTML(meal) {


        return `<div class="card-container md:w-3/12 sm:min-w-12 p-3 shrink-0 cursor-pointer">
            <div id='${meal.idMeal}'  class="card w-full  rounded-xl overflow-hidden relative group hover:cursor-pointer">
              <img src="${meal.strMealThumb}" class="w-full" alt="">
              <div
                class="head w-full h-full absolute left-0 top-[100%] bg-white bg-opacity-80 flex items-center ps-3 text-4xl group-hover:top-0  transition-all duration-500">
                ${meal.strMeal}</div>
            </div>
             </div>`


    }


    async showMealsByLetter(Letter, querySelector, callback, callback2, callback3) {
        $('.loading-page').fadeIn(50)

        const data = await this.getMealsByLetter(Letter)

        const html = data.meals.map((e) => {
            return this.getMealsHTML(e)
        })

        document.querySelector(querySelector).innerHTML = html.join('')

        await callback(callback2, callback3)
        $('.loading-page').fadeOut(50)

    }


    async showMealsByName(mealName, querySelector, callback, callback2, callback3) {

        $('.loading-page').fadeIn(50)

        const data = await this.getMealsByName(mealName)

        const html = data.meals.map((e) => {
            return this.getMealsHTML(e)
        })

        document.querySelector(querySelector).innerHTML = html.join('')

        await callback(callback2, callback3)
        $('.loading-page').fadeOut(50)

    }



    getCategoriesHTML(meal) {
        return `        <div class="card-container md:w-3/12 sm:min-w-12 p-3 shrink-0 ">
          <div class="card w-full  rounded-xl overflow-hidden relative group hover:cursor-pointer">
            <img src="${meal.strCategoryThumb}" class="w-full h-full" alt="">
            <div
              class="content w-full h-full absolute left-0 top-[100%] bg-white bg-opacity-80 flex flex-col  p-3 text-center  group-hover:top-0  transition-all duration-500">
              <h3 class="head text-3xl font-semibold mb-3">${meal.strCategory}</h3>
              <p class='line-clamp-4'>${meal.strCategoryDescription}</p>
            </div>
          </div>
        </div>
`
    }


    async showCategories(callback, callback2, callback3) {
        $('.loading-page').fadeIn(50)
        const data = await this.getAllCategories()

        const html = data.categories.map((e) => {
            return this.getCategoriesHTML(e)
        })

        // console.log(html);
        document.querySelector('.category-content').innerHTML = html.join('')
        callback(callback2, callback3)
        $('.loading-page').fadeOut(50)


    }

    getAllMealsOfCategory(callback, callback2, callback3, callback4, callback5) {

        $('.card').on('click', async (e) => {
            $('.loading-page').fadeIn(50)
            const data = await callback($(e.target).closest('.card').find('h3').text())
            await callback2(data.meals, callback3, callback4, callback5);
            $('.loading-page').fadeOut(50)
        })

    }

    getMealsOfCaregoryHTML(data, callback, callback2, callback3) {

        const ui = new UI()
        let mealsOfCategoryHTML = [];

        for (let i = 0; i < data.length; i++) {


            mealsOfCategoryHTML.push(ui.getMealsHTML(data[i]))
        }

        $('.category-section').toggleClass('hidden')

        $('.home-section').toggleClass('hidden')

        $('.home-content').html(mealsOfCategoryHTML.join(''))

        callback(callback2, callback3)


    }




    showMealDetails(callback, callback2) {


        $('.card').on('click', async (e) => {
            $('.loading-page').fadeIn(300)
            const data = await callback($(e.target).closest('.card').attr('id'));
            await callback2(data)
            $('.loading-page').fadeOut(300)
        })

    }


    async getMealDetailsHTML(data) {

        const meal = await data.meals[0]
        let tags = []
        if (await meal[`strTags`] === null) {

        }
        else if (await meal[`strTags`].includes(',')) {

            tags = await meal[`strTags`].split(',')

        }
        else {
            tags.push(await meal[`strTags`])
        }
        let tagsHTML = []
        let recipesHTML = []
        for (let i = 0; i < 20; i++) {

            if (meal[`strMeasure${i}`] === null || meal[`strMeasure${i}`] === ' ' || meal[`strMeasure${i}`] === undefined || meal[`strMeasure${i}`] === '') {

            }
            else {
                recipesHTML.push(`<div class="recipe bg-blue-300 text-black p-1 rounded-lg overflow-hidden me-[16px] mt-[16px]">` + meal[`strMeasure${i}`] + ' ' + meal[`strIngredient${i}`] + `</div>`);

            }
            // console.log(meal[`strMeasure${i}`] + meal[`strIngredient${i}`]);
        }

        for (let i = 0; i < tags.length; i++) {

            tagsHTML.push(`<div class="tag bg-red-200 text-red-700 p-1 py-2 rounded-lg overflow-hidden me-[16px] mt-[16px]">${tags[i]}</div>`)



        }



        $('.meal-details').removeClass('hidden')
        $('.home-section').addClass('hidden')
        $('.area-section').addClass('hidden')
        $('.ingredients-section').addClass('hidden')
        $('.contact-section').addClass('hidden')
        $('.search-section').addClass('hidden')
        $('.category-section').addClass('hidden')


        $('.details-content').html(`
                    <div class="meal-img w-4/12 p-4">
          <img src="${meal.strMealThumb}" class="w-full rounded-xl overflow-hidden" alt="">
          <h2 class="text-3xl font-semibold text-white">${meal.strMeal}</h2>

        </div>


        <div class="meal-content w-8/12 p-4">

          <h2 class="text-3xl font-semibold text-white">Instructions</h2>
          <p class="text-white mt-3">${meal.strInstructions}</p>
          <h3 class="text-white text-3xl font-semibold mt-3"><span>Area :</span><span class="area"> ${meal.strArea}</span></h3>
          <h3 class="text-white text-3xl font-semibold mt-3"><span>Category :</span><span class="caegory"> ${meal.strCategory}</span>
          </h3>
          <h3 class="text-white text-3xl font-semibold mt-3"><span>Recipes :</span></h3>
          <div class="recipes flex flex-shrink-0 flex-wrap justify-start items-center mt-3   ">
          ${recipesHTML.join('')}
          </div>


          <h3 class="text-white text-3xl font-semibold mt-3"><span>Tags :</span></h3>


          <div class="tags flex flex-shrink-0 flex-wrap justify-start items-center mt-1   ">
${tagsHTML.join()}
          </div>



          <div class="buttons mt-5">
            <button
              class="text-white bg-green-600 px-3 py-2 rounded-lg hover:bg-green-700 transition-all duration-500"><a
                href="${meal.strSource}" target="_blank">Source</a></button>
            <button class="text-white bg-red-600 px-3 py-2 rounded-lg hover:bg-red-700 transition-all duration-500"><a
                href="${meal.strYoutube}"target="_blank">Youtube</a></button>

          </div>
        </div>

            `)

    }











    getAreasHTML(meal) {

        return `        
        <div class="card-container md:w-3/12 sm:min-w-12 p-3 shrink-0 ">

          <div class="card w-full  rounded-xl overflow-hidden relative group text-center text-white hover:cursor-pointer">

            <i class="fa-solid fa-house-laptop  text-6xl "></i>
            <h3 class=" text-2xl font-semibold">${meal.strArea}</h3>

          </div>

        </div>`
    }


    async showAreas(callback, callback1, callback2, callback3) {
        $('.loading-page').fadeIn(50)
        const data = await this.getAreas()

        const html = data.meals.map((e) => {
            return this.getAreasHTML(e)
        })

        // console.log(html);
        document.querySelector('.area-content').innerHTML = html.join('')

        callback(callback1, callback2, callback3)
        $('.loading-page').fadeOut(50)
    }


    getAreaMeals(callback, callback1, callback2) {
        const ui = new UI()

        $('.card').on('click', async (e) => {

            $('.loading-page').fadeIn(50)

            const data = await ui.getMealsByArea($(e.target).closest('.card').find('h3').text())

            let mealsOfAreaHTML = [];

            for (let i = 0; i < data.meals.length; i++) {


                mealsOfAreaHTML.push(ui.getMealsHTML(data.meals[i]))
            }

            console.log(mealsOfAreaHTML);

            $('.area-section').toggleClass('hidden')

            $('.home-section').toggleClass('hidden')

            $('.home-content').html(mealsOfAreaHTML.join(''))

            await callback(callback1, callback2)
            $('.loading-page').fadeOut(50)
            
        })




    }








    getIngredientsHTML(meal) {

        return `        
               <div class="card-container md:w-3/12 sm:min-w-12 p-3 shrink-0 ">

          <div class="card w-full  rounded-xl overflow-hidden relative group text-center text-white hover:cursor-pointer">

            <i class="fa-solid fa-drumstick-bite  text-6xl "></i>
            <h3 class=" text-2xl font-semibold mb-2">${meal.strIngredient}</h3>
            <p class='line-clamp-3'>${meal.strDescription}</p>

          </div>

        </div>`
    }

    async showIngredients(callback, callback1, callback2, callback3) {
        $('.loading-page').fadeIn(50)
        const data = await this.getIngredients()

        const html = data.meals.map((e) => {
            return this.getIngredientsHTML(e)
        })


        document.querySelector('.ingredients-content').innerHTML = html.slice(0, 20).join('')

        callback(callback1, callback2, callback3)
        $('.loading-page').fadeOut(50)
    }

    getIngredientMeals(callback, callback1, callback2) {
        const ui = new UI()

        $('.card').on('click', async (e) => {
            $('.loading-page').fadeIn(50)

            const data = await ui.getMealsByIngredient($(e.target).closest('.card').find('h3').text())

            let mealsOfIngredientHTML = [];

            for (let i = 0; i < data.meals.length; i++) {


                mealsOfIngredientHTML.push(ui.getMealsHTML(data.meals[i]))
            }


            $('.ingredients-section').toggleClass('hidden')

            $('.home-section').toggleClass('hidden')

            $('.home-content').html(mealsOfIngredientHTML.join(''))

            await callback(callback1, callback2)
            $('.loading-page').fadeOut(50)

        })




    }





}