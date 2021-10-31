import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const url = process.env.URL;
var database, collection;
const DATABASE_NAME = "Blogs";

//API EndPoints

app.get("/", (req, res) => {
  res.status(200).send("Welcome to testApp");
});

app.post("/addBlog", (request, response) => {
  collection.insertOne(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/getBlogs", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.put("/blog/update/:id", (request, response) => {
  collection.updateOne(
    { "_id": new ObjectId(request.params.id) },
    { $inc: request.body },
    (error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send("Blog Updated");
    }
  );
});

app.delete("/deleteBlog/:id", (request, response) => {
  collection.deleteOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send("Blog Deleted");
  });
});

app.listen(port, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("blogs");
    console.log("Connected to `" + DATABASE_NAME);
  });
});
