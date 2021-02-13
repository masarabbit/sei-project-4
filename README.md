# Project 3: Pokézon

## Index
* [Overview](./README.md#overview)
* [Brief](./README.md#brief)
* [Technologies Used](./README.md#technologies-used)
* [Approach](./README.md#approach)
	* [Mock Up](./README.md#mock-up)
	* [Requesting Data from the API](./README.md#requesting-data-from-the-api)
	* [Displaying Details of Individual Pokémon](./README.md#displaying-details-of-individual-pokémon)
	* [Styling and Animation](./README.md#styling-animation)
    * [Background](./README.md#background)
    * [Hover Effects](./README.md#hover-effects)
    * [Animation for Pokémon Entering the Page](./README.md#animation-for-pokémon-entering-the-page)
* [Final Thoughts](./README.md#final-thoughts)
	* [Wins and Challenges](./README.md#wins-and-challenges)
	* [Key Learnings](./README.md#key-learnings)


(Click [here](https://pokezonshop.herokuapp.com/) to see project. Following login detail can be used for access: email: 'masa@email.com' , password: 'pass')


<br/>

## Overview 

For the third Project at General Assembly's Software Engineering Immersive Course, we were given 10 days to create a fullstack web application, in group of three. At the time, this was the biggest project I had worked on, and also the first time to develop a website using Git as a team. 

Since the Course was taken remotely, we communicated extensively through Slack, Zoom and GitHub. As well as gaining further coding experience, it was a great opportunity to get a taste of collaborative web development.

We based our project on the popular online shopping platform, Amazon, but with a twist - the store would sell fictional products from the Pokémon game. Most of the assets and data comes from the original game, which had been collected and shared by Pokémon fan online - [Veekun](https://veekun.com) was an excellent resource. The data was recompiled and edited slightly to suit the concept of our project.


<br/>

## Brief
* To build a full-stack application, making our own backend and frontend
* To Use an Express API to serve data from a Mongo database
* To build the frontend using React to consume the API
* The API should have multiple relationships and CRUD functionality for at least a couple of models


## Technologies Used
* HTML5
* CSS3 with animation
* JavaScript (ES6)
* React
* MongoDB
* Express
* Insomnia
* Heroku
* Git
* GitHub
* Cloudinary
* Google Chrome dev tools
* Google Sheets
* VScode
* Eslint
* Photoshop
* Illustrator


<br/>


## Approach
### Mockup

First, we planned the rough structure of our website by looking at the real Amazon site. Since we only had a limited time, we decided to take core elements of Amazon, which we felt were:
  * User registration
  * User login
  * Searching for item
  * Adding item to shopping item
  * Checking out (buying the item)*
  * Leaving a review / comment in the item page
  * Deleting comments
(*Since this was not a real shipping website, the 'checkout' is just a dummy page not connected to the backend. The payment detail/address etc would not be stored anywhere).  

The design of the website was also inspired by Amazon, in particular the Nav bar. However, various animation and effects were added to enhance user experience.


<p align="center">
	  <img src="README_images/mock_up.png" width="500" alt="mock up of Pokézon" style="border-radius:8px" />
</p>

<br/>

### Setting up the Backend

In our group, Christian worked mainly on developing the backend, but to begin with, all three of us used Zoom and screen share to set up the boiler plate and basic models. The key models we used were the 'user' model and the 'item' (product) model below. Smaller models for 'comment' and 'shippping basket' was also made as the project progressed. At the start, the 'User' model only had the minimum field required for testing registration and login. More fields were added as we built up the functionality.

```
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true }, 
  dob: { type: String, required: true },
  basket: [basketItem],
  total: {type: Number, default: 0},
  recentPurchases: [pastItem]
})
```

```
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 400 },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  comments: [commentSchema],
})
```

### Seed Data

I mainly worked on the frontend, leading the styling and animation, but at the start of the project I focused on builing the seed data for the database. There was a massive database put together by Pokémon fans online on GitHub, which was also run by Veekun, which can be found [here](https://github.com/veekun/pokedex), which had several csv files with data relating to the game. I combed through these csv files to collect the information we needed about the items, and created a formula to convert them into list of objects that can be pasted into JavaScript.

<p align="center">
	  <img src="README_images/pokezon_excel.png" width="500" alt="Google Sheets list compiled for the items" style="border-radius:8px" />
</p>

<p align="center">
	  <img src="README_images/pokezon_excel_2.png" width="500" alt="list of objects created with Google Sheets" style="border-radius:8px" />
</p>

There were over 700 items to be potentially used, but I selected about 460 of these, removing items that were for example too obscure. Some of the in-game category made little sense in real life, so they were reclassified into 17 groups such as 'medicine' and 'food & drink'.

I was also able to get images of the items from [Veekun's website](https://veekun.com), however they were individual png files. To use the images on our project, I uploaded the images onto Cloudinary. Before doing this, I had to gather all the images relating to the selected item, and remove the ones I did not need. I was able to do this by using a command line command. 

First, I made a text file which listed where the files were on my Macbook.
In this example, I first saved all the item images into a folder called 'test' on my desktop.

<p align="center">
	  <img src="README_images/test_copy.png" width="500" alt="text file listing where the images were saved on my Macbook" style="border-radius:8px" />
</p>

Then, I typed the following into my command line - this command referenced the text file mentioned earlier to copy the chosen files, then created a copy into the specified folder called 'new folder'.

```
cp `cat /Users/masa/Desktop/testcopy.txt` /Users/masa/Desktop/new_folder

```
This process was increadibly useful because I was dealing with literally hundreds of assets. Once the files were sorted, I batch processed them on Photoshop to resize them, then uploaded them onto Cloudinary.

<p align="center">
	  <img src="README_images/cloudinary.png" width="500" alt="mock up" style="border-radius:8px" />
</p>

The final hurdle was to identify the Cloudinary url for each images. This was trickier than I anticipated because the url were time stamped when uploaded, and due to the volume of files, the time stamps were not all uniform. I needed a list of all the urls so that I could connect them to the right item. The normal method of retrieving the url involved clicking each images, but would be very laborious.

Fortunately, I found that you could download the list of urls by making a direct request to Cloudinary API from the command line, using a cURL request below:

```
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/resources/image
```

The request above returned a JSON string, which I was able to parse and filter to produce a list of urls I needed. Once I had these, I was able to tie them up by using `VLOOKUP` on Google Sheets.

<p align="center">
	  <img src="README_images/vlookup.png" width="500" alt="mock up" style="border-radius:8px" />
</p>

<br />

## Final Thoughts

### Wins and Challenges


<br />

### Key Learnings


(Click [here](https://pokezonshop.herokuapp.com/) to see project)