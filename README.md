<div id="top"></div>

<!--
# Steven G. Opferman | steven.g.opferman@gmail.com
# My personal template for README.md files, because I'm lazy :P
# Adapted from:
#   https://github.com/othneildrew/Best-README-Template/
#   https://github.com/kylelobo/The-Documentation-Compendium/
-->

<h1 align="center">Information Overload and Bias in the Hiring Process</h1>

<p align="center">
 Website to collect digital trace data for the information overload in hiring study at Stanford University.
<br>
</p>

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Acknowledgements](#acknowledgements)

## About <a name="about"></a>

The HIO website is designed to be embedded within an `<iframe>` in a Qualtrics survey, allowing researchers to combine the survey responses with the digital trace data collected by the site.

Participants see resume content for the same candidate, but with different names (varying gender and race). The participant experiences the high, moderate, or low information condition, and responds to questions about the candidate in a simulated hiring process.

The HIO website tracks how the participant interacts with it through clicks and scrolling, which the researcher can combine with the survey responses to see how information overload may affect bias in the participant's decision.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage <a name="usage"></a>

The website requires certain parameters to be specified in the URL. The format is the following:

> http://DOMAIN_HERE/#/candidate/:qualtricsUserId/?name=:candidateName&load=:load

`:qualtricsUserId`, `:candidateName`, and `:load` should be replaced with the specific values needed. `:load` should be `0`, `1`, or `2`, which are (respectively) interpreted as low, moderate, and high information conditions.

The HIO website can be embedded in Qualtrics like so:

> `<iframe height="830px" width="100%" src="https://DOMAIN_HERE/#/candidate/${e://Field/ResponseID}/?name=${e://Field/candidateName}&load=${e://Field/infoLevel}"></iframe>`

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started <a name="getting_started"></a>

These instructions will get you a copy of the project up and running.

1. Clone the repo.

   ```sh
   git clone https://github.com/TheFirstQuestion/hiring-information-overload-website.git
   ```

2. Install dependencies.

   ```sh
   npm install
   ```

3. Runs the app in the development mode.

   ```sh
   npm start
   ```

   Open [http://localhost:3000/hiring-information-overload-website](http://localhost:3000/hiring-information-overload-website) to view it in your browser.

4. To deploy to GitHub Pages:

   ```sh
   npm run deploy
   ```

   The site will be available at https://YOUR_GITHUB_USERNAME.github.io/hiring-information-overload-website/

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgements <a name="acknowledgements"></a>

- This project draws heavily from the [GCA website](https://github.com/TheFirstQuestion/GCA-website), which was originally developed by [Neha Sharma](https://github.com/sharman99).
- This project uses [react-markdown](https://www.npmjs.com/package/react-markdown) to render the resume information as rich text.
- This project uses [react-tabs](https://www.npmjs.com/package/react-tabs) to create the basic UI.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- The site [Lorem Markdownum](https://jaspervdj.be/lorem-markdownum/) was helpful for creating dummy data for testing purposes.

<p align="right">(<a href="#top">back to top</a>)</p>

---

# How It Works

TODO

- [In-browser markdown editor with live preview](https://remarkjs.github.io/react-markdown/)
- [Markdown Reference](https://commonmark.org/help/)
