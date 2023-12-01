import {
  Button,
  Table,
  Card,
  Form,
  Input,
  Space,
  Modal,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";

function DemoTable() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="container">
      <Card
        title="数据展示"
        extra={
          <>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => setIsShow(true)}></Button>
          </>
        }>
        <Form layout="inline">
          <Form.Item label="名字">
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item>
            <Button icon={<SearchOutlined />}></Button>
          </Form.Item>
        </Form>
        <Table
          style={{ marginTop: "8px" }}
          bordered
          rowKey="id"
          // 数据源
          dataSource={[
            {
              id: "1",
              name: "小虎",
              desc: "LPL第一中单,中单万花筒",
            },
            {
              id: "2",
              name: "faker",
              desc: "一直在山顶的男人,世界最强中单",
            },
            {
              id: "3",
              name: "TheShy",
              desc: "LPL第一个S赛世界冠军,LPL上单教父,从此在河道剑魔没有一个带怕的",
            },
            {
              id: "3",
              name: "UZI",
              desc: "有的人还活着，就开始被人怀念了",
            },
          ]}
          //列
          columns={[
            {
              title: "序号",
              // value 表示当前单元格数据，如果没有设置dataIndex，那么参数一和参数二数据一样
              // record表示当前行数据
              render(value, record, index) {
                return index + 1;
              },
            },
            {
              title: "名字",
              dataIndex: "name",
            },
            { title: "履历", dataIndex: "desc" },
            {
              title: "操作",
              render(value) {
                return (
                  <>
                    <Space>
                      <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                          console.log(value);
                        }}
                      />
                      <Popconfirm
                        title="是否确认删除？"
                        onConfirm={() => {
                          message.success("删除成功");
                        }}>
                        <Button
                          type="primary"
                          size="small"
                          icon={<DeleteOutlined />}
                          danger
                        />
                      </Popconfirm>
                    </Space>
                  </>
                );
              },
            },
          ]}
        />
      </Card>
      <Modal
        open={isShow}
        title="编辑"
        onCancel={() => setIsShow(false)}
        onOk={() => setIsShow(false)}
        //maskClosable 点击遮罩层是否关闭
        maskClosable={false}>
        <Form>
          <Form.Item label="名字">
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item label="简介">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DemoTable;
