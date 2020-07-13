import React from "react";
import PropTypes from "prop-types";
import Ticket from "./Ticket";
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function TicketList(props){

  iseFirestoreConnect([
    { collection: 'tickets'}
  ]);

  const tickets = useSelector(state => state.firestore.ordered.tickets);

  if (isLoaded(tickets)) {
    return (
      <React.Fragment>
        <hr />
        {Object.values(props.ticketList).map((ticket) => {
          return <Ticket
            whenTicketClicked={props.onTicketSelection}
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id} />
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    );
  }
}


TicketList.propTypes = {
  onTicketSelection: PropTypes.func
};

export default TicketList;