[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chingu-voyages/v31-bears-team-02be">
    <img src="https://chingu.io/logo-with-text-192.png" alt="Logo" height="80">
  </a>

  <h3 align="center">ArtGuessr</h3>

  <p align="center">
    Explore art in a fun and educational way.
    <br />
    <a href="https://github.com/chingu-voyages/v31-bears-team-02be"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/chingu-voyages/v31-bears-team-02be">View Demo</a>
    ·
    <a href="https://github.com/chingu-voyages/v31-bears-team-02be/issues">Report Bug</a>
    ·
    <a href="https://github.com/chingu-voyages/v31-bears-team-02be/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#front-end-setup">Front End Setup</a></li>
        <li><a href="#back-end-setup">Back End Setup</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">
  <img src="https://media.giphy.com/media/3og0IUCoTmaHeYi3nO/giphy.gif" alt="Placeholder Demo Gif" />
</p>
ArtGuessr lets users explore artwork from the <a href="https://metmuseum.github.io/">MET API</a> and play a game to quiz your artistic knowledge. 


### Built With

* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.org)
* [Knex.js](https://knexjs.org/)
* [PostgreSQL](https://postgresql.org/)


<!-- GETTING STARTED -->
## Getting Started

### Front End Setup

1. Enter client directory
   ```
   $ cd ./frontend/
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```
3. Start local
   ```sh
   $ npm start
   ```
   
### Back End Setup

1. Make sure PostgreSQL is running in your environment
2. Enter project's root directory
   ```
   $ cd ..
   ```
3. Create an `.env` file in the project's root directory.  Replace quotations with values you specify.
   ```
   NODE_ENV="development or production"
   PORT="app port number, should be 4001"
   JWT_SECRET="specify a string to use for JWT"
   RDS_HOSTNAME="hostname of the database server"
   RDS_USERNAME="username of the database server"
   RDS_PASSWORD="password for the username of the database server"
   RDS_PORT="port of the database server"
   RDS_DB_NAME="name of the database"
   TEST_RDS_DB_NAME="name of the test database"
   ```
4. Install NPM packages
   ```sh
   $ npm install
   ```
5. Run the migrations
   ```sh
   $ npm run migrate
   ```
6. Start server
   ```sh
   $ npm start
   ```
<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/chingu-voyages/v31-bears-team-02/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/chingu-voyages/v31-bears-team-02be](https://github.com/chingu-voyages/v31-bears-team-02be)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/chingu-voyages/v31-bears-team-02be.svg?style=for-the-badge
[contributors-url]: https://github.com/chingu-voyages/v31-bears-team-02be/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chingu-voyages/v31-bears-team-02be.svg?style=for-the-badge
[forks-url]: https://github.com/chingu-voyages/v31-bears-team-02be/network/members
[stars-shield]: https://img.shields.io/github/stars/chingu-voyages/v31-bears-team-02be.svg?style=for-the-badge
[stars-url]: https://github.com/chingu-voyages/v31-bears-team-02be/stargazers
[issues-shield]: https://img.shields.io/github/issues/chingu-voyages/v31-bears-team-02be.svg?style=for-the-badge
[issues-url]: https://github.com/chingu-voyages/v31-bears-team-02be/issues
[license-shield]: https://img.shields.io/github/license/chingu-voyages/v31-bears-team-02be.svg?style=for-the-badge
[license-url]: https://github.com/chingu-voyages/v31-bears-team-02be/blob/master/LICENSE.txt
