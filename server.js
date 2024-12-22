import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';
import axios from 'axios'


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  app.get( "/filteredimage", async ( req, res ) => {
    try {
      const image_url = req.query.image_url?.toString();

      // Validate the image_url query
      if (!image_url) {
        return res.status(400).send({ message: "URL is required" });
      }
  
      // Fetch the image as a buffer using axios
      const { data: imgBuffer } = await axios.get(image_url, {
        responseType: "arraybuffer",
      });
  
      // Filter the image
      const imagePath = await filterImageFromURL(imgBuffer);
  
      // Send the filtered image as a response
      res.status(200).sendFile(imagePath, (errorMessage) => {
        if (errorMessage) {
          return res.status(400).send({ message: errorMessage });
        }
  
        // Clean up the local files after response is sent
        deleteLocalFiles([imagePath]);
      });
    } catch (error) {
      // Handle errors
      const errorMessage = error.message || "An error occurred";
      return res.status(422).send({ message: errorMessage });
    }    
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
