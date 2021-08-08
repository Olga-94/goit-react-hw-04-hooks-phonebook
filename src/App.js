import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import Title from './Title/Title';
import ContactForm from './Components/Contacts/Form/Form';
import ContactList from './Components/Contacts/List/List';
import Filter from './Components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Olga Bezdetko', number: '596-91-79' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContact();
    return (
      <Container>
        <Title title={'Phonebook'} />
        <ContactForm onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} />
        <Title title={'Contacts'} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
