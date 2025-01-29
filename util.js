import { useMemo } from 'react';

class TableStore {
  hooked = false;

  reload = () => {
  }

  hook(table) {
    if (this.hooked) {
      return;
    }

    this.hooked = true;
    this.reload = table.reload;
    this.addSearch = table.addSearch;
  }
}

export const useTable = () => {
  const table = useMemo(() => {
    return new TableStore();
  }, []);
  return [table];
};
