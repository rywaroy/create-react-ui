import React from 'react';

export default function materialWrap(Component: React.FC | React.ComponentClass, display = 'block') {
    return function ComponentWrap(props: any) {
        const wrapProps = {};
        let materialProps = {};
        let defaultProps = {};
        Object.keys(props).forEach(prop => {
            if (prop === 'props') {
                materialProps = props[prop];
            } else if (prop === 'defaultprops') {
                defaultProps = props[prop];
            } else {
                wrapProps[prop] = props[prop];
            }
        });
        return (
            <div {...wrapProps} style={{ display }}>
                <Component {...materialProps} {...defaultProps} />
                {props.children}
            </div>
        );
    };
}
