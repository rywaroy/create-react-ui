import React from 'react';

const wrapStyles = ['position', 'left', 'right', 'top', 'bottom']; // 赋给外壳的样式

export default function materialWrap(Component: React.FC | React.ComponentClass, display = 'block') {
    return function ComponentWrap(props: any) {
        const wrapProps = {};
        let materialProps = {};
        let defaultProps = {};
        const materialChildren = [];
        const wrapChildren = [];
        const wrapStyle = {
            display,
        };
        Object.keys(props).forEach(prop => {
            if (prop === 'props') {
                if ('style' in props[prop]) {
                    Object.keys(props[prop].style).forEach(item => {
                        if (wrapStyles.indexOf(item) > -1) {
                            wrapStyle[item] = props[prop].style[item];
                            delete props[prop].style[item];
                        }
                    });
                }
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
            <div {...wrapProps} style={wrapStyle}>
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
