import * as React from 'react';
import { Form, TextBox, Password, Title, Button, Message, Notification } from '@/components/common';
import './index.scss'
import { history } from '@/pages/routers';

export default class Login extends React.Component {
    private myForm: React.Ref<Form>;
    constructor(props: {}) {
        super(props);
        this.myForm = React.createRef();
    }
    handleFormValidity = () => {
        const myForm = (this.myForm as React.MutableRefObject<Form>).current;
        const validity = myForm.getReportValidity();
        const { valid, reports } = validity;
        if (!valid) {
            Message.error(reports[0].msg)
            return false;
        }
        return myForm.value;
    }

    handleLogin = () => {
        const valid = this.handleFormValidity();
        if (valid) {
            Notification.open({
                title: '登录提示',
                content: '登录成功',
                success: () => {
                    history.push('/home');
                }
            })
        }
    }

    componentDidMount() {
        // init bg ans
        loadBgAnimation();
    }

    render() {
        return <div className='hp-login'>
            <canvas id='Mycanvas'></canvas>
            <div className="hp-login_center">
                <Title color={'rgba(255, 255, 255, .9)'}>Hapi Design</Title>
                <Form ref={this.myForm} layout={'flex'}>
                    <Form.Item>
                        <TextBox name={'username'} placeholder={'请输入账号'} required requiredPatternMessage={'账号不能为空'} />
                    </Form.Item>
                    <Form.Item className={'mt-20'}>
                        <Password name={'password'} placeholder={'请输入密码'} required requiredPatternMessage={'密码不能为空'} />
                    </Form.Item>
                    <Button className={'mt-20'} type="text" onClick={this.handleLogin}>登 录</Button>
                </Form>
                <Button className={'btn-forget'} type="text" size={'mini'}>忘记密码?</Button>
            </div>
            <div className="footer">
                copyright &copy; 2019 哈皮技术部出品
            </div>
        </div>
    }

}
function loadBgAnimation() {
    //定义画布宽高和生成点的个数
    const WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 35;

    const canvas = document.getElementById('Mycanvas') as any;
    canvas.width = WIDTH,
        canvas.height = HEIGHT;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'rgba(0,0,0,0.2)',
        context.strokeWidth = 1,
        context.fillStyle = 'rgba(0,0,0,0.1)';
    let circleArr = [] as any[];

    //线条：开始xy坐标，结束xy坐标，线条透明度
    function Line(x: number, y: number, _x: number, _y: number, o: number) {
        // @ts-ignore
        const _t = this;
        _t.beginX = x,
            _t.beginY = y,
            _t.closeX = _x,
            _t.closeY = _y,
            _t.o = o;
    }
    //点：圆心xy坐标，半径，每帧移动xy的距离
    function Circle(x: number, y: number, r: number, moveX: number, moveY: number) {
        // @ts-ignore
        const _t = this;
        _t.x = x,
            _t.y = y,
            _t.r = r,
            _t.moveX = moveX,
            _t.moveY = moveY;
    }
    //生成max和min之间的随机数
    function num(max: number, _min?: number) {
        const min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // 绘制原点
    function drawCricle(cxt: any, x: number, y: number, r: number, moveX?: number, moveY?: number) {
        // @ts-ignore
        const circle = new Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
    }
    //绘制线条
    function drawLine(cxt: any, x: number, y: number, _x: number, _y: number, o: number) {
        // @ts-ignore
        const line = new Line(x, y, _x, _y, o)
        cxt.beginPath()
        cxt.strokeStyle = 'rgba(0,0,0,' + o + ')'
        cxt.moveTo(line.beginX, line.beginY)
        cxt.lineTo(line.closeX, line.closeY)
        cxt.closePath()
        cxt.stroke();

    }
    //初始化生成原点
    function init() {
        circleArr = [] as any[];
        for (let i = 0; i < POINT; i++) {
            circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10) / 40, num(10, -10) / 40));
        }
        draw();
    }

    //每帧绘制
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < POINT; i++) {
            drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
        }
        for (let i = 0; i < POINT; i++) {
            for (let j = 0; j < POINT; j++) {
                if (i + j < POINT) {
                    const A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                        B = Math.abs(circleArr[i + j].y - circleArr[i].y);
                    const lineLength = Math.sqrt(A * A + B * B);
                    const C = 1 / lineLength * 7 - 0.009;
                    const lineOpacity = C > 0.03 ? 0.03 : C;
                    if (lineOpacity > 0) {
                        drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
                    }
                }
            }
        }
    }

    //调用执行
    window.onload = function () {
        init();
        setInterval(function () {
            for (let i = 0; i < POINT; i++) {
                const cir = circleArr[i];
                cir.x += cir.moveX;
                cir.y += cir.moveY;
                if (cir.x > WIDTH) cir.x = 0;
                else if (cir.x < 0) cir.x = WIDTH;
                if (cir.y > HEIGHT) cir.y = 0;
                else if (cir.y < 0) cir.y = HEIGHT;

            }
            draw();
        }, 16);
    }
}