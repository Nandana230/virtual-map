import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import About from './AboutPage.jsx'; // import the About component
import "../index.css";

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About' }, // Modified line
  { name: 'Contact Us', href: '/contact-us' } // Added Contact Us link
];

export default function Newpage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [showAnswer4, setShowAnswer4] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false); // State for About section

  const toggleAnswer = (questionNumber) => {
    switch (questionNumber) {
      case 1:
        setShowAnswer1(!showAnswer1);
        break;
      case 2:
        setShowAnswer2(!showAnswer2);
        break;
      case 3:
        setShowAnswer3(!showAnswer3);
        break;
      case 4:
        setShowAnswer4(!showAnswer4);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* First Page */}
      <div className="bg-gradient-to-b from-red-200 to-pink-300 min-h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">logo</span>
                <img
                  className="h-32 w-auto rounded-lg"
                  src="./src/assets/logo.png"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.target} // Modified line
                  rel="noopener noreferrer" // Modified line
                  className="text-base lg:text-lg font-semibold leading-6 text-gray-900 transition duration-300 hover:text-white hover:bg-fuchsia-600 px-4 py-2 rounded-lg"
                  onClick={() => item.name === "About" && setAboutOpen(true)} // Open About section
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                to="/login" // Using Link instead of anchor tag
                className="text-base lg:text-lg font-semibold leading-6 text-gray-900 transition duration-300 hover:text-white hover:bg-fuchsia-600 px-4 py-2 rounded-lg"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">college</span>
                  <img
                    className="h-32 w-auto "
                    src="./src/assets/logo.png"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.target} // Modified line
                        rel="noopener noreferrer" // Modified line
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => item.name === "About" && setAboutOpen(true)} // Open About section
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      to="/login" // Using Link instead of anchor tag
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
        <div className="flex flex-col-reverse lg:flex-row relative isolate lg:items-center px-6 pt-14 lg:px-8">
          <div className="lg:w-1/2 lg:order-1 rounded-lg overflow-hidden flex justify-center items-center min-h-80 lg:min-h-0">
            <img
              className="w-full h-auto max-w-full max-h-full rounded-lg"
              src="./src/assets/college.png"
              alt="Explore image"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 lg:order-2 lg:w-2/3 lg:mr-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Explore CUCEK
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Embark on a Virtual Journey Through the Campus of Cochin University College of Engineering, Kuttanad
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base lg:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300"
                >
                  Start exploring
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <About isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* Second Page */}
      <div className="bg-gradient-to-b from-pink-100 to-teal-200 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-14 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
              
              <span className="block text-3xl sm:text-4xl font-medium text-gray-900">
                An Exciting Virtual Adventure Through Our Scenic Campus!
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 sm:text-xl sm:leading-9">
              Step into the captivating world of Cochin University College of Engineering, Kuttanad (CUCEK) with our interactive campus map! Nestled in the heart of Kuttanad's picturesque landscape, our vibrant campus is now at your fingertips.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700 sm:text-xl sm:leading-9">
              Embark on a virtual journey where you can explore our landmarks and serene scenic spots. This dynamic map offers a fun and engaging way to experience CUCEK from anywhere in the world.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700 sm:text-xl sm:leading-9">
              Whether you're a prospective student, faculty member, or simply curious about our institution, this panoramic map offers a dynamic way to experience our campus from anywhere in the world. Navigate through the map, explore each corner of our campus, and discover the rich tapestry of academic excellence, research endeavors, and student life that make CUCEK a hub of innovation and learning.
            </p>
          </div>
          <img
            className="h-auto w-full max-w-full rounded-lg"
            src="./src/assets/gate.png"
            alt="Gate image"
          />
        </div>
      </div>

      {/* Third Page */}
      <div className="bg-gradient-to-b from-emerald-200 to-amber-200 min-h-screen">
        <div className="px-6 py-14 lg:px-8">
          <div className="text-center flex items-center justify-center">
            <img
              className="h-48 w-auto mr-8 rounded-full"
              src="./src/assets/cur.png"
              alt="Cur image"
            />
            <div className="w-full max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Curious Minds Ask!!
              </h1>
              <div className="mt-8 text-left">
                <div className="mb-6 bg-white border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center cursor-pointer p-4"
                    onClick={() => toggleAnswer(1)}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">
                      How to start the tour?
                    </h2>
                    <ChevronDownIcon
                      className={`${
                        showAnswer1 ? 'transform rotate-180' : ''
                      } h-6 w-6 text-gray-600`}
                    />
                  </div>
                  {showAnswer1 && (
                    <div className="bg-white p-4">
                      <p className="mt-2 text-lg leading-8 text-gray-600">
                        Simply click the 'Start exploring' button!
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-6 bg-white border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center cursor-pointer p-4"
                    onClick={() => toggleAnswer(2)}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Can I explore all areas?
                    </h2>
                    <ChevronDownIcon
                      className={`${
                        showAnswer2 ? 'transform rotate-180' : ''
                      } h-6 w-6 text-gray-600`}
                    />
                  </div>
                  {showAnswer2 && (
                    <div className="bg-white p-4">
                      <p className="mt-2 text-lg leading-8 text-gray-600">
                        No, currently only the grounds of college are available for exploration. The rest is under process.
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-6 bg-white border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center cursor-pointer p-4"
                    onClick={() => toggleAnswer(3)}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">
                      How long is the tour?
                    </h2>
                    <ChevronDownIcon
                      className={`${
                        showAnswer3 ? 'transform rotate-180' : ''
                      } h-6 w-6 text-gray-600`}
                    />
                  </div>
                  {showAnswer3 && (
                    <div className="bg-white p-4">
                      <p className="mt-2 text-lg leading-8 text-gray-600">
                        Take your time to explore every corner!
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-6 bg-white border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center cursor-pointer p-4"
                    onClick={() => toggleAnswer(4)}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Why can't I login?
                    </h2>
                    <ChevronDownIcon
                      className={`${
                        showAnswer4 ? 'transform rotate-180' : ''
                      } h-6 w-6 text-gray-600`}
                    />
                  </div>
                  {showAnswer4 && (
                    <div className="bg-white p-4">
                      <p className="mt-2 text-lg leading-8 text-gray-600">
                        It is for admin only.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
