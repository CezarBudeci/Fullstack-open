import { connect } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = (props) => {
    const handleInput = (e) => {
        const value = e.target.value;
        props.filter({ filter: value });
    };

    const style = {
        marginBottom: 10
    };

    return (
        <div style={style}>
            filter <input onChange={handleInput} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {
    filter,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;