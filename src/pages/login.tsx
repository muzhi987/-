import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/tools";
import { loginAPI } from "../services/auth";

function Login() {
  const nav = useNavigate();
  return (
    <div
      className="login"
      style={{
        height: "100vh",
        display: "inline-block",
        width: "100vw",
        backgroundColor: "pink",
      }}>
      <Card
        title="男通讯录社区管理平台"
        style={{ minWidth: "280px", width: "500px", margin: "80px auto" }}>
        <h1 style={{ textAlign: "center" }}>登陆</h1>
        <Form
          onFinish={async (v) => {
            const res: {
              code: number;
              data: any;
            } = await loginAPI({
              userName: v.userName,
              password: v.password,
            });
            if (res.code === 1) {
              message.error("登录成功");
              setToken(res.data);
            } else {
              message.error(res.data);
            }
            nav("/dashboard");
          }}
          //在antd中的栅格布局把每一行分为24列
          // 通过span控制每一列的宽度
          labelCol={{ span: 3 }}>
          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: "用户名不能为空" }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "密码不能为空" }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
