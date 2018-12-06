import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// CSS
import './Home.css'

class Home extends Component {
    render() {
        return(
            <div className="global-home">
                <div className="root">
                    <AppBar position="static">
                        <Toolbar>
                        <IconButton className="menuButton" color="inherit" aria-label="Menu">
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="grow">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="content">
                    This is a content
                </div>
            </div>
        );

    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Home;