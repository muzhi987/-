import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { dalImg, uploadActionUrl } from "../utils/tools";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  //FileReader读取文件
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img); //把图片转换为base64的字符串
};

/*

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
*/

const MyUpload = ({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string | undefined;
  setImageUrl: any;
}) => {
  const [loading, setLoading] = useState(false); //上传状态
  // const [imageUrl, setImageUrl] = useState<string>(); //图片地址

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    //正在上传
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    //上传成功
    if (info.file.status === "done") {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj as RcFile, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
      console.log(info.file.response); //输出一下服务器端返回的数据
      setLoading(false);
      setImageUrl(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        //name 表示服务器端接收到的数据的属性名，这个参数可以从接口文档找到
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        //action 表示上传的服务器端接口地址
        action={uploadActionUrl}
        //上传之前
        // beforeUpload={beforeUpload}
        //开始上传
        onChange={handleChange}>
        {imageUrl ? (
          <img src={dalImg(imageUrl)} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default MyUpload;
