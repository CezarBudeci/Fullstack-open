const Feedback = (props) => {

    const handleClick = (e) => {
        props.handleClick(e);
    }
    
    return (
        <div>
            <h2>
                give feedback
            </h2>
            <div>
                {
                props.buttons && props.buttons.map((element, index) => (
                    <button id={element} onClick={(e) => handleClick(e)} key = {index}>{element}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default Feedback;