import React from 'react';
import { render, screen } from '@testing-library/react';
import {RightMenu} from '../RightMenu';

const emptyFn = ()=>{};

test('renders RightMenu folder', () => {
  const { container } = render(<RightMenu setIsRightMenu={emptyFn} onAddNewFile={emptyFn} onRename={emptyFn} fileName='image.webp' onDelete={emptyFn}/>)
  expect(container).toMatchSnapshot()
});

test('renders RightMenu file', () => {
    const { container } = render(<RightMenu isFile setIsRightMenu={emptyFn} onAddNewFile={emptyFn} onRename={emptyFn} fileName='image.webp' onDelete={emptyFn}/>)
    expect(container).toMatchSnapshot()
  });
  