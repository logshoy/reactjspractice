import React from 'react' 

function TestInput() {
    return(
        <React.Fragment>
            <div className="vasya" style={{ border: '1px solid grey' }}>
                <label htmlFor="name" >Enter you name:</label>
                <input type="text" id="name" />
            </div>
            <p>Some text here</p>
        </React.Fragment>
    )
}

export default TestInput