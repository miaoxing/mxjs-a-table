import React from 'react';
import TableDeleteLink from './TableDeleteLink';
import curUrl from "@mxjs/cur-url";

const CTableDeleteLink = ({id, ...props}) => <TableDeleteLink href={curUrl.apiDestroy(id)} {...props} />;

export default CTableDeleteLink;
