<script>
  import { deleteFile, setAppStatusError } from "../store";
  import { Button, Input } from "flowbite-svelte";
  import { appStatusInfo } from "../store";
  import StepLoading from "./StepLoading.svelte";
  const { url, pages, id } = $appStatusInfo;

  let loading = false;
  let answer = "";

  const numOfImagesToShow = Math.min(pages, 4);
  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1;
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg");
  });

  const handleSubmit = async (event) => {
    event.preventDefault()

    loading = true
    answer = ""
    const question = event.target.question.value

    const searchParams = new URLSearchParams()
    searchParams.append("id", id)
    searchParams.append("question", question)

    try {
      const eventSource = new EventSource(`/api/chat?${searchParams.toString()}`)

      eventSource.onmessage = (event) => {
        loading = false
        const incomingData = JSON.parse(event.data)

        if (incomingData === "__END__") {
          eventSource.close()
          return
        }

        answer += incomingData
      }
    } catch (e) {
      setAppStatusError()
    } finally {
      loading = false
    }
  }

</script>

<div class="grid grid-cols-4 mt-3 mb-3 gap-2">
  {#each images as image}
    <divc class="border-2 border-neutral-400 shadow-lg">
      <img src={image} alt="Pdf page" class="w-full h-auto" />
    </divc>
  {/each}
</div>

<Button class="mt-3 mb-3" color="dark" pill on:click={() => deleteFile()}
  >New pdf</Button
>

<form on:submit={handleSubmit}>
  <div
    class=" border-none outline-none ring-0 rounded-full bg-gradient-to-tr from-rose-300 to-orange-300 p-0.5 shadow-lg"
  >
    <Input
      class="w-full rounded-full text-center focus:border-none focus:outline-none focus:ring-0 border-none outline-none ring-0
   placeholder-slate-400 focus:placeholder-slate-300  focus:text-slate-400"
      id="question"
      size="lg"
      color="none"
      placeholder="Ask me something..."
    />
  </div>
</form>

{#if loading}
  <StepLoading />
{/if}

{#if answer}
  <div class="mt-5">
    <p class="font-medium">Respuesta:</p>
    <p>{answer}</p>
  </div>
{/if}
