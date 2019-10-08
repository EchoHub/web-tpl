// create-react-context
import * as React from 'react';
import TypeCheck from './typecheck';
import { FormItem, TextBox, Button } from '@/components/common';
// 创建 组件
function createComponent(type: any, child: React.ReactElement, key: string | number) {
    const nodeName = type.name.toLocaleLowerCase();
    const { props } = child;
    switch (nodeName) {
        case 'formitem':
            return <FormItem nodeRef={`formitem-${key}`} key={`formitem-${key}`} {...props} />;
        case 'textbox':
            return <TextBox key={`textbox-${key}`}  {...props}/>;
        case 'button':
            return <Button key={`button-${key}`} {...props} />;
    }
}
export function create(children: React.ReactNode | React.ReactNodeArray) {
    const isArray = TypeCheck.isArray(children);
    let __children = children, $$nodes = [], i = 0;
    if (!isArray) __children = [children];
    for (const child of __children as React.ReactNodeArray) {
        const type = (child as React.ReactElement).type;
        switch (typeof type) {
            case 'function':
                // component
                $$nodes.push(createComponent(type, child as React.ReactElement, i));
                break;
            case 'string':
            // React.ReactHTML
            default:
                // other
                $$nodes.push(child);
                break;
        }
        i ++;
    }
    return $$nodes;
}