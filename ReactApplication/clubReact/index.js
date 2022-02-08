import React from "react";
import ReactDOM from "react-dom";
import Menu from "./menu";
import Home from "./home";
import events from "./eventData.json";
import Activities from "./activities";
import Login from "./login";
import Application from "./application"
import AdminActivities from "./adminActivities";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            role: "admin",
            show: "Home"
        };
        this.menuHandler = this.menuHandler.bind(this);
    }

    menuHandler(menuItem, event) {
        this.setState({show: menuItem})
    }
    
    render() {
        let content = null;
        switch (this.state.show) {
            case "BACA Home": content = <Home/>;
                break;
            case "BACA Activities": content = <Activities/>;
                break;
            case "BACA Login": content = <Login/>;
                break;
            case "BACA Application": content = <Application/>;
                break;
            case "Manage BACA Activities": content = <AdminActivities/>;
                break;
            default: content = <h2>Something went wrong</h2>;
        }
        return (
            <>
                <Menu menuHandler={
                        this.menuHandler
                    }
                    role={
                        this.state.role
                    }
                    show={
                        this.state.show
                    }/> {content} </>
        );
    }
}

// Now rendering the App component!
ReactDOM.render (
<App/>,
document.getElementById("root")
);