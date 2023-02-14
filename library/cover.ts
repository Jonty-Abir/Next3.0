/***_______  To Convert Base 63   ________**/

// export default function convertToBase64(file: any) {
//   return new Promise((resolve, rejects) => {
//     const fileRender = new FileReader();
//     fileRender.readAsDataURL(file);
//     fileRender.onload = () => {
//       resolve(fileRender.result);
//     };
//     fileRender.onerror = (err) => {
//       rejects();
//     };
//   });
// }

function convertToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const fileRender = new FileReader();
    fileRender?.readAsDataURL(file);
    fileRender.onload = () => {
      resolve(fileRender.result);
    };
    fileRender.onerror = (err) => {
      reject(err);
    };
  });
}

export default convertToBase64;
