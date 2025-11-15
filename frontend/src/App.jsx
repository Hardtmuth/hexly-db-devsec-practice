import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Card, Button, Form, Tabs, Tab } from 'react-bootstrap'
import { IconShieldLockFilled } from '@tabler/icons-react'

const App = () => {
  const { t, i18n } = useTranslation()

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col lg={6} className="offset-lg-3">
          <Card style={{ width: '18.4rem' }}>
            <Card.Body>
              <Card.Title className="text-center mb-3">
                {t('company')}
                <IconShieldLockFilled />
              </Card.Title>
              <Tabs defaultActiveKey="signIn" id="uncontrolled-tab" className="mb-3">
                <Tab eventKey="signUp" title={t('signUp.tab')}>
                  <Form>
                    <Form.Group className="mb-3" controlId="signUpForm-username">
                      <Form.Label>{t('signUp.text')}</Form.Label>
                      <Form.Control className="mb-3" type="name" placeholder={t('form.username')} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="signUpForm-email">
                      <Form.Control className="mb-3" type="email" placeholder={t('form.email')} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="signUpForm-password">
                      <Form.Control className="mb-3" type="password" placeholder={t('form.password')} />
                    </Form.Group>
                    <Button className="w-100" variant="primary">{t('signUp.button')}</Button>
                  </Form>
                </Tab>
                <Tab eventKey="signIn" title={t('signIn.tab')}>
                  <Form>
                    <Form.Group className="mb-3" controlId="signInForm-username">
                      <Form.Label>Введите данные для входа: </Form.Label>
                      <Form.Control className="mb-3" type="name" placeholder={t('form.username')} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="signInForm-password">
                      <Form.Control className="mb-3" type="password" placeholder={t('form.password')} />
                    </Form.Group>
                    <Button className="w-100" variant="primary">{t('signIn.button')}</Button>
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
