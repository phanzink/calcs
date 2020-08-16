import React, { PureComponent } from 'react';

class About extends PureComponent {
    render() {
        return (
            <div className="container about-page">
                <h1>About</h1>
                <p>
                    See anyones past calculations. Only up to 10 though no more!
                </p>
                <h3>Improvements</h3>
                <p>
                    I would say my list of improvements could be tests for sure. Moving
                    firebase vars out to an .env. Fixing my position top it will make things
                    difficult for styling in the future. Adding keyboard support. Split out the
                    buttons to be in apart of their own component and make the button
                    reuseable. Probably switch the about page and the prevCalc component in to
                    functional components.
                </p>
            </div>
        );
    }
}

export default About;