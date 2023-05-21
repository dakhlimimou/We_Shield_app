export const FileConvertera = (file: any): FileReader => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return reader;
};

export const FileConverter = (file: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};
