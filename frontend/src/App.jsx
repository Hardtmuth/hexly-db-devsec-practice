import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Tabs, Tab } from 'react-bootstrap'
import { IconShieldLockFilled } from '@tabler/icons-react'

const App = () => {

  return (
    <Container className='mt-5'>
      <Row className='justify-content-md-center'>
        <Col lg={6} className='offset-lg-3'>
          <Card style={{ width: '18.4rem' }}>
            <Card.Body>
              <Card.Title>
                Secure Log <IconShieldLockFilled />
              </Card.Title>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="signUp" title="Зарегистрироваться">
                  <Form>
                    <Form.Group className="mb-3" controlId="registrationForm">
                      <Form.Label>Заполните форму регистрации: </Form.Label>
                      <Form.Control className="mb-3" type='name' placeholder='Имя Пользователя' />
                      <Form.Control className="mb-3" type='email' placeholder='Email' />
                      <Form.Control className="mb-3" type='password' placeholder='Пароль' />
                      <Button className="w-100" variant="primary" >Зарегистрироваться</Button>
                    </Form.Group>
                  </Form>
                </Tab>
                <Tab eventKey="signIn" title="Войти">
                  <Form>
                    <Form.Group className="mb-3" controlId="registrationForm">
                      <Form.Label>Введите данные для входа: </Form.Label>
                      <Form.Control className="mb-3" type='name' placeholder='Имя Пользователя' />
                      <Form.Control className="mb-3" type='password' placeholder='Пароль' />
                      <Button className="w-100" variant="primary" >Войти</Button>
                    </Form.Group>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App
