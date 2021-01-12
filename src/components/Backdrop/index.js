import React from 'react';
import PropTypes from 'prop-types';
import './backdrop.scss';

const Backdrop = props =>
    props.show ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className = "backdrop"
        onClick = { props.clicked }
        onKeyPress = { props.clicked }
        />
    ) : null;

Backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func,
};

export default Backdrop;