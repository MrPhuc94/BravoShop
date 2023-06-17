import localStorage from "redux-persist/es/storage";

const storeData = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await localStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
  }
};

export { storeData, getData };
