import React, { useState } from 'react'
import { Input, Form, Button, DatePicker, Select, Row, Col } from 'antd'
import shortId from 'shortid'
import { useDispatch } from 'react-redux'

const FormComp = () => {
  const dispatch = useDispatch((store) => {
    return store.todo
  })
  const [date, setDate] = useState(0)
  const [topic, setTopic] = useState('')
  const [form] = Form.useForm()
  const inputRef = React.useRef(null)

  function onChange(date, dateString) {
    if (date !== null) {
      setDate(+new Date(date._d))
    } else {
      setDate(0)
    }
  }
  let handleSelect = (value) => {
    setTopic(value)
  }
  let handleSubmit = (e) => {
    let todo = {
      id: shortId.generate(),
      text: e.todo,
      date,
    }

    if (topic) {
      todo.topic = topic
    }
    dispatch({
      type: 'ADD_TODO',
      payload: todo,
    })
    form.resetFields()
  }
  const { Option } = Select
  return (
    <Row>
      <Col xl={12} sm={24}>
        <Form onFinish={handleSubmit} name='basic' form={form}>
          <Row>
            <Col span={6} md={6} lg={6} xl={6}>
              <Form.Item>
                <Select
                  showSearch
                  placeholder='Topic'
                  onSearch={handleSelect}
                  onChange={handleSelect}
                >
                  <Option value='Short term'>Short term</Option>
                  <Option value='Long term'>Long term</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              {' '}
              <DatePicker onChange={onChange} />
            </Col>
          </Row>
          <Form.Item
            name='todo'
            rules={[
              {
                required: true,
                message: 'Please fill input.',
              },
            ]}
          >
            <Input
              placeholder='Enter your task'
              ref={inputRef}
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default FormComp
