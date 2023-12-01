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
import { useEffect, useState } from "react";
import { addDataAPI, delByIdAPI, loadDataAPI } from "../services/forums";
import { dalImg } from "../utils/tools";

function Forums() {
  const [isShow, setIsShow] = useState(false);
  const [list, setList] = useState([]);

  const [myForm] = Form.useForm(); //使他获取form组件

  const loadData = () => {
    loadDataAPI().then((res) => setList(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <Card
        title="男通讯录板块管理"
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
          dataSource={list}
          //列
          columns={[
            {
              title: "犯人编号",
              // value 表示当前单元格数据，如果没有设置dataIndex，那么参数一和参数二数据一样
              // record表示当前行数据
              render(value, record, index) {
                return index + 1;
              },
              align: "center",
              width: "90px",
            },
            {
              title: "犯人名字",
              dataIndex: "name",
              align: "center",
            },
            {
              title: "犯人封面图",

              render(v) {
                return (
                  <img
                    src={dalImg(v.coverImage)}
                    style={{ width: "60px", maxHeight: "60px" }}
                  />
                );
              },
              align: "center",
              width: "90px",
            },
            { title: "犯人简介", dataIndex: "desc" },
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
                        onConfirm={async () => {
                          await delByIdAPI(value.id);
                          message.success("删除成功");
                          //初始化之后重新调接口
                          loadData();
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
        onOk={() => {
          myForm
            .validateFields() //验证通过之后会走这个函数，then可以获取当前表单中的数据
            .then(async (v) => {
              console.log(v);
              await addDataAPI(v);
              setIsShow(false);
              loadData();
              message.success("添加成功");
            })
            .catch((err) => {});
        }}
        //maskClosable 点击遮罩层是否关闭
        maskClosable={false}>
        <Form labelCol={{ span: 3 }} form={myForm}>
          <Form.Item
            label="名字"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入名字",
              },
            ]}>
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Forums;
