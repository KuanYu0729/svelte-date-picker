## Svelte date picker

## Usage

This library is using typescript.

### Installation

```bash
npm i -D svelte-date-picker
```

## Usage

```jsx

<script>
  import Calendar from "svelte-date-picker";
</script>
<Calendar on:SelectedDate={event => {
  console.log(event.detail);
}}/>
```
