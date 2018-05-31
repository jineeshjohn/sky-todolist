import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  toggleItem: (f) => f,
  deleteItem: (f) => f,
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('Item')).toHaveLength(2);
  });
  it('should call toggleItem with the input content', () => {
    const toggleItem = jest.fn();
    const props = { ...defaultProps, toggleItem}
    const items = [{ id: 1, content: 'Test 1', completed: false }];
    const renderedItem = mount(<ItemsList {...props} items={items} />);
    renderedItem.find('li').simulate('click');
    expect(toggleItem.mock.calls.length).toBe(1);
  });
  it('should call deleteItem with the input content', () => {
    const deleteItem = jest.fn();
    const props = { ...defaultProps, deleteItem}
    const items = [{ id: 1, content: 'Test 1', completed: false }];
    const renderedItem = mount(<ItemsList {...props} items={items} />);
    renderedItem.find('li button').simulate('click');
    expect(deleteItem.mock.calls.length).toBe(1);
  });
});
