import React, { useState } from "react";
import { AutoComplete, Button, Card, Col, Form, Input } from "antd";
import { IRocket } from "@/models";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "@/hooks/redux";
import { addRocket } from "@/store/rocket/rocketSlice";
import { useSearchUsersQuery } from "@/store/github/github.api";
import { useDebounce } from "@/hooks/useDebounce";

const RocketForm: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [form] = Form.useForm();
    const debounced = useDebounce(searchQuery);

    const dispatch = useAppDispatch()

    const [gitHubUser, setGitHubUser] =
        useState<string | null>();

    const onSelect = (user: string) => {
        setGitHubUser(user);
    };

    const onSearch = (query: string) => {
        setSearchQuery(query);
    }

    const { data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 2
    });

    const onFinish = (
        values: Omit<IRocket, "id" | "username">
    ) => {
        if (gitHubUser) {
            dispatch(addRocket({ ...values, id: uuid() as unknown as number, username: gitHubUser }));
            form.resetFields();
        }
    };

    return (
        <Col
            span={6}
            style={{
                minWidth: "50%"
            }}
        >
            <Card
                title={"Add new..."}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please input title" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Rocket Name"
                        name="rocketName"
                        rules={[{ required: true, message: "Please input rocket name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input description" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="GitHub User"
                        name="username"
                        rules={[{ required: true, message: "Please select gitHub user" }]}
                    >
                        <AutoComplete
                            options={
                                data?.map(item => ({ label: item.login, value: item.login }))
                            }
                            style={{ width: "100%" }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="Input Here"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                            Create rocket
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    );
};

export default RocketForm;