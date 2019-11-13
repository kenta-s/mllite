import React from 'react';
// import { connect } from "react-redux"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SubjectIcon from '@material-ui/icons/Subject';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import Link from 'next/link';

const linkStyle = {
  color: '#000000',
  textDecoration: 'none',
};

const MainListItems = () => {
  return(
    <div>
      <Link href="/">
        <a style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </a>
      </Link>
      <Link href="/ml_models">
        <a style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary="ML Models" />
          </ListItem>
        </a>
      </Link>
    </div>
	)
}

export default MainListItems
