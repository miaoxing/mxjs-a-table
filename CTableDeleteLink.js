import React from 'react';
import PropTypes from 'prop-types';
import TableDeleteLink from './TableDeleteLink';
import curUrl from '@mxjs/cur-url';

const CTableDeleteLink = ({id, ...props}) => <TableDeleteLink href={curUrl.apiDestroy(id)} {...props} />;

CTableDeleteLink.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CTableDeleteLink;
