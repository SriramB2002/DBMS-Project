//GFG
export const saveState = (name,state) => {
    try {
      const serialState = JSON.stringify(state);
      localStorage.setItem(name, serialState);
    } catch(err) {
        console.log(err);
    }
};