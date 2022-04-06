//GFG
export const loadState = (name) => {
    try {
      const serialState = localStorage.getItem(name);
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};