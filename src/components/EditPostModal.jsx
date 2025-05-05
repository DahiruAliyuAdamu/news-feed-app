import { Dialog } from '@headlessui/react';
import { useState } from 'react';

export default function EditPostModal({ isOpen, onClose, onSave, field, initialValue }) {
    const [input, setInput] = useState(initialValue);

    const handleSave = () => {
        onSave(input);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
            <div className="bg-white rounded-xl shadow-lg p-6 z-50 max-w-md w-full">
                <Dialog.Title className="text-xl font-bold mb-4">Edit {field}</Dialog.Title>
                <textarea
                    className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    rows={field === 'postText' ? 5 : 1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </Dialog>
    )
}
