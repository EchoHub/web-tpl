import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
// import md5 from 'md5';
import { connect } from 'dva';
import { Dispatch } from 'redux';
// import Service from '@/public/service';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';
// import Cookie from 'js-cookie';
import style from './index.css';

const Login: React.FC<ALogin> = ({ form, userInfo, dispatch }) => {
  const { getFieldDecorator } = form;

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push('/')
    // form.validateFields(['accountNo', 'passwd'], (err, value) => {
      // if (!err) {
        // value.passwd = md5(value.passwd);
        // Service.login(value).then(({ data }: any) => {
        //   // todo 临时方案
        //   Cookie.set('token', data.token);
        //   Service.fetchIngralList().then((resp) => {
        //     dispatch({
        //       type: 'global/setUserInfo',
        //       payload: {
        //         ...data,
        //         mallId: resp[0].mallId
        //       }
        //     })
        //     router.push('/home');
        //   })
        // })
      // }
    // })
  }
  return (
    <div className={style.login}>
      <div className={style.login_modern}>
        <Form className={style.login_modern_form}
          layout={'horizontal'}
          hideRequiredMark={true}
          labelAlign={'left'}
          onSubmit={handleLoginSubmit}>
          <div className={style.login_modern_title}>hapiAdmin</div>

          <Form.Item>
            {
              getFieldDecorator('accountNo', {
                validateTrigger: 'onBlur',
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}$/, message: '请输入正确手机号' },
                ],
              })(<Input className={style.inputCls} 
                prefix={<Icon className={style.licn} type={'user'} />}
                name={'accountNo'} 
                placeholder={'请输入手机号'} />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('passwd', {
                validateTrigger: 'onBlur',
                rules: [
                  { required: true, message: '请输入密码' },
                ],
              })(<Input className={style.inputCls} 
                prefix={<Icon className={style.licn} type={'key'} />}
                type={'password'} 
                name={'passwd'} 
                placeholder={'请输入登录密码'} 
                />)
            }
          </Form.Item>
          <Button className={style.submit_btn} type={'primary'} block={true} htmlType={'submit'}>登录</Button>
        </Form>
        <i className={style.copyright}>copyright © 2020 哈皮设计</i>
      </div>
    </div>
  )
}

interface ALogin extends FormComponentProps {
  dispatch: Dispatch,
  userInfo: { accountNo: string, passwd: string }
}

const WrappedAppLogin = Form.create<ALogin>({ name: 'appLogin' })(Login)
export default connect((state: any) => {
  return {
    userInfo: state.global.userInfo
  }
})(WrappedAppLogin);
