import propTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const TableActions = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(clsx(
        "divide-x-[1px] space-x-2 divide-[rgba(5,5,5,0.06)] [&>*:not(:first-child)]:pl-2 empty:before:content-['-'] before:text-black/45",
        className
      ))}
      {...props}
    >
      {children}
    </div>
  );
};

TableActions.propTypes = {
  className: propTypes.node,
  children: propTypes.node,
};

export default TableActions;
