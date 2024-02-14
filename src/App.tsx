import React, { useEffect, useState } from 'react';
import './style.css';

import { initialFolderData } from './data/folderData';
import FolderNew from './components/FolderNew';

import useFolder from './hooks/useFolder';
import { folderData } from './types/App.types';

function flatten(treeset: folderData, arr: any[]): any[] {
  arr.push(treeset);
  if (treeset.children) {
    treeset.children.forEach((elem) => {
      flatten(elem, arr);
    })
  }
  return arr;
}

function SearchBar({ treeset }: { treeset: folderData }) {
  const onChange = (e: { target: { value: any; }; }) => {
    // @ts-ignore
    [...document.querySelectorAll('.search-bar-active')].forEach((dom) => dom.classList.remove('search-bar-active'));
    const value = e.target.value;
    if (!value) return;
    const elems = flatten(treeset, []);
    elems.forEach((elem) => {
      const dom = document.getElementById(elem.id);
      if (!dom) return;
      if (elem.name.indexOf(value) !== -1) {
        dom.classList.add('search-bar-active');
      }
    })
  }
  return <div>
    <h3 className='inline'>Search bar</h3> <input className="search-input" type="text" onChange={onChange}></input>
  </div>
}

export default function App() {
  const [treeset, setTreeset] = useState(initialFolderData as unknown as folderData | null);
  const { addnewItem, updateItem, deleteItem } = useFolder();
  const addItem = (id: string, name: string, isfolder: boolean) => {
    setTreeset(addnewItem(treeset as folderData, id, name, isfolder));
  };

  const rename = (id: string, name: string) => {
    setTreeset(updateItem(treeset as folderData, id, name));
  };

  useEffect(() => {
    document.body.onkeydown = (el: any) => {
      if (el.keyCode === 40 || el.keyCode === 38) {
        el.preventDefault();
        let isDown = false;
        if (el.keyCode === 38) { isDown = true; }
        const elems = flatten(treeset as folderData, []);
        const currDom = document.querySelector('.key-active');
        let currId;
        if (currDom) {
          currDom.classList.remove('key-active');
          currId = currDom?.id;
        }
        else {
          currId = elems[isDown ? elems.length - 1 : 0].id;
          const dom = document.getElementById(currId) as HTMLElement;
          dom?.classList.add('key-active');
          dom.tabIndex = -1;
          dom?.focus();
          return;
        }
        let i;
        for (i = 0; i < elems.length; i++) {
          if (elems[i].id === currId) break;
        }
        if (!isDown) {
          for (let j = i + 1; j < elems.length; j++) {
            const dom = document.getElementById(elems[j].id);
            if (dom) {
              currId = elems[j].id;
              dom.classList.add('key-active');
              dom.tabIndex = -1;
              dom.focus();
              break;
            }
          }
        } else {
          for (let j = i - 1; j > -1; j--) {
            const dom = document.getElementById(elems[j].id);
            if (dom) {
              currId = elems[j].id;
              dom.classList.add('key-active');
              dom.tabIndex = -1;
              dom.focus();
              break;
            }
          }
        }
        return false;
      }
    }
  }, [treeset]);


  const delete_item = (id: string) => {
    // do not delete the root item
    if (id === initialFolderData.id) return;

    setTreeset(deleteItem(treeset as folderData, id));
  };

  return (
    <div className="main-container">
      <h2 className="title-header" >FILE MANAGER</h2>
      <SearchBar treeset={treeset as folderData} />
      <p>(Press Enter to submit the input value)</p>
      <FolderNew
        treeset={treeset as folderData}
        addItem={addItem}
        rename={rename}
        delete_item={delete_item}
      />
    </div>
  );
}
