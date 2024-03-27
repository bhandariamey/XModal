import React, { useState, useRef, useEffect } from 'react';
import './App.css'; 

function ModalForm() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const modalRef = useRef(null);

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, []);

    const handleSubmit = () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.");
            return;
        }

        const dobDate = new Date(dob); // userDate
        const today = new Date(); // today Date
        if (dobDate > today) {
            alert("Invalid Date of Birth. Date of birth cannot be in the future.");
            return;
        }

        setEmail('');
        setUsername('');
        setDob('');
        setPhone('');
    };

    return (
        <div>
            <h1>User Details Modal</h1>
            <button onClick={() => setShowModal(true)}>Open Form</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
                        <form>
                            <h2>Fill Details</h2>
                            <div className="form-group">
                                <label htmlFor="email">Email Address:</label>
                                <input type="email" required id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth:</label>
                                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalForm;
