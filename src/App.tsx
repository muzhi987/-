import React, { useRef, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
// import DemoTable from "./components/DemoTable";
import bEr from "./assets/lnbe.jpeg";
import { Outlet, useNavigate } from "react-router-dom";
import MyIcon from "./components/Myicons";
import useManager from "./hooks/use-manager";
import { dalImg } from "./utils/tools";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const { info } = useManager();
  const tagImg = useRef<HTMLImageElement>(null); //通过ref获取dom元素
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      {/* collapsed 表示是否折起 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <img
            style={{
              width: "40px",
              maxWidth: "60px",
              display: "block",
              margin: "20px auto",
            }}
            src={bEr}
            alt=""
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            // console.log(key);
            nav(key);
          }}
          items={[
            {
              key: "/dashboard",
              icon: <MyIcon type="icon-kanban" />,
              label: "看板",
            },
            {
              key: "/products",
              icon: <MyIcon type="icon-shangpin" />,
              label: "商品管理",
            },
            {
              key: "/users",
              icon: <MyIcon type="icon-huiyuan" />,
              label: "会员管理",
            },
            {
              key: "/forums",
              icon: <MyIcon type="icon-fengche" />,
              label: "男同论坛版块",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h2 style={{ display: "inline-block" }}>男同讯录社区管理平台</h2>
          <span style={{ color: "gray", marginLeft: "16px" }}>
            全球最大的男同交流网站
          </span>
          <div
            className="info"
            style={{
              display: "inline-block",
              float: "right",
              marginRight: "20px",
            }}>
            <img
              ref={tagImg}
              src={dalImg(info.avatar)}
              onError={() => {
                //当图片加载失败的时候 设置默认图
                tagImg.current!.src = dalImg("");
              }}
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              alt=""
            />
            <span style={{ height: "1rem" }}>{info.nickName}</span>
          </div>
        </Header>
        <Content
          style={{
            margin: "16px 12px",
            padding: 12,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
