import React from "react";
import 'regenerator-runtime/runtime'
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import * as redux from "react-redux";
import configureMockStore from "redux-mock-store";
Enzyme.configure({ adapter: new Adapter() });
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatchFn);
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.renderer = renderer;
global.Provider = redux.Provider;
global.configureMockStore = configureMockStore;
global.mockDispatchFn = mockDispatchFn;
global.Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
window.dataLayer = {
  push: jest.fn().mockImplementation(() => {
    eventCallback: jest.fn();
  }),
};
