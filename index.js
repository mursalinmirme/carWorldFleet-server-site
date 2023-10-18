const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4100;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@mursalin.bxh3q56.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const carsCollection = client.db('carWorldFleet').collection('carsCollectin');
    const brandsCollection = client.db('carBrands').collection('carBrands');

    app.get('/', async(req, res) => {
        res.send("Hi, I am successfully placed in local server. My sub category data will comming soon...");
    })

    // get brands \
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













