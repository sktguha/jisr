import React, { useState } from 'react';
import '../style.css';
import { folderData, genericFn } from '../types/App.types';
import { RightMenu } from './RightMenu';

export default function FolderNew({ treeset, addItem, rename, delete_item }: { treeset: folderData, addItem: genericFn, rename: genericFn, delete_item: genericFn }) {
    const [expand, setExpand] = useState(true); // can set to false to keep collapsed by default
    const operationType = React.useRef('new');
    const [minput, setInput] = useState({
        value: '',
        show: false,
        placeholder: '',
    });

    const [isRightMenu, setIsRightMenu] = useState(false);
    const onKeyDown = (e: { keyCode: number; }) => {
        if (e.keyCode === 67) {
            const currDom = document.querySelector('.key-active');
            let keyId;
            if (currDom) {
                keyId = currDom.id;
            } else {
                keyId = 0;
            }
            if (keyId === treeset.id) {
                setIsRightMenu(true);
            }
        }
    };
    if (treeset.isfolder) {
        return (
            <div className="folder-item" key={treeset.id}>
                <div className="folder"
                    onContextMenu={(e: any) => {
                        setIsRightMenu(true);
                        e.preventDefault();
                        return false;
                    }}>
                    <span onClick={() => setExpand(!expand)}>{expand ? '⏬' : '⏩'}</span>
                    <div className="name-disp" id={treeset.id} onKeyDown={onKeyDown}>📁{treeset.name}</div>
                    {minput.show && (
                        <input
                            placeholder={minput.placeholder}
                            onKeyDown={(el) => {
                                //@ts-ignore
                                if (el.keyCode === 13 && el.target.value) {
                                    if (operationType.current === 'new') {
                                        minput.placeholder.toString().includes('folder')
                                            ? addItem(treeset.id, minput.value, true)
                                            : addItem(treeset.id, minput.value, false);
                                    } else if (operationType.current === 'update') {
                                        rename(treeset.id, minput.value);
                                    }
                                    setInput({
                                        show: false,
                                        value: '',
                                        placeholder: '',
                                    });
                                }
                            }}
                            autoFocus
                            value={minput.value}
                            onChange={(e) => setInput({ ...minput, value: e.target.value })}
                        />
                    )}
                    {isRightMenu && <RightMenu
                        fileName={treeset.name}
                        setIsRightMenu={setIsRightMenu}
                        onAddNewFolder={(el) => {
                            setInput((e) => {
                                return {
                                    ...e,
                                    show: true,
                                    placeholder: 'enter folder name',
                                };
                            });
                            operationType.current = 'new';
                        }}
                        onAddNewFile={(el) => {
                            setInput({
                                ...minput,
                                show: true,
                                placeholder: 'enter file name',
                            });
                            operationType.current = 'new';
                            setIsRightMenu(false);
                        }}
                        onRename={() => {
                            setInput({
                                ...minput,
                                show: true,
                                placeholder: 'enter new name',
                            });
                            operationType.current = 'update';
                        }}
                        onDelete={(el) => {
                            delete_item(treeset.id);
                        }}
                    />}
                </div>
                {expand &&
                    treeset.children.map((e) => {
                        return (
                            <FolderNew
                                key={e.id}
                                treeset={e}
                                addItem={addItem}
                                rename={rename}
                                delete_item={delete_item}
                            />
                        );
                    })}
            </div>
        );
    } else {
        return (
            <div className="file file-item" key={treeset.id}
                onContextMenu={(e: any) => {
                    setIsRightMenu(true);
                    e.preventDefault();
                    return false;
                }}
            >
                <div id={treeset.id} className="name-disp" tabIndex={-1}
                    onKeyDown={onKeyDown}
                >{(() => {
                    if (treeset.name?.endsWith('.png') || treeset.name?.endsWith('.jpeg') || treeset.name?.endsWith('.svg')
                        || treeset.name?.endsWith('.gif') || treeset.name?.endsWith('.webp')) {
                        return '📷';
                    } else if (treeset.name?.endsWith('css') || treeset.name?.endsWith('js') || treeset.name?.endsWith('ts') || treeset.name?.endsWith('html')) {
                        return '🖥';
                    } else {
                        return '📄';
                    }
                })()}{treeset.name}</div>
                {minput.show && (
                    <input
                        placeholder={minput.placeholder}
                        onKeyDown={(el) => {
                            //@ts-ignore
                            if (el.keyCode === 13 && el.target.value) {
                                if (operationType.current === 'new') {
                                    minput.placeholder.toString().includes('folder')
                                        ? addItem(treeset.id, minput.value, true)
                                        : addItem(treeset.id, minput.value, false);
                                } else if (operationType.current === 'update') {
                                    rename(treeset.id, minput.value);
                                }
                                setInput({
                                    show: false,
                                    value: '',
                                    placeholder: '',
                                });
                            }
                        }}
                        autoFocus
                        value={minput.value}
                        onChange={(e) => setInput({ ...minput, value: e.target.value })}
                    />
                )}
                {isRightMenu && <RightMenu
                    isFile={true}
                    setIsRightMenu={setIsRightMenu}
                    fileName={treeset.name}
                    onRename={() => {
                        console.log('clicked');
                        setInput({
                            ...minput,
                            show: true,
                            placeholder: 'enter new name',
                        });
                        operationType.current = 'update';
                    }}
                    onDelete={() => {
                        delete_item(treeset.id);
                    }}
                />}
            </div>
        );
    }
}
