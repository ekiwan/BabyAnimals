# BabyAnimals

BabyAnimals is a simple image service for your app. Upload, process, and fetch images easily using a RESTful API. 

BabyAnimals service can resize, blur, and filter images. The service is built over ImageMagick and express.js for image processing, and Amazon S3 as the image storage platform.

## Features:

* Image Upload
* Fetch an Image
* Image Resize
* Image Transformation:
  * blur
  * bw
  * sepia
  * channel
  * nashville
  * auroral 
  * enhance
  * lomo
  * gotham
  * bw_gradient
  * vintage
* Delete an Image
* S3, for reliable image uploading
* Enivornment Configuration

## Installation

* Fork and clone this repository

* Install dependencies:

```js
npm install
```
* Install Imagemagick CLI tools. If you're on OSX, you can use Homebrew:

```js
brew install imagemagick
```
## Resource URL Patterns


### Image Upload

**Syntax:**

```js
POST /babyanimals/upload?src={{image}}
```

**Definition:**

Uploads the requested image to the configured s3 bucket. The request may be a path or a URL. The response is a JSON with a unique id that can be used to GET and transform the image, as well as access the image in s3 (the id is the s3 key).

**Example Request:**
```js
curl -X POST http://localhost:3000/babyanimals/upload?src=cute/baby/animal.png

or 

curl -X POST http://localhost:3000/babyanimals/upload?src=http://cutebabyanimal.png
```

**Example Response:** 
````js
{"id":"b21f37508f1c"}
````

### Fetch an Image

Syntax:

```js
GET /babyanimals/{{id}}
```

Defintion:

Fetches the requested image from s3.

Example Request:

```js
curl -X GET http://localhost:3000/babyanimals/b21f37508f1c
```

### Image Resize

Syntax:
```js
GET /babyanimals/{{id}}/size?w={{w}}&h={{h}}
```
Definition:

Resizes the image to the dimensions that are specified by the URL query. The accepted dimensions are pixels (not percent). The dimensions default to the original images width and height, so if only one query is provided the default value will be utilized when maintaining the aspect ratio. At least one of width and height are required.

Example Request:

```js
curl -X GET http://localhost:3000/babyanimals/b21f37508f1c/size?w=150&h=200
```


GET /id/:filter {{pic}}
GET /id/info    {data}

## HTTP status code summary

## how to deploy


define these environment vars:
  - AWS_ACCESS_KEY
  - AWS_SECRET_KEY
  - AWS_BUCKET
  - mongoose


built using
------
