import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { formatStyleObjToStr } from '@/public/utils/format';
import TypeCheck from '@/public/utils/typecheck';
import { render } from 'react-dom';
import Icn from '@/components/Icn';
export interface NotificationProps {
    className?: string
}
type NotificationConfig = {
    key?: string,
    title?: string,
    content: string,
    icon?: any,
    duration?: number,
    className?: string,
    autoClose?: boolean,
    style?: {
        [key: string]: any
    },
    theme?: 'success' | 'info' | 'warning' | 'error',
    onOk?: () => void,
    onCancel?: () => void
}
export default class Notification extends React.Component<NotificationProps, {}> {
    static $$container: HTMLDivElement;
    static $$cur: { [key: string]: HTMLDivElement } = {};
    static success(config: NotificationConfig) {
        Notification.open({
            ...config,
            theme: 'success'
        })
    }
    static info(config: NotificationConfig) {
        Notification.open({
            ...config,
            theme: 'info'
        })
    }
    static warning(config: NotificationConfig) {
        Notification.open({
            ...config,
            theme: 'warning'
        })
    }
    static error(config: NotificationConfig) {
        Notification.open({
            ...config,
            theme: 'error'
        })
    }
    static open({ key, content, title, icon, duration = 4500, className, style, autoClose = true, onOk, onCancel, theme }: NotificationConfig) {
        let notificationDivBox = document.querySelector('.hp-notification_box');
        if (!notificationDivBox) {
            notificationDivBox = document.createElement('div');
            notificationDivBox.setAttribute('class', 'hp-notification_box');
            document.body.append(notificationDivBox);
            Notification.$$container = notificationDivBox as HTMLDivElement;
        }
        const notificationDiv = document.createElement('div');
        notificationDiv.setAttribute('class', cx('hp-notification', className));
        render(<div className='hp-notification-body' style={style}>
            {icon && <div className='hp-notification-icon'>{icon}</div>}
            <div className='hp-notification-section'>
                <Icn className='hp-notification-close'
                    name={'close'} size={15}
                    color={'rgba(0,0,0,0.45)'}
                    onClick={Notification.close.bind(null, notificationDiv, onCancel)}
                />
                {title && <div className={cx('hp-notification-title', { [`hp-notification-${theme}`]: theme })}>{title}</div>}
                <div className='hp-notification-content'>{content}</div>
            </div>
        </div>, notificationDiv);
        const notificationDivs = document.querySelectorAll('.hp-notification_box .hp-notification');
        const noticLen = notificationDivs.length;
        notificationDivBox.append(notificationDiv);
        // const { offsetWidth } = notificationDiv as HTMLDivElement;
        let styl = {
            top: 0,
            right: '-1000px'
        }
        notificationDiv.setAttribute('style', formatStyleObjToStr(styl, ';'));
        const timer = setTimeout(() => {
            // 增加过渡效果
            Object.assign(styl, { opacity: 1, top: noticLen > 0 ? noticLen * 15 + 'px' : 0, right: 0 });
            notificationDiv.setAttribute('style', formatStyleObjToStr(styl))
            const timer2 = setTimeout(() => {
                let i = 0;
                const notificationDivs__ = document.querySelectorAll('.hp-notification_box .hp-notification');
                for (const node of notificationDivs__) {
                    Object.assign(styl, { top: (i - 1) * 15 + 'px' });
                    node && node.setAttribute('style', formatStyleObjToStr(styl));
                    i++;
                }
                if (autoClose) {
                    const timer3 = setTimeout(() => {
                        notificationDiv && notificationDivBox.removeChild(notificationDiv);
                        TypeCheck.isFunction(onOk) && onOk();
                        clearTimeout(timer3);
                    }, 200);
                }
                clearTimeout(timer2);
            }, duration);
            clearTimeout(timer);
        }, 300);
        key && (Notification.$$cur[key] = notificationDiv);
        return notificationDiv;
    }

    static update(config: NotificationConfig) {
        const { key, content } = config;
        key && Notification.$$cur[key] && (Notification.$$cur[key].querySelector('.hp-notification-content').innerHTML = content);
    }

    static close(notificationDiv: HTMLElement, onCancel?: () => void) {
        const notificationDivBox = Notification.$$container;
        notificationDiv && notificationDivBox.removeChild(notificationDiv);
        TypeCheck.isFunction(onCancel) && onCancel();
    }
}