import React, { useState, useEffect } from 'react';
import { Upload, message, Button } from 'antd';
import './App.css';
const { Dragger } = Upload;

function App() {
  const [data, setData] = useState([])
  const [deli, setDeli] = useState({ deli: '', num: 0 })
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      // var deli = document.getElementById('deli').value;
      // var num = document.getElementById('num').value;
      // console.log(document.getElementById('deli').value, document.getElementById('num').value)
      // debugger
      setDeli({ deli: document.getElementById('deli').value, num: document.getElementById('num').value })
      if (info.file.status !== "uploading") {
        let reader = new FileReader();
        reader.onload = e => {
          // debugger
          setData((e.target.result).split('\n').map((item, index) => item.split(`${deli.deli}`)));
        };
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  return (
    <div className="App" style={{ width: '30%' }}>
      <table>
        <tr style={{ textAlign: 'right' }}>
          <td> Deli :</td>
          <td> <input type='text' id='deli' name='deli' /> </td>
        </tr>
        <tr>
          <td> Num of data : </td>
          <td><input type='text' id='num' name='num' /> </td>
        </tr>
      </table>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          {/* <InboxOutlined /> */}
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
    </p>
      </Dragger>
      <table>
        <tr>
          <td>Name</td>
          <td>Address</td>
          <td>City</td>
          <td>Country</td>
          <td>Phone</td>
        </tr>
        {(data.splice(0, deli.num)).map((ele, index) => <tr key={index}>
          {ele.map(item => <td>{item}</td>
          )}
        </tr>
        )}
      </table>
    </div>
  );
}

export default App;
