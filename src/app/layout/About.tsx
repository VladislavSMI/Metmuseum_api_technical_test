export default function About() {
  return (
    <div className="flex-center-column">
      <div className="about text-center">
        <h1>Technical test: solution details</h1>
        <h2>General overview</h2>
        <p>
          Web-app fetches data containing all departments of Met Museum and
          displays first 15 items. Additional departments will be displayed from
          internal state via “Load next” button, which will be disabled once all
          items are displayed. There is also CTA for each item that removes it
          from the list until page reloads. Upon clicking on an item, user will
          be rerouted to new subpage where the first 15 arts from selected
          department will be fetched and displayed with 4 basic information.
          User can display more information via “More info” button as modal.
          “Load more” button will fetch and display additional 15 items and will
          be disabled once all items are fetched and displayed.
        </p>
        <h2>Technical solution</h2>
        <ul>
          <li>
            Api used: The Metropolitan Museum API{" "}
            <a href="https://metmuseum.github.io/">
              https://metmuseum.github.io/
            </a>
            . Free public api without api key. If api key is required, then I
            will create back-end server to fetch the API results and then pass
            to front-end. Axios library is used to fetch data from api. All api
            calls are setup in agent.ts file.
          </li>
          <li>
            In order to keep the web-app simple and show understanding of how
            data and events are passed between react components no state
            management system was implemented. Otherwise I have mostly
            experience with MobX followed by Context API and Redux.
          </li>
          <li>
            No design library was used in order to show CSS knowledge. Otherwise
            I have experienced with MUI, Semantic UI and Atlassian Design
            System. Css modules were not implemented, as the project is small
            web-app with no global namespace collision.
          </li>
        </ul>
      </div>
    </div>
  );
}
