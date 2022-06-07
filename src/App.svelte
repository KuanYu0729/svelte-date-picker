<script lang="ts">
  import Calendar from "./Calendar.svelte";
</script>

<main>
  <Calendar on:SelectedDate={event => {
    console.log(event.detail);
  }}/>
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
