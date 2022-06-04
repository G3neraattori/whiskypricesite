# Whisky Price Checker 

A course project for LUT fullstack course. 

## Tools used

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)

## Description

This is a site for checking the price and history of whiskies available in the alko site. The code could be somewhat easily be updated to include other products too or additional sites.

<br>
Functionality it includes is:
<ul>
    <li>databasing functionality for storing userdata and the Alko product prices (as they don't keep their price history available)</li>
    <li>automated data collection from an API</li>
    <li>requesting data from backend to frontend, and posting data vice verse </li>
    <li>chart drawing functionality using the collected data</li>
    <li>and other basic front-/backend functionality + middleware that fullstack applications require</li>
</ul>

## Installation

<details>
  <summary>Basic installation</summary>
  <br/>
  Make sure you have all the required software installed. 

1. Clone the git repo to your local machine
  ```
git clone https://github.com/G3neraattori/whiskypricesite.git
  ```
*(or use cli)*
2. Navigate to the project root and run
  ```
  npm install
  ```
to get the required libraries.
<details><summary>2.5</summary>
If you are still missing libraries navigate to angular-src and run
```
npm install
```
</details>



3. Start mongoDB server


4. Start the server
  ```
  node app
  ```
</details>

<details>
  <summary>Additional install info</summary>
  <br/>
You can currently somewhat customize your install such changing the adding server address or secret

1. In ``alkodbconfig.js`` and ``dbconfig.js`` you can change secret and backend server addresses


2. In the angular services folder you can change the public server address (mainly for testing) by changing the ``ngUrl`` field in ``alkodata.service.ts`` and ``auth.service.ts``
</details>

## Other

All images used with permission from the copyright holder
>Images from: https://www.instagram.com/matiastoropainen/

© G3neraattori
