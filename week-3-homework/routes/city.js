var express = require('express');
var router = express.Router();
const cityRepo = require('../modules/cityRepository');
const countryRepo = require('../modules/countryRepository');

// In this file we will define all possible routes related with cities
// List of all cities, includes pagination (via the url)
// if you do add to your address /city it will return all cities
// if you add paramenter you can order by one of the columns and also limit your results
router.get('/city', async (req, res) => {
    let orderBy = parseInt(req.query.orderBy);
    let pageSize = parseInt(req.query.pageSize);
     try {
         const result = await cityRepo.getCities(orderBy, pageSize);
         res.render('cities', { "cityList": result , "tableTitle": "List of world cities"});
     } catch(e) {
         res.status(500).json({ "status_code": 500, "status_message": "internal server error", "error":e });
     }
 });

 // This will be used to search for a city (select LIKE)
router.get('/city/search', function (request, response) {
    // we render the city search form
    return response.render('city-search-form');
});

// controller managing the results of the submit of the search form above
router.get('/city/submit-search-form-get', async function (request, response) {
    // because we use this form with a get, we search the parameter in query
    // basically it is coming through the URL 
    // also change from the findCityByName with the sanitize version to try to do your sql injection
    var cityList = await cityRepo.findCityByNameSanitize(request.query.searchString);
    response.render('cities', { "cityList": cityList, "tableTitle": "Filtered cities" });
});

//Get Specific City and display it in a detailed page
router.get('/city/id/:id', async (req, res) => {
    try {
        // we go and find the city
        var city = await cityRepo.findCityById(req.params.id);
        // and we display it in a template called detail
        // if here you were doing res.json(city[0]); you would get the first city in a Json
        res.render('detail', { "city": city[0], "title": "Detail page" });
    } catch (e) {
        // because you have to catch them all
        res.status(404).json({ "status_code": 404, "status_message": "Not found", "error":e });
    }
});

// Delete city, we delete the city passed as parameter.
// You should control if the id exists and tell the users if a city was deleted.
// Optional: use one extra column to mark some cities as non deletable and control here that the city 
// can be deleted.
router.get('/city/delete/:id', async (req, res) => {
    try {
       let rows = await cityRepo.deleteCityByID(req.params.id);
       console.log('Removed ' + rows.affectedRows + ' rows');
       return res.redirect('../../city');
    }  catch(err) {
        throw err;
        res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
    }
});

// this is a get request to get your form with a post request. It will show the form to post your new city
router.get('/city/add-city-post', async (request, response) => {
    var countryCodeList = await countryRepo.getDistinctCountryCodesAndNames();
    // Render add-city-form-with-post.pug page using array 
    return  response.render('add-city-form-with-post', { "selectCountryCodes": countryCodeList });
});

// this is the post route that will be called to create a new city
router.post('/city/submit-add-city-form-with-post', async function (request, response) {
    var data = [request.body.name , request.body.countryCode, request.body.population, request.body.district ];
    var insertedValues = await cityRepo.insertCity(data);
    return response.redirect('/city');
});

// Edit an existing city
// Homework, check that the id exists and is only one, if no cities are found or more than one treat it
router.get('/city/edit/:id', async (req, res) => {
    try {
        var countryCodeList = await countryRepo.getDistinctCountryCodes();
        var city = await cityRepo.findCityById(req.params.id);
         res.render('edit', { "city": city[0], "selectCountryCodes": countryCodeList , "title": "Edit page",  });
    } catch (e) {
        // render not found page or more than one result found
        throw e;
        res.status(404).json({ "status_code": 404, "status_message": "Not found" });
    }
});

// called when the user post the form information (you can even try it with postman)
router.post('/city/submit-edit-form-with-post', async function (request, response) {
    // first we build the data to pass it to the repository 
    let data = [request.body.name, request.body.countryCode,request.body.population, request.body.district,request.body.id ];
    var result = await cityRepo.updateCity(data);
    console.log(result);
    return response.redirect('../city');
});


// shows the utility of a view
// we will always select the cities from Madrid
router.get('/city/madridcities', async (req, res) => {
    try {
        const result = await cityRepo.getMadridCities();
        res.render('madridcities', { "cityList": result, "tableTitle":'List of cities from Madrid region' });
    } catch(e) {
        res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
    }
});

module.exports = router;