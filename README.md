## Svelte date picker

## Usage

This library is using typescript.

### Installation

```bash
npm i -D @kuanyu0729/svelte-date-picker
```

## Usage

- get selected date

  - case 1

    ```jsx

    <script>
      import Calendar from "svelte-date-picker";
    </script>
    <Calendar on:SelectedDate={event => {
      console.log(event.detail);
    }}/>
    ```

  - case 2

    ```jsx

      <script>
        import Calendar from "svelte-date-picker";
        let date = new Date();
        $: {
          console.log(date);
        }
      </script>
      <Calendar bind:date/>
      ```
