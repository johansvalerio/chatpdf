<script>
  import { deleteFile } from "../store";
  import { Button, Input } from "flowbite-svelte";
  import { appStatusInfo } from "../store";
  import StepLoading from "./StepLoading.svelte"
  const { url, pages, id } = $appStatusInfo;

  let loading = false;

  const numOfImagesToShow = Math.min(pages, 4)
  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg")
  })

const handleSubmit = async (event) =>{
  event.preventDefault()

  let answer = "";
  loading = true;

  const question = event.target.question.value

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      question,
    })
  })
 
  if(!res.ok){
    loading = false
    console.error("Error")
    return
  }

  const {answer: apiAnswer } = await res.json();
  answer = apiAnswer;
  loading = false
}

</script>

<div class="grid grid-cols-4 gap-2 mt-3 mb-3"> 
  {#each images as image}
  <img src={image} alt="Pdf page" class="w-full h-auto" />
{/each}
</div>


<Button class="mt-3 mb-3" color="dark" pill on:click={() => deleteFile()}
  >New pdf</Button
>

<form on:submit={handleSubmit}>
<div
  class=" border-none outline-none ring-0 rounded-full bg-gradient-to-tr from-teal-300 to-sky-300 p-0.5 shadow-lg"
>
  <Input
    class="w-full rounded-full text-center focus:border-none focus:outline-none focus:ring-0 border-none outline-none ring-0
   placeholder-slate-400 focus:placeholder-grey-300  focus:text-slate-500"
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