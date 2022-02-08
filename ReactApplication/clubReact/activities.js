import React from "react";
import cricket from "../clubProject/images/CricketActivity.png";

class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        fetch('/activities').then(response => response.json()).then((activities) => {
            this.setState({
                events: activities
            });
        })
    }

    render() {
        return (
            <>
                <header>
                    <h1>Activities Page</h1>
                </header>
                <figure>
                    <img src={cricket} alt="CricketActivity" />
                    <figcaption>Fig.2 - Image depicting Cricket Trophy</figcaption>
                </figure>
                <main>
                    <h2>Club Activities</h2>
                    <h2>Activity Schedule</h2>
                    <table id="table_id">
                        <caption>Activities</caption>
                        <thead>
                            <th>Name</th>
                            <th>Dates</th>
                            <th>Description</th>
                        </thead>
                        <tbody>
                            {this.state.events.map(
                                (event) => {
                                    return (
                                        <tr>
                                            <td>{event.name}</td>
                                            <td>{event.dates}</td>
                                            <td>{event.description}</td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </main>
                <footer>
                    &copy; BACA 2021
                </footer>
            </>
        );
    }

}

export default Activities;