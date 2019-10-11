import * as React from 'react';
import cx from 'classnames';
import './index.scss';
import { formatStyleObjToStr } from '@/public/utils/format';
import { render } from 'react-dom';
import Icn from '@/components/Icn';
export interface NotificationProps {
    className?: string
}
type NotificationConfig = {
    title?: string,
    content: string,
    icon?: any,
    duration?: number,
    className?: string,
    autoClose?: boolean,
    style?: {
        [key: string]: any
    },
    success?: () => void,
    fail?: () => void
}
export default class Notification extends React.Component<NotificationProps, {}> {

    static async open({ content, title, icon, duration = 4500, className, style, autoClose = true, success, fail }: NotificationConfig) {
        let notificationDivBox = document.querySelector('.hp-notification_box');
        if (!notificationDivBox) {
            notificationDivBox = document.createElement('div');
            notificationDivBox.setAttribute('class', 'hp-notification_box');
            document.body.append(notificationDivBox);
        }
        const notificationDiv = document.createElement('div');
        notificationDiv.setAttribute('class', cx('hp-notification', className));
        render(<div className='hp-notification-body' style={style}>
            {icon && <div className='hp-notification-icon'>{icon}</div>}
            <div className='hp-notification-content'>
                <Icn className='hp-notification-close' name={'close'} size={15} color={'rgba(0,0,0,0.45)'}/>
                {title && <div className='hp-notification-title'>{title}</div>}
                <div className='hp-notification-content'>{content}</div>
            </div>
        </div>, notificationDiv);
        const notificationDivs = document.querySelectorAll('.hp-notification_box .hp-notification');
        const noticLen = notificationDivs.length;
        notificationDivBox.append(notificationDiv);
        const { offsetWidth } = notificationDiv as HTMLDivElement;
        let styl = {
            top: 0,
            right: '-1000px'
        }
        notificationDiv.setAttribute('style', formatStyleObjToStr(styl, ';'));
        const p1 = await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                // 增加过渡效果
                Object.assign(styl, { opacity: 1, top: noticLen > 0 ? noticLen * 15 + 'px' : 0, right: 0 });
                notificationDiv.setAttribute('style', formatStyleObjToStr(styl))
                clearTimeout(timer);
                resolve(true)
            }, 300);
        })
        if (p1) {
            const p2 = await new Promise((resolve, reject) => {
                const timer2 = setTimeout(() => {
                    let i = 0;
                    const notificationDivs__ = document.querySelectorAll('.hp-notification_box .hp-notification');
                    for (const node of notificationDivs__) {
                        Object.assign(styl, { top: (i - 1) * 15 + 'px' });
                        node.setAttribute('style', formatStyleObjToStr(styl));
                        i++;
                    }
                    clearTimeout(timer2);
                    resolve(true)
                }, duration);
            })
            if (p2 && autoClose) {
                const timer3 = setTimeout(() => {
                    notificationDivBox.removeChild(notificationDiv);
                    clearTimeout(timer3);
                }, 200);
            }
        }
    }
}
