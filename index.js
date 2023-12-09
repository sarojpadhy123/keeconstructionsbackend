const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const BASE_URL= process.env.BASE_URL

//Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('KEE Construction!')
})

// Mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://psarojkumar9:EKffn4E0JscfsC3U@constructioncluster.6qyblyv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend//my-project/src/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Renaming the file
  },
});
const upload = multer({ storage: storage });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Creating Collections Private
    const privateProjectCollection =client.db("construction").collection("privateproject");
    const govtProjectCollection =client.db("construction").collection("govtproject");
    const RealEstateProjectCollection = client.db("construction").collection("realestateproject");
    const PhotosCollection = client.db("construction").collection("photos");
    const VideosCollection = client.db("construction").collection("videos");

   // Insert a Private project to the db along with image upload
app.post("/upload-private-project", upload.single('image'), async (req, res) => {
  try {
    const { projecttitle, category, imagedesc, place } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    // Add the imageUrl to the project data before inserting it into the database
    const projectData = {
      projecttitle,
      category,
      imagedesc,
      place,
      image: imageUrl, // Save the image URL in the database
    };

    const result = await privateProjectCollection.insertOne(projectData);
    res.status(200).json({ message: 'Project uploaded successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Insert a  Govt Project into the Db

app.post("/upload-govt-project",async(req, res, next) => {
  const data = req.body;
  const result = await govtProjectCollection.insertOne(data);
  res.send(result);
})


// Insert a  RealEstate Project into the Db

app.post("/upload-realestate-project",async(req, res, next) => {
  const data = req.body;
  const result = await RealEstateProjectCollection.insertOne(data);
  res.send(result);
})
// Insert a  Photo  into the Db
// app.post("/upload-photos", async(req,res) => {


// })

// app.post("/upload-photos",async(req, res, next) => {
//   const data = req.body;
//   const result = await PhotosCollection.insertOne(data);
//   res.send(result);
// })



// Insert a  video  into the Db

app.post("/upload-video",async(req, res, next) => {
  const data = req.body;
  const result = await VideosCollection.insertOne(data);
  res.send(result);
})




    //get all Private Projects
    app.get("/all-private-projects",async(req, res, next) =>{
        const projects = await privateProjectCollection.find();
        const result = await projects.toArray();
        res.send(result);
    })

    // Get All Govt Project
    
    app.get("/all-govt-projects",async(req, res, next) =>{
      const projects = await govtProjectCollection.find();
      const result = await projects.toArray();
      res.send(result);
  })

    // Get All Realestate Project
    
    app.get("/all-realestate-projects",async(req, res, next) =>{
      const projects = await RealEstateProjectCollection.find();
      const result = await projects.toArray();
      res.send(result);
  })
    // Get All Photos
    
    app.get("/all-photos",async(req, res, next) =>{
      const projects = await PhotosCollection.find();
      const result = await projects.toArray();
      res.send(result);
  })
    // Get All Videos
    
    app.get("/all-videos",async(req, res, next) =>{
      const projects = await VideosCollection.find();
      const result = await projects.toArray();
      res.send(result);
  })


    //Update a Private Project 
    app.patch("/projects-edit-private/:id",async(req, res, next) =>{
        const id =req.params.id;
        const updateProjectData = req.body;
        const filter = {_id:new ObjectId(id)};
        const options = {upsert:true};

        const updateDoc = {
            $set: {
                ...updateProjectData
            }
        }
        //update 
        const result = await privateProjectCollection.updateOne(filter,updateDoc,options);
        res.send(result);
    })

    // Update a Government Project
    app.patch("/projects-edit-govt/:id",async(req, res, next) =>{
      const id =req.params.id;
      const updateProjectData = req.body;
      const filter = {_id:new ObjectId(id)};
      const options = {upsert:true};

      const updateDoc = {
          $set: {
              ...updateProjectData
          }
      }
      //update 
      const result = await govtProjectCollection.updateOne(filter,updateDoc,options);
      res.send(result);
  })

    // Update a Realestate Project
    app.patch("/projects-edit-realestate/:id",async(req, res, next) =>{
      const id =req.params.id;
      const updateProjectData = req.body;
      const filter = {_id:new ObjectId(id)};
      const options = {upsert:true};

      const updateDoc = {
          $set: {
              ...updateProjectData
          }
      }
      //update 
      const result = await RealEstateProjectCollection.updateOne(filter,updateDoc,options);
      res.send(result);
  })

    // Update Photos
    app.patch("/photos-edit/:id",async(req, res, next) =>{
      const id =req.params.id;
      const updateProjectData = req.body;
      const filter = {_id:new ObjectId(id)};
      const options = {upsert:true};

      const updateDoc = {
          $set: {
              ...updateProjectData
          }
      }
      //update 
      const result = await PhotosCollection.updateOne(filter,updateDoc,options);
      res.send(result);
  })


    // Update Videos
    app.patch("/videos-edit/:id",async(req, res, next) =>{
      const id =req.params.id;
      const updateProjectData = req.body;
      const filter = {_id:new ObjectId(id)};
      const options = {upsert:true};

      const updateDoc = {
          $set: {
              ...updateProjectData
          }
      }
      //update 
      const result = await VideosCollection.updateOne(filter,updateDoc,options);
      res.send(result);
  })



    // Delete Private Project

    app.delete("/projects-del-private/:id",async(req, res, next) => {
        const id =req.params.id;
        const filter = {_id:new ObjectId(id)};
        const result =await privateProjectCollection.deleteOne(filter);
        res.send(result);
    })

    // Delete Govt Project
    app.delete("/projects-del-govt/:id",async(req, res, next) => {
      const id =req.params.id;
      const filter = {_id:new ObjectId(id)};
      const result =await govtProjectCollection.deleteOne(filter);
      res.send(result);
  })

    // Delete Realestate Project
    app.delete("/projects-del-realestate/:id",async(req, res, next) => {
      const id =req.params.id;
      const filter = {_id:new ObjectId(id)};
      const result =await RealEstateProjectCollection.deleteOne(filter);
      res.send(result);
  })

    // Delete  Photos
    app.delete("/photos-del/:id",async(req, res, next) => {
      const id =req.params.id;
      const filter = {_id:new ObjectId(id)};
      const result =await PhotosCollection.deleteOne(filter);
      res.send(result);
  })
    // Delete  Videos
    app.delete("/videos-del/:id",async(req, res, next) => {
      const id =req.params.id;
      const filter = {_id:new ObjectId(id)};
      const result =await VideosCollection.deleteOne(filter);
      res.send(result);
  })



         // get a single Private Project data
         app.get("/projects-private/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await privateProjectCollection.findOne(filter);
            res.send(result)
        })

         // get a single Government Project data
         app.get("/projects-govt/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await govtProjectCollection.findOne(filter);
            res.send(result)
        })

         // get a single Realestate Project data
         app.get("/projects-realestate/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await RealEstateProjectCollection.findOne(filter);
            res.send(result)
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
  console.log(`Example app listening on port ${port}`)
})