<script>
  import { APP_STATUS, appStatus, setAppStatusInit } from "../store";
  import { Alert, Button } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
</script>

<div class="m-auto w-[90%] xl:w-full">
{#if $appStatus === APP_STATUS.INIT}
  <StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
  <StepLoading />
{:else if $appStatus === APP_STATUS.CHAT_MODE}
  <StepChat />
{:else if $appStatus === APP_STATUS.ERROR}
  <div class="flex">
    <Alert
    color="none"
    class="flex justify-center mr-1 bg-rose-500 text-white text-center"
  >
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    <span class="font-medium">Algo ha ocurrido!</span>
    Hay un erro en la aplicación
  </Alert>
    <Button size="md" class="hover:bg-slate-700 hover:text-white duration-700"
     color="light" on:click={() => setAppStatusInit()}
      >Subir otro pdf
    </Button>
  </div>
{:else}
  <Alert border>
    <InfoCircleSolid slot="icon" class="w-6 h-6" />
    <span class="font-medium">Error desconocido</span>
    Este estado de la aplicacion no es reconocido
  </Alert>
{/if}
</div>

