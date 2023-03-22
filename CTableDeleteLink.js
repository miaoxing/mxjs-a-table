import PropTypes from 'prop-types';
import TableDeleteLink from './TableDeleteLink';
import curUrl from '@mxjs/cur-url';

const getPermission = () => curUrl.to('[id]/delete');

const CTableDeleteLink = ({id, ...props}) => {
  return (
    <TableDeleteLink permission={getPermission()} href={curUrl.apiShow(id)} {...props} />
  );
};

CTableDeleteLink.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

CTableDeleteLink.getPermission = getPermission;

export default CTableDeleteLink;
