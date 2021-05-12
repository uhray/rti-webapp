<script>
  export let data = [];
  export let handleSelect;
  export let simpleSelect = false;

  function select(header, option) {
    if (simpleSelect) {
      handleSelect(option.value);
    } else {
      handleSelect(
        data.map(item => {
          if (item.header === header) {
            return {
              ...item,
              opts: item.opts.map(o => {
                if (o.text === option.text) {
                  return { ...o, selected: true };
                } else {
                  return { ...o, selected: false };
                }
              }),
            };
          } else {
            return {
              ...item,
              opts: item.opts.map(o => {
                return { ...o, selected: false };
              }),
            };
          }
        }),
        option.value
      );
    }
  }
</script>

<style src="./Dropdown.scss">

</style>

<div uk-dropdown="pos: bottom-justify; mode: click" class="Dropdown">
  {#each data as d}
    <div class="Dropdown-header">{d.header}</div>

    <div class="Dropdown-content">
      {#each d.opts as opt}
        <div
          class="Dropdown-selection clickable"
          on:click={() => {
            select(d.header, opt);
          }}>
          {#if !simpleSelect}
            <div class="Dropdown-selection-check">
              {#if opt.selected}
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5938 0.625L5.375 8.84375L2.375 5.8125C2.21875 5.6875
                    1.96875 5.6875 1.84375 5.8125L0.9375 6.71875C0.8125 6.84375
                    0.8125 7.09375 0.9375 7.25L5.125 11.4062C5.28125 11.5625 5.5
                    11.5625 5.65625 11.4062L15.0312 2.03125C15.1562 1.90625
                    15.1562 1.65625 15.0312 1.5L14.125 0.625C14 0.46875 13.75
                    0.46875 13.5938 0.625Z"
                    fill="#2B8AF7" />
                </svg>
              {/if}

            </div>
          {/if}
          {opt.text}
        </div>
      {/each}
    </div>
  {/each}
</div>
