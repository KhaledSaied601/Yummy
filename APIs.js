
export class APIs {

    constructor() {
    }


    async getMealsByName(name) {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, {
            method: 'GET'
        })


        const data = await res.json()
        // console.log(data.meals);
        return data

    }


    async getAllCategories() {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`, {
            method: 'GET'
        })


        const data = await res.json()
        return data
    }

    async getAreas() {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`, {
            method: 'GET'
        })


        const data = await res.json()
        return data
    }


    async getIngredients() {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`, {
            method: 'GET'
        })


        const data = await res.json()
        // console.log(data.meals);
        return data
    }



    async getMealById(id) {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
            method: 'GET'
        })


        const data = await res.json()
        // console.log(data);
        return data
    }




    async getMealsByCategoryName(categoryName) {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, {
            method: 'GET'
        })


        const data = await res.json()
        // console.log(data);
        return data
    }



    async getMealsByArea(area) {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`, {
            method: 'GET'
        })


        const data = await res.json()
        // console.log(data);
        return data
    }



    async getMealsByIngredient(ingredient) {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, {
            method: 'GET'
        })


        const data = await res.json()
        // console.log(data);
        return data
    }


    async getMealsByLetter(letter) {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`, {
            method: 'GET'
        })


        const data = await res.json()
        return data

    }


}