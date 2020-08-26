import React from 'react';

export default function materialWrap(Component: React.FC | React.ComponentClass, display = 'block') {
    return function ComponentWrap(props: any) {
        const wrapProps = {};
        let materialProps = {};
        let defaultProps = {};
        const materialChildren = [];
        const wrapChildren = [];
        Object.keys(props).forEach(prop => {
            if (prop === 'props') {
                materialProps = props[prop];
            } else if (prop === 'defaultprops') {
                defaultProps = props[prop];
            } else if (prop === 'children') {
                props.children.forEach(item => {
                    if (item) {
                        if (item.props?.className === 'dragIcon' || item.props?.className === 'blockBottom') {
                            wrapChildren.push(item);
                        } else {
                            materialChildren.push(item);
                        }
                    }
                });
            } else {
                wrapProps[prop] = props[prop];
            }
        });
        return (
            <div {...wrapProps} style={{ display }}>
                {
                    materialChildren.length > 0
                        ? (
                            <Component {...materialProps} {...defaultProps}>
                                {materialChildren}
                            </Component>
                        )
                        : <Component {...materialProps} {...defaultProps} />
                }

                {wrapChildren}
            </div>
        );
    };
}
