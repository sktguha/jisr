import { v4 as uuidv4 } from 'uuid';
export const initialFolderchildren2 = {
    id: '1',
    name: 'root',
    isfolder: true,
    children: [],
};

export const initialFolderData = {
    id: uuidv4(),
    isfolder: true,
    name: "parent",
    children: [
        {
            id: uuidv4(),
            isfolder: true,
            name: "root",
            children: [
                {
                    id: uuidv4(),
                    isfolder: true,
                    name: "src",
                    children: [
                        {
                            id: uuidv4(),

                            meta: 'js',
                            name: "index.js"
                        }
                    ]
                },
                {
                    id: uuidv4(),
                    isfolder: true,
                    name: "public",
                    children: [
                        {
                            id: uuidv4(),

                            meta: 'ts',
                            name: "index.ts"
                        }
                    ]
                },
                {
                    id: uuidv4(),
                    meta: 'html',
                    name: "index.html"
                },
                {
                    id: uuidv4(),
                    isfolder: true,
                    name: "children",
                    children: [
                        {
                            id: uuidv4(),
                            isfolder: true,
                            name: "images",
                            children: [
                                {
                                    id: uuidv4(),
                                    meta: 'img',
                                    name: "image.png"
                                },
                                {
                                    id: uuidv4(),
                                    meta: 'img',
                                    name: "image2.webp"
                                }
                            ]
                        },
                        {
                            id: uuidv4(),
                            meta: 'svg',
                            name: "logo.svg"
                        }
                    ]
                },
                {
                    id: uuidv4(),
                    meta: 'css',
                    name: "style.css"
                }
            ]
        }
    ]
};