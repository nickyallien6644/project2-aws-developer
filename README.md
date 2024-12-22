# project2-aws-developer
## Set up node environment

### You'll need to create a new node server. Open a new terminal within the project directory and run:

#### run the development server with `npm run dev`

#### Create a new endpoint in the server.ts file
#### The starter code has a task for you to complete an endpoint in `./src/server.js` which uses query parameter to download an image from a public URL, filter the image, and return the result.

### Deploying your system
#### Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

## Test to request
## Request to `https://my-eb-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg`