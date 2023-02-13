import React, { useState } from 'react'
import { Input, Form, Button, DatePicker, Select, Row, Col } from 'antd'
import shortId from 'shortid'
import { useDispatch } from 'react-redux'
import './style.css'


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
      <Col xl={24} sm={24}>
        <Form onFinish={handleSubmit} name='basic' form={form}>
          <Row className="row-form">          
            <Col xl={6} xs={10} sm={8}>
              <Form.Item
                className="txt-input"
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
            </Col>
              
                <Col span={4} md={6} lg={6} xl={4} offset={1}>
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
                <Col span={4} offset={1} className="date-input" >
                  {' '}
                  <DatePicker onChange={onChange}  />
                </Col>
                <Col span={4} md={2 , {offset:0}} sm={{offset:1}} xs={{offset:1}}>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className="btn-sub">
                      Submit
                    </Button>
                  </Form.Item>
              </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default FormComp
