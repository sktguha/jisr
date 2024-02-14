import React from 'react';
import { render, screen } from '@testing-library/react';
import FolderNew from '../FolderNew';
import { folderData } from '../../types/App.types';

const emptyFn = () => { };
const Fns = {
    addItem: emptyFn,
    rename: emptyFn,
    delete_item: emptyFn
}

test('renders FolderNew folder', () => {
    const treeset = {
        id: '1',
        name: 'test',
        isfolder: true,
        children: []
    }
    const { container } = render(<FolderNew treeset={treeset as folderData} {...Fns} />)
    expect(container).toMatchSnapshot()
});

test('renders FolderNew file images', () => {
    const treeset = {
        id: '1',
        name: 'test',
        isfolder: true,
        children: [{
            id: '2',
            name: 'image.webp'
        }
        ]
    }
    const { container } = render(<FolderNew treeset={treeset as folderData} {...Fns} />)
    expect(container).toMatchSnapshot()
});

test('renders FolderNew file code', () => {
    const treeset = {
        id: '1',
        name: 'test',
        isfolder: true,
        children: [
            {
                id: '2',
                name: 'style.css'
            }
        ]
    }
    const { container } = render(<FolderNew treeset={treeset as folderData} {...Fns} />)
    expect(container).toMatchSnapshot()
});

test('renders FolderNew file others', () => {
    const treeset = {
        id: '1',
        name: 'test',
        isfolder: true,
        children: [{
            id: '2',
            name: 'notes.txt'
        }]
    }
    const { container } = render(<FolderNew treeset={treeset as folderData} {...Fns} />)
    expect(container).toMatchSnapshot()
});
