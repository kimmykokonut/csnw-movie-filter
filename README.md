# 🎥 Film Finder 🔎
_by [Kim Robinson](https://github.com/kimmykokonut)_

<a href="https://film-finder-aoen111zb-kimmykokonuts-projects.vercel.app/" alt="hosted site">See it live on Vercel</a>

### 🎯 Assignment:
  - Write a simple website that utilizes [wikipedia movie data](https://github.com/prust/wikipedia-movie-data) to display a list of movies
   - create a filter for decade
   - filter for genre.

 - Optionally, you could add functionality for users to “like” particular movies (these “likes” can be stored client-side, server-side, or not stored).
 - As a bonus, the website could recommend movies based on the genres and actors of “liked” films.

---

## ⌛ Setup

### Clone repository

1. Navigate to the [repository](https://github.com/kimmykokonut/csnw-movie-filter).
2. Click the `Fork` button and you will be taken to a new page where you can give your repository a new name and description. Choose "create fork".
3. Click the `Code` button and copy the url for HTTPS.
4. On your local computer, create a working directory of your choice.
5. In this new directory, via the terminal, type `$ git clone https://github.com/kimmykokonut/csnw-movie-filter`.
6. View or Edit: On your terminal, type `$ code .` to open the project in VS Code.

### Install dependencies and run local server
1. Enter `$ npm install` to compile the application's code and install all needed dependencies.
2. Run local server: `$ npm run dev`
(This will be located at: [http://localhost:5173/](http://localhost:5173/)

### 🔧 Built With
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## ✨ Features
- 🎯 Filter movies by decade (1900s-2020s)
- 🏷️ Filter by multiple genres simultaneously
- 📱 Responsive design works on mobile and desktop
- 🎨 Material-UI components for a modern look
- 📄 Pagination for better performance
- 🔍 Clean and intuitive filtering interface

## 🏗️ Architecture
- **TypeScript** for type safety and better developer experience
- **React** with functional components and hooks
- **Client-side filtering** for responsive UX
- **Material-UI** for consistent design system
- **React Router** for future expandability

## 📝 Notes

- Backend idea was researched but decided against for V1.  Looked into building with Express and SQLite and seeding database with data downloaded from github repo. Felt out of scope for project/time.  Decided time best spent showcasing React/Typescript, hooks, managing state and api calls.
- Client-side filtering: all movies file is ~ 1MB, seems reasonable to load once.
  - Chose to load all movies and filter from that list versus multiple API calls to get each decade.  Minimizing API calls means shorter loading time for filtering and easier to combine decade and genre filters for once user submission.
- Chose not to put urls in .env file to make less work for reviewers as well as the fact the GH repo is open-source and the code works directly with their file.  Perhaps a more production-ready version I would move the urls to an environmental variable.

## ⏫ Level Up
- [ ] Movie recommendations based on selected genres.
- [ ] Backend integration with Express.js with SQLite.
- [ ] Move api url's to .env for production (didn't want to make extra work for reviewers setting up project)
- [ ] Infinite scroll instead of pagination (react-infinite-scroller library). Intention was to not lean on libraries.
- [ ] Memoization with useMemo for filtered results
- [ ] User authentication
- [ ] Enhanced MUI theming and styling - felt out of scope for project goals/time

## 📫 Contact
- GitHub: [@kimmykokonut](https://github.com/kimmykokonut)
- LinkedIn: https://www.linkedin.com/in/robinson-kim/
- Portfolio: https://kimmykokonut.github.io/


## 🙏 Acknowledgements

[@prust](https://github.com/prust) for [GitHub repo for movie data](https://github.com/prust/wikipedia-movie-data)