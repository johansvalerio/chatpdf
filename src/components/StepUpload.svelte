<script>
  import Dropzone from "svelte-file-dropzone";
  import {
    files,
    addFile,
    setAppStatusLoading,
    setAppStatusChatMode,
    setAppStatusError,
  } from "../store";

  async function handleFilesSelect(e) {
    // const { acceptedFiles, fileRejections } = e.detail;
    //console.log(files.accepted);
    addFile(e);
    // files.accepted = [...files.accepted, ...acceptedFiles];
    // files.rejected = [...files.rejected, ...fileRejections];

    if (files.accepted.length > 0) {
      setAppStatusLoading();

      const formData = new FormData();
      formData.append("file", files.accepted[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setAppStatusError();
        return;
      }

      const { id, url, pages } = await res.json();
      setAppStatusChatMode({ id, url, pages });
    }
  }
</script>

<Dropzone
  multiple="false"
  accept="application/pdf"
  containerStyles="border-radius:12px; border-style:dashed; border-color:#94a3b8; border-width:2px; color: #9ca3af"
  on:drop={handleFilesSelect}
>
  Arrastra tu pdf y suéltalo aquí
</Dropzone>

<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>
