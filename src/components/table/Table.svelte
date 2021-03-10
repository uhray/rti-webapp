<script>
  import Checkbox from '../checkbox/Checkbox.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  export let headers = undefined;
  export let data = undefined;
  export let height = undefined;
  export let expand = false;
</script>

<style src="./Table.scss">

</style>

<section class="Table">
  {#if expand}
    <div class="Table-outer">
      <div class="Table-inner" style={`height: ${height}vh`}>
        <table
          class={`uk-table uk-table-middle Table-container ${height ? 'uk-table-scrollable' : ''}`}>
          <thead>
            <tr class="Table-headerRow">
              {#each headers as header}
                <th
                  scope="col"
                  class={header.header == 'fullName' || header.header == 'macroTitle' ? 'uk-width-1-2 Table-headerRow-headerCell' : 'uk-width-1-6 Table-headerRow-headerCell'}>
                  {#if header.header == 'view' || header.header == 'timeoff-view' || header.header == 'actions' || header.header == 'user-actions' || header.header == 'sub-actions'}
                    {''}
                  {:else}{header.text}{/if}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody class="Table-body">
            {#each data.data as item}
              <tr class="Table-row">
                {#each headers as header}
                  <td
                    class={header.header == 'fullName' || header.header == 'macroTitle' ? 'uk-width-1-2' : 'uk-width-1-6'}>
                    {#if header.header == 'status'}
                      {#if item.status == 'pending'}
                        <Label status="warning" text="Pending" />
                      {:else if item.status == 'completed'}
                        <Label status="success" text="Completed" />
                      {:else if item.status == 'declined'}
                        <Label status="danger" text="Declined" />
                      {:else if item.status == 'dispatched'}
                        <Label status="default" text="Dispatched" />
                      {:else if item.status == 'in progress'}
                        <Label status="active" text="In Progress" />
                      {:else if item.status == 'active'}
                        <Label status="default" text="Active" />
                      {:else if item.status == 'inactive'}
                        <Label status="disabled" text="Inactive" />
                      {:else if item.status == 'approved'}
                        <Label status="success" text="Approved" />
                      {/if}
                    {:else if header.header == 'order'}
                      <span class="Table-row-orderNumber">{item.order}</span>
                      <br />
                      <span class="Table-row-orderDate">{item.orderDate}</span>
                    {:else if header.header == 'view'}
                      <div class="alignRight">
                        <a href="">View</a>
                      </div>
                    {:else if header.header == 'timeoff-view'}
                      <div class="alignRight">
                        <a href="#TimeOff-modal" uk-toggle>View</a>
                      </div>
                    {:else if header.header == 'actions'}
                      <div class="Table-row-actions alignRight">
                        <Icon type="delete" hover />
                        <div style="margin-left: 8px;" />
                        <Checkbox secondary />
                      </div>
                    {:else if header.header == 'user-actions'}
                      <div class="Table-row-actions alignRight">
                        <Icon type="edit" hover />
                        <div style="margin-left: 8px;" />
                        <Icon type="delete" hover />
                        <div style="margin-left: 8px;" />
                        <Checkbox secondary />
                      </div>
                    {:else if header.header == 'sub-actions'}
                      <div class="Table-row-actions alignRight">
                        <Icon type="message-outline" hover />
                        <div style="margin-left: 8px;" />
                        <Icon type="delete" hover />
                        <div style="margin-left: 8px;" />
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
  {:else}
    <div class="Table-outer">
      <div class="Table-inner" style={`height: ${height}vh`}>
        <table
          class={`uk-table uk-table-middle Table-container ${height ? 'uk-table-scrollable' : ''}`}>
          <thead>
            <tr class="Table-headerRow">
              {#each headers as header}
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
                {#each headers as header}
                  <td>
                    {#if header.header == 'status'}
                      {#if item.status == 'pending'}
                        <Label status="warning" text="Pending" />
                      {:else if item.status == 'completed'}
                        <Label status="success" text="Completed" />
                      {:else if item.status == 'declined'}
                        <Label status="danger" text="Declined" />
                      {:else if item.status == 'dispatched'}
                        <Label status="default" text="Dispatched" />
                      {:else if item.status == 'in progress'}
                        <Label status="active" text="In Progress" />
                      {/if}
                    {:else if header.header == 'order'}
                      <span class="Table-row-orderNumber">{item.id}</span>
                      <br />
                      <span class="Table-row-orderDate">{item.orderDate}</span>
                    {:else if header.header == 'view'}
                      <div class="alignRight">
                        <a href={`/${data.type}/${item.id}`}>View</a>
                      </div>
                    {:else if header.header == 'actions'}
                      <div class="Table-row-actions alignRight">
                        <Icon type="delete" hover />
                        <Checkbox secondary />
                      </div>
                    {:else if header.header == 'filename'}
                      <div class="Table-row-filename">
                        <div>
                          <Icon type="file" color="#15224B" />
                        </div>

                        <div>{item.filename}</div>
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
  {/if}
</section>
