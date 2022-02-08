import React from "react";

let Menu = function menu(props) {

    let list = null;
    switch (props.role) {
        case "user": list = ["BACA Home", "BACA Activities", "BACA Logout"];
            break;
        case "guest": list = ["BACA Home", "BACA Activities", "BACA Login", "BACA Application"];
            break;
        case "admin": list = ["BACA Home", "BACA Activities", "Manage BACA Activities", "BACA Logout"];
            break;
        default: list = ["BACA Home", "BACA Activity", "BACA Logout"];
            break;
    }

    return (
        <nav>
            <ul className="flex-container">{
                list.map((item, i) => <li key={
                    item + i
                }
                    className={
                        item === props.show ? "active" : ""
                    }
                    onClick={
                        props.menuHandler.bind(null, item)
                    }>
                    <a>{item}</a></li>)
            }</ul>
        </nav>);

}
export default Menu;