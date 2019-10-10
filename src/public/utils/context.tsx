// create-react-context
import * as React from 'react';
import TypeCheck from './typecheck';
import { FormItem, TextBox, Password, Button } from '@/components/common';

function createReactForwardComp(VNode: React.ReactNode) {
}
// 创建 组件
function createComponent(type: any, child: React.ReactElement, key: string | number) {
    const nodeName = type.name.toLocaleLowerCase();
    const { props } = child;
    switch (nodeName) {
        case 'formitem':
            const FFormItem = React.forwardRef((props, ref: React.LegacyRef<FormItem>) =>
                <FormItem ref={ref} {...props} />
            )
            return <FFormItem key={`formitem-${key}`} ref={`formitem-${key}`} {...props} />;
        case 'textbox':
            const TTextBox = React.forwardRef((props, ref: React.LegacyRef<TextBox>) =>
                <TextBox ref={ref} {...props} />
            )
            return <TTextBox key={`textbox-${key}`} ref={`input-${key}`} {...props} />;
        case 'password':
            const PPassword = React.forwardRef((props, ref: React.LegacyRef<Password>) =>
                <Password ref={ref} {...props} />
            )
            return <PPassword key={`password-${key}`} ref={`input-${key}`} {...props} />;
        case 'button':
            const BButon = React.forwardRef((props, ref: React.LegacyRef<Button>) =>
                <Button ref={ref} {...props}/>
            )
            return <BButon key={`button-${key}`} ref={`button-${key}`} {...props} />;
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
        i++;
    }
    return $$nodes;
}