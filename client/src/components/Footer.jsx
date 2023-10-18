import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <Container>
        <Row>
            <footer className="py-6 px-6 text-center">
                <p className="mb-0 fs-4">Copyrights @ 2023 <a href="#" target="_blank" className="pe-1 text-primary text-decoration-underline">Sree Lakshmi Engineering</a> Designed by <a href="#">Heptre Techworks Pvt Ltd</a></p>
            </footer>
        </Row>
    </Container>
    
  )
}

export default Footer
