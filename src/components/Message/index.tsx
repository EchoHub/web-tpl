import * as React from 'react';
import { render } from 'react-dom';
import cx from 'classnames';
import './index.scss';
import { formatStyleObjToStr } from '@/public/utils/format';
import Icn from '@/components/Icn';
export interface MessageProps {
    className?: string
}
type Theme = 'success' | 'info' | 'warning' | 'error';
type MessageConfig = {
    content: string,
    theme?: Theme,
    duration?: number,
}
export default class Message extends React.Component<MessageProps, {}> {

    // 成功
    /**
     * 
     * @param content 消息内容
     * @param duration 显示时长
     */
    static success(content: string, duration?: number) {
        Message.show({ content, theme: 'success', duration });
    }
    // 消息
    /**
     * 
     * @param content 消息内容
     * @param duration 显示时长
     */
    static info(content: string, duration?: number) {
        Message.show({ content, theme: 'info', duration });
    }
    // 警告
    /**
     * 
     * @param content 消息内容
     * @param duration 显示时长
     */
    static warning(content: string, duration?: number) {
        Message.show({ content, theme: 'warning', duration });
    }
    // 错误
    /**
     * 
     * @param content 消息内容
     * @param duration 显示时长
     */
    static error(content: string, duration?: number) {
        Message.show({ content, theme: 'error', duration });
    }

    /**
     * 
     * @param content 消息内容
     * @param theme 消息主题
     * @param duration 显示时长 默认3000ms
     */
    static async show({
        content, theme = 'info', duration = 3000
    }: MessageConfig) {
        const message = document.createElement('div');
        message.setAttribute('class', cx('hp-message', { [`hp-message-${theme || 'info'}`]: theme }));
        const colors = {
            success: '#52a41c',
            info: ' #1890ff',
            warning: '#faad14',
            error: '#ff4d4f'
        };
        render(<div>
            <Icn className='hp-message-icon' name={theme} color={colors[theme]} />
            {content}</div>, message);
        let box = document.querySelector('.hp-message_box');
        if (!box) {
            box = document.createElement('div');
            box.setAttribute('class', 'hp-message_box');
            document.body.append(box);
        }
        const messageDivs = document.querySelectorAll('.hp-message_box .hp-message');
        const msgLen = messageDivs.length;
        box.appendChild(message);
        const { offsetWidth } = message as HTMLDivElement;
        let styl = {
            top: 0,
            marginLeft: -offsetWidth / 2 + 'px'
        }
        message.setAttribute('style', formatStyleObjToStr(styl, ';'));

        const p1 = await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                // 增加过渡效果
                Object.assign(styl, { opacity: 1, top: msgLen > 0 ? msgLen * 15 + 'px' : 0 });
                message.setAttribute('style', formatStyleObjToStr(styl))
                clearTimeout(timer);
                resolve(true)
            }, 300);
        })
        if (p1) {
            const p2 = await new Promise((resolve, reject) => {
                const timer2 = setTimeout(() => {
                    let i = 0;
                    const messageDivs__ = document.querySelectorAll('.hp-message_box .hp-message');
                    for (const node of messageDivs__) {
                        Object.assign(styl, { top: (i - 1) * 15 + 'px' });
                        node.setAttribute('style', formatStyleObjToStr(styl));
                        i++;
                    }
                    clearTimeout(timer2);
                    resolve(true)
                }, duration);
            })
            if (p2) {
                const timer3 = setTimeout(() => {
                    box.removeChild(message);
                    clearTimeout(timer3);
                }, 200);
            }
        }
    }
}
