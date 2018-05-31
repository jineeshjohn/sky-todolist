import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, toggleItem } from '../../logic/todos';
import './styles.css';

const Item = ( {completed, id, content, deleteItem, toggleItem} ) => {
  return (
    <li className={completed? 'completed' : ''} key={id} onClick={() => toggleItem(id)}> {content} 
      <button onClick={() => deleteItem(id)}>delete</button>
    </li>
  );
}

export const ItemsList = ({ items, deleteItem, toggleItem, itemsActive, itemsCompleted }) => {
  return (
    <div>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {items.map((item) => <Item key={item.id} completed={item.completed} id={item.id} content={item.content} deleteItem={deleteItem} toggleItem={toggleItem} />)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { items: state.todos.items };
};
const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemId) => dispatch(deleteItem(itemId)),
  toggleItem: (itemId) => dispatch(toggleItem(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
