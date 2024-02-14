import { v4 as uuidv4 } from 'uuid';
import { folderData } from '../types/App.types';

const useFolder = () => {
  const addnewItem = (fulldata: folderData, targetid: string, foldername: string, isfolder: boolean) : folderData | null=> {
    if (fulldata.length === 0) return null;
    fulldata.children = fulldata?.children || [];
    if (fulldata.id === targetid) {      
      fulldata.children.unshift({
        id: uuidv4(),
        name: foldername,
        isfolder,
        children: [],
      });
      return { ...fulldata };
    }
    let finalarr = [];
    finalarr = fulldata.children.map((e: any) => {
      return addnewItem(e, targetid, foldername, isfolder);
    });
    return { ...fulldata, children: finalarr as folderData[] };
  };

  const deleteItem = (fulldata:  Pick<folderData, "id"|"children">, targetid: string) => {
    if (fulldata.id === targetid) {
      return null;
    }
    let finalarr: any[] = [];
    if (fulldata.children) {
      fulldata.children.map((e: folderData, i: number) => {
        const result = deleteItem(fulldata.children[i], targetid);
        if (result !== null) {
          finalarr.push(result);
        }
      });
    }
    return { ...fulldata, children: finalarr };
  };

  const updateItem = (fulldata: folderData, targetid: string, foldername: string): folderData | null => {
    if (fulldata.length === 0) return null;
    if (fulldata.id === targetid) {
      return { ...fulldata, name: foldername };
    }
    let finalarr = [];
    finalarr = fulldata?.children?.map((e: folderData|null): folderData | null => {
      return updateItem(e as folderData, targetid, foldername);
    });
    return { ...fulldata, children: finalarr as folderData[] };
  };

  return { addnewItem, deleteItem, updateItem };
};

export default useFolder;