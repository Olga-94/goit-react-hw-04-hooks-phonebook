import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from '../App.styled';

function Title({ title }) {
  return <SectionTitle>{title}</SectionTitle>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
