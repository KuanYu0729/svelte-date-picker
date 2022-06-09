<script lang="ts">
  import Calendar from "./Calendar.svelte";
  let date = new Date();
  $: {
    console.log(date);
  }
</script>

<main>
  <Calendar bind:date />
  <span>{date.toLocaleString()}</span>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
