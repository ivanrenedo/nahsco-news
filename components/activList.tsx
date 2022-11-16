import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React, { Children } from 'react';


const NavLink = ({ children, activeClassName, ...props }) => {
    const { asPath } = useRouter()
    const child = Children.only(children)
    const childClassName = child.props.className || ''
    const { pathname } = props.href;
    const { as } = props;
    const className =
        asPath === pathname || asPath === as
            ? `${childClassName} ${activeClassName}`.trim()
            : childClassName;

    return (
        <Link href={{ pathname: `${pathname}` }} {...props}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    )
}

NavLink.propTypes = {
    activeClassName: PropTypes.string.isRequired,
}

export default NavLink