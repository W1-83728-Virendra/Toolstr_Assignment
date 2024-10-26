import React from 'react';
import { FolderProvider, useFolder } from './FolderContext';
import Folder from './Folder';
import './App.css';

const FolderTree = () => {
  const { folders } = useFolder();

  return (
    <div className="folder-container">
      {folders.map(folder => (
        <Folder key={folder.id} item={folder} />
      ))}
    </div>
  );
};

function App() {
  return (
    <FolderProvider>
      <div className="App">
        <h1>Recursive Folder Explorer</h1>
        <FolderTree />
      </div>
    </FolderProvider>
  );
}

export default App;
