import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import logo from '../assets/icon/logo.svg';
import close from '../assets/icon/x-close.svg';
import mail from '../assets/icon/mail.svg';
import { useParams } from 'react-router-dom';

function Modalmail() {
  const { id } = useParams(); // รับค่า ID จาก URL

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/product/' + id);
  }, [id]);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`http://127.0.0.1:8000/api/follow/`, {
        follow_email: email,
        product_id: id,
      });

      setIsSubmitting(false);
      setEmail('');
      closeModal();
    } catch {
      setIsSubmitting(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full mx-auto">
                {/* ปุ่ม logo และ close */}
                <div className="flex justify-between">
                  <div className="p-3 border border-gray-200 rounded-full">
                    <img src={logo} alt="logo" />
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <img src={close} alt="close" width={24} height={24} />
                  </button>
                </div>

                {/* เนื้อหาอื่น ๆ */}
                <h4 className="dialog-head_text">Stay updated with product pricing alerts right in your inbox!</h4>
                <p className="text-sm text-gray-600 mt-2">Never miss a bargain again with our timely alerts!</p>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <img src={mail} alt="mail" width={18} height={18} />
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="dialog-input"
                    />
                  </div>

                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? 'Submitting ...' : 'Track'}
                  </button>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modalmail;
