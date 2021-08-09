import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import Title from './Title/Title';
import ContactForm from './Components/Contacts/Form/Form';
import ContactList from './Components/Contacts/List/List';
import Filter from './Components/Filter/Filter';

export default function App() {

  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Olga Bezdetko', number: '596-91-79' },
  ];
    

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

  const addContact = ({ name, number }) => {
    if (contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    }
      setContacts(prevContacts => [contact, ...contacts])
  }

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    );
  }

  const deleteContact = (contactId) => {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId)
      )
  }

    const visibleContacts = getVisibleContact();
    return (
      <Container>
        <Title title={'Phonebook'} />
        <ContactForm onSubmit={addContact} />
        <Filter value={filter} onChange={changeFilter} />
        <Title title={'Contacts'} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Container>
    )
}
