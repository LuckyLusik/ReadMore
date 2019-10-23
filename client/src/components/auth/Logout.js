import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function Logout(props) {
    const { logout } = props;
    return (
        <div>
            <Button color="inherit" onClick={logout}>Logout</Button>
        </div>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
  };

export default connect(null, { logout })(Logout);