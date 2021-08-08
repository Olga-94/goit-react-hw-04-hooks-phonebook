import React from 'react';
import PropTypes from 'prop-types';
import { IoPersonAddOutline } from 'react-icons/io5';
import { Formik } from 'formik';
import { Form, Label, Input, Button } from './contactForm.styled';

export default function ContactForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Обязательное поле';
        } else if (!values.number) {
          errors.number = 'Обязательное поле';
        } else if (
          !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(
            values.name,
          )
        ) {
          errors.name =
            'Имя может состоять только из букв, апострофа, тире и пробелов.';
        } else if (
          !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
            values.number,
          )
        ) {
          errors.number =
            'Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Label>
            {' '}
            Name
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
            />
          </Label>
          {errors.name && touched.name && errors.name}
          <Label>
            {' '}
            Number
            <Input
              type="tel"
              name="number"
              onChange={handleChange}
              value={values.number}
            />
          </Label>
          {errors.number && touched.number && errors.number}
          <Button type="submit" disabled={isSubmitting}>
            <IoPersonAddOutline />
            Add contact
          </Button>
        </Form>
      )}
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
