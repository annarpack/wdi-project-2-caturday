# Everyday is Caturday

## About My App
The App that I created is for cat lovers! I used [The Cat API](http://thecatapi.com/) that sends the user a random cat image.

After the user logs in, the first page shows them a random cat image from the API. The user can save that image to the database as one of their favorite images, or go to the next cat image. On the favorites page, the user will see all the images saved as their favorites.

## Technologies Used
- I used Bcryptjs to encrypt user password authentication.
- I used Express and Axios for the restful routes in my controllers.
- I used The Cat API for my external API.
- I used PG-Promise and SQL to input information into my database.
- I used JavaScript and Ajax calls for my action buttons.
- I used Mustache-Express and HTML to display my pages.
- I used Cat-Facts and Cat-Ascii-Faces for my extra NPM packages.

## User Stories
- As a Developer, I want to plan a detailed timeline so that I can have enough time to debug problems.
- As a Developer, I want to work on user authorization first so that I can style my site at the end.
- As a User, I want to be able to save my favorite cat images so that I can reference them later.
- As a User, I want to be able to see the top 10 cat images that many users like so that I can find the best cat images that make me happy.

## Wireframes
![index html](https://git.generalassemb.ly/storage/user/7640/files/2bc27574-a873-11e7-9539-a766600e6648)
![new html](https://git.generalassemb.ly/storage/user/7640/files/2b493cb8-a873-11e7-93fc-a923a6b68a5e)
![show html](https://git.generalassemb.ly/storage/user/7640/files/2ba9f166-a873-11e7-8778-f38ebb580f6e)
![topten html](https://git.generalassemb.ly/storage/user/7640/files/2c0d2c9a-a873-11e7-898d-c15645b12739)
![favorites html](https://git.generalassemb.ly/storage/user/7640/files/2b33955c-a873-11e7-95b7-ddbcd965bfd1)

## Timeline
![timeline](https://git.generalassemb.ly/storage/user/7640/files/4a2d9f34-a873-11e7-9362-a15d2f1f3e47)

## API
[The Cat API](http://thecatapi.com/)

## NPM
[cat-facts](https://www.npmjs.com/package/cat-facts)
[cat-ascii-faces](https://www.npmjs.com/package/cat-ascii-faces)

## Challenges
- Getting the initial setup to work was time consuming.
- The Cat API returns HTML, unlike most APIs that return JSON data. I had to split the string of data, and grab the image url by iterating through the data like an array.
- The Cat API’s only function is to send back an image to the user. So to do an “update” I wanted to be able to reposition the images on the favorites page. However, I couldn’t make it completely functional.
- I spent so much time trying to get the update to work, that I did minimal CSS styling.

## Repo
[Repo](https://github.com/annarpack/wdi-project-2-caturday)
