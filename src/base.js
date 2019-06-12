import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: ""
  })
  

  const base = Rebase.createClass(firebaseApp.database());

  //this is a named export
  export {firebaseApp};

  //this is a default export
  export default base;