import {EditorStore} from "./store";
import{get} from "svelte/store";
import { InitFireBase } from "./firebase.service";
export const InitEditor = (id) => {
   let editor =  CodeMirror(document.getElementById(id), {
        lineNumbers: true,
        theme: "dracula",
        mode: "python"
        
    });
   editor.setSize("100%", "100%");

   let dbRef = InitFireBase();
   Firepad.fromCodeMirror(dbRef, editor, {
    defaultText: "// Write your code here ",
  });

   EditorStore.set(editor);
};

export const downloadCodeFromEditor =(filename)=>{
    let anchor = document.createElement("a");
    anchor.style.display="none";

    let editor = get(EditorStore);

    anchor.setAttribute('href', "data:text/plain;charset=utf-8," + editor.getValue());
    anchor.setAttribute('download', filename);
  
    document.body.appendChild(anchor);

    anchor.click();
    document.body.removeChild(anchor);
}