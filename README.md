# Technical Test / Junior Developer / Small web-app in React + TypeScript

## General overview

Web-app fetches data containing all departments of Met Museum and displays first 15 items. Additional departments will be displayed from internal state via “Load next” button, which will be disabled once all items are displayed. There is also CTA for each item that removes it from the list until page reloads. Upon clicking on an item, user will be rerouted to new subpage where the first 3 arts from selected department will be fetched and displayed with 4 basic information. User can display more information via “More info” button as modal. “Load more” button will fetch and display additional 3 items and will be disabled once all items are fetched and displayed.

## Technical solution

- Api used: The Metropolitan Museum API [https://metmuseum.github.io/](https://metmuseum.github.io/). Free public api without api key. If api key is required, then I will create back-end server to fetch the API results and then pass to front-end. Axios library is used to fetch data from api. All api calls are setup in agent.ts file.
- In order to keep the web-app simple and show understanding of how data and events are passed between react components no state management system was implemented. Otherwise I have mostly experience with MobX followed by Context API and Redux.
- No design library was used in order to show CSS knowledge. Otherwise I have experienced with MUI, Semantic UI and Atlassian Design System. Css modules were not implemented, as the project is small web-app with no global namespace collision.

## Local development setup

### `npm install`

Installs node modules

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
