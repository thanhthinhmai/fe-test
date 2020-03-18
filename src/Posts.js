import React, { useState } from 'react';
import { Modal, Button, Table, Divider, Input, Form } from 'antd';

function Posts(props) {
    const [dialogVisible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        category: ''
    });
    const [indexUpdate, setIndexUpdate] = useState(0);
    const { name, author, category } = formData;
    const [posts, setPosts] = useState([
        {
            key: '0',
            name: 'Post 1',
            author: 'Tom',
            category: 'Sport'
        },
        {
            key: '1',
            name: 'Post 2',
            author: 'Mike',
            category: 'Life'
        },
        {
            key: '2',
            name: 'Post 3',
            author: 'Tep',
            category: 'Musik'
        },
        {
            key: '3',
            name: 'Post 4',
            author: 'Jone',
            category: 'Society'
        }
    ]);
    const [dialogUpdate, setVisibleUpdate] = useState(false);
    const { Column } = Table;
    const { TextArea } = Input;
    const pStyle = {
        width: '100%',
        margin: '10px 0'
    };
    function deleteOrder(index) {
        const newOrder = [...posts];
        newOrder.splice(index, 1);
        setPosts(newOrder);
    }

    function addOrder() {
        const params = {
            key: posts.length + 1,
            name,
            author,
            category
        };
        const newPosts = [...posts, params];
        setPosts(newPosts);
        setVisible(false);
        setFormData('');
    }
    const updateFormData = event => {
        event.persist();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    function handleUpdate(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function updateOrder(index) {
        setVisibleUpdate(false);
        posts[index].name = formData.name;
        posts[index].author = formData.author;
        posts[index].category = formData.category;
        setPosts(posts);
    }
    function openModal(index) {
        setFormData(posts[index]);
        setVisibleUpdate(true);
        setIndexUpdate(index);
    }

    function createPost() {
        setVisible(true);
        setFormData({
            name: '',
            author: '',
            category: ''
        });
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        props.history.push('/');
    }
    return (
        <div className="Post">
            <div>
                <Button
                    type="default"
                    onClick={() => {
                        createPost();
                    }}
                    style={{ margin: 50, background: '#e4e4e4' }}
                >
                    Create Post
                </Button>
                <Button
                    type="default"
                    onClick={() => {
                        logout();
                    }}
                    style={{ background: '#e4e4e4' }}
                >
                    Logout
                </Button>
            </div>
            <Modal title="Add post" visible={dialogVisible} onOk={() => addOrder()} onCancel={() => setVisible(false)}>
                <Form>
                    <Input placeholder="Please enter title" name="name" value={name} onChange={updateFormData} />
                    <Input
                        placeholder="Please enter author"
                        name="author"
                        value={author}
                        onChange={updateFormData}
                        style={pStyle}
                    />
                    <TextArea
                        placeholder="Please enter category"
                        name="category"
                        value={category}
                        onChange={updateFormData}
                    />
                </Form>
            </Modal>
            <Table dataSource={posts} rowKey="uid">
                <Column title="Title" dataIndex="name" key="name" />
                <Column title="Author" dataIndex="author" key="author" />
                <Column title="Category" dataIndex="category" key="category" />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record, index) => (
                        <span>
                            <Button onClick={() => openModal(index)}>Edit</Button>
                            <Modal
                                title="Update Post"
                                visible={dialogUpdate}
                                onOk={() => updateOrder(indexUpdate)}
                                onCancel={() => setVisibleUpdate(false)}
                            >
                                <Form>
                                    <Input
                                        placeholder="Please enter title"
                                        name="name"
                                        value={name}
                                        onChange={e => {
                                            e.persist = () => {};
                                            handleUpdate(e);
                                        }}
                                    />
                                    <Input
                                        placeholder="Please enter author"
                                        name="author"
                                        style={pStyle}
                                        value={author}
                                        onChange={e => {
                                            e.persist = () => {};
                                            handleUpdate(e);
                                        }}
                                    />
                                    <TextArea
                                        placeholder="Please enter category"
                                        name="category"
                                        value={category}
                                        onChange={e => {
                                            e.persist = () => {};
                                            handleUpdate(e);
                                        }}
                                    />
                                </Form>
                            </Modal>
                            <Divider type="vertical" />
                            <Button
                                onClick={() => {
                                    deleteOrder(index);
                                }}
                            >
                                Delete
                            </Button>
                        </span>
                    )}
                />
            </Table>
        </div>
    );
}
export default Posts;
