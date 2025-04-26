export default function NewAuthorModal({
  isOpen,
  setIsOpen,
  title,
  handleSubmit,
  children,
}) {
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[10000]">
          <div
            className={`w-full max-w-2xl rounded-lg overflow-hidden transform transition-all duration-300 ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
          >
            {/* Header */}
            <div className="bg-main px-6 py-4">
              <h2 className="text-white text-xl font-medium">{title}</h2>
            </div>

            <div className="bg-white">
              {/* Content */}
              <div className="px-6 min-h-60 flex justify-center items-center">{children}</div>
              {/* Buttons */}
              <div className="flex justify-end space-x-2 border-t p-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-main text-main rounded hover:bg-orange-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-main text-white rounded hover:bg-main transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
