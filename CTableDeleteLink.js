import PropTypes from 'prop-types';
import TableDeleteLink from './TableDeleteLink';
import curUrl from '@mxjs/cur-url';

const CTableDeleteLink = ({id, ...props}) => {
  return (
    <TableDeleteLink permission={curUrl.to('[id]/delete')} href={curUrl.apiShow(id)} {...props} />
  );
};

CTableDeleteLink.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default CTableDeleteLink;
