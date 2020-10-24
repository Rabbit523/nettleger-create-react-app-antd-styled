import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from "../../../context/auth";
import AuthService from "../../../service/auth.service";
import PageLoading from '../../../components/spin';

const SLoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
  transition: transform 0.5s ease,opacity 1s ease;
`;
const SFlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.type === 'title' ? 'center' : 'space-between'};
`;
const SForm = styled(Form)`
  max-width: 400px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background: #fff;
  padding: 40px;
  position: relative;
  @media (min-width: 360px) {
    min-width: 320px;
  }
  @media (min-width: 375px) {
    min-width: 360px;
  }
  input {
    height: 30px;
  }
`;
const SButton = styled(Button)`
  color: #1890ff;
  background: transparent;
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0;
`;
const SSubmitButton = styled.button`
  background: #47ffb3;
  color: #fff;
  border: none;
  padding: 7px 20px;
  font-weight: bold;
  text-transform: uppercase;
  outline: none;
  width: 100%;
  :focus, :hover {
    box-shadow: inset 0 0 0 2px #33fff9;
    cursor: pointer;
  }
`;
const SErrorPanel = styled.div`
  padding: 10px 0;
  p {
    color: red;
    font-weight: bold;
    text-align: center;
  }
`;

function LoginPage(props) {
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { setAuthData } = useContext(AuthContext);

  const onSubmit = values => {
    setLoading(true);
    AuthService.login(values).then(
      (res) => {
        setLoggedIn(false);
        setAuthData(res);
        props.history.push("/admin/pages");
        window.location.reload();
      },
      error => {
        console.log(error);
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setErrMsg(resMessage);
        setLoading(false);
      }
    );
  };

  if (isLoggedIn) {
    return <Redirect to="/admin/pages" />;
  }

  return (
    <SLoginWrap>
      <SForm
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        {isLoading && <PageLoading isLoading={isLoading} />}
        <SFlexDiv type="title">
          <h1>Logg inn</h1>                      
        </SFlexDiv>
        <SErrorPanel><p>{errMsg}</p></SErrorPanel>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Dette feltet er påkrevd!' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Post" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Dette feltet er påkrevd.!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Passord"
          />
        </Form.Item>
        <Form.Item>
          <SFlexDiv type="div">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Husk meg</Checkbox>
            </Form.Item>
            <SButton>Glemt passord?</SButton>
          </SFlexDiv>
        </Form.Item>
        <Form.Item>
          <SSubmitButton type="primary" htmlType="submit">Logg inn</SSubmitButton>
        </Form.Item>
      </SForm>
    </SLoginWrap>
  );
}

export default LoginPage;
