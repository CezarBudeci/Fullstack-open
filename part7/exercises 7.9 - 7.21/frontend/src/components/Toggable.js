import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 20px;
    border: 2px solid #0b990b;
    background-color: white;
    padding: 0 10px;
    min-height: 26px;
    &:hover {
        border: 2px solid #0b990b;
        box-shadow: 0px 0px 5px #0b990b;
        cursor: pointer;
    }
    &:active {
        border: 2px solid #0b990b;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background-color: white;
    }
`;

const CancelButton = styled.button`
    border-radius: 20px;
    border: 2px solid #c75f5f;
    background-color: #facfcf;
    padding: 0 10px;
    min-height: 26px;
    &:hover {
        border: 2px solid #c75f5f;
        box-shadow: 0px 0px 5px #c75f5f;
        cursor: pointer;
    }
    &:active {
        border: 2px solid #c75f5f;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background-color: white;
    }
`;

const ChildrenContainer = styled.div`
    background-color: white;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    border: 2px solid #0b990b;
    box-shadow: 1px 1px 2px #0b990b;
    width: 50%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`;

const ShowWhenVisible = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisible = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return { toggleVisible };
    });

    return (
        <Container>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisible}>{props.buttonLabel}</Button>
            </div>
            <ShowWhenVisible style={showWhenVisible}>
                <ChildrenContainer>
                    {props.children}
                    <CancelButton onClick={toggleVisible}>Cancel</CancelButton>
                </ChildrenContainer>
            </ShowWhenVisible>
        </Container>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
