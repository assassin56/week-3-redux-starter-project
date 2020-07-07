import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test("should return default state if no action type is required", () => {
    expect(rootReducer({}, { type:null })).toEqual({
      masterTicketList: {},
      formVisibleOnPage: false
    });
  });

  test('check that initial state of ticketListReducer matches root reducer', () => {
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, {type:null}));
  });

  test('check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, {type: null}));
  });

  test('check that initial state of ticketListReducer matches root reducer', () => {
    const action = {
      type: "ADD_TICKET",
      names: "ryan and antonio",
      location: '4b',
      issue: "react is hard",
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, action));
  });

  test('check that initial state of formVisibleReducer matches root reducer', () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });
});