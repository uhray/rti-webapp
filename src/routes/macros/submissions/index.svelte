<script>
  import Header from './Header.svelte';
  import Table from '../../../components/table/Table.svelte';
  import TimeOff from '../../../components/modals/timeoff/TimeOff.svelte';
  import { data } from './data';
</script>

<Header />
<TimeOff />
<section class="MacroSubmissionsPage">
  <Table expand height={75} {data} />
</section>

<style lang="scss">
  .MacroSubmissionsPage {
    padding: 2em;
  }
</style>
