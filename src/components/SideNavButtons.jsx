import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';

export default class SideNavButtons extends React.Component {
  render() {
    return (
      <div >
        <ButtonGroup vertical >
  <Button outline color="secondary">New Ticket</Button>
  <Button outline color="secondary">My Tickets</Button>
  <Button outline color="secondary">Closed Tickets</Button>
  <Button outline color="secondary">All Tickets</Button>
  
  
</ButtonGroup>
      </div>
    );
  }
}