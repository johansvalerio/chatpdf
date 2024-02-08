<script>
    import Dropzone from "svelte-file-dropzone";
    import {files, addFile, setAppStatusLoading, setAppStatusChatMode, setAppStatusError } from "../store";
  
    function handleFilesSelect(e) {
      // const { acceptedFiles, fileRejections } = e.detail;
      //console.log(files.accepted);
      addFile(e)
      // files.accepted = [...files.accepted, ...acceptedFiles];
      // files.rejected = [...files.rejected, ...fileRejections];

      if(files.accepted.length > 0) {
        setAppStatusLoading();
        setTimeout(() => {
          setAppStatusChatMode();
        }, 2000)
      }
      else{
        setAppStatusError();
      }
    }
  </script>
  
  <Dropzone multiple=false
  accept="application/pdf"
  on:drop={handleFilesSelect}>
    Arrastra tu pdf y suéltalo aquí 
  </Dropzone>
  
  <ol>
    {#each files.accepted as item}
      <li>{item.name}</li>
    {/each}
  </ol>
