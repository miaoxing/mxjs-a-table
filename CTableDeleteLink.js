import React from 'react';
import PropTypes from 'prop-types';
import TableDeleteLink from './TableDeleteLink';
import curUrl from '@mxjs/cur-url';

const CTableDeleteLink = ({id, ...props}) => <TableDeleteLink href={curUrl.apiShow(id)} {...props} />;

CTableDeleteLink.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default CTableDeleteLink;
