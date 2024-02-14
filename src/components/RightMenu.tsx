import React, { useEffect } from 'react';
import { genericFn } from '../types/App.types';

export function RightMenu({ onAddNewFolder, onAddNewFile, fileName, onDelete, onRename, setIsRightMenu, isFile }: {
    onAddNewFolder?: genericFn; onAddNewFile?: genericFn; fileName: string | undefined; onDelete: genericFn; onRename: genericFn; setIsRightMenu: genericFn;
    isFile?: boolean;
}) {
    useEffect(() => {
        document.getElementById("right-menu-item")?.focus();
    }, []);
    return (
        <div 
            tabIndex={-1}
            className="right-menu-main" id="right-menu-item"
            onBlur={() => setIsRightMenu(false)}
        >
            {/* RIGHT MENU FUNCTIONS {fileName} */}
            <div onClick={() => { setIsRightMenu(false); }}>
                {!isFile && <div className="menu-item" onClick={() => { (onAddNewFolder as genericFn)(); setIsRightMenu(false); }}>Add New Folder</div>}
                {!isFile && <div className="menu-item" onClick={() => { (onAddNewFile as genericFn)(); setIsRightMenu(false); }}>Add New File</div>}
                <div className="menu-item" onClick={(e) => {
                    console.log(e, fileName);
                    setIsRightMenu(false);
                }}>Copy ( only logs to console)</div>
                <div className="menu-item" onClick={() => { onDelete(); setIsRightMenu(false); }}>Delete</div>
                <div className="menu-item-last" onClick={() => { onRename(); setIsRightMenu(false); }}>Rename</div>
            </div>
        </div>
    );
}
