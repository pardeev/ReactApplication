import React from "react";
import activities from './eventData.json';

class AdminActivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: activities,
            addDate: "",
            addName: "",
            addDescription: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.addActivity = this.addActivity.bind(this);
    }

    handleChange(event) {
        const value1 = event.target.value;
        const name1 = event.target.name;
        this.setState({
            [name1]: value1
        });
    }

    addActivity(event) {
        event.preventDefault();
        this.setState({
            activities: this.state.activities.concat({
                dates: this.state.addDate,
                name: this.state.addName,
                description: this.state.addDescription
            })
        });
    }

    delActivity() {
        this.setState((i) => {
            return { activities: activities.slice(i) };
        });
    };


    render() {
        return (
            <>
                <header>Activity Management</header>
                <h3>Add Activity</h3>
                <section className="addActivityGrid">

                    <label>Date</label>
                    <input type="text" name="addDate" onChange={this.handleChange} value={this.state.addDate} />
                    <label>Name</label>
                    
                    <input type="text" name="addName"
                        value={
                            this.state.addName
                        }
                        onChange={
                            this.handleChange
                        }
                    />
                    
                    
                    <label>Description</label>
                    
                    <input type="text" name="addDescription"
                        value={
                            this.state.addDescription
                        }
                        onChange={
                            this.handleChange
                        }
                    />
                    
                    <button
                        onClick={
                            this.addActivity
                        }
                    >Add</button>
                    
                </section>
                <h2>Activities</h2>
                <table className="table_id">
                    <thead>
                        <th></th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Description</th>
                    </thead>
                    {
                        this.state.activities.map((act, i) => (
                            
                            <tr key={"act" + i}>
                                <td>
                                    <button
                                        onClick={
                                            this.delActivity.bind(this, i)
                                        }
                                    >Delete</button>
                                </td>
                                <td>{
                                    act.dates
                                }</td>
                                <td>{
                                    act.name
                                }</td>
                                <td>{
                                    act.description
                                }</td>
                            </tr>
                            
                        ))
                        
                    } </table>
                <footer>
                    &copy; BACA 2021
                </footer>
            </>
        );
    }
}

export default AdminActivities