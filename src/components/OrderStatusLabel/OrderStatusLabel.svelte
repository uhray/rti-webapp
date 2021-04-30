<script>
  import Label from '../label/Label.svelte';
  export let status;
  export let isSmall = false;

  console.log(isSmall);
</script>

{#if isSmall === true}
  {#if status == 'pending'}
    <Label status="warning" text="Pending" small />
  {:else if status == 'cancelled'}
    <Label status="danger" text="Cancelled" small />
  {:else if status == 'completed'}
    <Label status="success" text="Completed" small />
  {:else if status == 'accepted'}
    <Label status="active" text="Accepted" small />
  {:else if status == 'declined'}
    <Label status="danger" text="Declined" small />
  {:else if status == 'dispatched'}
    <Label status="warning" text="Dispatched" small />
  {:else if status == 'inProgress'}
    <Label status="inProgress" text="In Progress" small />
  {/if}
{:else}
  {#if status == 'pending'}
    <Label status="warning" text="Pending" />
  {:else if status == 'cancelled'}
    <Label status="danger" text="Cancelled" />
  {:else if status == 'completed'}
    <Label status="success" text="Completed" />
  {:else if status == 'accepted'}
    <Label status="active" text="Accepted" />
  {:else if status == 'declined'}
    <Label status="danger" text="Declined" />
  {:else if status == 'dispatched'}
    <Label status="warning" text="Dispatched" />
  {:else if status == 'inProgress'}
    <Label status="inProgress" text="In Progress" />
  {/if}
{/if}
