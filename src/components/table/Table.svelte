<script>
  // 54px (header) + 71px for each row for exact rows before scrolling
  // Example: 3 rows = 267px (54 + (71 x 3))
  import Checkbox from '../checkbox/Checkbox.svelte';
  import OrderStatusLabel from '../OrderStatusLabel/OrderStatusLabel.svelte';
  import Label from '../label/Label.svelte';
  import Icon from '../icon/Icon.svelte';
  import { formatDate } from '../../tools/formatDate.ts';
  import moment from 'moment';

  export let headers = [];
  export let data = [];
  export let height = undefined;
  export let expand = false;

  export let handleDelete = undefined;
  export let handleDeleteSelected = undefined;
  export let handleCheck = undefined;
  export let selected = [];

  function getHeaderSize(size) {
    if (size === 'small') {
      return 'uk-width-small';
    } else if (size === 'medium') {
      return 'uk-width-medium';
    } else if (size === 'large') {
      return 'uk-width-large';
    } else if (size === 'expand') {
      return 'uk-table-expand';
    } else if (size === 'shrink') {
      return 'uk-table-shrink';
    } else {
      return 'uk-width-auto';
    }
  }
</script>

<style src="./Table.scss">

</style>

<section class="Table">

  <div class="Table-outer">
    <div class="Table-inner" style={`height: ${height}`}>
      <table
        class={`uk-table uk-table-middle Table-container ${height ? 'uk-table-scrollable' : ''}`}>
        <thead>
          <tr class="Table-headerRow">
            {#each headers as header}
              <th
                scope="col"
                class={`Table-headerRow-headerCell ${getHeaderSize(header.size)}
                  ${header.header === 'actions' || header.header === 'userActions' ? 'alignRight' : ''}`}>
                {#if header.header == 'view'}
                  {''}
                {:else if header.header == 'actions' || header.header == 'userActions'}
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
          {#each data as item, index}
            <tr class="Table-row">
              {#each headers as header}
                <td class={`${getHeaderSize(header.size)}`}>
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
                          item.id ? handleDelete(item.id) : handleDelete(index);
                        }}>
                        <Icon type="delete" hover />
                      </div>
                      <div style="margin-left: 10px;" />
                      <div class="Table-checkbox">
                        <Checkbox
                          on:click={() => {
                            item.id ? handleCheck(item.id) : handleCheck(index);
                          }}
                          secondary />
                      </div>
                    </div>
                  {:else if header.header == 'userActions'}
                    <div class="Table-row-actions alignRight">
                      <div
                        on:click={() => {
                          console.log('#TODO edit');
                        }}>
                        <Icon type="edit" hover />
                      </div>
                      <div style="margin-left: 10px;" />
                      <div
                        on:click={() => {
                          item.id ? handleDelete(item.id) : handleDelete(index);
                        }}>
                        <Icon type="delete" hover />
                      </div>
                      <div style="margin-left: 10px;" />
                      <div class="Table-checkbox">
                        <Checkbox
                          on:click={() => {
                            item.id ? handleCheck(item.id) : handleCheck(index);
                          }}
                          secondary />
                      </div>
                    </div>
                  {:else if header.header == 'filename'}
                    <div class="Table-row-filename">
                      <div>
                        <Icon type="file" color="#15224B" />
                      </div>

                      <div>{item.fileName}</div>
                    </div>
                  {:else if header.header == 'createdAt' || header.header == 'updatedAt'}
                    {formatDate(item[header.header], true)}
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
