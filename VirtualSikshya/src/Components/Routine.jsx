import React, { useState } from 'react';
import '../styles/Routine.css'; // Add CSS for Routine

const Routine = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    day: '',
    time: '',
    className: '',
    room: '',
    classType: '',
    teacher: '',
  });

  const showDetails = (day, time, className, room, classType, teacher) => {
    setModalData({ day, time, className, room, classType, teacher });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="routine-container">
      <div className="header">
        <h1>S2-S1-C35D</h1>
        <p>Click on a routine to view details</p>
        <p>14.00 Hours/Week</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
        <td>6:00 AM</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>7:00 AM</td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      {/* <tr>
        <td>8:00 AM</td>
        <td>
          <div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div>
        </td>
        <td> <div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td> <div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>9:00 AM</td>
        <td>
            <div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
                <p>ST5007CEM Web Development</p>
                <p>Ayush Kaji Dangol</p>
                <p>08:30 AM - 10:00 AM</p>
              </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>10:00 AM</td>
        <td> </td>
        <td></td>
        <td></td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>11:00 AM</td>
        <td></td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>12:00 PM</td>
        <td>
         
        </td>
        <td></td>
        <td> <div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>01:00 PM</td>
        <td>
    
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>02:00 PM</td>
        <td>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>03:00 PM</td>
        <td>
         
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td> </td>
        <td></td>
      </tr>
      <tr>
        <td>04:00 PM</td>
        <td>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
      </tr>
      <tr>
        <td>05:00 PM</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><div class="routine-box" onclick="showDetails('Sunday', '08:30 AM - 10:00 AM', 'ST5007CEM Web Development', 'Block E (ICR-2)', 'Theory', 'Ayush Kaji Dangol')">
            <p>ST5007CEM Web Development</p>
            <p>Ayush Kaji Dangol</p>
            <p>08:30 AM - 10:00 AM</p>
          </div></td>
        <td></td>
      </tr> */}
          {/* Add more rows as needed */}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{modalData.day}</h2>
            <p>{modalData.time}</p>
            <p>{modalData.className}</p>
            <p>Room: {modalData.room}</p>
            <p>Class Type: {modalData.classType}</p>
            <p>Lecturer/Teacher: {modalData.teacher}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine;