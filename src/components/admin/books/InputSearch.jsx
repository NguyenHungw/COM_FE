import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
// import { getAllUserYesPage } from '../../../services/api.service';

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        let query = "";
        if(values.author){
            query += `author=/${values.author}/i`
        }
        if(values.email){
            query += `&email=/${values.email}/i`
        }
        if(values.phone){
            query += `&phone=/${values.phone}/i`
        }
        if(query){
            props.handleSearch(query)// truyền từ compoent cha UserTable

        }

    };
   
    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`author`}
                        label={`Name`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`phone`}
                        label={`Số điện thoại`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("")
                            props.fetchUser()
                        }}
                    >
                        Clear
                    </Button>
                  
                </Col>
            </Row>
        </Form>
    );
};

// https://stackblitz.com/run?file=demo.tsx
// https://ant.design/components/form
// const InputSearch = () => {
//     return (
//         <div>
//             <AdvancedSearchForm />
//         </div>
//     );
// };

export default InputSearch;