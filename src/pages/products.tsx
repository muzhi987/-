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
import {
  addDataAPI,
  delByIdAPI,
  loadDataAPI,
  loadDataByIdAPI,
  modifyDataByAPI,
} from "../services/products";
import { dalImg } from "../utils/tools";
import MyUpload from "../components/MyUpload";
import MyEditor from "../components/MyEditor";

function Products() {
  const [isShow, setIsShow] = useState(false);
  const [currentId, setCurrentId] = useState(""); //当前id

  const [query, setQuery] = useState({}); //查询条件

  const [imageUrl, setImageUrl] = useState<string>(); //图片地址
  //编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");
  const [list, setList] = useState([]); //列表
  const [total, setTotal] = useState(0); //总数量

  const [myForm] = Form.useForm(); //使他获取form组件

  const loadData = () => {
    loadDataAPI(query).then((res) => {
      setList(res.data);
      setTotal(res.total);
    });
  };

  useEffect(() => {
    loadData();
  }, [query]);

  useEffect(() => {
    if (!isShow) {
      setCurrentId(""); //重置数据
      setImageUrl(""); //重置图片数据为空
      setHtml(""); //重置富文本编辑器数据为空
    }
  }, [isShow]);

  return (
    <div className="container">
      <Card
        title="商品管理"
        extra={
          <>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => setIsShow(true)}></Button>
          </>
        }>
        <Form
          layout="inline"
          onFinish={(v) => {
            // message.info("根据关键词查询：" + v.name);
            setQuery({
              page: 1,
              name: v.name,
            });
          }}>
          <Form.Item label="名字" name="name">
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" icon={<SearchOutlined />}></Button>
          </Form.Item>
        </Form>
        <Table
          // rowSelection={{
          //   onSelect(r) {
          //     console.log(r);
          //   },
          // }}
          style={{ marginTop: "8px" }}
          bordered
          rowKey="id"
          // 数据源
          dataSource={list}
          //pagination分页
          pagination={{
            total, //总数量
            //分页改变 pageSize（per） 表示每一页展示的数量
            onChange(page, per) {
              // loadData(page);
              setQuery({
                ...query,
                page: page,
                per,
              });
            },
          }}
          //列
          columns={[
            {
              title: "犯人编号",
              // value 表示当前单元格数据，如果没有设置dataIndex，那么参数一和参数二数据一样
              // record表示当前行数据
              render(_value, _record, index) {
                return index + 1;
              },
              align: "center",
              width: "90px",
            },

            {
              title: "封面",

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
            { title: "简介", dataIndex: "desc" },
            {
              title: "价格",
              dataIndex: "price",
            },
            {
              title: "分类",
              render(v) {
                return <>{v.category ? v.category.name : "暂无"}</>;
              },
            },
            { title: "库存", dataIndex: "amount" },
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
                        onClick={async () => {
                          //根据id获取数据
                          const data = await loadDataByIdAPI(value.id);
                          setIsShow(true);
                          myForm.setFieldsValue(data); //设置表单数据
                          setCurrentId(data.id); //存储当前点击的ID
                          setImageUrl(data.coverImage); //存储当前点击的图片
                          setHtml(data.content);
                          console.log(data);
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
        width="80%"
        //destroyOnClose关闭窗口之后销毁内容
        //如果和表单结合使用，需要设置form表单的 preserve 属性
        destroyOnClose
        open={isShow}
        title="编辑"
        onCancel={() => setIsShow(false)}
        onOk={() => {
          myForm
            .validateFields() //验证表单内容
            //验证通过之后会走这个函数，then可以获取当前表单中的数据
            .then(async (v) => {
              //根据currentId的值判断是新增还是修改
              if (currentId) {
                await modifyDataByAPI(currentId, {
                  ...v,
                  coverImage: imageUrl,
                  content: html,
                });
              } else {
                await addDataAPI({ ...v, coverImage: imageUrl, content: html });
              }
              setIsShow(false);
              loadData();
            })
            .catch((_err) => {});
        }}
        //maskClosable 点击遮罩层是否关闭
        maskClosable={false}>
        <Form labelCol={{ span: 3 }} form={myForm} preserve={false}>
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
          <Form.Item label="犯人瑟图">
            {/* 父组件向子组件传参 */}
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
          <Form.Item label="详情">
            <MyEditor html={html} setHtml={setHtml} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Products;
