import React from 'react';
import PropTypes from 'prop-types';
import { FiPhone } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { ListContainer, ListItem, Button } from './contactList.styled';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ListContainer>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <FiPhone />
          {name}: {number}
          <Button onClick={() => onDeleteContact(id)}>
            <AiFillDelete />
            Delete
          </Button>
        </ListItem>
      ))}
    </ListContainer>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onDeleteContact: PropTypes.func,
};
