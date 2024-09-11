import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <Navbar className="bg-body-tertiary justify-content-between p-4">
      <Form inline>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
              <button className="button">
                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                <span>Lan</span>
              </button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default Header;