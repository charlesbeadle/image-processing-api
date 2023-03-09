## Image Processing API

Udacity Full Stack JavaScript Developer Nanodegree Program

Project 1

This is an image resizing application. It works by accepting a GET request that
includes parameters for image name and size. The application then generates and
responds with a resized image.

## Installation

`npm install`

## Usage

By default, the port is set to 3000. The application accepts an env file that
you can use to set a different port. Please see .env.example

Build and start the application: `npm run start`

The application is expecting a GET request to be made to /api/image

Two query parameters are required. They are _name_ and _size_

The available image names are:

- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

The size may be expressed as a number.

Example: http://localhost:3000/api/image?name=santamonica&size=300

When the application starts, that example URL will be logged to the console.

## Additional Scripts

### Tests

`npm run test`

### Build

`npm run build`

### Dev

`npm run dev`

### Format

`npm run prettier`

### Lint

`npm run lint`
