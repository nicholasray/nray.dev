import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Dialog from "./Dialog";
import Transition from "./Transition";

interface HamburgerMenuProps {
  items: [string | JSX.Element, string][];
  className?: string;
}

const HamburgerMenu = ({ items, className }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <>
      <nav className={className}>
        <button
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-center rounded-full bg-gray-800 p-4"
        >
          <span className="sr-only">Navigation</span>
          <EllipsisVerticalIcon className="h-6  w-6 group-hover:text-white" />
        </button>
        <Transition show={isOpen}>
          <Dialog className="relative z-50" onClose={() => setIsOpen(false)}>
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm will-change-transform"
              aria-hidden="true"
            />
            <div className="fixed top-0 bottom-0 right-0 flex">
              <Transition.Child
                enter="duration-200 transition-transform ease-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="duration-250 transition-transform ease-out"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="h-full w-80 max-w-[calc(100vw-56px)] rounded bg-gray-800 p-3 shadow-lg">
                  <ul>
                    {items.map(([component, url]) => (
                      <li key={url}>
                        <a
                          href={url}
                          className="block px-4 py-4 font-medium hover:text-gray-200"
                        >
                          {component}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </nav>
    </>
  );
};

export default HamburgerMenu;
