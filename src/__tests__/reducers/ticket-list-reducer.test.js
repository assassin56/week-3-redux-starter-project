import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as c from './../../actions/ActionTypes';
import Moment from 'moment';

let action;
//declare an action but don't define it. Each test will define what the action should be
const ticketData = {
  names: "Ryan & Aimen",
  location: "4b",
  issue: "Redux action is not working correctly.",
  timeOpen: 0, 
  id: 1
};

//to demonstrate that if a key of an object already exists, it will update.
const updatedTicketData = {
  names: "Ryan & Aimen",
  location: "4b",
  issue: "Now everything is broken!!!!!!!!!!",
  id: 1,
};

//to test if correct ticket is being deleted
const currentState = {
  1: {
    names: "Ryan & Aimen",
    location: "4b",
    issue: "Redux action is not working correctly.",
    id: 1,
  },
  2: {
    names: "Jasmine and Justine",
    location: "2a",
    issue: "Reducer has side effects.",
    id: 2,
  },
};

describe("ticketListReducer", () => {
  test("Should successfully add a ticket to the ticket list that includes Moment-formatted times", () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      id: id,
      formattedWaitTime: new Moment().fromNow(true)
    };

    expect(ticketListReducer({}, action)).toEqual({
      1: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: 'a few seconds'
      },
    });
  });

  test("Should update ticket data if key already exists using the same ADD_TICKET Reducer", () => {
    const { names, location, issue, id } = updatedTicketData;
    action = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      id: id,
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id,
      },
    });
  });

  test("Should successfully delete a ticket", () => {
    action = {
      type: "DELETE_TICKET",
      id: 1,
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: "Jasmine and Justine",
        location: "2a",
        issue: "Reducer has side effects.",
        id: 2,
      },
    });
  });

  test("Should return default state if there is no action type passed into the reducer", () => {
    // export default (state = {}, action) => {
    // };
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

  test('should add a formatted wait time to ticket entry', () =>{
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes',
      id: id
    };
    expect(ticketListReducer({ [id] : ticketData }, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes'
      }
    });
  });

});

// expect(ticketListReducer({}, {type: null})).toEqual({});
//expect from Jest and plain JS
//ticketListReducer - reducer handles the update to state
//Reducer takes two arguments - current state and ACTION (it's an object with not much in it right now)
//toEqual method - Jest test

//action type is null - we do nothing to it
