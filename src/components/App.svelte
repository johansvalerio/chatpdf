<script>
  import { APP_STATUS, appStatus } from "../store";
  import {Alert} from "flowbite-svelte";
  import { InfoCircleSolid } from 'flowbite-svelte-icons';
  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
</script>

{#if $appStatus === APP_STATUS.INIT}
  <StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
  <StepLoading />
{:else if $appStatus === APP_STATUS.CHAT_MODE}
  <StepChat />
{:else if $appStatus === APP_STATUS.ERROR}
  <Alert color="none" class="flex justify-center bg-rose-500 text-white text-center">
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    <span class="font-medium">Algo ha ocurrido!</span>
    Hay un erro en la aplicación
  </Alert>
  {:else}
  <Alert border>
    <InfoCircleSolid slot="icon" class="w-6 h-6" />
    <span class="font-medium">Error desconocido</span>
    Este estado de la aplicacion no es reconocido 
  </Alert>
{/if}
