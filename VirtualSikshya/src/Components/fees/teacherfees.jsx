import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Dropdown, Badge, Alert, Card } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import "../../styles/fees.css";

// Mock user roles for demonstration
const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

// Sample data - In a real app, this would come from an API
const initialFees = [
  { id: 1, studentId: 101, studentName: 'John Doe', className: '10-A', feeType: 'Tuition', amount: 5000, dueDate: '2025-03-15', status: 'Paid', paymentDate: '2025-03-10' },
  { id: 2, studentId: 102, studentName: 'Jane Smith', className: '10-A', feeType: 'Library', amount: 1000, dueDate: '2025-03-15', status: 'Pending', paymentDate: null },
  { id: 3, studentId: 103, studentName: 'Mike Johnson', className: '9-B', feeType: 'Tuition', amount: 5000, dueDate: '2025-03-15', status: 'Overdue', paymentDate: null },
  { id: 4, studentId: 101, studentName: 'John Doe', className: '10-A', feeType: 'Lab', amount: 1500, dueDate: '2025-04-15', status: 'Pending', paymentDate: null },
];

const FeeManagement = ({ userRole, userId }) => {
  const [fees, setFees] = useState(initialFees);
  const [filteredFees, setFilteredFees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [errorMessage, setErrorMessage] = useState('');

  // For student view - filter to only show their own fees
  useEffect(() => {
    if (userRole === ROLES.STUDENT) {
      // Assuming userId matches studentId - in real app, use proper API call
      setFilteredFees(fees.filter(fee => fee.studentId === userId));
    } else {
      setFilteredFees(fees);
    }
  }, [fees, userRole, userId]);

  // Search and filter functionality
  useEffect(() => {
    let result = userRole === ROLES.STUDENT 
      ? fees.filter(fee => fee.studentId === userId)
      : [...fees];
      
    // Apply search
    if (searchTerm) {
      result = result.filter(fee => 
        fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.feeType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(fee => fee.status === statusFilter);
    }
    
    setFilteredFees(result);
  }, [searchTerm, statusFilter, fees, userRole, userId]);

  const handleAddNew = () => {
    if (userRole !== ROLES.ADMIN) {
      setErrorMessage('Only administrators can add new fee records');
      return;
    }
    setCurrentFee({
      id: fees.length + 1,
      studentId: '',
      studentName: '',
      className: '',
      feeType: '',
      amount: '',
      dueDate: '',
      status: 'Pending',
      paymentDate: null
    });
    setShowModal(true);
  };

  const handleEdit = (fee) => {
    if (userRole !== ROLES.ADMIN) {
      setErrorMessage('Only administrators can edit fee records');
      return;
    }
    setCurrentFee({...fee});
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (userRole !== ROLES.ADMIN) {
      setErrorMessage('Only administrators can delete fee records');
      return;
    }
    setFees(fees.filter(fee => fee.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentFee.id && fees.some(fee => fee.id === currentFee.id)) {
      // Update existing fee
      setFees(fees.map(fee => fee.id === currentFee.id ? currentFee : fee));
    } else {
      // Add new fee
      setFees([...fees, currentFee]);
    }
    setShowModal(false);
  };

  const handlePayment = (id) => {
    if (userRole !== ROLES.ADMIN) {
      setErrorMessage('Only administrators can record payments');
      return;
    }
    setFees(fees.map(fee => {
      if (fee.id === id) {
        return {
          ...fee,
          status: 'Paid',
          paymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return fee;
    }));
  };

  // Status badge colors
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid': return <Badge bg="success">Paid</Badge>;
      case 'Pending': return <Badge bg="warning">Pending</Badge>;
      case 'Overdue': return <Badge bg="danger">Overdue</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Generate printable receipt - simplified for demo
  const generateReceipt = (fee) => {
    alert(`Receipt generated for ${fee.studentName}, Amount: $${fee.amount}`);
    // In a real app, generate PDF and provide download link
  };

  return (
    <div className="container-fluid mt-4">
      {errorMessage && 
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      }
      
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Fee Management</h2>
            <div className="d-flex gap-2">
              {userRole === ROLES.ADMIN && (
                <Button variant="primary" onClick={handleAddNew}>
                  Add New Fee
                </Button>
              )}
              <Button variant="outline-secondary">
                <FaFilePdf /> Export PDF
              </Button>
              <Button variant="outline-secondary">
                <FaFileExcel /> Export Excel
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {/* Search and Filter Controls */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, class, or fee type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-status">
                  Status: {statusFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter('Paid')}>Paid</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter('Pending')}>Pending</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter('Overdue')}>Overdue</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {/* Fee Records Table */}
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.length > 0 ? filteredFees.map(fee => (
                <tr key={fee.id}>
                  <td>{fee.id}</td>
                  <td>{fee.studentName}</td>
                  <td>{fee.className}</td>
                  <td>{fee.feeType}</td>
                  <td>${fee.amount}</td>
                  <td>{fee.dueDate}</td>
                  <td>{getStatusBadge(fee.status)}</td>
                  <td>{fee.paymentDate || '-'}</td>
                  <td>
                    {userRole === ROLES.ADMIN ? (
                      <div className="btn-group">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(fee)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(fee.id)}>
                          <FaTrash />
                        </Button>
                        {fee.status !== 'Paid' && (
                          <Button variant="outline-success" size="sm" onClick={() => handlePayment(fee.id)}>
                            Record Payment
                          </Button>
                        )}
                        {fee.status === 'Paid' && (
                          <Button variant="outline-info" size="sm" onClick={() => generateReceipt(fee)}>
                            Receipt
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button variant="outline-secondary" size="sm">
                        <FaEye /> View
                      </Button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center">No fee records found</td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Stats Cards - Only visible to admin and teachers */}
          {userRole !== ROLES.STUDENT && (
            <div className="row mt-4">
              <div className="col-md-3">
                <Card className="text-white bg-primary">
                  <Card.Body>
                    <Card.Title>Total Fees</Card.Title>
                    <Card.Text className="display-4">
                      ${fees.reduce((sum, fee) => sum + fee.amount, 0)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-white bg-success">
                  <Card.Body>
                    <Card.Title>Paid</Card.Title>
                    <Card.Text className="display-4">
                      ${fees.filter(fee => fee.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-white bg-warning">
                  <Card.Body>
                    <Card.Title>Pending</Card.Title>
                    <Card.Text className="display-4">
                      ${fees.filter(fee => fee.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-white bg-danger">
                  <Card.Body>
                    <Card.Title>Overdue</Card.Title>
                    <Card.Text className="display-4">
                      ${fees.filter(fee => fee.status === 'Overdue').reduce((sum, fee) => sum + fee.amount, 0)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Fee Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentFee?.id ? 'Edit Fee Record' : 'Add New Fee Record'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="number"
                value={currentFee?.studentId}
                onChange={(e) => setCurrentFee({...currentFee, studentId: parseInt(e.target.value)})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={currentFee?.studentName}
                onChange={(e) => setCurrentFee({...currentFee, studentName: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                value={currentFee?.className}
                onChange={(e) => setCurrentFee({...currentFee, className: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fee Type</Form.Label>
              <Form.Select
                value={currentFee?.feeType}
                onChange={(e) => setCurrentFee({...currentFee, feeType: e.target.value})}
                required
              >
                <option value="">Select Fee Type</option>
                <option value="Tuition">Tuition</option>
                <option value="Library">Library</option>
                <option value="Lab">Lab</option>
                <option value="Sports">Sports</option>
                <option value="Transportation">Transportation</option>
                <option value="Examination">Examination</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={currentFee?.amount}
                onChange={(e) => setCurrentFee({...currentFee, amount: parseInt(e.target.value)})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={currentFee?.dueDate}
                onChange={(e) => setCurrentFee({...currentFee, dueDate: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentFee?.status}
                onChange={(e) => setCurrentFee({...currentFee, status: e.target.value})}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </Form.Select>
            </Form.Group>
            {currentFee?.status === 'Paid' && (
              <Form.Group className="mb-3">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={currentFee?.paymentDate}
                  onChange={(e) => setCurrentFee({...currentFee, paymentDate: e.target.value})}
                  required
                />
              </Form.Group>
            )}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeeManagement;