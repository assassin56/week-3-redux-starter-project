import rootReducer from '../../reducers/index';
import { createStore } from 'redux';

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test("should return default state if no action type is required", () => {
    expect(rootReducer({}, { type:null })).toEqual({
      masterTicketList: {},
      formVisibleOnPage: false
    });
  });
});