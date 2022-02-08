import React from "react";
import cricket from "../clubProject/images/Cricket.png";

let Home = function home() {
    return (
      <main>
        <h2>The Bay Area Cricket Association Club</h2>
        <p>One stop site for all the cricket lovers in the bay area</p>
        <figure>
          <img src={cricket} alt="Cricket" />
          <figcaption>Fig.1 - Image depicting Cricket</figcaption>
        </figure>
        <h2>About BACA</h2>
        <p>Bay Area Cricket Association (BACA) is an association formed by the people who are very enthusiastic about
          playing cricket in the bay area.</p>
        <h2>Who can join BACA?</h2>
        <p>Anyone who is passionate about playing cricket or anyone who enjoyes cricket are always welcomed to join
          BACA</p>
      </main>
    );
  }

  export default Home;