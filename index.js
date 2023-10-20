const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4100;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@mursalin.bxh3q56.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async(req, res) => {
  res.send("server successfully placed in local server. My sub category data will comming soon...");
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db('carWorldFleet');
    const carsCollection = database.collection('carsCollectin');
    const brandsCollection = database.collection('carBrands');
    const bannerCollection = database.collection('brandBanners');
    const cartsCollection = database.collection('cartsCollection');
    const testimonialCollection = database.collection('testimonialCollection');

    // get brands 
    app.get('/brands', async(req, res) => {
      const getBrands = brandsCollection.find();
      const getBrandsResult = await getBrands.toArray();
      res.send(getBrandsResult);
    })

    // brands add
    app.post('/brands', async(req, res) => {
       const getBrand = req.body;
       const addBrandsResult = await brandsCollection.insertOne(getBrand);
       res.send(addBrandsResult);
       console.log(getBrand);
       console.log('someone hitting on brands btn');
    })

  // add products
  app.post('/cars', async(req, res) => {
     const getCar = req.body;
     const addCardResult = await carsCollection.insertOne(getCar);
     res.send(addCardResult);
     console.log(getCar);
     console.log('Some on hitting add products btn');
  })

  // show cars
  app.get('/brandsCar', async(req, res) => {
    const getCars = carsCollection.find();
    const getCarsResult = await getCars.toArray();
    res.send(getCarsResult);
  })

  // filter data by brand name
  app.get('/brandsCar/:brand', async(req, res) => {
      const paramsBrand = req.params.brand;
      const getParamsItem = {brand: paramsBrand};
      const getFilterCars = carsCollection.find(getParamsItem);
      const getFilterCarsResut = await getFilterCars.toArray();
      res.send(getFilterCarsResut);
      console.log(paramsBrand);
      console.log('Some on hitting to see specific brands cars');

  })

  // find a car data by car id
  app.get('/brandsCar/:brand/:id', async(req, res) => {
    const carBrand = req.params.brand;
    const paramsId = req.params.id;
    const findParamsItem = {_id: new ObjectId(paramsId)};
    const findFilterCarsResut = await carsCollection.findOne(findParamsItem);
    res.send(findFilterCarsResut);
    console.log(carBrand);
    console.log(paramsId);
    console.log('Some on hitting to see single car details');

})

  // get all cars 
  app.get('/cars', async(req, res) => {
    const getCars = carsCollection.find();
    const getCarsResult = await getCars.toArray();
    res.send(getCarsResult);
  })

  // find a car for update details data by car id
  app.get('/cars/:carsId', async(req, res) => {
    const carId = req.params.carsId;
    const findCarItem = {_id: new ObjectId(carId)};
    const findCarResut = await carsCollection.findOne(findCarItem);
    res.send(findCarResut);
    console.log('Some on hitting for update a product');
   })
  
  // update product 
  app.put('/cars/:carsId', async(req, res) => {
    const updateId = req.params.carsId;
    const updateData = req.body;
    const updateCarItem = {_id: new ObjectId(updateId)};
    const options = { upsert : true };
    const updateDoc = {
      $set : updateData,
    }
    const updateCarResut = await carsCollection.updateOne(updateCarItem, updateDoc, options);
    res.send(updateCarResut);
    console.log('Some on hitting for update a product');
   })

   //add banners 
   app.post('/banners', async(req, res) => {
    const getBanner = req.body;
    const addBannerResult = await bannerCollection.insertOne(getBanner);
    res.send(addBannerResult);
    console.log(getBanner);
    console.log('Some on hitting for submit a banner');
   })

    // get banners
    app.get('/banners', async(req, res) => {
      const getBanners = bannerCollection.find();
      const getBannersResult = await getBanners.toArray();
      res.send(getBannersResult);
    })
    
    // filter banners
    app.get('/banners/:brands', async(req, res) => {
      const brandsParams = req.params.brands;
      const filterBanners = {brandName:brandsParams}
      const getBanners = bannerCollection.find(filterBanners);
      const getBannersResult = await getBanners.toArray();
      res.send(getBannersResult);
      console.log('some on searchng banner filter')
    })

  // add cart post system
    // get carts
    app.get('/carts', async(req, res) => {
      const getcarts = cartsCollection.find();
      const getcartsResult = await getcarts.toArray();
      res.send(getcartsResult);
    })
    // get specific user carts
    app.get('/carts/:userId', async(req, res) => {
      const cartsFindId = req.params.userId;
      const cartsFindQuery = {userId:cartsFindId};
      const getcarts = cartsCollection.find(cartsFindQuery);
      const getcartsResult = await getcarts.toArray();
      res.send(getcartsResult);
    })

  // post cart
    app.post('/carts', async(req, res) => {
    const getCart = req.body;
    const addCartsResult = await cartsCollection.insertOne(getCart);
    res.send(addCartsResult);
    console.log(getCart);
    console.log('someone hitting for add to carts btn');
  })

  //delete a cart
  app.delete('/carts/:deleteId', async(req, res) => {
    const dleteId = req.params.deleteId;
    const findDeleteItem = {_id:dleteId};
    const deleteResult = await cartsCollection.deleteOne(findDeleteItem);
    res.send(deleteResult);
    console.log(dleteId);
    console.log('Some one hitting for delete cart');
  })

  // server code for testimonials

    // get testmonials 
    app.get('/testimonials', async(req, res) => {
      const gettestimon = testimonialCollection.find();
      const gettestmonilssResult = await gettestimon.toArray();
      res.send(gettestmonilssResult);
    })
    // post testimonial
    app.post('/testimonials', async(req, res) => {
      const getTest = req.body;
      const addTestResult = await testimonialCollection.insertOne(getTest);
      res.send(addTestResult);
      console.log(getTest);
      console.log('someone hitting for add a review');
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`The current port: ${port} is running now!`);
})













