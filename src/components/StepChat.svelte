<script>
  import { appStatus, deleteFile } from "../store";
  import { Button } from "flowbite-svelte";
</script>

<p>ChatModo</p>

<Button color="dark" on:click={() => deleteFile()}>Eliminar pdf</Button>
