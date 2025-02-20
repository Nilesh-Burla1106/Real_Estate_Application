import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import NavBar from './NavBar';
import { Button, Container, Row, Col, Table, Alert, Card, Modal } from 'react-bootstrap';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('uploadedData');
    if (savedData) {
      setUploadedData(JSON.parse(savedData));
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const workbook = XLSX.read(ab, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setUploadedData(jsonData);
      localStorage.setItem('uploadedData', JSON.stringify(jsonData));
      setError(null);
      setShowTable(true); // Show data in full-screen modal
    };

    reader.onerror = (err) => {
      console.error('Error reading file:', err);
      setError('Error reading file!');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleRemoveData = () => {
    setUploadedData([]);
    localStorage.removeItem('uploadedData');
    setShowTable(false);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #283048, #859398)', minHeight: '100vh' }}>
      <NavBar title="Upload Files" />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg p-4">
              <h2 className="text-center mb-4 text-dark">Upload Excel File</h2>
              <input
                type="file"
                className="form-control mb-3"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={handleUpload}
              >
                Upload
              </Button>
              {error && <Alert variant="danger">{error}</Alert>}
              {uploadedData.length > 0 && (
                <Button
                  variant="danger"
                  className="w-100 mb-3"
                  onClick={handleRemoveData}
                >
                  Remove Data
                </Button>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal to display uploaded data in full-screen */}
      <Modal
        show={showTable}
        onHide={() => setShowTable(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Uploaded Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {uploadedData.length > 0 ? (
            <Table striped bordered hover responsive="xl" className="mb-0">
              <thead className="table-dark">
                <tr>
                  {uploadedData[0] && uploadedData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploadedData.slice(1).map((row, index) => (
                  <tr key={index}>
                    {row.map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No data available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTable(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemoveData}>
            Clear Data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadPage;
