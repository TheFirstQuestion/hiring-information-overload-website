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

# Updating Resume Information

Hi Claire! Here's the step-by-step info on updating the resume information.

## The Very First Time

1. **Navigate to the place where you want to set up the project.**

   ```sh
   cd ~/Desktop
   ```

2. **Clone the repository.** This will get all the files on your computer and put them in a folder called `hiring-information-overload-website`.

   ```sh
   git clone https://github.com/TheFirstQuestion/hiring-information-overload-website.git
   ```

3. **Set up a GitHub account.** [GitHub](https://github.com/) is the place where the code is stored, and where the website is hosted. **Let me know what your username is so I can add you to the code repository.**

4. **Connect `git` to GitHub.** You'll talk with GitHub through a command line tool called `git`. (Each line is a separate command; run them one at a time.)

   ```sh
   git config --global user.name "your_github_username"
   git config --global user.email "your_github_email"
   git config --global credential.helper "cache --timeout=31536000"
   ```

5. **Navigate to the project.**

   ```sh
   cd hiring-information-overload-website
   ```

6. **Follow the steps below.** At some point, you'll be prompted for your GitHub username and password. The username is your username, but **the password is not your password!** Instead, you'll need to:

7. **Generate a Personal Access Token.** It's like a password, but more safe. Go to [your account settings](https://github.com/settings/tokens/new) and fill out the fields. You can set the expiration for "Never." Make sure to select the `repo` scope, so you can write to the repository. **Paste this token into the password field in the login prompt.** (It may not look like anything pasted, but it has!)

## Every Time

1. **Navigate to the project.**

   ```sh
   cd ~/Desktop/hiring-information-overload-website
   ```

2. **Grab the latest version of the code.** It's really important to keep everythhing in sync!

   ```sh
   git pull
   ```

3. **Write the information in Markdown.** The easiest way to do this is probably to use [an in-browser markdown editor with live preview](https://remarkjs.github.io/react-markdown/) to make sure you have the syntax correct. Here's a [helpful Markdown cheat sheet](https://commonmark.org/help/) for reference.

4. **Open the document files.** You'll need to use a [plain-text editor](https://www.howtogeek.com/795509/why-you-need-a-plain-text-editor/), such as [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), or [Visual Studio Code](https://code.visualstudio.com/) to edit the Markdown files.

   The Markdown files are all in `/hiring-information-overload-website/src/ApplicantData`.

5. **Copy/paste the Markdown into each file.** Select all, paste, save, and repeat.

6. **Save your changes.**

   ```sh
   git add . && git commit -m 'a message about what you changed'
   ```

7. **Publish your changes.** The previous step saved the changes on _your_ computer; now, you need to update the central code repository.

   ```sh
   git push origin main
   ```

8. **Deploy the website.** You've updated the repository, so now you need to tell the website that an update is available.

   ```sh
   npm run deploy
   ```

9. **Check to make sure it worked.** The website may take a few minutes to update. Make sure everything looks the way it should - if not, let me know!
