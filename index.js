const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51KUJ6DA84OrlRxyQM2niJz60fUMD77nP4Uq64ao8jdBsiZQiP2euOyojw1SLliIO61UrSvf3CLOkU58OKyiq7fOo00vHsI38eD'
var Secret_Key = 'sk_test_51KUJ6DA84OrlRxyQlAo5bfXKDCVRGxzucTMN1K4ScW8OYB1FmcdYXC1irfAyVQNfDGCK0Zq4VJMKTyZZt1wPTyH900RiK6BTbK'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

const PORT = process.env.PORT || 3000

app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Rohan Khullar', 
        address: { 
            line1: '142 Charles St', 
            postal_code: '110092', 
            city: 'Toronto', 
            state: 'Ontario', 
            country: 'Canada', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Orbit 5 complete course', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Payment is Approved") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 

app.listen(port, function(error){ 
    if(error) throw error 
    console.log(`Server created Successfully on ${PORT}` ) 
})