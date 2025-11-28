import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";

import logo from "../../assets/icon/logo.svg";
import close from "../../assets/icon/x-close.svg";
import mail from "../../assets/icon/mail.svg";
import { ModalMailViewModel } from "feature/hooks/ViewModel";


const Modalmail = () => {
  const { id } = useParams();

  const [, update] = useState({});
  const forceUpdate = () => update({});

  const vm = React.useMemo(() => new ModalMailViewModel(id), [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await vm.submit();
    forceUpdate();
  };

  return (
    <>
      <button type="button" className="btn" onClick={() => { vm.openModal(); forceUpdate(); }}>
        Track
      </button>

      <Transition appear show={vm.isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => { vm.closeModal(); forceUpdate(); }} className="dialog-container">
          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center min-h-screen">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full mx-auto">

              {/* Logo + Close */}
              <div className="flex justify-between">
                <div className="p-3 border border-gray-200 rounded-full">
                  <img src={logo} alt="logo" />
                </div>
                <button type="button"
                  onClick={() => { vm.closeModal(); forceUpdate(); }}
                >
                  <img src={close} alt="close" width={24} height={24} />
                </button>
              </div>

              {/* Title */}
              <h4 className="dialog-head_text">Stay updated with product pricing alerts right in your inbox!</h4>
              <p className="text-sm text-gray-600 mt-2">Never miss a bargain again with our timely alerts!</p>

              {/* Form */}
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
                    value={vm.email}
                    onChange={(e) => { vm.setEmail(e.target.value); forceUpdate(); }}
                    placeholder="Enter your email address"
                    className="dialog-input"
                  />
                </div>

                <button type="submit" className="dialog-btn">
                  {vm.isSubmitting ? "Submitting..." : "Track"}
                </button>
              </form>

            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modalmail;
