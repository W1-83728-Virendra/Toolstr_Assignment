import React, { useState } from 'react';
import './App.css';
import { useFolder } from './FolderContext';

const Folder = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { addItem, removeItem } = useFolder();

    const handleAddFile = () => {
        const fileName = prompt("Enter file name:");
        if (fileName) {
            const newFile = { id: Date.now(), name: fileName, type: "file" };
            addItem(item.id, newFile);
        }
    };

    const handleAddFolder = () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
            const newFolder = { id: Date.now(), name: folderName, type: "folder", children: [] };
            addItem(item.id, newFolder);
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
            removeItem(item.id);
        }
    };

    return (
        <div className="folder-item">
            <div className="folder-header">
                {item.type === 'folder' ? (
                    <span onClick={() => setIsOpen(!isOpen)} className="folder-icon">
                        {isOpen ? '📂' : '📁'} {item.name}
                    </span>
                ) : (
                    <span>📄 {item.name}</span>
                )}
                {item.type === 'folder' && (
                    <div className="folder-actions">
                        <button className="action-btn" onClick={handleAddFile}>+ File</button>
                        <button className="action-btn" onClick={handleAddFolder}>+ Folder</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                )}
                {item.type === 'file' && (
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                )}
            </div>

            {isOpen && item.type === 'folder' && (
                <div className="folder-children">
                    {item.children.map(child => (
                        <Folder key={child.id} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Folder;
