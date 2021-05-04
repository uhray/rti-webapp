<script>
  // 54px (header) + 71px for each row for exact rows before scrolling
  // Example: 3 rows = 267px (54 + (71 x 3))
  import Checkbox from '../checkbox/Checkbox.svelte';
  import OrderStatusLabel from '../OrderStatusLabel/OrderStatusLabel.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import moment from 'moment';

  export let headers = [];
  export let data = [];
  export let height = undefined;
  export let expand = false;

  export let handleDelete = undefined;
  export let handleDeleteSelected = undefined;
  export let handleCheck = undefined;
  export let selected = [];
</script>

<style src="./Table.scss">

</style>

<section class="Table">
  {#if expand}
    <div class="Table-outer">
      <div class="Table-inner" style={`height: ${height}`}>
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
            {#each data as item}
              <tr class="Table-row">
                {#each headers as header}
                  <td
                    class={header.header == 'fullName' || header.header == 'macroTitle' ? 'uk-width-1-2' : 'uk-width-1-6'}>
                    {#if header.header == 'status'}
                      <OrderStatusLabel status={item.status} />
                    {:else if header.header == 'order'}
                      <span class="Table-row-orderNumber">Hello</span>
                      <br />
                      <span class="Table-row-orderDate">{item.createdAt}</span>
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
                        <div style="margin-left: 15px;" />
                        <Checkbox secondary />
                      </div>
                    {:else if header.header == 'user-actions'}
                      <div class="Table-row-actions alignRight">
                        <Icon type="edit" hover />
                        <div style="margin-left: 10px;" />
                        <Icon type="delete" hover />
                        <div style="margin-left: 15px;" />
                        <Checkbox secondary />
                      </div>
                    {:else if header.header == 'sub-actions'}
                      <div class="Table-row-actions alignRight">
                        <Icon type="message-outline" hover />
                        <div style="margin-left: 10px;" />
                        <Icon type="delete" hover />
                        <div style="margin-left: 15px;" />
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
      <div class="Table-inner" style={`height: ${height}`}>
        <table
          class={`uk-table uk-table-middle Table-container ${height ? 'uk-table-scrollable' : ''}`}>
          <thead>
            <tr class="Table-headerRow">
              {#each headers as header}
                <th
                  scope="col"
                  class={`Table-headerRow-headerCell ${header.header === 'actions' ? 'alignRight' : ''}`}>
                  {#if header.header == 'view'}
                    {''}
                  {:else if header.header == 'actions'}
                    {#if selected.length > 0}
                      <div
                        on:click={() => {
                          handleDeleteSelected();
                        }}
                        class="Table-deleteAll">
                        <Icon color="#e86172" type="delete" hover />
                      </div>
                    {/if}
                  {:else}{header.text}{/if}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody class="Table-body">
            {#each data as item}
              <tr class="Table-row">
                {#each headers as header}
                  <td>
                    {#if header.header == 'status'}
                      <OrderStatusLabel status={item.status} />
                    {:else if header.header == 'order'}
                      <span class="Table-row-orderNumber">{item.orderId}</span>
                      <br />
                      <span class="Table-row-orderDate">
                        {moment(item.createdAt).format('MMM D, YYYY')}
                      </span>
                    {:else if header.header == 'view'}
                      <div class="alignRight">
                        <span>
                          <a href={`/${item.type}/${item.id}`}>View</a>
                        </span>
                      </div>
                    {:else if header.header == 'actions'}
                      <div class="Table-row-actions alignRight">
                        <div
                          on:click={() => {
                            handleDelete(item.id);
                          }}>
                          <Icon type="delete" hover />
                        </div>
                        <div style="margin-left: 15px;" />
                        <div class="Table-checkbox">
                          <Checkbox
                            on:click={() => {
                              handleCheck(item.id);
                            }}
                            secondary />
                        </div>
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
