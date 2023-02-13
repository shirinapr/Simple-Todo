import React, { useState, useEffect } from 'react';

import ModalComp from '../Modal';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button, Popconfirm, message, Row, Col } from 'antd';
import moment from 'moment';
import './style.css';

const ListComp = (props) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const [isVisible, setIsVisible] = useState(false);
  const currentTopic = useSelector((state) => state.currentTopic);
  useEffect(() => {
    console.log('component changed');
  });
  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    });
    message.success('Click on Yes');
  };

  const handleEdit = (item) => {
    message.success('Succeed'); //*
    dispatch({
      type: 'ACTIVATE_TODO',
      payload: item.id,
    });
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  };

  function cancel(e) {
    console.log(e);
    message.error('Canceled'); //*
  }
  const func = (a, b) => {
    return b.date - a.date;
  };
  let newTodo = todo;

  if (currentTopic !== 'all') {
    newTodo = todo.filter((t) => {
      return t.topic === currentTopic;
    });
  }

  return (
    <>
      <ModalComp visible={isVisible} setIsVisible={setIsVisible} />
      <Row>
        <Col flex={2}>
          <List
            className="task-list"
            bordered
            dataSource={newTodo.sort(func)}
            renderItem={(item) => (
              <List.Item>
                {item.text}
                &nbsp;
                {item.date !== 0 ? moment(item.date).format('ll') : ''}
                &nbsp;
                <Popconfirm
                  title="Are you sure to edit this task?"
                  onConfirm={() => {
                    handleEdit(item);
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" className="edit">
                    Edit
                  </Button>
                </Popconfirm>
                &nbsp;
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => {
                    handleDelete(item.id);
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" className="delete">
                    Delete
                  </Button>
                </Popconfirm>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default ListComp;
