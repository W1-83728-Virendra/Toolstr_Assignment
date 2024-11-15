import React, { createContext, useContext, useState } from 'react';

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Documents",
      type: "folder",
      children: [
        { id: 2, name: "File1.txt", type: "file" },
        {
          id: 3,
          name: "SubFolder",
          type: "folder",
          children: [
            { id: 4, name: "File2.txt", type: "file" }
          ]
        }
      ]
    }
  ]);

  const addItem = (parentId, newItem) => {
    const updateFolder = (items) =>
      items.map(item => {
        if (item.id === parentId && item.type === "folder") {
          return { ...item, children: [...item.children, newItem] };
        }
        if (item.children) {
          return { ...item, children: updateFolder(item.children) };
        }
        return item;
      });

    setFolders(updateFolder(folders));
  };

  const removeItem = (id) => {
    const deleteItem = (items) =>
      items.filter(item => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = deleteItem(item.children);
        }
        return true;
      });

    setFolders(deleteItem(folders));
  };

  return (
    <FolderContext.Provider value={{ folders, addItem, removeItem }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => {
  return useContext(FolderContext);
};
