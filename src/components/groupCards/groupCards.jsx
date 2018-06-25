import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlagIcon from '../flagIcon/flagIcon';
import './groupCards.css';

const TeamItem = ({ name = '' }) => {
  return (
    <ListItem button>
      <ListItemIcon>
        <FlagIcon name={name} />
      </ListItemIcon>
      <ListItemText className="team-name" primary={name} />
    </ListItem>
  );
}
const GroupCards = ({ info = { name: 'Group A', teams: [] } }) => {
  return(
    <Card>
      <CardContent>
        <List
        component="nav">
          <header className="group-name">
            <Typography variant="display1" gutterBottom>
              {info.name}
            </Typography>
          </header>
          {info.teams.map(team => <TeamItem name={team.name} key={team.code}/>)}
        </List>
      </CardContent>
    </Card>
  );
}

export default GroupCards;