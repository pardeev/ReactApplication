import React from "react";

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minlength: "8", maxlength: "25",
            applicant_name: "",
            email: "",
            password: "",
            conf_password: "",
            select_option: "friends",
            comment: "",
            dialogClass: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value1 = event.target.value;
        const name1 = event.target.name;
        this.setState({
            [name1]: value1
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ dialogClass: "show" });
    }

    render() {
        let message = null;
        if (this.state.password.length < 8 || this.state.password !== this.state.conf_password) {
            message = <p>Password too short or not confirmed.</p>
        } else { 
            message = <p>Welcome {this.state.applicant_name},{" "} your email is {this.state.email},{" "} and you had the following comments: {this.state.comment}</p>
        }
        return (
            <>
                <header>
                    <h1>BACA Membership Application</h1>
                </header>
                <main class="application">
                    <div>
                        <h2>Apply now!!</h2>
                        <form action="" method="get" class="form-example">
                            <label>Name:</label>
                            <input type="text" id="applicant_name" name="applicant_name" placeholder="Applicant Name"
                                minlength={this.state.minlength}
                                maxlength={this.state.maxlength} value={this.state.applicant_name} onChange={this.handleChange} required />
                            <label>Email:</label>
                            <input type="text" id="email" name="email" placeholder="Email address" minlength={this.state.minlength}
                                maxlength={this.state.maxlength} value={this.state.email} onChange={this.handleChange}
                                required />
                            <label>Password:</label>
                            <input type="password" id="pass" name="password" placeholder="Password" minlength={this.state.minlength}
                                maxlength={this.state.maxlength} value={this.state.password} onChange={this.handleChange}
                                required />
                            <label>Confirm Password:</label>
                            <input type="password" id="conf_pass" name="conf_password" placeholder="Confirm Password" minlength={this.state.minlength}
                                maxlength={this.state.maxlength} value={this.state.conf_password} onChange={this.handleChange}
                                required />
                            <label>Where did you here about us: </label>
                            <select name="select_option" id="select_example" value={this.state.select_option} onChange={this.handleChange}>
                                <option value="friends">Friends</option>
                                <option value="social_media">Social Media</option>
                                <option value="club_members">Club Members</option>
                            </select>
                            <label>Comments:</label>
                            <textarea rows="4" cols="50" name="comment" placeholder="Please enter your comments here.." value={this.state.comment} onChange={this.handleChange} />
                            <button id="clickMe" type="button"
                                onClick={this.handleSubmit}>Sign Up</button>
                        </form>
                        <section id="ThanksDialog" className={this.state.dialogClass}>
                            <div className="message">
                                <h3>Thanks for Signing Up!!</h3>
                                {message}
                                <button onClick={(event) => this.setState({ dialogClass: "" })}>
                                    Close
                                </button>
                            </div>
                        </section>
                    </div>
                </main>
                <footer>
                    &copy; BACA 2021
                </footer>
            </>
        );
    }
}

export default Application;