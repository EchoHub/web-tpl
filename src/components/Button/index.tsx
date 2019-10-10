import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface ButtonProps {
    className?: string,
    children?: React.ReactNode,
    type?: 'text' | 'button',
    size?: 'mini' | 'normal' | 'large',
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default class Button extends React.Component<ButtonProps, {}>{
    static defaultProps = {
        type: 'button',
        size: 'normal',
        onClick: () => { }
    }
    render() {
        const { className, children, type, size, onClick } = this.props;
        return (<button
            className={cx('hp-button', className, {
                [`hp-button-${type}`]: type,
                [`hp-button-${size}`]: size,
            })}
            onClick={onClick}
        >
            {children}
        </button>);
    }
}
