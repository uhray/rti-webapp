<script>
  import Checkbox from '../checkbox/Checkbox.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  export let data = undefined;
  export let height = undefined;
</script>

<!-- HTML -->
<section class="Table">
  <div class="Table-outer">
    <div class="Table-inner" style={`height: ${height}vh`}>
      <table
        class={`uk-table uk-table-middle Table-container ${
          height ? 'uk-table-scrollable' : ''
        }`}
      >
        <thead>
          <tr class="Table-headerRow">
            {#each data.headers as header}
              <th scope="col" class="Table-headerRow-headerCell">
                {#if header.header == 'view' || header.header == 'actions'}
                  {''}
                {:else}{header.text}{/if}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="Table-body">
          {#each data.data as item}
            <tr class="Table-row">
              {#each data.headers as header}
                <td>
                  {#if header.header == 'status'}
                    {#if item.status == 'pending'}
                      <Label type="warning" text="Pending" />
                    {:else if item.status == 'completed'}
                      <Label type="success" text="Completed" />
                    {:else if item.status == 'declined'}
                      <Label type="danger" text="Declined" />
                    {:else if item.status == 'dispatched'}
                      <Label type="default" text="Dispatched" />
                    {:else if item.status == 'in progress'}
                      <Label type="active" text="In Progress" />
                    {:else if item.status == 'active'}
                      <Label type="default" text="Active" />
                    {:else if item.status == 'inactive'}
                      <Label type="disabled" text="Inactive" />
                    {/if}
                  {:else if header.header == 'order'}
                    <span class="Table-row-orderNumber">{item.order}</span>
                    <br />
                    <span class="Table-row-orderDate">{item.orderDate}</span>
                  {:else if header.header == 'view'}
                    <a href="">View</a>
                  {:else if header.header == 'actions'}
                    <div class="Table-row-actions">
                      <Icon type="delete" hover />
                      <Checkbox secondary />
                    </div>
                  {:else}{item[header.header]}{/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ==== -->
<style src="./Table.scss">
</style>
